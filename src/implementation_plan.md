# Plano de Melhoria: Portfólio Profissional Henrique Monteiro Cardoso

Este plano apresenta uma série de melhorias propostas para elevar o portfólio a um nível ainda mais premium, focando em interatividade, demonstração prática de código (Interactive Sandbox), facilidade de contato (com chatbot aprimorado), arquitetura técnica refinada e conformidade rígida com os padrões definidos na **Constituição do Projeto (`AGENTS.md`)**.

---

## 🏛️ Alinhamento com a Constituição do Projeto (`AGENTS.md`)
Todas as melhorias propostas respeitarão os seguintes pilares visuais e de engenharia:
1. **Design System Tri-Layer:** Fundo de base em `#0D0D0D`, painéis/cards em `#1A1A1A` e menus/diálogos em `#2D2D2D`. Bordas finas de 1px com transparência (`white/8%` ou `white/15%`) em vez de sombras fortes.
2. **GPU Acceleration:** Desfocagem de fundo (`backdrop-filter`) otimizada com `transform: translate3d(0, 0, 0)` e `will-change`.
3. **Precisão Numérica:** Métricas e tabelas com fonte mono (Geist Mono) e `font-variant-numeric: tabular-nums`.
4. **Spring Transitions:** Animações interativas de interface utilizando físicas de mola (Framer Motion) com propriedades explícitas (evitando `transition: all`).

---

## 🚀 Propostas de Melhoria

### 1. 🧪 Central de Experimentos Interativa (Labs / Sandbox)
**Objetivo:** Criar um espaço interativo que demonstre, de forma prática e em tempo real, as habilidades do Henrique aplicadas nos seus principais projetos (EcoVolt e Safe Finance).

* **Simulador de ROI Solar (EcoVolt Lite):**
  * Widget interativo onde o visitante insere a área disponível (m²) e a radiação da sua região (baseada em dados dinâmicos ou de seleção).
  * Exibe em tempo real um gráfico minimalista de retorno financeiro estimado ao longo dos anos usando `recharts`.
* **Calculadora de Pegada de Carbono (Safe Finance ESG Lite):**
  * Formulário minimalista simulando compras ou gastos e calculando instantaneamente o impacto ambiental de CO₂ correspondente.
* **Onde será integrado:** Nova rota `/labs` ou uma seção dedicada na página inicial abaixo de "Projetos".

---

### 2. 🤖 Chatbot de IA Premium com Persistência e Quick Actions
**Objetivo:** Aumentar o engajamento dos recrutadores com o assistente inteligente, facilitando a navegação e garantindo que o histórico de conversa não seja perdido.

* **Histórico Persistente:** Armazenar as mensagens no `localStorage` do cliente para manter a conversa ativa durante a navegação.
* **Ações Rápidas (Sugestões de Prompt):** Adicionar pequenos botões de atalhos clicáveis sobre a barra de texto:
  * 📑 *"Ver projetos mais recentes"*
  * 💼 *"Quais são as principais competências de Henrique?"*
  * 📧 *"Como posso entrar em contato?"*
  * 📥 *"Baixar Currículo"* (permitindo que o chatbot forneça o link direto para download).
* **Animações de Escrita Otimizadas:** Adicionar efeito de digitação realista e feedbacks de estado impecáveis.

---

### 3. 📅 Linha do Tempo de Carreira Interativa (Timeline & Impact Drawer)
**Objetivo:** Transformar a seção de experiência estática em uma jornada rica e interativa de engajamento do usuário.

* **Design de Timeline Vertical:** Uma linha vertical fina (`white/8%`) com pontos iluminados por estados ativos de hover.
* **Impact Drawer / Modal:** Ao clicar em um cargo, em vez de exibir apenas o texto básico, abre-se um painel lateral (`Drawer` com blur de fundo acelerado por GPU) contendo:
  * **Métricas de Impacto:** Números destacados com `tabular-nums` (ex: +40% performance).
  * **Tech Stack Detalhado:** Tags completas da pilha tecnológica usada.
  * **Atividades e Aprendizados:** Uma descrição aprofundada da experiência corporativa e das decisões de arquitetura tomadas.

---

## 🛠️ Arquitetura e Mudanças Propostas no Repositório

### Componentes de Interface e Rotas
#### [NEW] [page.tsx](file:///c:/Dev/portfolio-profissional/src/app/%5Blang%5D/labs/page.tsx)
Criação do portal de experimentos (Labs) com os simuladores interativos e gráficos.

#### [MODIFY] [AiAssistant.tsx](file:///c:/Dev/portfolio-profissional/src/modules/ai-chatbot/components/AiAssistant.tsx)
Modificação para suportar persistência de mensagens localmente e renderização de botões de ações rápidas.

#### [MODIFY] [ExperienceSection.tsx](file:///c:/Dev/portfolio-profissional/src/modules/experience/components/ExperienceSection.tsx)
Refatoração para integrar a linha do tempo interativa e o painel lateral de impactos.

#### [MODIFY] [layout.tsx](file:///c:/Dev/portfolio-profissional/src/app/%5Blang%5D/layout.tsx)
Inclusão das meta-tags de SEO globais e dinâmicas compatíveis com i18n.

---

## 🧪 Plano de Verificação

### Testes Automatizados
* Executar `npx tsc --noEmit` para garantir ausência absoluta de erros de tipagem estrita no TypeScript.
* Executar `npm run dev` e testar interações de transição de rota localmente.
* Executar `npm run test:e2e` do Playwright para garantir que os testes existentes permanecem verdes após os refinamentos.

### Testes Manuais de UX/UI
* Verificar a conformidade do layout de 8px e a hierarquia Tri-Layer nos novos componentes.
* Garantir que as animações do Drawer e dos simuladores utilizem aceleração de hardware (GPU).
