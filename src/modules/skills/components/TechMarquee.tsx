const techItems = [
  "NEXT.JS",
  "REACT",
  "TYPESCRIPT",
  "NODE.JS",
  "CONVEX",
  "TAILWIND",
  "THREE.JS",
  "POSTGRESQL",
  "DOCKER",
  "REDIS",
  "AI AGENTS",
  "ZOD"
];

const concepts = [
  "CLEAN ARCHITECTURE",
  "SOLID",
  "DESIGN SYSTEMS",
  "TYPE-SAFETY",
  "CI/CD PIPELINES",
  "DEVOPSEC",
  "PERFORMANCE",
  "ACCESSIBILITY",
  "UX/UI DESIGN",
  "SCALABILITY",
  "OPTIMIZATION"
];

interface MarqueeRowProps {
  items: string[];
  direction?: "left" | "right";
}

function MarqueeRow({ items, direction = "left" }: MarqueeRowProps) {
  // Duplicate items 4 times to fill the width of any screen and scroll seamlessly
  const duplicatedItems = [...items, ...items, ...items, ...items];

  return (
    <div className="relative overflow-hidden py-4 w-full">
      <div
        className={`flex gap-8 ${direction === "left" ? "animate-marquee-left" : "animate-marquee-right"}`}
        style={{ width: "fit-content" }}
      >
        {duplicatedItems.map((item, index) => (
          <span
            key={index}
            className="font-sans text-5xl md:text-7xl lg:text-8xl font-light tracking-tight whitespace-nowrap cursor-default select-none transition-all duration-300 ease-out [webkit-text-stroke:1px_rgba(255,255,255,0.2)] text-transparent hover:text-white/95 hover:[webkit-text-stroke:transparent]"
          >
            {item}
            <span className="mx-8 text-white/20 select-none">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

interface TechMarqueeProps {
  dict: {
    sectionTitle: string;
  };
}

export function TechMarquee({ dict }: TechMarqueeProps) {
  return (
    <section className="relative py-20 overflow-hidden w-full">
      {/* Section Header */}
      <div className="mb-12 text-left">
        <span className="text-xs font-semibold tracking-widest text-primary-400/80 uppercase mb-4 block">
          {dict.sectionTitle}
        </span>
      </div>

      {/* Marquee Rows */}
      <div className="space-y-2 w-full">
        <MarqueeRow items={techItems} direction="left" />
        <MarqueeRow items={concepts} direction="right" />
      </div>
    </section>
  );
}
