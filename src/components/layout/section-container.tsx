import { cn } from "@/lib/utils";
import React from "react";

interface SectionContainerProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "main" | "header" | "footer";
}

export function SectionContainer({
  children,
  className,
  as: Comp = "section",
  ...props
}: SectionContainerProps) {
  return (
    <Comp
      className={cn(
        "relative mx-auto max-w-[1280px] px-5 md:px-8 py-24 md:py-32",
        className
      )}
      {...props}
    >
      {children}
    </Comp>
  );
}
