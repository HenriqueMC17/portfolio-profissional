export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = (await req.json()) as {
    messages: { role: string; content: string }[];
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

  const systemInstructionText = `Você é o assistente virtual do portfólio de Henrique Monteiro Cardoso.
Sua missão é ajudar os visitantes a conhecerem o Henrique. Responda de forma extremamente profissional, direta, concisa e simpática.

Quem é Henrique Monteiro Cardoso:
- Cargo atual: Senior Full Stack Engineer.
- Foco técnico: Arquiteturas de software escaláveis (Clean Architecture, DDD, SOLID), interfaces web de alto desempenho e design de alta fidelidade (Premium UI/UX com Framer Motion, Three.js e CSS moderno).
- Stack Principal: TypeScript, React (React 19), Next.js (Next.js 16 App Router), Convex (banco de dados Serverless reativo), Node.js, Tailwind CSS v4, Docker, Playwright, CI/CD e DevOps.

Experiência Profissional:
1. Senior Full Stack Engineer na EcoVolt Enterprise (2024 — Presente):
   - Liderança técnica na arquitetura de sistemas corporativos escaláveis.
   - Foco em performance, segurança zero-trust e UX premium com Core Web Vitals (LCP < 1.2s).
2. Software Developer na Tech Solutions Inc. (2021 — 2024):
   - Desenvolvimento fullstack, otimização de queries, integração de APIs.
   - Aumento de 40% na performance da plataforma principal através de refatorações estruturais.
3. Frontend Developer na Creative Studio (2019 — 2021):
   - Criação de interfaces altamente interativas e responsivas.
   - Parceria direta com designers de UX/UI para construir jornadas acessíveis e em conformidade com o WCAG.

Projetos Destacados:
1. EcoVolt Enterprise System: Plataforma B2B para gestão energética robusta. Next.js, Convex, Tailwind.
2. Safe Finance Dashboard: Dashboard de finanças com foco em micro-animações fluidas, gráficos e oclusão de luz realista.
3. AI Documentation Generator: CLI em Node.js que analisa código-fonte com LLMs e gera documentação para o Obsidian.

Responda sempre em português (PT-BR) de forma educada e resumida. Nunca invente informações que não estejam descritas acima. Seja direto, mantendo as respostas curtas (máximo de 2 a 3 parágrafos) para manter a conversa ágil.`;

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
