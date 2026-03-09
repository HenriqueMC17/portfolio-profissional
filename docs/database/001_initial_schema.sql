-- Schema Inicial - Portfólio Profissional
-- ==========================================
-- Tabela: projects
-- ==========================================
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    content TEXT,
    tech_stack TEXT [] DEFAULT '{}',
    image_url TEXT,
    live_url TEXT,
    github_url TEXT,
    featured BOOLEAN DEFAULT false,
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- ==========================================
-- Tabela: experiences
-- ==========================================
CREATE TABLE IF NOT EXISTS public.experiences (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    role TEXT NOT NULL,
    company TEXT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE,
    "current" BOOLEAN DEFAULT false,
    description TEXT,
    skills TEXT [] DEFAULT '{}',
    order_index INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- ==========================================
-- Tabela: leads (Contatos via Formulário)
-- ==========================================
CREATE TABLE IF NOT EXISTS public.leads (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT DEFAULT 'unread' CHECK (status IN ('unread', 'read', 'replied')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);
-- Políticas de Segurança RLS (Row Level Security)
-- Requer habilitar RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
-- Projetos são públicos para leitura (SELECT)
CREATE POLICY "Projetos são públicos para leitura" ON public.projects FOR
SELECT USING (true);
-- Experiências são públicas para leitura (SELECT)
CREATE POLICY "Experiências são públicas para leitura" ON public.experiences FOR
SELECT USING (true);
-- Leads: Apenas admin autenticado pode ler (Você)
CREATE POLICY "Apenas admin autenticado pode ler leads" ON public.leads FOR
SELECT USING (auth.role() = 'authenticated');
-- Leads: Qualquer visitante (anônimo ou não) pode INSERIR novos contatos pelo site
CREATE POLICY "Visitantes podem enviar contatos" ON public.leads FOR
INSERT WITH CHECK (true);
-- Permissões totais (CRUD) para Projetos (apenas admin autenticado)
CREATE POLICY "Admins podem inserir projetos" ON public.projects FOR
INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins podem atualizar projetos" ON public.projects FOR
UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins podem deletar projetos" ON public.projects FOR DELETE USING (auth.role() = 'authenticated');
-- Permissões totais (CRUD) para Experiências (apenas admin autenticado)
CREATE POLICY "Admins podem inserir experiências" ON public.experiences FOR
INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Admins podem atualizar experiências" ON public.experiences FOR
UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins podem deletar experiências" ON public.experiences FOR DELETE USING (auth.role() = 'authenticated');
-- Permissões para Leads (Apenas Admin poder gerenciar, atualizar status etc.)
CREATE POLICY "Apenas admin atualiza leads" ON public.leads FOR
UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Apenas admin deleta leads" ON public.leads FOR DELETE USING (auth.role() = 'authenticated');