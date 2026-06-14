"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./Button";
import { X } from "lucide-react";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDanger?: boolean;
}

export function ConfirmationModal({
  isOpen,
  title,
  message,
  confirmLabel = "Confirmar",
  cancelLabel = "Cancelar",
  onConfirm,
  onCancel,
  isDanger = false,
}: ConfirmationModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-99999 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onCancel}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: "spring", stiffness: 350, damping: 25 }}
            className="relative w-full max-w-md bg-surface-l1/95 border border-white/8 backdrop-blur-xl p-6 rounded-2xl shadow-2xl z-10 flex flex-col gap-4 overflow-hidden"
          >
            {/* Top Close Button */}
            <button
              onClick={onCancel}
              className="absolute top-4 right-4 p-1 rounded-full text-white/40 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              aria-label="Fechar modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight pr-6">
                {title}
              </h3>
            </div>

            {/* Message */}
            <p className="text-sm text-white/55 leading-relaxed">
              {message}
            </p>

            {/* Footer buttons */}
            <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-white/5">
              <Button
                type="button"
                variant="ghost"
                onClick={onCancel}
                className="cursor-pointer"
              >
                {cancelLabel}
              </Button>
              <Button
                type="button"
                variant={isDanger ? "destructive" : "default"}
                onClick={onConfirm}
                className="cursor-pointer"
              >
                {confirmLabel}
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
