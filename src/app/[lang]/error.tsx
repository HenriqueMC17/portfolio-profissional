"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { AlertTriangle, RefreshCcw } from "lucide-react";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application Error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center text-center max-w-md"
      >
        <div className="p-4 bg-red-500/10 rounded-full mb-6">
          <AlertTriangle className="w-12 h-12 text-red-500" />
        </div>
        
        <h1 className="text-3xl font-bold text-white mb-3">
          Algo deu errado.
        </h1>
        
        <p className="text-white/60 mb-8 leading-relaxed">
          Ocorreu um erro inesperado ao carregar esta página. Nossa equipe já foi notificada.
        </p>
        
        <button
          onClick={() => reset()}
          className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-white font-medium"
        >
          <RefreshCcw className="w-4 h-4" />
          Tentar Novamente
        </button>
      </motion.div>
    </main>
  );
}
