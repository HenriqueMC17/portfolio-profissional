<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=250&section=header&text=Henrique%20Monteiro%20Cardoso&fontSize=50&fontAlignY=35&desc=Senior%20Full%20Stack%20Engineer&descAlignY=55&descAlign=50" alt="Banner" />
  
  <br />
  
  <blockquote>
    <p><b>Construindo experiências digitais modernas com arquitetura escalável, performance extrema e design de alta fidelidade.</b></p>
  </blockquote>

  <p>
    <a href="https://github.com/HenriqueMC17"><img alt="Last Commit" src="https://img.shields.io/github/last-commit/HenriqueMC17/portfolio-profissional?style=for-the-badge&color=8b5cf6"></a>
    <a href="https://github.com/HenriqueMC17/portfolio-profissional"><img alt="Repo Size" src="https://img.shields.io/github/repo-size/HenriqueMC17/portfolio-profissional?style=for-the-badge&color=3b82f6"></a>
    <a href="https://opensource.org/licenses/MIT"><img alt="License" src="https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge&color=10b981"></a>
    <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
    <img alt="React 19" src="https://img.shields.io/badge/React%2019-20232A?style=for-the-badge&logo=react&logoColor=61DAFB">
    <img alt="Next.js 16" src="https://img.shields.io/badge/Next.js%2016-black?style=for-the-badge&logo=next.js&logoColor=white">
    <img alt="Convex" src="https://img.shields.io/badge/Convex-FF5A4F?style=for-the-badge&logo=convex&logoColor=white">
  </p>
</div>

---

## ✦ Sobre o Projeto

Este projeto é um **portfólio profissional de alta fidelidade**, meticulosamente planejado para apresentar projetos de engenharia de software, experiências profissionais, e coletar leads de contato. O sistema conta com suporte completo a **internacionalização (i18n)**, um **banco de dados serverless reativo** e um **painel administrativo autenticado** para gerenciar os conteúdos em tempo real.

O desenvolvimento foi guiado pelos princípios de **Clean Architecture**, **UX Premium**, **responsividade fluida** e **máxima performance web**.

---

## ✦ Principais Recursos e Diferenciais

* **Internacionalização Dinâmica (i18n):** Roteamento localizado (`/pt` e `/en`) com middleware Next.js de detecção automática do idioma do navegador.
* **Sincronização Reativa (Convex):** Banco de dados serverless e reativo. Atualizações nos projetos ou formulários de contato são refletidas instantaneamente sem recarregar a página.
* **Painel Admin Autenticado:** Área administrativa sob `/admin` protegida por autenticação segura via `@convex-dev/auth` (com o provedor `Password`), permitindo o cadastro de projetos e controle de métricas.
* **Experiência Visual Imersiva (UX/UI):** Interface estilizada sob a nova engine do **Tailwind CSS v4** (com suporte nativo a variáveis CSS e `@theme`), animações fluidas com **Framer Motion**, rolagem de alta precisão com **Lenis Scroll**, e elementos interativos em **3D** usando **Three.js** e **React Three Fiber (R3F)**. A padronização visual da interface e a modernização do Tailwind v4 seguem as diretrizes descritas em [2026 Enterprise Interface Standardization Manual](file:///c:/Dev/Docs/Mastering%20AntiGravity%20and%20Google%20Stitch%20The%20Loop%20Design%20Manual/2026%20Enterprise%20Interface%20Standardization%20Manual_%20A%20Reference%20for%20Design%2C%20Product%2C%20and%20Engineering.md) e [Strategic Modernization Plan: Adopting Tailwind CSS v4](file:///c:/Dev/Docs/Programação%20Web/Strategic%20Modernization%20Plan_%20Adopting%20Tailwind%20CSS%20v4%20and%20the%20React%20Compiler.md).
* **Validação de Formulários Robusta:** Validação de entradas (como formulário de contato e inserção de projetos) com esquemas estritos do **Zod**, integrados ao **React Hook Form** e com tipagem TypeScript segura de ponta a ponta.
* **Lighthouse CI & Observability:** Auditorias automáticas de performance e acessibilidade integradas via **Lighthouse CI** (`lhci`) e monitoramento em tempo real com **Vercel Analytics** & **Speed Insights**. As metas de TTI (Time to Interactivity) e Core Web Vitals são alinhadas com o compêndio técnico [Beyond the Visual: The Invisible Engine of Modern Web Interactivity](file:///c:/Dev/Docs/Desenvolvimento%20de%20Software/Beyond%20the%20Visual_%20The%20Invisible%20Engine%20of%20Modern%20Web%20Interactivity.md).

---

## ✦ Stack Tecnológica

### Frontend
- **React 19 & Next.js 16 (App Router):** Renderização híbrida inteligente e otimização máxima.
- **TypeScript:** Tipagem estática rigorosa para garantir código resiliente.
- **Tailwind CSS v4:** Estilização utility-first moderna com novos recursos de performance e configuração limpa.
- **Framer Motion:** Animações físicas e transições de página ultra fluidas.
- **Lenis:** Smooth scroll nativo de alta performance para navegadores modernos.
- **Three.js & React Three Fiber (R3F) & Drei:** Renderização de elementos gráficos 3D interativos.

### Backend / Infraestrutura / Segurança
- **Convex:** Backend reativo Serverless (BaaS) com persistência em tempo real, Queries, Mutations e Actions tipadas.
- **@convex-dev/auth:** Autenticação integrada diretamente no ecossistema Convex.
- **Zod & React Hook Form:** Validação de dados de formulário no cliente e no servidor.

### Ferramentas de Qualidade & CI
- **Playwright:** Suite de testes ponta a ponta (E2E) estruturada.
- **Lighthouse CI:** Rastreamento contínuo de métricas vitais web.
- **ESLint & Prettier & Husky:** Padrões de código estritos e hooks de pré-commit automatizados.

---

## ✦ Arquitetura de Software e Design Patterns

O projeto segue padrões avançados de design de software para garantir que o código seja legível, manutenível e extensível:

1. **Domain-Driven Design (DDD) Simplificado:** Modelagem de entidades essenciais do negócio (como `Project` e `Lead`) localizadas isoladamente na camada `core/domain`.
2. **Clean Architecture / Separação de Conceitos:** 
   - **Camada de Apresentação (`src/modules` e `src/components`):** Apenas componentes visuais e hooks de interação de UI.
   - **Camada de Domínio (`src/core/domain/entities`):** Regras de negócio puras e validação estruturada com Zod.
   - **Camada de Infraestrutura (`convex/`):** Acesso direto ao banco, consultas reativas e autenticação.
3. **DRY & SOLID:** Reutilização consistente de layouts, componentes utilitários e tipagem end-to-end unificada entre o frontend e backend.

---

## ✦ Estrutura do Projeto

Abaixo, a estrutura real de diretórios e a divisão de responsabilidades da aplicação:

```text
portfolio-profissional
├── convex/                   # Configurações e Funções do Backend Serverless (Convex)
│   ├── _generated/           # Arquivos gerados automaticamente pelo codegen do Convex
│   ├── auth.ts               # Configuração do ecossistema de autenticação (Password Provider)
│   ├── leads.ts              # Funções de gravação (Mutations) de leads de contato
│   ├── projects.ts           # Consultas e inserções de projetos (Queries & Mutations)
│   ├── schema.ts             # Definição e validação do esquema de tabelas do banco
│   └── seed.ts               # Mutação para popular banco com dados mockados de projetos
│
├── public/                   # Assets estáticos acessíveis diretamente
│
├── src/                      # Código-fonte da aplicação
│   ├── app/                  # App Router do Next.js
│   │   └── [lang]/           # Rotas localizadas por idioma (pt / en)
│   │       ├── admin/        # Páginas do Painel Administrativo
│   │       ├── login/        # Tela de login administrativo
│   │       ├── layout.tsx    # Layout root (Fontes, Analytics, Providers globais)
│   │       └── page.tsx      # Landing page principal (Hero, Projetos, Contato, etc.)
│   │
│   ├── components/           # Componentes globais reutilizáveis
│   │   ├── layout/           # Componentes estruturais de layout (Ex: Header)
│   │   ├── shared/           # Providers e contextos do React (Ex: Providers.tsx)
│   │   └── ui/               # Primitivos visuais atômicos (Button, Input, Label)
│   │
│   ├── core/                 # Camada de Domínio (Negócio)
│   │   └── domain/
│   │       └── entities/     # Entidades e esquemas Zod (lead.entity.ts, project.entity.ts)
│   │
│   ├── lib/                  # Inicialização de bibliotecas externas (Ex: validação de env)
│   │
│   ├── middleware.ts         # Middleware para rotas protegidas (Admin) e rotas i18n
│   │
│   ├── modules/              # Blocos funcionais da UI divididos por escopo
│   │   ├── admin-panel/      # Recursos visuais e layout da área do painel admin
│   │   ├── contact/          # Formulário de contato e seção de leads
│   │   ├── experience/       # Linha do tempo de carreira e qualificações
│   │   ├── hero/             # Banner inicial e destaques de diferenciais
│   │   └── projects/         # Cards, listas e formulário de novo projeto
│   │
│   ├── styles/               # Estilos globais (globals.css estruturado em Tailwind v4)
│   └── utils/                # Utilitários auxiliares (Ex: cn.ts para mesclar classes)
│
├── playwright.config.ts      # Configuração dos testes de ponta a ponta
├── lighthouserc.js           # Configuração de auditoria automatizada do Lighthouse
└── tsconfig.json             # Configurações do compilador TypeScript
```

---

## ✦ Instalação e Execução Local

Siga o passo a passo para clonar, configurar e rodar o projeto localmente.

### 1. Clonar o Repositório
```bash
git clone https://github.com/HenriqueMC17/portfolio-profissional.git
cd portfolio-profissional
```

### 2. Instalar Dependências
```bash
npm install
```

### 3. Configurar Variáveis de Ambiente
Crie um arquivo `.env.local` na raiz do projeto contendo as conexões do Convex local:
```env
CONVEX_DEPLOYMENT=anonymous:anonymous-portfolio-profissional
NEXT_PUBLIC_CONVEX_URL=http://127.0.0.1:3210
NEXT_PUBLIC_CONVEX_SITE_URL=http://127.0.0.1:3211
```

### 4. Executar em Modo de Desenvolvimento
O projeto conta com um script integrado para rodar concorrentemente o Next.js e o ambiente de desenvolvimento local do Convex:
```bash
npm run dev:full
```

Isso iniciará:
* O servidor Next.js em `http://localhost:3000` (ou a próxima porta disponível).
* O painel local do Convex e codegen em tempo real.

Se preferir rodar de forma isolada em terminais separados, você pode usar:
* **Frontend:** `npm run dev`
* **Convex Backend:** `npm run convex:dev`

### 5. Popular o Banco (Seeding)
Após iniciar os servidores, você pode acessar a rota administrativa `/pt/admin` e clicar em **"Popular Banco (Mock Data)"** para executar a mutação `convex/seed.ts` e cadastrar os projetos iniciais (`EcoVolt Enterprise System`, `Safe Finance Dashboard`, etc.).

---

## ✦ Qualidade, Testes e Builds

* **Executar Testes E2E (Playwright):**
  ```bash
  npm run test:e2e
  ```
* **Compilar e Validar Build de Produção:**
  ```bash
  npm run build
  ```
* **Executar Auditoria de Performance (Lighthouse CI):**
  ```bash
  npm run audit:lighthouse
  ```
* **Rodar Linter de Código:**
  ```bash
  npm run lint
  ```

---

## ✦ Terminal Interativo

```bash
$ whoami
Henrique Monteiro Cardoso

$ role
Senior Full Stack Engineer

$ stack
TypeScript • React 19 • Next.js 16 • Convex • TailwindCSS v4 • Three.js

$ focus
Arquiteturas escaláveis, experiências visuais premium (3D & Motion) e sistemas de alta performance.
```

---

## ✦ Autor

<div align="center">
  <img src="https://avatars.githubusercontent.com/u/206460478?v=4" width="100" height="100" style="border-radius: 50%; border: 2px solid rgba(99, 102, 241, 0.4); box-shadow: 0 4px 20px rgba(99,102,241,0.25);" />
  <h3>Henrique Monteiro Cardoso</h3>
  <p>Senior Full Stack Engineer</p>

  <a href="https://github.com/HenriqueMC17">
    <img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white" alt="GitHub" />
  </a>
  <a href="https://www.linkedin.com/in/henrique-monteiro-cardoso-ba3716229/">
    <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
  </a>
  <a href="https://hmont.com">
    <img src="https://img.shields.io/badge/Portfólio-2563EB?style=for-the-badge&logo=vercel&logoColor=white" alt="Portfolio" />
  </a>
</div>

<br />

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=timeGradient&height=100&section=footer" width="100%"/>
</div>
