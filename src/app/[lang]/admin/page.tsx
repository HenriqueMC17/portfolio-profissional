"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { useState } from "react";
import { ProjectEntity } from "../../../../../core/domain/entities/project.entity";
import { ProjectForm } from "../../../../../modules/projects/components/ProjectForm";

export default function AdminPage() {
  const [isSeeding, setIsSeeding] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedData();
      alert("Projetos criados com sucesso!");
    } catch (e) {
      console.error(e);
      alert("Erro ao criar projetos.");
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Visão Geral</h1>
          <p className="text-muted-foreground">Gerencie o conteúdo do seu portfólio.</p>
        </div>
        <button 
          onClick={handleSeed}
          disabled={isSeeding}
          className="bg-primary-900/50 hover:bg-primary-900 border border-primary-500/30 text-primary-300 px-4 py-2 rounded-md font-medium transition-colors text-sm"
        >
          {isSeeding ? "Populando..." : "Popular Banco (Mock Data)"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Cards */}
        <div className="bg-secondary/30 border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total de Projetos</h3>
          <p className="text-3xl font-bold text-white">{projects?.length || 0}</p>
        </div>
        <div className="bg-secondary/30 border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Projetos em Destaque</h3>
          <p className="text-3xl font-bold text-white">
            {projects?.filter((p: ProjectEntity) => p.featured).length || 0}
          </p>
        </div>
        <div className="bg-secondary/30 border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Leads Pendentes</h3>
          <p className="text-3xl font-bold text-primary-400">Em breve</p>
        </div>
      </div>

      <div className="bg-secondary/20 border border-white/5 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Seus Projetos</h2>
          <button 
            onClick={() => setShowForm(!showForm)}
            className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            {showForm ? "Fechar Formulário" : "Adicionar Projeto"}
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-white mb-4">Novo Projeto</h3>
            <ProjectForm onSuccess={() => setShowForm(false)} onCancel={() => setShowForm(false)} />
          </div>
        )}

        {projects === undefined ? (
          <div className="text-center py-8 text-muted-foreground">Carregando...</div>
        ) : projects.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">Nenhum projeto cadastrado.</div>
        ) : (
          <div className="space-y-4">
            {projects.map((project: ProjectEntity) => (
              <div key={project._id} className="flex items-center justify-between p-4 bg-black/20 rounded-lg border border-white/5">
                <div>
                  <h4 className="font-medium text-white">{project.title}</h4>
                  <p className="text-sm text-muted-foreground truncate max-w-md">{project.description}</p>
                </div>
                <div className="flex items-center gap-4">
                  {project.featured && (
                    <span className="px-2 py-1 bg-yellow-500/20 text-yellow-500 text-xs rounded-md border border-yellow-500/20">
                      Destaque
                    </span>
                  )}
                  <button className="text-sm text-primary-400 hover:text-primary-300">Editar</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
