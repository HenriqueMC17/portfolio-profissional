export interface Project {
  id: string;
  title: string;
  category: "Front-end" | "Arquitetura" | "Automação" | "Dashboards" | "Hardware";
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  isFeatured: boolean;
  metrics?: string[]; // Ex: ["Lighthouse 100", "5 sec build time"]
}

export const projectsInfo: Project[] = [
  {
    id: "1",
    title: "Safe Finance App / Plataforma de Gestão",
    category: "Front-end",
    description: "Arquitetura front-end escalável voltada para sistemas financeiros, focando em segurança, UI limpa e UX avançada.",
    techStack: ["Next.js", "TypeScript", "TailwindCSS", "Shadcn"],
    githubUrl: "https://github.com/HenriqueMC17",
    isFeatured: true,
    metrics: ["Lighthouse 95+", "Clean Architecture"]
  },
  {
    id: "2",
    title: "agente-senior-fullstack",
    category: "Arquitetura",
    description: "Script Python e automação de infraestrutura. Ferramental para agentes de IA que auxilia na construção de bases sólidas.",
    techStack: ["Python", "Shell", "AI"],
    githubUrl: "https://github.com/HenriqueMC17",
    isFeatured: true
  },
  {
    id: "3",
    title: "Automação de Cobrança / Dashboards",
    category: "Automação",
    description: "Projetos corporativos e integração de APIs. Focado em otimização de tempo e visualização clara de recebíveis.",
    techStack: ["Google Apps Script", "VBA", "REST APIs"],
    githubUrl: "https://github.com/HenriqueMC17",
    isFeatured: true,
    metrics: ["10h+ Salvas/Semana"]
  },
  {
    id: "4",
    title: "Portfólio Digital & Faculdade",
    category: "Hardware",
    description: "Lógica web-based em TS/JS e projetos envolvendo hardware e robótica com microcontroladores.",
    techStack: ["Arduino", "C++", "JavaScript", "React"],
    githubUrl: "https://github.com/HenriqueMC17",
    isFeatured: false
  }
];
