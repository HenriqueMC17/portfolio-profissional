"use client";

import { ReactNode, useEffect, useState } from "react";
import Lenis from "lenis";
import { ConvexReactClient } from "convex/react";
import { ConvexProvider } from "convex/react";

export function Providers({ children }: { children: ReactNode }) {
  const [convexClient] = useState(() => new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!));

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      wheelMultiplier: 1,
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <ConvexProvider client={convexClient}>
      {children}
    </ConvexProvider>
  );
}
