import { NavLink, useNavigate } from "react-router-dom";
import {
  FiPackage,
  FiHome,
  FiDownload,
  FiUpload,
  FiAlertTriangle,
  FiCalendar,
  FiPieChart,
  FiClipboard,
  FiActivity,
  FiUsers,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import { useApp } from "../context/AppContext";

function NavItem({ to, children, icon, iconColor }) {
  const Icon = icon;

  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 hover:bg-slate-800 hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95 ${
          isActive 
            ? "bg-slate-800 text-white shadow-md scale-[1.02] -translate-y-0.5" 
            : "text-slate-300"
        }`
      }
    >
      <Icon 
        className={`w-5 h-5 transition-all duration-300 group-hover:scale-110 ${iconColor}`} 
      />
      <span className="transition-all duration-300 group-hover:tracking-wide">
        {children}
      </span>
    </NavLink>
  );
}

export default function Sidebar() {
  const navigate = useNavigate();
  
  // 🔴 MODIFIED: Get userRules from context
  const { user, userRules } = useApp();

  const role = user?.role;
  
  // 🔴 MODIFIED: Get rules for current role
  const roleRules = userRules?.[role] || {};
  
  // 🔴 ADDED: Extract permissions
  const canGenerateReports = roleRules.allowReportGeneration === true;
  const canViewReports = roleRules.allowReportViewing === true;

  // 🔴 ADDED: FINAL SIDEBAR RULE (EXACT as per requirement)
  const canSeeReports =
    role === "Staff"
      ? canGenerateReports               // Staff → ONLY if generate ON
      : (canGenerateReports || canViewReports); // Admin / Manager / Viewer
  
  // Admin section (unchanged - for other admin-only menu items)
  const isAdmin = role === "Admin" || role === "Manager";

  // 🔴 ADDED: Debug logs (optional - remove in production)
  console.log("SIDEBAR → ROLE:", role);
  console.log("SIDEBAR → RULES:", roleRules);
  console.log("SIDEBAR → canGenerate:", canGenerateReports);
  console.log("SIDEBAR → canView:", canViewReports);
  console.log("SIDEBAR → canSeeReports:", canSeeReports);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    localStorage.removeItem('currentUser'); // 🔴 Clean up
    localStorage.removeItem('userRules');   // 🔴 Clean up rules
    navigate('/login');
  };

  return (
    <aside
      className="
        fixed
        top-[88px] bottom-10
        left-0
        w-64
        bg-slate-900 text-white
        transform
        -translate-x-full lg:translate-x-0
        transition-transform duration-300
        z-40
        border-r border-slate-800
        hidden lg:block
      "
    >
      <div className="h-full flex flex-col">
        <nav className="space-y-2 p-4 overflow-y-auto flex-1">
          {/* ========== OPERATIONS SECTION ========== */}
          <NavItem to="/products" icon={FiPackage} iconColor="text-blue-400 group-hover:text-blue-300 transition-colors">
            Products
          </NavItem>
          <NavItem to="/warehouses" icon={FiHome} iconColor="text-purple-400 group-hover:text-purple-300 transition-colors">
            Warehouses
          </NavItem>
          <NavItem to="/stock-in" icon={FiDownload} iconColor="text-green-400 group-hover:text-green-300 transition-colors">
            Stock In
          </NavItem>
          <NavItem to="/stock-out" icon={FiUpload} iconColor="text-orange-400 group-hover:text-orange-300 transition-colors">
            Stock Out
          </NavItem>
          
          {/* ========== ALERTS SECTION ========== */}
          <NavItem to="/low-stock" icon={FiAlertTriangle} iconColor="text-yellow-400 group-hover:text-yellow-300 transition-colors">
            Low Stock
          </NavItem>
          <NavItem to="/expiry-alerts" icon={FiCalendar} iconColor="text-red-400 group-hover:text-red-300 transition-colors">
            Expiry Alerts
          </NavItem>
          
          {/* ========== ANALYTICS & ORDERS SECTION ========== */}
          {/* 🔴 MODIFIED: Conditional rendering based on FINAL RULE */}
          {canSeeReports && (
            <NavItem to="/reports" icon={FiPieChart} iconColor="text-teal-400 group-hover:text-teal-300 transition-colors">
              Reports
            </NavItem>
          )}
          <NavItem to="/orders" icon={FiClipboard} iconColor="text-indigo-400 group-hover:text-indigo-300 transition-colors">
            Order Management
          </NavItem>
          
          {/* ========== ADMIN SECTION ========== */}
          {isAdmin && (
            <>
              <NavItem to="/auditlogs" icon={FiActivity} iconColor="text-cyan-400 group-hover:text-cyan-300 transition-colors">
                Audit Logs
              </NavItem>
              <NavItem to="/users" icon={FiUsers} iconColor="text-pink-400 group-hover:text-pink-300 transition-colors">
                Users
              </NavItem>
              <NavItem to="/settings" icon={FiSettings} iconColor="text-gray-400 group-hover:text-gray-300 transition-colors">
                Settings
              </NavItem>
            </>
          )}
        </nav>
        
        {/* Logout button with hover animation */}
        <div className="p-4 border-t border-slate-800 shrink-0">
          <button
            onClick={handleLogout}
            className="group flex items-center justify-center gap-2 w-full px-4 py-2 
                      bg-red-600 hover:bg-red-700 
                      transition-all duration-300 
                      hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5
                      active:scale-95
                      text-white rounded-lg"
          >
            <FiLogOut className="w-4 h-4 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3" />
            <span className="text-sm transition-all duration-300 group-hover:tracking-wide">
              Logout
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
}