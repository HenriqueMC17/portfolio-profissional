"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2, AlertCircle, Info } from "lucide-react";
import { useEffect } from "react";

export interface Toast {
  id: string;
  message: string;
  type: "success" | "error" | "info";
}

interface ToastNotificationProps {
  toasts: Toast[];
  onDismiss: (id: string) => void;
}

export function ToastNotification({ toasts, onDismiss }: ToastNotificationProps) {
  return (
    <div className="fixed bottom-6 right-6 z-999999 flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem
            key={toast.id}
            toast={toast}
            onDismiss={() => onDismiss(toast.id)}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  useEffect(() => {
    const timer = setTimeout(onDismiss, 4000);
    return () => clearTimeout(timer);
  }, [onDismiss]);

  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />;
      case "error":
        return <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />;
      case "info":
        return <Info className="w-4 h-4 text-blue-400 shrink-0" />;
    }
  };

  const getBorderColor = () => {
    switch (toast.type) {
      case "success":
        return "border-emerald-500/20";
      case "error":
        return "border-red-500/20";
      case "info":
        return "border-blue-500/20";
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className={`pointer-events-auto flex items-start justify-between gap-3 p-4 bg-surface-l1/95 border ${getBorderColor()} backdrop-blur-xl rounded-xl shadow-2xl overflow-hidden`}
    >
      <div className="flex items-start gap-2.5">
        {getIcon()}
        <span className="text-sm font-medium text-white/90 leading-tight">
          {toast.message}
        </span>
      </div>

      <button
        onClick={onDismiss}
        className="p-0.5 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        aria-label="Disparar notificação"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </motion.div>
  );
}
