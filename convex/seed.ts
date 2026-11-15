import { mutation } from "./_generated/server";

export const seedProjects = mutation({
  handler: async (ctx) => {
    // Verificar se já existem projetos
    const existingProjects = await ctx.db.query("projects").collect();
    if (existingProjects.length > 0) {
      return "Database already seeded.";
    }

    const initialProjects = [
      {
        title: "Safe Finance • Ecossistema Financeiro",
        description: "Ecossistema financeiro modular em monorepo Turborepo + PNPM, com Clean Architecture, banco reativo Convex e processamento de >100 transações simultâneas.",
        content: "Arquitetura FSD com 18 módulos independentes, suporte offline (PWA), módulo ESG com cálculo de pegada de carbono e assistente financeiro integrado.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        githubUrl: "https://github.com/HenriqueMC17/Safe-Finance",
        liveUrl: "https://safe-finance.vercel.app",
        tags: ["Turborepo", "Next.js 16", "Clean Architecture", "Convex", "TypeScript", "Zod"],
        featured: true,
        createdAt: Date.now(),
      },
      {
        title: "EcoVolt • Inteligência Energética B2B",
        description: "Plataforma B2B para inteligência e gestão energética, com simulador ativo de ROI solar e integração meteorológica preditiva.",
        content: "Arquitetura cliente-servidor em camadas no Convex, integração com a Open-Meteo API para cálculo de irradiação solar e UI premium com Recharts e glassmorphism.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        githubUrl: "https://github.com/HenriqueMC17/EcoVolt",
        liveUrl: "https://ecovolt.vercel.app",
        tags: ["Next.js 16", "Convex", "Open-Meteo API", "TypeScript", "TailwindCSS v4", "Recharts"],
        featured: true,
        createdAt: Date.now() + 1000,
      },
      {
        title: "AutoMind AI • Agente Constitucional",
        description: "Agente autônomo com governança constitucional regido pelo framework @agente-core, aplicando raciocínio deliberativo e mitigação de alucinação.",
        content: "Desenvolvido para o Hackathon Fluxomind AutoStore com protocolos FLARE e COVE, garantindo rastreabilidade, type-safety e observabilidade agêntica de ponta a ponta.",
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
        githubUrl: "https://github.com/HenriqueMC17/automind-ai",
        tags: ["@agente-core", "LLMs", "Context Engineering", "COVE", "FLARE", "TypeScript"],
        featured: true,
        createdAt: Date.now() + 2000,
      }
    ];

    const seedPromises = initialProjects.map((project) => ctx.db.insert("projects", project));
    await Promise.all(seedPromises);

    return "Successfully seeded projects!";
  },
});
