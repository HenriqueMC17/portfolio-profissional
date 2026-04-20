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
        title: "EcoVolt Enterprise System",
        description: "Uma plataforma escalável B2B para gestão energética, focada em resiliência e alta disponibilidade.",
        content: "Desenvolvido com Next.js, Node.js e Convex para sincronização em tempo real.",
        imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        githubUrl: "https://github.com/hmont/ecovolt",
        liveUrl: "https://ecovolt.com",
        tags: ["Next.js", "Convex", "TypeScript", "TailwindCSS"],
        featured: true,
        createdAt: Date.now(),
      },
      {
        title: "Safe Finance Dashboard",
        description: "Dashboard financeiro pessoal com foco em UI/UX premium, animações fluidas e observabilidade estrita.",
        content: "Sistema bancário moderno com gráficos interativos e rastreamento de transações em tempo real.",
        imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop",
        githubUrl: "https://github.com/hmont/safe-finance",
        tags: ["React 19", "Framer Motion", "PostgreSQL", "Zod"],
        featured: true,
        createdAt: Date.now() + 1000,
      },
      {
        title: "AI Documentation Generator",
        description: "Ferramenta de CLI automatizada em Node.js que escaneia repositórios e gera documentações ricas para vaults do Obsidian.",
        content: "Utiliza LLMs para análise profunda de código-fonte.",
        imageUrl: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?q=80&w=2070&auto=format&fit=crop",
        githubUrl: "https://github.com/hmont/obsidian-docs-ai",
        tags: ["Node.js", "AI", "OpenAI", "CLI"],
        featured: false,
        createdAt: Date.now() + 2000,
      }
    ];

    for (const project of initialProjects) {
      await ctx.db.insert("projects", project);
    }

    return "Successfully seeded projects!";
  },
});
