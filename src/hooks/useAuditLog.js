// src/hooks/useAuditLog.js

import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const useAuditLog = () => {
  const logAudit = async ({ user, action, module, description }) => {
    try {
      await addDoc(collection(db, "auditLogs"), {
        user: user?.email || user?.name || "Unknown",
        action,
        module,
        description,
        createdAt: serverTimestamp()
      });
    } catch (error) {
      console.error("❌ Failed to write audit log:", error);
    }
  };

  return { logAudit };
};
