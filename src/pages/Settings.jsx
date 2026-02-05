import React, { useState, useEffect } from 'react';
import { doc, setDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
// ✅ ADDED IMPORTS
import { useApp } from "../context/AppContext";
import { useAuditLog } from "../hooks/useAuditLog";

const Settings = () => {
  // State management
  const [activeSection, setActiveSection] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedSection, setSavedSection] = useState(null);
  
  // ✅ ADDED: Context and Audit Log hooks
  const { user } = useApp();
  const { logAudit } = useAuditLog();
  
  // 🔴 ADDED: Role selection for user rules
  const [selectedRole, setSelectedRole] = useState("Admin");
  
  // 🔴 MODIFIED: Role-based user rules with report permissions
  const [userRules, setUserRules] = useState({
    Admin: {
      allowUserCreation: true,
      allowUserDeletion: true,
      allowReportGeneration: true,
      allowReportViewing: false,
    },
    Manager: {
      allowUserCreation: true,
      allowUserDeletion: false,
      allowReportGeneration: false,
      allowReportViewing: true,
    },
    Staff: {
      allowUserCreation: false,
      allowUserDeletion: false,
      allowReportGeneration: true,
      allowReportViewing: false,
    },
    Viewer: {
      allowUserCreation: false,
      allowUserDeletion: false,
      allowReportGeneration: false,
      allowReportViewing: true,
    }
  });
  
  // 🔴 ADDED: Report availability controls
  const [enabledReports, setEnabledReports] = useState({
    stock: true,
    inwardOutward: true,
    expiry: true,
    lowStock: true,
    valuation: true,
    audit: true,
  });
  
  // 🔴 ADDED: Load rules from Firestore
  useEffect(() => {
    const userRulesRef = doc(db, "settings", "userRules");
    const reportsRef = doc(db, "settings", "reports");
    
    const unsub1 = onSnapshot(userRulesRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.roles) {
          setUserRules(data.roles);
        }
      }
    }, (error) => {
      console.error("Error loading user rules:", error);
    });

    const unsub2 = onSnapshot(reportsRef, (snap) => {
      if (snap.exists()) {
        const data = snap.data();
        if (data.enabledReports) {
          setEnabledReports(data.enabledReports);
        }
      }
    }, (error) => {
      console.error("Error loading report settings:", error);
    });

    return () => {
      unsub1();
      unsub2();
    };
  }, []);
  
  const [inventoryToggles, setInventoryToggles] = useState({
    allowNegativeStock: false,
    enableBatchTracking: true,
    enableExpiryTracking: true,
    stockInApproval: false,
    stockOutApproval: true,
    autoGenerateSKU: true,
  });
  
  const [supplierToggles, setSupplierToggles] = useState({
    allowDuplicateNames: false,
    newSupplierApproval: true,
    requireTaxID: true,
  });
  
  const [auditToggles, setAuditToggles] = useState({
    enableAuditLogging: true,
    trackCreateActions: true,
    trackEditActions: true,
    trackDeleteActions: true,
    trackLoginAttempts: true,
    includeIPAddress: false,
  });
  
  const [notificationToggles, setNotificationToggles] = useState({
    lowStockAlerts: true,
    expiryWarnings: true,
    orderUpdates: true,
    supplierRequests: false,
    notifyAdmin: true,
    notifyManager: false,
    inAppNotifications: true,
    emailNotifications: true,
  });
  
  // Form values
  const [inventoryValues, setInventoryValues] = useState({
    lowStockThreshold: 10,
    reorderPoint: 25,
  });
  
  const [supplierValues, setSupplierValues] = useState({
    minOrderValue: 100,
  });
  
  const [notificationValues, setNotificationValues] = useState({
    expiryAlertDays: 7,
  });

  // ✅ MODIFIED: Save to Firestore with AUDIT LOGGING
  const handleSave = async (sectionId) => {
    setIsSaving(true);
    setSavedSection(sectionId);
    
    try {
      // 🔴 USER RULES SAVE
      if (sectionId === 'user') {
        await setDoc(doc(db, "settings", "userRules"), {
          roles: userRules,
          updatedAt: new Date()
        });
        console.log("User rules saved to Firestore:", userRules);
        
        // ✅ AUDIT LOG
        await logAudit({
          user,
          action: "UPDATE",
          module: "SETTINGS",
          description: `Updated user rules for role: ${selectedRole}`
        });
      }
      
      // 🔴 REPORT SETTINGS SAVE
      if (sectionId === 'report') {
        await setDoc(doc(db, "settings", "reports"), {
          enabledReports,
          updatedAt: new Date()
        });
        console.log("Report settings saved to Firestore:", enabledReports);
        
        // ✅ AUDIT LOG
        await logAudit({
          user,
          action: "UPDATE",
          module: "SETTINGS",
          description: "Updated report availability settings"
        });
      }
      
      // 🔴 INVENTORY SAVE
      if (sectionId === 'inventory') {
        // Save inventory settings to Firestore (you can add this if needed)
        // await setDoc(doc(db, "settings", "inventory"), { ... });
        
        // ✅ AUDIT LOG
        await logAudit({
          user,
          action: "UPDATE",
          module: "SETTINGS",
          description: "Updated inventory rules"
        });
      }
      
      // 🔴 SUPPLIER SAVE
      if (sectionId === 'supplier') {
        // Save supplier settings to Firestore (you can add this if needed)
        // await setDoc(doc(db, "settings", "supplier"), { ... });
        
        // ✅ AUDIT LOG
        await logAudit({
          user,
          action: "UPDATE",
          module: "SETTINGS",
          description: "Updated supplier rules"
        });
      }
      
      // 🔴 AUDIT SETTINGS SAVE
      if (sectionId === 'audit') {
        // Save audit settings to Firestore (you can add this if needed)
        // await setDoc(doc(db, "settings", "audit"), { ... });
        
        // ✅ AUDIT LOG
        await logAudit({
          user,
          action: "UPDATE",
          module: "SETTINGS",
          description: "Updated audit logging configuration"
        });
      }
      
      // 🔴 NOTIFICATION SAVE
      if (sectionId === 'notification') {
        // Save notification settings to Firestore (you can add this if needed)
        // await setDoc(doc(db, "settings", "notification"), { ... });
        
        // ✅ AUDIT LOG
        await logAudit({
          user,
          action: "UPDATE",
          module: "SETTINGS",
          description: "Updated notification preferences"
        });
      }
      
    } catch (error) {
      console.error("Error saving settings:", error);
      // Show error toast instead
      setTimeout(() => {
        setIsSaving(false);
        const toast = document.getElementById('toast-error');
        if (toast) {
          toast.classList.add('show');
          setTimeout(() => {
            toast.classList.remove('show');
          }, 3000);
        }
      }, 800);
      return;
    }
    
    // Success animation
    setTimeout(() => {
      setIsSaving(false);
      setShowToast(true);
      
      const toast = document.getElementById('toast');
      if (toast) {
        toast.classList.add('show');
        toast.classList.add('animate-bounce-in');
      }
      
      setTimeout(() => {
        setShowToast(false);
        const toast = document.getElementById('toast');
        if (toast) {
          toast.classList.remove('show', 'animate-bounce-in');
        }
      }, 3000);
    }, 800);
  };

  // Toggle section with smooth animation
  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  // 🔴 MODIFIED: Role-based toggle handler with HARD RULES
  const handleUserRuleToggle = (ruleKey) => {
    setUserRules(prev => {
      const current = prev[selectedRole];

      // STAFF HARD RULE - Never allow viewing reports
      if (selectedRole === "Staff" && ruleKey === "allowReportViewing") {
        return prev; // 🚫 never allow
      }

      // ADMIN & MANAGER MUTUAL EXCLUSION
      if (selectedRole === "Admin" || selectedRole === "Manager") {
        if (ruleKey === "allowReportGeneration") {
          return {
            ...prev,
            [selectedRole]: {
              ...current,
              allowReportGeneration: !current.allowReportGeneration,
              allowReportViewing: false   // 🔒 auto-disable
            }
          };
        }

        if (ruleKey === "allowReportViewing") {
          return {
            ...prev,
            [selectedRole]: {
              ...current,
              allowReportViewing: !current.allowReportViewing,
              allowReportGeneration: false // 🔒 auto-disable
            }
          };
        }
      }

      // DEFAULT BEHAVIOR for other rules
      return {
        ...prev,
        [selectedRole]: {
          ...current,
          [ruleKey]: !current[ruleKey]
        }
      };
    });
  };
  
  // Original toggle handler for other sections
  const handleToggle = (setter, key) => {
    setter(prev => ({ ...prev, [key]: !prev[key] }));
  };

  // 🔴 ADDED: Report toggle handler
  const handleReportToggle = (key) => {
    setEnabledReports(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Input change handler
  const handleInputChange = (setter, key, value) => {
    setter(prev => ({ ...prev, [key]: parseInt(value) || 0 }));
  };

  // Section definitions with animations
  const sections = [
    {
      id: 'user',
      title: 'User Rules',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
      color: 'from-blue-500 to-blue-600',
      content: (
        <div className="card animate-slide-up">
          {/* 🔴 ADDED: Role selection dropdown */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            
            <div className="flex items-center gap-3">
              <select
                className="input-field compact animate-pulse-on-focus w-full"
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="Admin">Admin</option>
                <option value="Manager">Manager</option>
                <option value="Staff">Staff</option>
                <option value="Viewer">Viewer</option>
              </select>
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                selectedRole === 'Admin' ? 'bg-purple-100 text-purple-800' :
                selectedRole === 'Manager' ? 'bg-blue-100 text-blue-800' :
                selectedRole === 'Staff' ? 'bg-green-100 text-green-800' :
                'bg-gray-100 text-gray-800'
              }`}>
                {selectedRole}
              </div>
            </div>
          </div>
          
          {/* 🔴 MODIFIED: Role-based toggles */}
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">User Management Permissions</h4>
              <div className="space-y-2">
                <CompactToggleRow 
                  label="Allow User Creation" 
                  checked={userRules[selectedRole]?.allowUserCreation || false}
                  onChange={() => handleUserRuleToggle('allowUserCreation')}
                />
                <CompactToggleRow 
                  label="Allow User Deletion" 
                  checked={userRules[selectedRole]?.allowUserDeletion || false}
                  onChange={() => handleUserRuleToggle('allowUserDeletion')}
                />
              </div>
            </div>
            
            {/* 🔴 ADDED: Reports Permissions */}
            <div className="p-3 bg-gray-50 rounded-lg">
              <h4 className="text-sm font-semibold text-gray-700 mb-2">
                Reports Permissions
              </h4>
              <div className="space-y-2">
                <CompactToggleRow 
                  label="Allow Report Generation"
                  checked={userRules[selectedRole]?.allowReportGeneration || false}
                  onChange={() => handleUserRuleToggle('allowReportGeneration')}
                />
                <CompactToggleRow 
                  label="Allow Report Viewing"
                  checked={userRules[selectedRole]?.allowReportViewing || false}
                  onChange={() => handleUserRuleToggle('allowReportViewing')}
                  disabled={selectedRole === "Staff"}   // 🔴 LOCK for Staff
                />
              </div>
            

              {selectedRole === "Staff" && (
                <p className="text-xs text-red-500 mt-2">
                  🚫 Staff are not allowed to view reports
                </p>
              )}
            </div>
            
          </div>
          
          <button 
            className={`save-btn compact ${isSaving && savedSection === 'user' ? 'saving' : ''} mt-4`} 
            onClick={() => handleSave('user')}
            disabled={isSaving}
          >
            {isSaving && savedSection === 'user' ? (
              <>
                <span className="saving-spinner"></span>
                Saving...
              </>
            ) : (
              <>
                <span className="save-icon">✓</span>
                Save User Rules
              </>
            )}
          </button>
        </div>
      )
    },
    {
      id: 'inventory',
      title: 'Inventory Rules',
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
      color: 'from-green-500 to-emerald-600',
      content: (
        <div className="card animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Low Stock Threshold</label>
              <input 
                type="number" 
                value={inventoryValues.lowStockThreshold}
                onChange={(e) => handleInputChange(setInventoryValues, 'lowStockThreshold', e.target.value)}
                className="input-field compact animate-pulse-on-focus"
              />
            </div>
            <div>
              <label className="label">Reorder Point</label>
              <input 
                type="number" 
                value={inventoryValues.reorderPoint}
                onChange={(e) => handleInputChange(setInventoryValues, 'reorderPoint', e.target.value)}
                className="input-field compact animate-pulse-on-focus"
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <CompactToggleRow 
                label="Allow Negative Stock" 
                checked={inventoryToggles.allowNegativeStock}
                onChange={() => handleToggle(setInventoryToggles, 'allowNegativeStock')}
              />
              <CompactToggleRow 
                label="Batch Tracking" 
                checked={inventoryToggles.enableBatchTracking}
                onChange={() => handleToggle(setInventoryToggles, 'enableBatchTracking')}
              />
              <CompactToggleRow 
                label="Expiry Tracking" 
                checked={inventoryToggles.enableExpiryTracking}
                onChange={() => handleToggle(setInventoryToggles, 'enableExpiryTracking')}
              />
            </div>
            <div className="space-y-2">
              <CompactToggleRow 
                label="Stock-in Approval" 
                checked={inventoryToggles.stockInApproval}
                onChange={() => handleToggle(setInventoryToggles, 'stockInApproval')}
              />
              <CompactToggleRow 
                label="Stock-out Approval" 
                checked={inventoryToggles.stockOutApproval}
                onChange={() => handleToggle(setInventoryToggles, 'stockOutApproval')}
              />
              <CompactToggleRow 
                label="Auto-generate SKU" 
                checked={inventoryToggles.autoGenerateSKU}
                onChange={() => handleToggle(setInventoryToggles, 'autoGenerateSKU')}
              />
            </div>
          </div>
          <button 
            className={`save-btn compact ${isSaving && savedSection === 'inventory' ? 'saving' : ''}`} 
            onClick={() => handleSave('inventory')}
            disabled={isSaving}
          >
            {isSaving && savedSection === 'inventory' ? (
              <>
                <span className="saving-spinner"></span>
                Saving...
              </>
            ) : (
              <>
                <span className="save-icon">✓</span>
                Save
              </>
            )}
          </button>
        </div>
      )
    },
    {
      id: 'supplier',
      title: 'Supplier Rules',
      icon: 'M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4',
      color: 'from-purple-500 to-purple-600',
      content: (
        <div className="card animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Payment Terms</label>
              <select className="input-field compact animate-pulse-on-focus">
                <option>Cash on Delivery</option>
                <option>Net 15 Days</option>
                <option>Net 30 Days</option>
                <option>Net 45 Days</option>
                <option>Net 60 Days</option>
              </select>
            </div>
            <div>
              <label className="label">Min Order Value</label>
              <input 
                type="number" 
                value={supplierValues.minOrderValue}
                onChange={(e) => handleInputChange(setSupplierValues, 'minOrderValue', e.target.value)}
                className="input-field compact animate-pulse-on-focus"
                placeholder="Enter amount"
              />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <CompactToggleRow 
              label="Allow Duplicate Names" 
              checked={supplierToggles.allowDuplicateNames}
              onChange={() => handleToggle(setSupplierToggles, 'allowDuplicateNames')}
            />
            <CompactToggleRow 
              label="New Supplier Approval" 
              checked={supplierToggles.newSupplierApproval}
              onChange={() => handleToggle(setSupplierToggles, 'newSupplierApproval')}
            />
            <CompactToggleRow 
              label="Require Tax ID" 
              checked={supplierToggles.requireTaxID}
              onChange={() => handleToggle(setSupplierToggles, 'requireTaxID')}
            />
          </div>
          <button 
            className={`save-btn compact ${isSaving && savedSection === 'supplier' ? 'saving' : ''}`} 
            onClick={() => handleSave('supplier')}
            disabled={isSaving}
          >
            {isSaving && savedSection === 'supplier' ? (
              <>
                <span className="saving-spinner"></span>
                Saving...
              </>
            ) : (
              <>
                <span className="save-icon">✓</span>
                Save
              </>
            )}
          </button>
        </div>
      )
    },
    {
      id: 'audit',
      title: 'Audit Logs',
      icon: 'M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
      color: 'from-orange-500 to-orange-600',
      content: (
        <div className="card animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Log Retention Period</label>
              <select className="input-field compact animate-pulse-on-focus">
                <option>30 Days</option>
                <option>90 Days</option>
                <option>180 Days</option>
                <option>365 Days</option>
                <option>Indefinite</option>
              </select>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <CompactToggleRow 
                label="Enable Logging" 
                checked={auditToggles.enableAuditLogging}
                onChange={() => handleToggle(setAuditToggles, 'enableAuditLogging')}
              />
              <CompactToggleRow 
                label="Track Create" 
                checked={auditToggles.trackCreateActions}
                onChange={() => handleToggle(setAuditToggles, 'trackCreateActions')}
              />
              <CompactToggleRow 
                label="Track Edit" 
                checked={auditToggles.trackEditActions}
                onChange={() => handleToggle(setAuditToggles, 'trackEditActions')}
              />
            </div>
            <div className="space-y-2">
              <CompactToggleRow 
                label="Track Delete" 
                checked={auditToggles.trackDeleteActions}
                onChange={() => handleToggle(setAuditToggles, 'trackDeleteActions')}
              />
              <CompactToggleRow 
                label="Track Login" 
                checked={auditToggles.trackLoginAttempts}
                onChange={() => handleToggle(setAuditToggles, 'trackLoginAttempts')}
              />
              <CompactToggleRow 
                label="Include IP" 
                checked={auditToggles.includeIPAddress}
                onChange={() => handleToggle(setAuditToggles, 'includeIPAddress')}
              />
            </div>
          </div>
          <button 
            className={`save-btn compact ${isSaving && savedSection === 'audit' ? 'saving' : ''}`} 
            onClick={() => handleSave('audit')}
            disabled={isSaving}
          >
            {isSaving && savedSection === 'audit' ? (
              <>
                <span className="saving-spinner"></span>
                Saving...
              </>
            ) : (
              <>
                <span className="save-icon">✓</span>
                Save
              </>
            )}
          </button>
        </div>
      )
    },
    {
      id: 'notification',
      title: 'Notifications',
      icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9',
      color: 'from-pink-500 to-pink-600',
      content: (
        <div className="card animate-slide-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Expiry Alert Days</label>
              <input 
                type="number" 
                value={notificationValues.expiryAlertDays}
                onChange={(e) => handleInputChange(setNotificationValues, 'expiryAlertDays', e.target.value)}
                className="input-field compact animate-pulse-on-focus"
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <CompactToggleRow 
                label="Low Stock Alerts" 
                checked={notificationToggles.lowStockAlerts}
                onChange={() => handleToggle(setNotificationToggles, 'lowStockAlerts')}
              />
              <CompactToggleRow 
                label="Expiry Warnings" 
                checked={notificationToggles.expiryWarnings}
                onChange={() => handleToggle(setNotificationToggles, 'expiryWarnings')}
              />
              <CompactToggleRow 
                label="Order Updates" 
                checked={notificationToggles.orderUpdates}
                onChange={() => handleToggle(setNotificationToggles, 'orderUpdates')}
              />
              <CompactToggleRow 
                label="Supplier Requests" 
                checked={notificationToggles.supplierRequests}
                onChange={() => handleToggle(setNotificationToggles, 'supplierRequests')}
              />
            </div>
            <div className="space-y-2">
              <CompactToggleRow 
                label="Notify Admin" 
                checked={notificationToggles.notifyAdmin}
                onChange={() => handleToggle(setNotificationToggles, 'notifyAdmin')}
              />
              <CompactToggleRow 
                label="Notify Manager" 
                checked={notificationToggles.notifyManager}
                onChange={() => handleToggle(setNotificationToggles, 'notifyManager')}
              />
              <CompactToggleRow 
                label="In-App" 
                checked={notificationToggles.inAppNotifications}
                onChange={() => handleToggle(setNotificationToggles, 'inAppNotifications')}
              />
              <CompactToggleRow 
                label="Email" 
                checked={notificationToggles.emailNotifications}
                onChange={() => handleToggle(setNotificationToggles, 'emailNotifications')}
              />
            </div>
          </div>
          <button 
            className={`save-btn compact ${isSaving && savedSection === 'notification' ? 'saving' : ''}`} 
            onClick={() => handleSave('notification')}
            disabled={isSaving}
          >
            {isSaving && savedSection === 'notification' ? (
              <>
                <span className="saving-spinner"></span>
                Saving...
              </>
            ) : (
              <>
                <span className="save-icon">✓</span>
                Save
              </>
            )}
          </button>
        </div>
      )
    },
    {
      id: 'report',
      title: 'Reports',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
      color: 'from-indigo-500 to-indigo-600',
      content: (
        <div className="card animate-slide-up">
          {/* 🔴 ADDED: Report Availability Controls */}
          <div className="mb-4">
            <h3 className="text-lg font-bold text-gray-800 mb-2">Report Availability Controls</h3>
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 mb-4">
              <h4 className="text-sm font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <span className="text-lg">📊</span>
                Enable Reports
              </h4>
              <div className="space-y-2">
                <CompactToggleRow 
                  label="Stock Report"
                  checked={enabledReports.stock}
                  onChange={() => handleReportToggle('stock')}
                />
                <CompactToggleRow 
                  label="Inward / Outward Report"
                  checked={enabledReports.inwardOutward}
                  onChange={() => handleReportToggle('inwardOutward')}
                />
                <CompactToggleRow 
                  label="Expiry Report"
                  checked={enabledReports.expiry}
                  onChange={() => handleReportToggle('expiry')}
                />
                <CompactToggleRow 
                  label="Low Stock Report"
                  checked={enabledReports.lowStock}
                  onChange={() => handleReportToggle('lowStock')}
                />
                <CompactToggleRow 
                  label="Stock Valuation"
                  checked={enabledReports.valuation}
                  onChange={() => handleReportToggle('valuation')}
                />
                <CompactToggleRow 
                  label="Audit Log Report"
                  checked={enabledReports.audit}
                  onChange={() => handleReportToggle('audit')}
                />
              </div>
            </div>
          </div>

          <button 
            className={`save-btn compact ${isSaving && savedSection === 'report' ? 'saving' : ''} mt-6`} 
            onClick={() => handleSave('report')}
            disabled={isSaving}
          >
            {isSaving && savedSection === 'report' ? (
              <>
                <span className="saving-spinner"></span>
                Saving...
              </>
            ) : (
              <>
                <span className="save-icon">✓</span>
                Save Report Settings
              </>
            )}
          </button>
        </div>
      )
    }
  ];

  return (
    <div className="w-full h-full p-4 md:p-6 overflow-auto animate-fade-in">
      {/* Header with floating animation */}
      <header className="mb-6 transform transition-all duration-500 hover:scale-105">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-1 animate-gradient">
          Settings
        </h1>
        <p className="text-sm text-slate-500 transition-all duration-300 hover:text-slate-700">
          Warehouse Configuration - Click to expand sections
        </p>
      </header>

      {/* Accordion Sections with floating effect */}
      <div className="accordion-container space-y-3">
        {sections.map((section) => (
          <div 
            key={section.id}
            className={`accordion-item ${activeSection === section.id ? 'active' : ''} transform transition-all duration-300 hover:scale-[1.02]`}
          >
            <div 
              className="accordion-header hover:shadow-md transition-all duration-300"
              onClick={() => toggleSection(section.id)}
            >
              <div className="accordion-header-left">
                <div className={`section-icon ${section.color} bg-gradient-to-br text-white p-2 rounded-lg transition-transform duration-300 hover:scale-110`}>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={section.icon} />
                  </svg>
                </div>
                <span className="font-semibold">{section.title}</span>
              </div>
              <svg 
                className={`w-5 h-5 accordion-chevron transition-all duration-500 ease-out transform ${
                  activeSection === section.id ? 'rotate-180 scale-110' : ''
                }`}
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div 
              className={`accordion-content transition-all duration-500 ease-in-out overflow-hidden ${
                activeSection === section.id ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="accordion-body">
                {section.content}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Animated Toast Notification */}
      <div id="toast" className={`toast ${showToast ? 'show' : ''}`}>
        <div className="flex items-center gap-3 animate-pulse-once">
          <svg className="w-5 h-5 animate-checkmark" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <span className="text-sm">Settings saved successfully!</span>
        </div>
      </div>
      
      {/* 🔴 ADDED: Error Toast */}
      <div id="toast-error" className="toast-error">
        <div className="flex items-center gap-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm">Error saving settings</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes bounceIn {
          0% { transform: translateY(100px) scale(0.3); opacity: 0; }
          50% { transform: translateY(-10px) scale(1.05); opacity: 1; }
          70% { transform: translateY(0) scale(0.95); }
          100% { transform: translateY(0) scale(1); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        
        @keyframes pulseOnce {
          0% { transform: scale(1); }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); }
        }
        
        @keyframes checkmark {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        
        @keyframes ripple {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
          100% { box-shadow: 0 0 0 6px rgba(59, 130, 246, 0); }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        
        .animate-slide-up {
          animation: slideUp 0.4s ease-out;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        .animate-bounce-in {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
        
        .animate-pulse-on-focus:focus {
          animation: pulse 2s infinite;
        }
        
        .animate-pulse-once {
          animation: pulseOnce 0.5s ease;
        }
        
        .animate-checkmark {
          animation: checkmark 0.5s ease;
        }

        .accordion-item {
          background: white;
          border-radius: 10px;
          margin-bottom: 8px;
          border: 1px solid #e2e8f0;
          overflow: hidden;
          transition: all 0.3s ease;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
        }
        
        .accordion-item:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
          border-color: #cbd5e1;
        }

        .accordion-header {
          padding: 12px 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-weight: 500;
          color: #334155;
          transition: all 0.2s ease;
          background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
          position: relative;
          overflow: hidden;
        }
        
        .accordion-header::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s ease;
        }
        
        .accordion-header:hover::before {
          transform: translateX(100%);
        }

        .accordion-header:hover {
          background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
          transform: translateY(-2px);
        }

        .accordion-item.active .accordion-header {
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.2);
        }

        .accordion-header-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .accordion-body {
          padding: 16px;
          border-top: 1px solid #e2e8f0;
          background: linear-gradient(to bottom, #ffffff, #fafcff);
        }

        .card {
          background: white;
          border-radius: 8px;
          padding: 16px;
          border: 1px solid #f1f5f9;
          transition: all 0.3s ease;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.03);
        }
        
        .card:hover {
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.05);
          transform: translateY(-2px);
        }
        
        .label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          color: #475569;
          margin-bottom: 4px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          transition: all 0.2s ease;
        }
        
        .label:hover {
          color: #3b82f6;
          transform: translateX(2px);
        }
        
        .input-field.compact {
          width: 100%;
          padding: 6px 10px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 0.8125rem;
          background: linear-gradient(to right, #f8fafc, #ffffff);
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        
        .input-field.compact:focus {
          outline: none;
          border-color: #3b82f6;
          background: white;
          box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15), 0 2px 6px rgba(59, 130, 246, 0.1);
          transform: translateY(-1px);
        }
        
        .save-btn.compact {
          margin-top: 16px;
          padding: 8px 20px;
          background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
          color: white;
          border: none;
          border-radius: 6px;
          font-weight: 500;
          font-size: 0.8125rem;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 4px 8px rgba(59, 130, 246, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          min-width: 80px;
          position: relative;
          overflow: hidden;
        }
        
        .save-btn.compact::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.2);
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }
        
        .save-btn.compact:hover::before {
          width: 200px;
          height: 200px;
        }
        
        .save-btn.compact:hover {
          transform: translateY(-2px) scale(1.05);
          box-shadow: 0 6px 12px rgba(59, 130, 246, 0.35);
        }
        
        .save-btn.compact:active {
          transform: translateY(0);
        }
        
        .save-btn.compact:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
        }
        
        .save-btn.compact.saving {
          background: linear-gradient(135deg, #64748b 0%, #475569 100%);
        }
        
        .saving-spinner {
          width: 14px;
          height: 14px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }
        
        .save-icon {
          display: inline-block;
          transition: transform 0.3s ease;
        }
        
        .save-btn.compact:hover .save-icon {
          transform: scale(1.2) rotate(360deg);
        }
        
        .toast {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 10px 16px;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          color: white;
          border-radius: 8px;
          font-weight: 500;
          box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
          transform: translateY(100px) scale(0.9);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }
        
        .toast.show {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        
        /* 🔴 ADDED: Error toast */
        .toast-error {
          position: fixed;
          bottom: 20px;
          right: 20px;
          padding: 10px 16px;
          background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
          color: white;
          border-radius: 8px;
          font-weight: 500;
          box-shadow: 0 8px 20px rgba(239, 68, 68, 0.3);
          transform: translateY(100px) scale(0.9);
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
          display: flex;
          align-items: center;
          gap: 8px;
          z-index: 1000;
          backdrop-filter: blur(10px);
        }
        
        .toast-error.show {
          transform: translateY(0) scale(1);
          opacity: 1;
        }
        
        .section-icon {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
        }
        
        .section-icon:hover {
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
};

// 🔴 MODIFIED: Compact ToggleRow Component with disabled prop
const CompactToggleRow = ({ label, checked, onChange, disabled = false }) => {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (disabled) return;
    setIsAnimating(true);
    onChange();
    setTimeout(() => setIsAnimating(false), 300);
  };

  return (
    <div className="compact-toggle-row group">
      <span className="compact-toggle-label group-hover:text-blue-600 transition-all duration-300">{label}</span>
      <div 
        className={`compact-toggle-switch 
          ${checked ? 'active' : ''} 
          ${isAnimating ? 'animating' : ''} 
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        `}
        onClick={handleClick}
        role="button"
        tabIndex={disabled ? -1 : 0}
        onKeyDown={(e) => !disabled && e.key === 'Enter' && handleClick()}
      >
        <style jsx>{`
          .compact-toggle-row {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 8px 0;
            border-bottom: 1px solid #f1f5f9;
            transition: all 0.3s ease;
          }
          
          .compact-toggle-row:hover {
            background: linear-gradient(to right, rgba(59, 130, 246, 0.05), transparent);
            padding-left: 8px;
            padding-right: 8px;
            margin-left: -8px;
            margin-right: -8px;
            border-radius: 6px;
            border-color: transparent;
          }
          
          .compact-toggle-row:last-of-type {
            border-bottom: none;
          }
          
          .compact-toggle-label {
            font-size: 0.8125rem;
            color: ${disabled ? '#94a3b8' : '#334155'};
            font-weight: 400;
            transition: all 0.3s ease;
          }
          
          .compact-toggle-switch {
            position: relative;
            width: 40px;
            height: 22px;
            background: linear-gradient(to right, #cbd5e1, #94a3b8);
            border-radius: 11px;
            cursor: ${disabled ? 'not-allowed' : 'pointer'};
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .compact-toggle-switch:hover {
            transform: ${disabled ? 'none' : 'scale(1.05)'};
            box-shadow: ${disabled ? 'inset 0 1px 3px rgba(0, 0, 0, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.15)'};
          }
          
          .compact-toggle-switch.active {
            background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
            box-shadow: 0 2px 10px rgba(59, 130, 246, 0.4);
            animation: ${disabled ? 'none' : 'ripple 0.6s ease'};
          }
          
          .compact-toggle-switch.animating {
            animation: ${disabled ? 'none' : 'pulse 0.3s ease'};
          }
          
          .compact-toggle-switch::after {
            content: '';
            position: absolute;
            top: 3px;
            left: 3px;
            width: 16px;
            height: 16px;
            background: white;
            border-radius: 50%;
            transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.2);
          }
          
          .compact-toggle-switch.active::after {
            left: 21px;
            transform: rotate(360deg);
          }
          
          .compact-toggle-switch::before {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 100%;
            height: 100%;
            background: inherit;
            border-radius: inherit;
            transform: translate(-50%, -50%) scale(1);
            transition: transform 0.3s ease;
          }
          
          .compact-toggle-switch:active::before {
            transform: ${disabled ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(1.1)'};
          }
          
          .compact-toggle-switch.cursor-not-allowed {
            cursor: not-allowed;
          }
        `}</style>
      </div>
    </div>
  );
};

export default Settings;