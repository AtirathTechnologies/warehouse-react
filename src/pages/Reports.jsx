import React, { useState, useEffect, useMemo } from 'react';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  doc
} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useApp } from "../context/AppContext";

// ===============================
// REPORT DEFINITIONS
// ===============================
const REPORTS = [
  {
    icon: "📊",
    title: "Stock Report",
    color: "bg-blue-600",
    description: "Current inventory status"
  },
  {
    icon: "📈",
    title: "Inward/Outward Report",
    color: "bg-green-600",
    description: "Stock movement analysis"
  },
  {
    icon: "⏰",
    title: "Expiry Report",
    color: "bg-orange-600",
    description: "Product expiry tracking"
  },
  {
    icon: "💰",
    title: "Stock Valuation",
    color: "bg-purple-600",
    description: "Financial inventory value"
  },
  {
    icon: "🔍",
    title: "Audit Log",
    color: "bg-gray-600",
    description: "System activity tracking"
  },
  {
    icon: "⚠️",
    title: "Low Stock Report",
    color: "bg-red-600",
    description: "Inventory alerts"
  }
];

// ===============================
// VIEW-ONLY UI COMPONENT (WITH FIXED ALIGNMENT)
// ===============================
function ReportsViewOnlyUI({ reports }) {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [selectedReport, setSelectedReport] = useState(null);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Download helper function
  const downloadReportCSV = (report) => {
    const headers = ["Type", ...Object.keys(report.params || {}), "Generated At"];
    const row = [
      report.type,
      ...Object.values(report.params || {}),
      report.generatedAt
    ];

    const csvContent = [
      headers.join(","),
      row.map(v => `"${v}"`).join(",")
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${report.type.replace(/\s+/g, "_")}_${new Date().getTime()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const filteredReports = useMemo(() => {
    return reports.filter((r) => {
      if (search && !r.type.toLowerCase().includes(search.toLowerCase()))
        return false;

      if (type && r.type !== type)
        return false;

      if (fromDate) {
        const reportDate = new Date(r.generatedAt);
        if (reportDate < new Date(fromDate)) return false;
      }

      if (toDate) {
        const reportDate = new Date(r.generatedAt);
        if (reportDate > new Date(toDate + "T23:59:59")) return false;
      }

      return true;
    });
  }, [search, type, fromDate, toDate, reports]);

  const formatDate = (dateStr) => {
    if (!dateStr) return "-";
    return dateStr;
  };

  return (
    // 🔥 FIXED: Removed max-w-6xl and mx-auto for proper left alignment
    <div className="min-h-full w-full px-6 md:px-10 py-6 bg-white text-gray-900">

      {/* HEADER */}
      <header className="mb-12">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-1">
              Reports
            </h1>
          </div>
          
        </div>
        <div className="h-1 w-40 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full mt-4"></div>
      </header>

      {/* STATS CARDS (VIEW ONLY) - WITH CLICK TO FILTER */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">

        {/* TOTAL CARD (reset filter) */}
        <div
          onClick={() => setType("")}
          className={`cursor-pointer bg-gradient-to-br from-slate-50 to-slate-100 
            border rounded-2xl p-5 transition hover:-translate-y-1
            ${type === "" ? "ring-2 ring-slate-400" : "border-slate-200"}
          `}
        >
          <div className="text-3xl font-bold text-slate-900 mb-1">
            {filteredReports.length}
          </div>
          <div className="text-sm text-slate-600 font-medium">
            Total Reports
          </div>
        </div>

        {/* STOCK CARD */}
        <div
          onClick={() => setType("Stock Report")}
          className={`cursor-pointer bg-gradient-to-br from-blue-50 to-blue-100 
            border rounded-2xl p-5 transition hover:-translate-y-1
            ${type === "Stock Report" ? "ring-2 ring-blue-500 border-blue-400" : "border-blue-200"}
          `}
        >
          <div className="text-3xl font-bold text-blue-700 mb-1">
            {filteredReports.filter(r => r.type === "Stock Report").length}
          </div>
          <div className="text-sm text-blue-600 font-medium">
            Stock Reports
          </div>
        </div>

        {/* INWARD / OUTWARD CARD */}
        <div
          onClick={() => setType("Inward/Outward Report")}
          className={`cursor-pointer bg-gradient-to-br from-green-50 to-green-100 
            border rounded-2xl p-5 transition hover:-translate-y-1
            ${type === "Inward/Outward Report"
              ? "ring-2 ring-green-500 border-green-400"
              : "border-green-200"}
          `}
        >
          <div className="text-3xl font-bold text-green-700 mb-1">
            {filteredReports.filter(r => r.type === "Inward/Outward Report").length}
          </div>
          <div className="text-sm text-green-600 font-medium">
            Inward / Outward
          </div>
        </div>

        {/* AUDIT CARD */}
        <div
          onClick={() => setType("Audit Log")}
          className={`cursor-pointer bg-gradient-to-br from-purple-50 to-purple-100 
            border rounded-2xl p-5 transition hover:-translate-y-1
            ${type === "Audit Log" ? "ring-2 ring-purple-500 border-purple-400" : "border-purple-200"}
          `}
        >
          <div className="text-3xl font-bold text-purple-700 mb-1">
            {filteredReports.filter(r => r.type === "Audit Log").length}
          </div>
          <div className="text-sm text-purple-600 font-medium">
            Audit Logs
          </div>
        </div>

        {/* EXPIRY CARD */}
        <div
          onClick={() => setType("Expiry Report")}
          className={`cursor-pointer bg-gradient-to-br from-orange-50 to-orange-100 
            border rounded-2xl p-5 transition hover:-translate-y-1
            ${type === "Expiry Report" ? "ring-2 ring-orange-500 border-orange-400" : "border-orange-200"}
          `}
        >
          <div className="text-3xl font-bold text-orange-700 mb-1">
            {filteredReports.filter(r => r.type === "Expiry Report").length}
          </div>
          <div className="text-sm text-orange-600 font-medium">
            Expiry Alerts
          </div>
        </div>

        {/* LOW STOCK CARD */}
        <div
          onClick={() => setType("Low Stock Report")}
          className={`cursor-pointer bg-gradient-to-br from-red-50 to-red-100 
            border rounded-2xl p-5 transition hover:-translate-y-1
            ${type === "Low Stock Report"
              ? "ring-2 ring-red-500 border-red-400"
              : "border-red-200"}
          `}
        >
          <div className="text-3xl font-bold text-red-700 mb-1">
            {filteredReports.filter(r => r.type === "Low Stock Report").length}
          </div>
          <div className="text-sm text-red-600 font-medium">
            Low Stock Alerts
          </div>
        </div>

      </div>

      {/* FILTERS */}
      <div className="mb-8">
        <div className="flex flex-wrap gap-3">
          <input
            type="text"
            placeholder="Search reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 px-5 py-3 bg-gray-50 border rounded-xl text-sm focus:ring-2 focus:ring-blue-100"
          />

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="px-4 py-3 bg-gray-50 border rounded-xl text-sm"
          >
            <option value="">All Types</option>
            <option value="Stock Report">Stock</option>
            <option value="Audit Log">Audit</option>
            <option value="Expiry Report">Expiry</option>
            <option value="Inward/Outward Report">Inward / Outward</option>
            <option value="Low Stock Report">Low Stock</option>
          </select>

          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            className="px-4 py-3 bg-gray-50 border rounded-xl text-sm"
            placeholder="From Date"
          />

          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            className="px-4 py-3 bg-gray-50 border rounded-xl text-sm"
            placeholder="To Date"
          />

          <button
            onClick={() => {
              setSearch("");
              setType("");
              setFromDate("");
              setToDate("");
            }}
            className="px-5 py-3 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-xl"
          >
            Clear
          </button>
        </div>
      </div>

      {/* LIST */}
      <div className="space-y-3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">All Reports</h2>
          <span className="text-sm text-gray-500">
            {filteredReports.length} reports
          </span>
        </div>

        {filteredReports.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            No reports found
          </div>
        ) : (
          filteredReports.map((r, i) => (
            <div
              key={r.id || i}
              className="bg-white border rounded-xl p-5 hover:bg-blue-50 transition-all duration-300 ease-out"
            >
              <div className="flex justify-between items-center gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {r.type}
                  </h3>
                  <p className="text-sm text-gray-500">
                    Generated at {formatDate(r.generatedAt)}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSelectedReport(r)}
                    className="px-4 py-2 text-sm bg-gray-100 rounded-lg hover:bg-gray-200"
                  >
                    View
                  </button>
                  <button
                    onClick={() => downloadReportCSV(r)}
                    className="px-4 py-2 text-sm bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL FOR VIEWING REPORT */}
      {selectedReport && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl w-full max-w-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">{selectedReport.type}</h3>
              <button onClick={() => setSelectedReport(null)} className="text-xl">&times;</button>
            </div>

            <p className="text-sm text-gray-500 mb-3">
              Generated at {selectedReport.generatedAt}
            </p>

            <div className="space-y-2 text-sm">
              {Object.entries(selectedReport.params || {}).map(([k, v]) => (
                <div key={k}>
                  <span className="font-medium">{k}:</span> {v}
                </div>
              ))}
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button 
                onClick={() => setSelectedReport(null)}
                className="px-4 py-2 bg-gray-100 rounded hover:bg-gray-200"
              >
                Close
              </button>
              <button 
                onClick={() => downloadReportCSV(selectedReport)}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Download
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="mt-12 pt-6 border-t text-center text-sm text-gray-500">
        
      </footer>
    </div>
  );
}

// ===============================
// MAIN REPORTS COMPONENT
// ===============================
export default function Reports() {
  const [generatedReports, setGeneratedReports] = useState([]);
  const [currentReportType, setCurrentReportType] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({});

  // 🔴 MODIFIED: Use AppContext instead of local state
  const { user, userRules } = useApp();
  
  // 🔴 REMOVED: Local userRules state - use AppContext instead
  const [enabledReports, setEnabledReports] = useState({});
  
  // Real-time data stores
  const [liveCategories] = useState(['All', 'Electronics', 'Food', 'Clothing', 'Books', 'Toys']);
  const [liveWarehouses] = useState(['All', 'Main Warehouse', 'East Warehouse', 'West Warehouse', 'North Storage']);
  
  // ✅ Use current user from AppContext
  const currentRole = user?.role || "Staff";

  // 🔴 MODIFIED: Get permissions from AppContext userRules
  const canGenerate = userRules[currentRole]?.allowReportGeneration === true;
  const canView = userRules[currentRole]?.allowReportViewing === true;

  // ❌ DELETED: Debug console.log useEffect (entire block removed)

  // Calculate date defaults once using useMemo
  const dateDefaults = useMemo(() => {
    const today = new Date();
    const sevenDaysAgo = new Date(today);
    sevenDaysAgo.setDate(today.getDate() - 7);
    
    return {
      today: today.toISOString().split('T')[0],
      sevenDaysAgo: sevenDaysAgo.toISOString().split('T')[0]
    };
  }, []);

  // 🔴 MODIFIED: Only load enabledReports from Firestore (userRules now from AppContext)
  useEffect(() => {
    const unsubReports = onSnapshot(
      doc(db, "settings", "reports"),
      (snap) => {
        if (snap.exists()) {
          setEnabledReports(snap.data().enabledReports || {});
          // ❌ OPTIONAL: Remove console.log for production (commented out)
          // console.log("✅ Report Settings Loaded:", snap.data().enabledReports);
        }
      },
      (error) => {
        console.error("Error loading report settings:", error);
      }
    );

    return () => {
      unsubReports();
    };
  }, []);

  // ===============================
  // REAL-TIME FIRESTORE DATA FETCHING
  // ===============================
  useEffect(() => {
    const q = query(
      collection(db, "reports"),
      orderBy("generatedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, 
      (snapshot) => {
        const reportsData = snapshot.docs.map(doc => ({
          id: doc.id,
          type: doc.data().type,
          params: doc.data().params || {},
          generatedAt: doc.data().generatedAt?.toDate().toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        }));

        setGeneratedReports(reportsData);
      },
      (error) => {
        console.error("Error fetching reports:", error);
      }
    );

    return () => unsubscribe();
  }, []);

  // 🔴 ADDED: PERMISSION-BASED RENDERING
  // 🚫 No access at all
  if (!canGenerate && !canView) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-gray-500">
        <div className="text-5xl mb-4">🚫</div>
        <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
        <p className="mb-4">You do not have access to Reports module</p>
        <div className="text-sm bg-gray-100 p-3 rounded-lg mb-6">
          <p><strong>Role:</strong> {currentRole}</p>
          <p><strong>Can Generate:</strong> {canGenerate ? '✅ Yes' : '❌ No'}</p>
          <p><strong>Can View:</strong> {canView ? '✅ Yes' : '❌ No'}</p>
        </div>
      </div>
    );
  }

  // 👀 VIEW ONLY MODE
  if (!canGenerate && canView) {
    return <ReportsViewOnlyUI reports={generatedReports} />;
  }

  // ===============================
  // FORM CONFIGURATION (ONLY FOR FULL MODE)
  // ===============================
  const REPORT_FORM_CONFIG = {
    'Stock Report': () => (
      <>
        {dateInput('From Date', 'fromDate')}
        {dateInput('To Date', 'toDate')}
        {selectInput('Warehouse', 'warehouse', liveWarehouses)}
        {selectInput('Category', 'category', liveCategories)}
        {checkboxInput('Include Zero Stock Items', 'includeZero')}
      </>
    ),

    'Inward/Outward Report': () => (
      <>
        {dateInput('From Date', 'fromDate')}
        {dateInput('To Date', 'toDate')}
        {selectInput('Transaction Type', 'txnType', ['All', 'Inward', 'Outward'])}
        {selectInput('Warehouse', 'warehouse', liveWarehouses)}
        {selectInput('Product', 'product', ['All Products', 'Product A', 'Product B', 'Product C'])}
      </>
    ),

    'Expiry Report': () => (
      <>
        {selectInput('Expiry Within', 'expiryDays', ['7 days', '15 days', '30 days', '60 days'])}
        {selectInput('Warehouse', 'warehouse', liveWarehouses)}
        {selectInput('Category', 'category', liveCategories)}
      </>
    ),

    'Low Stock Report': () => (
      <>
        {numberInput('Stock Threshold (%)', 'threshold', 10)}
        {selectInput('Warehouse', 'warehouse', liveWarehouses)}
        {selectInput('Category', 'category', liveCategories)}
        {checkboxInput('Include Critical Items Only', 'criticalOnly')}
      </>
    ),

    'Stock Valuation': () => (
      <>
        {dateInput('As On Date', 'asOnDate')}
        {selectInput('Valuation Method', 'method', ['FIFO', 'LIFO', 'Average', 'Weighted Average'])}
        {selectInput('Warehouse', 'warehouse', liveWarehouses)}
        {selectInput('Currency', 'currency', ['USD', 'EUR', 'GBP', 'INR'])}
      </>
    ),

    'Audit Log': () => (
      <>
        {dateInput('From Date', 'fromDate')}
        {dateInput('To Date', 'toDate')}
        {selectInput('Action Type', 'action', ['All Actions', 'Create', 'Update', 'Delete'])}
        {selectInput('User', 'user', ['All Users', 'Admin', 'Manager', 'Staff'])}
      </>
    )
  };

  // ===============================
  // INPUT COMPONENTS (ONLY FOR FULL MODE)
  // ===============================
  const dateInput = (label, name) => {
    const defaultValue = name === 'fromDate' 
      ? dateDefaults.sevenDaysAgo 
      : dateDefaults.today;

    return (
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <input
          type="date"
          name={name}
          defaultValue={defaultValue}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        />
      </div>
    );
  };

  const selectInput = (label, name, options) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <select
        name={name}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
        defaultValue={options[0]}
      >
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    </div>
  );

  const numberInput = (label, name, defaultValue) => (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type="number"
        name={name}
        defaultValue={defaultValue}
        min="0"
        max="100"
        step="1"
        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
        onChange={(e) => setFormData({ ...formData, [name]: e.target.value })}
      />
    </div>
  );

  const checkboxInput = (label, name) => (
    <div className="flex items-center mb-4">
      <input
        type="checkbox"
        name={name}
        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
        onChange={(e) => setFormData({ ...formData, [name]: e.target.checked })}
      />
      <label className="ml-2 block text-sm text-gray-700">
        {label}
      </label>
    </div>
  );

  // ===============================
  // MODAL FUNCTIONS (ONLY FOR FULL MODE)
  // ===============================
  const openReportModal = (reportType) => {
    if (!canGenerate) {
      alert("You don't have permission to generate reports");
      return;
    }
    setCurrentReportType(reportType);
    setFormData({});
    setShowModal(true);
  };

  const closeReportModal = () => {
    setShowModal(false);
    setCurrentReportType(null);
    setFormData({});
  };

  // ===============================
  // FORM SUBMISSION HANDLER (FIRESTORE) - ONLY FOR FULL MODE
  // ===============================
  const handleReportSubmit = async (e) => {
    e.preventDefault();

    if (!canGenerate) {
      alert("You don't have permission to generate reports");
      return;
    }

    if (!currentReportType) {
      alert('No report type selected');
      return;
    }

    const form = e.target;
    const formDataObj = new FormData(form);
    const params = {};

    for (let [key, value] of formDataObj.entries()) {
      params[key] = value;
    }

    Object.keys(formData).forEach(key => {
      if (formData[key] === true && !params[key]) {
        params[key] = 'Yes';
      }
    });

    try {
      await addDoc(collection(db, "reports"), {
        type: currentReportType,
        params: params,
        generatedAt: serverTimestamp(),
        generatedBy: user?.role || "Unknown",
        size: "Auto"
      });

      closeReportModal();

      setTimeout(() => {
        alert(`✅ ${currentReportType} generated successfully!`);
      }, 100);

    } catch (error) {
      console.error("Error saving report to Firestore:", error);
      alert("❌ Failed to save report. Please try again.");
    }
  };

  // ===============================
  // ✍️ FULL MODE (ADMIN/MANAGER)
  // ===============================
  return (
    <div className="max-w-7xl mx-auto space-y-8 pr-4 md:pr-6 pb-4 md:pb-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
      </div>

      {/* 6 REPORT CARDS - FILTERED BASED ON SETTINGS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {REPORTS
          .filter((report) => {
            if (report.title === "Stock Report") return enabledReports.stock !== false;
            if (report.title === "Inward/Outward Report") return enabledReports.inwardOutward !== false;
            if (report.title === "Expiry Report") return enabledReports.expiry !== false;
            if (report.title === "Low Stock Report") return enabledReports.lowStock !== false;
            if (report.title === "Stock Valuation") return enabledReports.valuation !== false;
            if (report.title === "Audit Log") return enabledReports.audit !== false;
            return true;
          })
          .map((report) => (
            <div
              key={report.title}
              className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition"
            >
              <div className={`${report.color} text-white p-5`}>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{report.icon}</span>
                  <span className="text-lg font-semibold">{report.title}</span>
                </div>
              </div>
              <div className="p-5">
                <p className="text-gray-600 mb-5">{report.description}</p>
                {canGenerate ? (
                  <button
                    onClick={() => openReportModal(report.title)}
                    className={`w-full py-2.5 ${report.color} hover:opacity-90 text-white rounded-lg font-medium transition`}
                  >
                    Generate Report
                  </button>
                ) : (
                  <div className="text-center py-2.5 bg-gray-100 text-gray-500 rounded-lg font-medium">
                    Cannot Generate (No Permission)
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>

      {/* MODAL */}
      {showModal && currentReportType && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleReportSubmit} className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900" id="reportTypeDisplay">
                  {currentReportType}
                </h2>
                <button
                  type="button"
                  onClick={closeReportModal}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  &times;
                </button>
              </div>

              <div id="reportFormContainer" className="space-y-4">
                {REPORT_FORM_CONFIG[currentReportType]?.() || (
                  <p className="text-red-500">Form configuration not found</p>
                )}
              </div>

              <div className="flex justify-end gap-3 pt-6 border-t mt-6">
                <button
                  type="button"
                  onClick={closeReportModal}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition"
                >
                  Generate Report
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}