import { createContext, useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ===============================
  // USER AUTH STATE
  // ===============================
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // ===============================
  // 🔴 USER RULES (GLOBAL PERMISSIONS)
  // ===============================
  const [userRules, setUserRules] = useState({});
  const [loading, setLoading] = useState(true);

  // ===============================
  // AUTH METHODS
  // ===============================
  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("currentUser", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentUserId");
  };

  // ===============================
  // 🔴 REAL-TIME FIRESTORE SYNC
  // ===============================
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "settings", "userRules"),
      (snap) => {
        if (snap.exists()) {
          const data = snap.data().roles || {};
          setUserRules(data);
          // Store in localStorage for Sidebar access
          localStorage.setItem('userRules', JSON.stringify(data));
          console.log("✅ AppContext → UserRules loaded", data);
        }
        setLoading(false);
      },
      (error) => {
        console.error("❌ Failed to load userRules:", error);
        setLoading(false);
      }
    );

    return () => unsub();
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        userRules,   // 🔑 VERY IMPORTANT
        login,
        logout,
        loading
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used inside AppProvider");
  }
  return ctx;
}