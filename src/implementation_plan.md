# Plano de Implementação: Otimização de Performance (Vercel Speed Insights)

O objetivo deste plano é melhorar as métricas do **Vercel Speed Insights**, focando especialmente em dispositivos móveis, onde a pontuação de Real Experience Score é de **54/100** com gargalos significativos em:
* **First Contentful Paint (FCP)**: 6.2s (Mobile) / 2.0s (Desktop)
* **Largest Contentful Paint (LCP)**: 5.2s (Mobile) / 3.1s (Desktop)
* **Interaction to Next Paint (INP)**: 336ms (Mobile) / 184ms (Desktop)
* **First Input Delay (FID)**: 197ms (Mobile)

## Análise dos Problemas de Performance

1. **ThreeJS/Canvas Bloqueante (Principal Gargalo)**:
   O portfólio carrega e inicializa as bibliotecas do Three.js (`three`, `@react-three/fiber`, `@react-three/drei`, `maath`) no lado do cliente imediatamente. Em dispositivos móveis, o processamento de CPU necessário para compilar/renderizar o Canvas e as 2000 partículas congela a thread principal por vários segundos, resultando nos péssimos índices de FCP, INP e FID.
2. **Componentes Clientes desnecessários na renderização crítica**:
   * A **`HeroSection`** (acima da dobra) usa `framer-motion` para animações de entrada (`opacity: 0` -> `1`). Durante o SSR, o Next.js envia o estado inicial (`opacity: 0`), fazendo com que o texto fique invisível até que o JavaScript seja baixado e executado. Isso atrasa diretamente o FCP/LCP para coincidir com a execução do JS.
   * O **`TechMarquee`** é um componente cliente que executa animações usando `framer-motion`, embora a animação de marquee real seja feita por CSS nativo.
3. **Assistente de IA (`AiAssistant`) na carga inicial**:
   O chatbot de IA é importado e montado diretamente no layout principal (`layout.tsx`), fazendo com que as bibliotecas `@ai-sdk/react` e ícones pesados da biblioteca `lucide-react` carreguem e executem na inicialização, mesmo que o chat comece fechado.

---

## Proposta de Otimização

### 1. Desativação / Deferimento de 3D no `ThreeWrapper`
Desativar o ThreeJS completamente em dispositivos móveis (telas menores que 768px) e atrasar a sua inicialização (em 1.5s ou usando `requestIdleCallback`) em desktops. Isso garante que a carga inicial da página aconteça limpa e sem concorrência de CPU.

### 2. Conversão da `HeroSection` em Server Component
Remover o `framer-motion` da `HeroSection` e torná-la um componente servidor puro. O efeito visual de fade-in e slide-up será feito inteiramente com **animações CSS nativas** (utilizando as classes `@keyframes slideUp` já existentes no `globals.css`). Com isso:
* O HTML enviado pelo servidor renderiza instantaneamente e já executa a animação antes mesmo do download do JavaScript.
* Remove-se um grande volume de código JS da árvore de componentes críticos.

### 3. Conversão do `TechMarquee` em Server Component
Mudar o `TechMarquee` para Server Component, removendo o wrapper de animação do `framer-motion`. Como a animação do marquee já usa classes CSS nativas (`animate-marquee-left` e `animate-marquee-right`), o componente funcionará perfeitamente sem qualquer JavaScript do cliente.

### 4. Lazy-loading e Deferimento do `AiAssistant`
* Modificar a importação do `AiAssistant` no `layout.tsx` para ser dinâmica (`next/dynamic` com `ssr: false`).
* Adicionar lógica interna para atrasar a montagem do botão do chatbot em 2.5 segundos após a carga da página. Isso remove o chatbot por completo do caminho crítico de renderização inicial.

---

## Detalhes das Alterações Propostas

### 📋 Componente: `ThreeJS Background`

#### [MODIFY] [ThreeWrapper.tsx](file:///c:/Dev/portfolio-profissional/src/components/ui/ThreeWrapper.tsx)
* Implementar a lógica de verificação de resolução (`window.innerWidth >= 768`) e o atraso de montagem de 1.5 segundos.
* Impedir que o chunk do `ThreeBackground` seja importado em dispositivos móveis.

---

### 📋 Componente: `Hero Section`

#### [MODIFY] [HeroSection.tsx](file:///c:/Dev/portfolio-profissional/src/modules/hero/components/HeroSection.tsx)
* Remover `"use client"`.
* Remover imports do `framer-motion`.
* Converter tags `<motion.X>` para `<X>` convencionais.
* Adicionar classes `animate-slide-up` e `animate-fade-in` com `animationDelay` via inline styles.

---

### 📋 Componente: `Tech Marquee`

#### [MODIFY] [TechMarquee.tsx](file:///c:/Dev/portfolio-profissional/src/modules/skills/components/TechMarquee.tsx)
* Remover `"use client"`.
* Remover imports do `framer-motion`.
* Converter `<motion.div>` em `<div>` normais.

---

### 📋 Componente: `Layout & AI Assistant`

#### [MODIFY] [layout.tsx](file:///c:/Dev/portfolio-profissional/src/app/[lang]/layout.tsx)
* Mudar a importação do `AiAssistant` para importação dinâmica (`next/dynamic`) com `ssr: false`.

#### [MODIFY] [AiAssistant.tsx](file:///c:/Dev/portfolio-profissional/src/modules/ai-chatbot/components/AiAssistant.tsx)
* Adicionar estado `isMounted` com `useEffect` e atraso de `2500ms` antes de renderizar qualquer elemento.

---

## Plano de Verificação

### Testes Automatizados
* Executar `npm run vercel-build` para garantir que o projeto compila com sucesso, confirmando que os componentes convertidos funcionam perfeitamente do lado do servidor.
* Rodar testes de lint local: `npm run lint`.

### Verificação Manual
* Abrir o console do navegador e inspecionar a aba Network para garantir que o chunk do Three.js e do chatbot não são carregados na carga crítica.
* Testar a animação do marquee e da Hero Section, garantindo que o visual continue idêntico e premium.
* Testar o portfólio no mobile (emulado) e desktop para garantir que tudo está funcional.
