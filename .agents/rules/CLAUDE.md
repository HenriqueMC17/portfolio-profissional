# CLAUDE Operational Rules

Este documento regula as ações operacionais do modelo Claude neste repositório.

## 📐 Padrões de Código

- **Clean Architecture:** Assegure o isolamento das entidades de domínio em `src/core/domain/entities` de qualquer lógica de infraestrutura ou renderização.
- **Tipagem Segura:** Sincronize sempre as tipagens de banco de dados geradas pelo Convex (`_generated/api` e `_generated/dataModel`) com as entidades do domínio.
- **Micro-interações:** Efeitos glass e desfoque devem possuir aceleração GPU (`transform: translate3d(0,0,0)`).

## 🧪 Suíte de QA e Testes

- Adicione testes Playwright E2E para novos fluxos na pasta `tests/`.
- Antes de commitar, certifique-se de que a build de produção compila sem erros executando `npm run build`.
