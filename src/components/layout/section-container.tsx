import { cn } from "@/lib/utils";

interface SectionContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  as?: React.ElementType;
}

export function SectionContainer({
  children,
  className,
  as = "section",
  ...props
}: SectionContainerProps) {
  const Comp = as as React.ElementType;

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
