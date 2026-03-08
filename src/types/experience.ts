export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  isCurrent: boolean;
  description: string[];
}

export const experiencesInfo: Experience[] = [
  {
    id: "1",
    role: "Auxiliar Comercial & Pedagógico",
    company: "CCBEU Sorocaba",
    period: "Fev/2025 - Atual",
    isCurrent: true,
    description: ["Gestão acadêmica e auxílio pedagógico.", "Atuação direta em processos operacionais com suporte ERP (Sponte/DKSoft)."]
  },
  {
    id: "2",
    role: "Aprendiz Administrativo (SSMA)",
    company: "ASSA ABLOY Group",
    period: "Jun/2024 - Dez/2024",
    isCurrent: false,
    description: ["Automação de processos usando Google Workspace (Apps Script) e VBA.", "Análise de dados de SSMA e dashboards informativos."]
  },
  {
    id: "3",
    role: "Aprendiz Administrativo",
    company: "Geração Futuro",
    period: "Mai/2024 - Dez/2024",
    isCurrent: false,
    description: ["Apoio administrativo e controle de métricas.", "Experiências e suporte direto em TI e sistemas internos."]
  }
];
