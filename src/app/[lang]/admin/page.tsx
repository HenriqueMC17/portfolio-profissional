"use client";

import { useQuery, useMutation } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react";
import { ProjectEntity } from "@/core/domain/entities/project.entity";
import { ProjectForm } from "@/modules/projects/components/ProjectForm";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";
import { ToastNotification, Toast } from "@/components/ui/ToastNotification";

export default function AdminPage() {
  const projects = useQuery(api.projects.getAll);
  const leads = useQuery(api.leads.getLeads);
  const seedData = useMutation(api.seed.seedProjects);
  const deleteProject = useMutation(api.projects.deleteProject);

  const [isSeeding, setIsSeeding] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectEntity | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Custom Modals and Toasts states
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isSeedOpen, setIsSeedOpen] = useState(false);
  const [deletingProjectItem, setDeletingProjectItem] = useState<ProjectEntity | null>(null);

  const showToast = (message: string, type: "success" | "error" | "info" = "success") => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
  };

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedData();
      showToast("Projetos criados com sucesso!", "success");
    } catch (e) {
      console.error(e);
      showToast("Erro ao criar projetos.", "error");
    } finally {
      setIsSeeding(false);
    }
  };

  const handleEdit = (project: ProjectEntity) => {
    setEditingProject(project);
    setShowForm(true);
  };

  const handleAddClick = () => {
    setEditingProject(null);
    setShowForm(!showForm);
  };

  const handleFormSuccess = () => {
    setShowForm(false);
    setEditingProject(null);
    showToast("Projeto salvo com sucesso!", "success");
  };

  const handleFormCancel = () => {
    setShowForm(false);
    setEditingProject(null);
  };

  const handleConfirmDelete = async () => {
    if (!deletingProjectItem?._id) return;
    const id = deletingProjectItem._id;
    setDeletingProjectItem(null);
    setDeletingId(id);
    try {
      await deleteProject({ id: id as Id<"projects"> });
      showToast("Projeto excluído com sucesso!", "success");
    } catch (e) {
      console.error(e);
      showToast("Erro ao excluir projeto.", "error");
    } finally {
      setDeletingId(null);
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
          onClick={() => setIsSeedOpen(true)}
          disabled={isSeeding}
          className="bg-primary-900/50 hover:bg-primary-900 border border-primary-500/30 text-primary-300 px-4 py-2 rounded-md font-medium transition-colors text-sm cursor-pointer"
        >
          {isSeeding ? "Populando..." : "Popular Banco (Mock Data)"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Metric Cards */}
        <div className="bg-secondary/30 border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total de Projetos</h3>
          <p className="text-3xl font-bold text-white tabular-nums">{projects?.length || 0}</p>
        </div>
        <div className="bg-secondary/30 border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Projetos em Destaque</h3>
          <p className="text-3xl font-bold text-white tabular-nums">
            {projects?.filter((p: ProjectEntity) => p.featured).length || 0}
          </p>
        </div>
        <div className="bg-secondary/30 border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Leads Pendentes</h3>
          <p className="text-3xl font-bold text-primary-400 tabular-nums">
            {leads === undefined ? "..." : leads.filter((l) => l.status === "unread").length}
          </p>
        </div>
      </div>

      <div className="bg-secondary/20 border border-white/5 rounded-xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Seus Projetos</h2>
          <button 
            onClick={handleAddClick}
            className="bg-primary-600 hover:bg-primary-500 text-white px-4 py-2 rounded-md font-medium transition-colors"
          >
            {showForm && !editingProject ? "Fechar Formulário" : "Adicionar Projeto"}
          </button>
        </div>

        {showForm && (
          <div className="mb-8">
            <h3 className="text-lg font-medium text-white mb-4">
              {editingProject ? "Editar Projeto" : "Novo Projeto"}
            </h3>
            <ProjectForm 
              project={editingProject || undefined}
              onSuccess={handleFormSuccess} 
              onCancel={handleFormCancel} 
            />
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
                  <button 
                    onClick={() => handleEdit(project)}
                    className="text-sm text-primary-400 hover:text-primary-300 transition-colors"
                  >
                    Editar
                  </button>
                  <button 
                    disabled={deletingId === project._id}
                    onClick={() => setDeletingProjectItem(project)}
                    className="text-sm text-red-400 hover:text-red-300 disabled:opacity-50 transition-colors cursor-pointer"
                  >
                    {deletingId === project._id ? "Excluindo..." : "Excluir"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <ConfirmationModal
        isOpen={isSeedOpen}
        title="Popular Banco de Dados"
        message="Deseja popular o banco de dados com projetos fictícios de demonstração?"
        confirmLabel="Popular"
        onConfirm={() => {
          setIsSeedOpen(false);
          handleSeed();
        }}
        onCancel={() => setIsSeedOpen(false)}
      />

      <ConfirmationModal
        isOpen={deletingProjectItem !== null}
        title="Excluir Projeto"
        message={`Tem certeza que deseja excluir o projeto "${deletingProjectItem?.title}" permanentemente?`}
        confirmLabel="Excluir"
        isDanger
        onConfirm={handleConfirmDelete}
        onCancel={() => setDeletingProjectItem(null)}
      />

      <ToastNotification
        toasts={toasts}
        onDismiss={(id) => setToasts((prev) => prev.filter((t) => t.id !== id))}
      />
    </div>
  );
}
