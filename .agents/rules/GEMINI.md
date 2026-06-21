# GEMINI Operational Rules

Este documento regula as ações operacionais do modelo Gemini neste repositório.

## 🚀 Tecnologias Centrais

- **Frontend:** React 19, Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, Three.js (React Three Fiber).
- **Backend/DB:** Convex Serverless Backend, `@convex-dev/auth`.
- **Validação:** Zod (Type Safety & Domain Schemas).
- **Qualidade:** Playwright (E2E), ESLint, Prettier, Husky.

## 🛠️ Regras de Execução de Código

1. **Evitar cd:** Nunca utilize `cd` no terminal.
2. **Conventional Commits:** Escrever mensagens de commit em minúsculas seguindo a convenção.
3. **TypeScript Estrito:** Não use `any` ou desative checagens do compilador. Rode `npx tsc --noEmit` para validar alterações.
4. **Encoding do Terminal:** Sempre trate possíveis crashes de Cp1252 ao rodar scripts de automação.
