import { useEffect, useState, useMemo } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useApp } from "../context/AppContext";

export default function AuditLogs() {
  const [logs, setLogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [auditEnabled, setAuditEnabled] = useState(true);

  // 🔍 Filters
  const [userFilter, setUserFilter] = useState("All");
  const [actionFilter, setActionFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // 🔴 FIXED: Use AppContext for permissions
  const { user } = useApp();
  const role = user?.role || "Staff";

  // ✅ FIXED: Role-based audit access (NOT report-based)
  const canViewAuditLogs = ["Admin", "Manager"].includes(role);

  // ✅ Calculate date defaults - MOVED BEFORE CONDITIONAL RETURNS
  const { today } = useMemo(() => {
    const todayDate = new Date();
    return {
      today: todayDate.toISOString().split('T')[0]
    };
  }, []);

  // ✅ FILTER OPTIONS - MOVED BEFORE CONDITIONAL RETURNS
  const users = useMemo(() => {
    const userSet = new Set(logs.map(l => l.user).filter(Boolean));
    return ["All", ...Array.from(userSet).sort()];
  }, [logs]);

  const actions = useMemo(() => {
    const actionSet = new Set(logs.map(l => l.action).filter(Boolean));
    return ["All", ...Array.from(actionSet).sort()];
  }, [logs]);

  // ✅ FILTER LOGIC - MOVED BEFORE CONDITIONAL RETURNS
  const filteredLogs = useMemo(() => {
    return logs.filter(log => {
      // User filter
      if (userFilter !== "All" && log.user !== userFilter) {
        return false;
      }
      
      // Action filter
      if (actionFilter !== "All" && log.action !== actionFilter) {
        return false;
      }
      
      if (!log.createdAt) {
        return false;
      }
      
      const logDate = log.createdAt.toDate();
      
      if (fromDate) {
        const from = new Date(fromDate);
        from.setHours(0, 0, 0, 0);
        if (logDate < from) return false;
      }
      
      if (toDate) {
        const to = new Date(toDate);
        to.setHours(23, 59, 59, 999);
        if (logDate > to) return false;
      }

      return true;
    });
  }, [logs, userFilter, actionFilter, fromDate, toDate]);

  // ✅ CONDITION 2: Check if audit report is enabled in settings
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "settings", "reports"),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data();
          console.log("📊 Report settings loaded:", data);
          // enabledReports.audit === true (default) or not false
          setAuditEnabled(data.enabledReports?.audit !== false);
        }
      },
      (error) => {
        console.error("❌ Error loading report settings:", error);
        setAuditEnabled(true); // Default to enabled if error
      }
    );

    return () => unsub();
  }, []);

  // 🔥 REAL-TIME FIRESTORE LISTENER - FIXED VERSION
  useEffect(() => {
    // Use a cleanup function to track mounted state
    let isMounted = true;
    
    // ✅ FIXED: Use canViewAuditLogs instead of canViewReports
    if (!canViewAuditLogs || !auditEnabled) {
      // Use setTimeout to avoid synchronous setState
      const timer = setTimeout(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      }, 0);
      
      return () => {
        isMounted = false;
        clearTimeout(timer);
      };
    }

    // Set loading state asynchronously
    const loadingTimer = setTimeout(() => {
      if (isMounted) {
        setIsLoading(true);
      }
    }, 0);

    const q = query(
      collection(db, "auditLogs"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        console.log("📡 Audit logs onSnapshot triggered");
        console.log("📄 Total docs:", snapshot.docs.length);

        const data = snapshot.docs
          .map(doc => {
            const d = doc.data();

            if (!d.createdAt) {
              console.warn("⚠️ createdAt missing for doc:", doc.id);
              return null;
            }

            return {
              id: doc.id,
              ...d,
              createdAtFormatted: d.createdAt.toDate().toLocaleString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
              })
            };
          })
          .filter(Boolean);

        console.log("✅ Final parsed audit logs:", data.length);
        
        // Update states asynchronously
        setTimeout(() => {
          if (isMounted) {
            setLogs(data);
            setIsLoading(false);
          }
        }, 0);
      },
      (error) => {
        console.error("❌ Firestore onSnapshot error:", error);
        setTimeout(() => {
          if (isMounted) {
            setIsLoading(false);
          }
        }, 0);
      }
    );

    return () => {
      isMounted = false;
      clearTimeout(loadingTimer);
      unsubscribe();
    };
  }, [canViewAuditLogs, auditEnabled]); // ✅ FIXED: Changed dependency

  // 🔴 FIXED: PERMISSION GUARDS - Updated logic
  if (!auditEnabled) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-3">📕</div>
          <h2 className="text-lg font-semibold">Audit Logs Disabled</h2>
          <p className="text-sm">This report is disabled in settings</p>
          <div className="mt-4 text-xs bg-gray-100 p-3 rounded-lg max-w-md">
            <p><strong>Role:</strong> {role}</p>
            <p><strong>Audit Report Enabled:</strong> {auditEnabled ? '✅ Yes' : '❌ No'}</p>
            <p className="mt-2">Administrators can enable this report in Settings → Reports</p>
          </div>
        </div>
      </div>
    );
  }
  // 📤 EXPORT CSV
  const exportCSV = () => {
    if (filteredLogs.length === 0) {
      alert("No logs to export");
      return;
    }

    const headers = ["User", "Action", "Module", "Description", "Time"];
    const rows = filteredLogs.map(log => [
      log.user || "",
      log.action || "",
      log.module || "",
      log.description || "",
      log.createdAtFormatted || ""
    ]);

    const csv = [
      headers.join(","),
      ...rows.map(row => row.map(val => `"${val}"`).join(","))
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `audit_logs_${new Date().getTime()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    alert(`✅ Exported ${filteredLogs.length} logs to CSV`);
  };

  // 📄 EXPORT PDF (PRINT)
  const exportPDF = () => {
    if (filteredLogs.length === 0) {
      alert("No logs to export");
      return;
    }

    const printWindow = window.open("", "_blank");
    
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Audit Logs Report</title>
        <style>
          body { 
            font-family: 'Segoe UI', Arial, sans-serif; 
            padding: 30px; 
            margin: 0;
            color: #333;
          }
          h1 { 
            color: #1a1a1a; 
            border-bottom: 2px solid #4F46E5; 
            padding-bottom: 10px; 
            margin-bottom: 25px; 
            font-size: 24px;
          }
          .report-info {
            margin-bottom: 20px;
            padding: 15px;
            background: #f8fafc;
            border-radius: 8px;
            font-size: 14px;
          }
          .info-item {
            margin-bottom: 5px;
          }
          .info-label {
            font-weight: 600;
            color: #555;
            display: inline-block;
            width: 120px;
          }
          table { 
            width: 100%; 
            border-collapse: collapse; 
            margin-top: 20px;
            font-size: 12px;
          }
          th { 
            background: #f3f4f6; 
            font-weight: 600;
            color: #374151;
            text-align: left;
            padding: 12px 8px;
            border: 1px solid #e5e7eb;
          }
          td { 
            padding: 10px 8px; 
            border: 1px solid #e5e7eb;
            vertical-align: top;
          }
          tr:nth-child(even) {
            background: #f9fafb;
          }
          .footer { 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #ddd; 
            font-size: 11px; 
            color: #6b7280; 
            text-align: center; 
          }
          @media print {
            body { 
              padding: 20px; 
              font-size: 11pt;
            }
            table {
              font-size: 10pt;
            }
            .no-print { 
              display: none; 
            }
          }
        </style>
      </head>
      <body>
        <h1>Audit Logs Report</h1>
        
        <div class="report-info">
          <div class="info-item">
            <span class="info-label">Generated:</span>
            <span>${new Date().toLocaleString()}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Total Logs:</span>
            <span>${filteredLogs.length}</span>
          </div>
          <div class="info-item">
            <span class="info-label">User Filter:</span>
            <span>${userFilter}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Action Filter:</span>
            <span>${actionFilter}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Date Range:</span>
            <span>${fromDate || "Start"} to ${toDate || "End"}</span>
          </div>
        </div>
        
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Module</th>
              <th>Description</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            ${filteredLogs.map(log => `
              <tr>
                <td>${log.user || ""}</td>
                <td><strong>${log.action || ""}</strong></td>
                <td>${log.module || ""}</td>
                <td>${log.description || ""}</td>
                <td>${log.createdAtFormatted || ""}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
        
        <div class="footer">
          Generated by WarehouseHub Inventory System • ${new Date().toLocaleDateString()}
        </div>
        
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
              setTimeout(() => window.close(), 300);
            }, 500);
          }
        </script>
      </body>
      </html>
    `);

    printWindow.document.close();
  };

  // Reset filters
  const resetFilters = () => {
    setUserFilter("All");
    setActionFilter("All");
    setFromDate("");
    setToDate("");
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 p-4 md:p-6">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Audit Logs</h1>
          <p className="text-gray-600 mt-1">
            Track all system activities and user actions in real-time
          </p>
         
        </div>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export CSV
          </button>
          <button
            onClick={exportPDF}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition flex items-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Export PDF
          </button>
        </div>
      </div>

      {/* 🔍 FILTER BAR */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <button
            onClick={resetFilters}
            className="px-3 py-1.5 border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg text-sm transition"
          >
            Reset Filters
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={userFilter}
              onChange={e => setUserFilter(e.target.value)}
            >
              {users.map(u => (
                <option key={u} value={u}>{u}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Action
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={actionFilter}
              onChange={e => setActionFilter(e.target.value)}
            >
              {actions.map(a => (
                <option key={a} value={a}>{a}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              From Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={fromDate}
              onChange={e => setFromDate(e.target.value)}
              max={today}
              placeholder="Start date"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              To Date
            </label>
            <input
              type="date"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              value={toDate}
              onChange={e => setToDate(e.target.value)}
              max={today}
              min={fromDate}
              placeholder="End date"
            />
          </div>

          <div className="flex items-end">
            <div className="text-sm text-gray-500">
              Showing: <span className="font-semibold">{filteredLogs.length}</span> of {logs.length} logs
            </div>
          </div>
        </div>
      </div>

      {/* 📋 LOGS TABLE */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="text-gray-500 mt-3">Loading audit logs...</p>
          </div>
        ) : filteredLogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-3">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No audit logs found</h3>
            <p className="text-gray-500">
              {logs.length === 0 
                ? "No audit logs recorded yet."
                : "No logs match your current filters. Try adjusting your criteria."}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Action
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Module
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredLogs.map(log => (
                  <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-medium text-gray-900">{log.user}</div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        log.action === 'CREATE' ? 'bg-green-100 text-green-800' :
                        log.action === 'UPDATE' ? 'bg-blue-100 text-blue-800' :
                        log.action === 'DELETE' ? 'bg-red-100 text-red-800' :
                        log.action === 'LOGIN' ? 'bg-purple-100 text-purple-800' :
                        log.action === 'TEST' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {log.action}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-900">{log.module}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-600 max-w-md">{log.description}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm text-gray-500">{log.createdAtFormatted}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}