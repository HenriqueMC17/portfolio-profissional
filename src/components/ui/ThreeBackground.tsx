"use client";

import { SentientSphere } from "./SentientSphere";

export default function ThreeBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-45">
      <SentientSphere />
    </div>
  );
}