import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";


export default function Layout() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Fixed Header at top */}
      <div className="fixed top-0 left-0 right-0 z-20">
        <Header />
      </div>

      {/* Main content area - uses flex to fill available space */}
      <div className="flex flex-1 pt-[88px] pb-10 min-h-0">
        {/* Sidebar */}
        <Sidebar />

        {/* Scrollable content area */}
        <div className="flex-1 lg:ml-64 overflow-y-auto p-4 md:p-6">
          <Outlet />
        </div>
      </div>

      {/* Fixed Footer at bottom */}
      <footer className="fixed bottom-0 left-0 right-0 h-10 bg-slate-800 text-gray-300 text-xs z-10 border-t border-slate-700">
        <div className="h-full flex items-center justify-center px-2 overflow-hidden">

          <div className="flex items-center gap-3 flex-nowrap justify-center whitespace-nowrap px-2">
            <span className="font-medium">© {new Date().getFullYear()} WarehouseHub</span>

            {/* Divider - shows only on larger screens */}
            <span className="hidden sm:inline text-slate-500">|</span>

            <button
              onClick={() => navigate("/privacy-policy")}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>

            <button
              onClick={() => navigate("/terms")}
              className="hover:text-white transition-colors"
            >
              Terms
            </button>

            <button
              onClick={() => navigate("/support")}
              className="hover:text-white transition-colors"
            >
              Support
            </button>

          </div>

        </div>
      </footer>
    </div>
  );
}