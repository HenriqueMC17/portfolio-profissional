"use client";

import { ReactNode } from "react";

export default function Template({ children }: { children: ReactNode }) {
  return (
    <div className="w-full flex-1 flex flex-col animate-page-enter">
      {children}
    </div>
  );
}
