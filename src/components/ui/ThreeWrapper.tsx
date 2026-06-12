"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), { ssr: false });

export function ThreeWrapper() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // 1. Desativar completamente em telas mobile
    if (window.innerWidth < 768) {
      return;
    }

    // 2. Postergar a inicialização para evitar concorrência de CPU na carga crítica
    const timer = setTimeout(() => {
      if (typeof window.requestIdleCallback === "function") {
        window.requestIdleCallback(() => setShouldRender(true));
      } else {
        setShouldRender(true);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (!shouldRender) {
    return null;
  }

  return <ThreeBackground />;
}
