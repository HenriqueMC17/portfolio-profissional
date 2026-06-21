# 📜 CONSTITUIÇÃO DO PROJETO: DIRETRIZES PARA AGENTES DE IA (`AGENTS.md`)

Este documento estabelece as diretrizes de governança e desenvolvimento para qualquer agente de Inteligência Artificial ou desenvolvedor que atue no repositório [portfolio-profissional](file:///c:/Dev/portfolio-profissional).

---

## 🏛️ 1. Hierarquia Normativa

Qualquer alteração neste repositório deve respeitar a seguinte ordem de prioridade técnica:

1. **Constituição do Projeto (`AGENTS.md`):** Este arquivo, contendo as leis de arquitetura, qualidade e design.
2. **Diretrizes de IA (`.agents/rules/`):** Arquivos específicos para controle de contexto de modelos de IA.
3. **Qualidade do Código:** Regras de linter (ESLint), formatação (Prettier) e tipagem estrita (TypeScript).

---

## 🛡️ 2. Sandbox, Segurança e Boas Práticas

- **Tratamento de Encoding:** O terminal Windows opera em Cp1252 por padrão. Scripts ou ferramentas que manipulem logs ou console devem utilizar codificação UTF-8 explícita para evitar falhas de console.
- **Proibição do Comando `cd`:** NUNCA execute o comando `cd` no terminal do sistema. Utilize caminhos absolutos ou especifique o diretório de trabalho corrente (`Cwd`) na ferramenta correspondente.
- **Commits Semânticos:** Todos os commits do projeto devem seguir estritamente o padrão Conventional Commits (`feat:`, `fix:`, `refactor:`, `chore:`, `docs:`, `test:`).

---

## 📐 3. Padrões de Clean Architecture

A estrutura física do repositório deve respeitar a separação de conceitos:

- **Camada de Apresentação (`src/modules` e `src/components`):** Componentes puramente visuais, hooks de interface e estados locais.
- **Camada de Domínio (`src/core/domain`):** Entidades do negócio com validação estrita (esquemas Zod).
- **Camada de Infraestrutura/Backend (`convex/`):** Queries, mutations, schemas de banco de dados e integrações diretas do Convex.
- **Configurações Globais (`src/styles`, `src/dictionaries`):** Estilos do Tailwind CSS v4 e arquivos de tradução i18n JSON.

---

## 💎 4. Design Engineering Premium

Toda e qualquer alteração de interface deve obedecer aos princípios visuais estabelecidos em `agente-core`:

- **Grelha e Alinhamento:** Layouts baseados em grid técnico de **8px**.
- **Dark Mode Tri-Layer:** Uso de fundos escuros refinados: Base (`#0D0D0D`), Cards/Painéis (`#1A1A1A`), Diálogos/Menus (`#2D2D2D`). Bordas finas de 1px com transparência (`white/8%` ou `white/15%`) devem separar os elementos no lugar de sombras ambientais fortes.
- **GPU Acceleration:** Todo elemento com desfoque de fundo (backdrop-filter) deve forçar a renderização na GPU utilizando `transform: translate3d(0, 0, 0)` e `will-change: transform, backdrop-filter`.
- **Precisão Numérica:** Elementos numéricos e tabelas de métricas devem utilizar a diretiva CSS `font-variant-numeric: tabular-nums` e fonte mono (Geist Mono) para alinhamento vertical exato.
- **Spring Transitions:** Animações interativas de interface devem usar timins baseados em física de mola (ex: Framer Motion spring) e propriedades explícitas. Evitar `transition: all`.
