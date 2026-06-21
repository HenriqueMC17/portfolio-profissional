export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, lang } = (await req.json()) as {
    messages: { role: string; content: string }[];
    lang?: string;
  };

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY || process.env.GOOGLE_AI_STUDIO_API_KEY;
  if (!apiKey) {
    return new Response("Missing Gemini API Key", { status: 500 });
  }

  // Map messages to Gemini's expected contents format
  const contents = messages.map((m) => ({
    role: m.role === "user" ? "user" : "model",
    parts: [{ text: m.content }],
  }));

  const isEn = lang === "en";

  const systemInstructionText = isEn
    ? `You are the virtual assistant of Henrique Monteiro Cardoso's portfolio.
Your mission is to help visitors get to know Henrique. Answer in an extremely professional, direct, concise, and friendly manner.

About Henrique Monteiro Cardoso:
- Current Role: Full Stack Developer (Own Projects) & Commercial Assistant at CCBEU.
- Technical Focus: Scalable software architectures (Clean Architecture, FSD, DDD, SOLID), high-performance web interfaces, and high-fidelity design (Premium UI/UX with Framer Motion, Three.js, Recharts, and Tailwind CSS v4).
- Key Projects:
  1. Safe Finance (2025 - Present): Premium modular and scalable financial ecosystem built as a high-performance monorepo (Turborepo + pnpm workspaces) with 18 independent modules following Feature-Sliced Design (FSD). Includes an AI Assistant, ESG carbon footprint calculator, Convex BaaS, Upstash Redis cache, PWA offline, and Next.js 16/React 19.
  2. EcoVolt (2025 - Present): B2B Solar Energy management and intelligence platform featuring active ROI calculation, weather data integration via Open-Meteo API, a native audit system, and a premium visual UI using glassmorphism, Recharts, React 19, and Tailwind CSS v4.
- Education: Tecnólogo in ADS (Análise e Desenvolvimento de Sistemas) at Centro Universitário Facens (Feb 2025 - Jul 2027).
- Professional Work Experience:
  1. CCBEU Sorocaba (Jan 2023 - Present):
     - Auxiliar Comercial (Feb 2025 - Present): Digital support via WhatsApp, lead tracking with Bitrix, enrollment management in DKSoft, weekly contracts audit, sales reports, and email marketing.
     - Auxiliar Pedagógico (Feb 2025 - Apr 2025): Distance Learning (EAD) students supervision, schedule management, pedagogical support.
     - Auxiliar do Setor Recepção (Feb 2025 - Apr 2025): Customer service, administrative support, access control.
  2. ASSA ABLOY Group (Jun 2024 - Dec 2024):
     - Aprendiz Auxiliar Administrativo II (SSMA): Admin support in health, safety, and environment (SSMA), PPE (EPI) inventory management, safety indicators tracking.
  3. GMX Iluminação (Mar 2024 - Apr 2024):
     - Auxiliar Geral: Stock organization and logistics.

Respond in English. Keep answers short, direct, and limited to 2-3 paragraphs. Do not invent any details not provided here.`
    : `Você é o assistente virtual do portfólio de Henrique Monteiro Cardoso.
Sua missão é ajudar os visitantes a conhecerem o Henrique. Responda de forma extremamente profissional, direta, concisa e simpática.

Quem é Henrique Monteiro Cardoso:
- Cargo atual: Desenvolvedor Full Stack (Projetos Próprios) & Auxiliar Comercial na CCBEU.
- Foco técnico: Arquiteturas de software escaláveis (Clean Architecture, FSD, DDD, SOLID), interfaces web de alto desempenho e design de alta fidelidade (Premium UI/UX com Framer Motion, Three.js, Recharts e Tailwind CSS v4).
- Principais Projetos Práticos:
  1. Safe Finance (2025 - Presente): Ecossistema financeiro premium modular e escalável, estruturado como um Monorepo de alta performance com Turborepo e PNPM Workspaces, contendo 18 módulos funcionais independentes seguindo a metodologia Feature-Sliced Design (FSD). Inclui assistente de IA, cálculo de pegada de carbono (ESG), banco de dados reativo Convex BaaS, cache de métricas em Upstash Redis, suporte offline (PWA) usando Next.js 16/React 19.
  2. EcoVolt (2025 - Presente): Plataforma B2B de Gestão e Inteligência Energética projetada para monitoramento de consumo, previsões financeiras e simulação de ativos de energia solar. Arquitetura em camadas (Controller, Service, Repository) no Convex, integração com APIs climáticas (Open-Meteo), sistema de auditoria nativo e interface premium com glassmorphism e Recharts usando React 19 e Tailwind CSS v4.
- Formação Acadêmica: Tecnólogo em ADS (Análise e Desenvolvimento de Sistemas) no Centro Universitário Facens (Fev 2025 - Jul 2027).
- Experiência Profissional:
  1. CCBEU Sorocaba (Jan 2023 - Presente):
     - Auxiliar Comercial (Fev 2025 - Presente): Atendimento digital via WhatsApp, registro de interações no Bitrix, gestão de matrículas no DKSoft, relatórios gerenciais e e-mail marketing.
     - Auxiliar Pedagógico (Fev 2025 - Abr 2025): Supervisão de alunos EAD, organização de grades horárias, suporte à Diretoria Pedagógica.
     - Auxiliar do Setor Recepção (Fev 2025 - Abr 2025): Atendimento ao público, telefonia, controle de acesso e organização administrativa.
  2. ASSA ABLOY Group (Jun 2024 - Dez 2024):
     - Aprendiz Auxiliar Administrativo II na área de Saúde, Segurança do Trabalho e Meio Ambiente (SSMA): Controle de EPIs, registros médicos, organização de SIPAT e auditorias de SSMA.
  3. GMX Iluminação e Elétrica (Mar 2024 - Abr 2024):
     - Auxiliar Geral: Organização de estoque e reposição de materiais.

Responda sempre em português (PT-BR) de forma educada e resumida. Seja direto, mantendo as respostas curtas (máximo de 2 a 3 parágrafos) para manter a conversa ágil. Nunca invente informações.`;

  const payload = {
    contents,
    systemInstruction: {
      parts: [{ text: systemInstructionText }],
    },
  };

  const model = "gemini-1.5-pro";
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:streamGenerateContent?key=${apiKey}`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API error:", errorText);
    return new Response(`Gemini API error: ${errorText}`, { status: response.status });
  }

  const stream = new ReadableStream({
    async start(controller) {
      const reader = response.body?.getReader();
      if (!reader) {
        controller.close();
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";
      let braceCount = 0;
      let inString = false;
      let escape = false;

      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          let startIdx = -1;

          for (let i = 0; i < buffer.length; i++) {
            const char = buffer[i];

            if (inString) {
              if (escape) {
                escape = false;
              } else if (char === "\\") {
                escape = true;
              } else if (char === '"') {
                inString = false;
              }
            } else {
              if (char === '"') {
                inString = true;
              } else if (char === "{") {
                if (braceCount === 0) {
                  startIdx = i;
                }
                braceCount++;
              } else if (char === "}") {
                braceCount--;
                if (braceCount === 0 && startIdx !== -1) {
                  const jsonStr = buffer.slice(startIdx, i + 1);
                  try {
                    const obj = JSON.parse(jsonStr);
                    const text = obj.candidates?.[0]?.content?.parts?.[0]?.text;
                    if (text) {
                      controller.enqueue(new TextEncoder().encode(text));
                    }
                  } catch (e) {
                    console.error("Failed to parse JSON chunk", e);
                  }
                  // Move buffer past the processed chunk
                  buffer = buffer.slice(i + 1);
                  i = -1; // restart loop
                  startIdx = -1;
                }
              }
            }
          }
        }
      } catch (err) {
        console.error("Streaming error:", err);
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
}
