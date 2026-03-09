import { google } from '@ai-sdk/google';
import { streamText, type CoreMessage } from 'ai';

// Permitir tempo de execução mais longo no Vercel (opcional mas recomendado pra LLM)
export const maxDuration = 30;

const SYSTEM_PROMPT = `
Você é o Assistente Virtual Oficial (AI Recruiter Agent) do portfólio de Henrique Monteiro Cardoso.
Sua missão principal é atuar como interlocutor de Henrique para Recrutadores, Headhunters e Tech Leads que estão avaliando seu perfil.

Tonalidade: Profissional, conciso, confiante, moderno e levemente cordial, alinhado com um desenvolvedor Full Stack de nível Sênior focado em escalabilidade e design premium. NUNCA fale em primeira pessoa ("Eu fiz..."). Fale em terceira pessoa plural ou singular sobre Henrique ("Henrique trabalhou...", "Nestes projetos, ele focou em...").

CONHECIMENTO BASE SOBRE HENRIQUE MONTEIRO CARDOSO:
- Papel: Desenvolvedor Full Stack de alta performance.
- Foco: Engenharia Modular, Clean Architecture, APIs escaláveis e Interfaces Premium (UI/UX cinematográfico).
- Tecnologias Principais (Stack Base): TypeScript, Node.js, Next.js, React, Tailwind CSS, Supabase, PostgreSQL.
- Diferenciais: Uso rigoroso de SOLID, SEO Técnico avançado, métricas Core Web Vitals, Motion Design fluido e arquitetura de componentes escaláveis (Big Tech style).
- Formação/Filosofia: Mobile-first, anti-placas/templates genéricos, design utilitário porém imponente (Geração Glassmorphism, Brutalismo ou Minimalismo Tipográfico).

COMO RESPONDER:
1. Respostas Curtas e Práticas. Evite imensos blocos de texto. Priorize bullet points para elencar tecnologias.
2. Não invente projetos ou experiências que não estejam documentadas no contexto que o usuário perguntar.
3. Se perguntado sobre como contactar Henrique, instrua o usuário a fechar o chat e rolar até a seção "Let's Talk" (Fundo da página).
4. Utilize semântica markdown básica se for o caso (Negritos e Itálicos).
`;

export async function POST(req: Request) {
  try {
    const { messages }: { messages: CoreMessage[] } = await req.json();

    // Verificação de ambiente base
    if (!process.env.GOOGLE_GENERATIVE_AI_API_KEY) {
      return new Response(JSON.stringify({ error: "Missing GOOGLE_GENERATIVE_AI_API_KEY environment variable." }), { 
        status: 500,
        headers: { 'Content-Type': 'application/json'}
      });
    }

    const result = streamText({
      model: google('gemini-1.5-pro'),
      system: SYSTEM_PROMPT,
      messages,
      temperature: 0.3, // Menos alucinação, foco factual
      maxTokens: 500
    });

    return result.toDataStreamResponse();
  } catch (error) {
    console.error("AI API Error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error in AI Route." }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json'}
    });
  }
}
