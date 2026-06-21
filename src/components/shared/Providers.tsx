"use client";

import { ReactNode, useEffect, useState } from "react";
import Lenis from "lenis";
import { ConvexReactClient } from "convex/react";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import dynamic from "next/dynamic";

// Dynamic import with ssr: false is safe here since Providers is a Client Component
const AiAssistant = dynamic(
  () => import("@/modules/ai-chatbot/components/AiAssistant").then((mod) => mod.AiAssistant),
  { ssr: false }
);

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
    <ConvexAuthProvider client={convexClient}>
      {children}
      <AiAssistant />
    </ConvexAuthProvider>
  );
}

