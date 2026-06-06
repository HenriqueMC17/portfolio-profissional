"use client";

import dynamic from "next/dynamic";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), { ssr: false });

export function ThreeWrapper() {
  return <ThreeBackground />;
}