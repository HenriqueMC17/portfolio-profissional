"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "convex/react";
import { Id } from "../../../../convex/_generated/dataModel";
import { api } from "../../../../convex/_generated/api";
import { ProjectSchema, ProjectEntity } from "../../../core/domain/entities/project.entity";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { useState } from "react";
import { motion } from "framer-motion";

const ProjectFormSchema = ProjectSchema.extend({
  tags: z.string(),
});

type ProjectFormInput = z.input<typeof ProjectFormSchema>;

interface ProjectFormProps {
  project?: ProjectEntity;
  onSuccess?: () => void;
  onCancel?: () => void;
}

export function ProjectForm({ project, onSuccess, onCancel }: ProjectFormProps) {
  const createProject = useMutation(api.projects.createProject);
  const updateProject = useMutation(api.projects.updateProject);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ProjectFormInput>({
    resolver: zodResolver(ProjectFormSchema),
    defaultValues: {
      title: project?.title || "",
      description: project?.description || "",
      content: project?.content || "",
      imageUrl: project?.imageUrl || "",
      githubUrl: project?.githubUrl || "",
      liveUrl: project?.liveUrl || "",
      tags: project?.tags?.join(", ") || "",
      featured: project?.featured || false,
    },
  });

  const onSubmit = async (data: ProjectFormInput) => {
    setIsSubmitting(true);
    setFormError(null);
    try {
      const payload = {
        title: data.title,
        description: data.description,
        content: data.content || undefined,
        imageUrl: data.imageUrl,
        githubUrl: data.githubUrl || undefined,
        liveUrl: data.liveUrl || undefined,
        tags: data.tags.split(",").map(t => t.trim()).filter(Boolean),
        featured: !!data.featured,
      };
      
      if (project?._id) {
        await updateProject({
          id: project._id as Id<"projects">,
          ...payload,
        });
      } else {
        await createProject(payload);
      }
      reset();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
      setFormError("Ocorreu um erro ao salvar o projeto.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit(onSubmit)} 
      className="space-y-6 bg-surface-l1/40 backdrop-blur-xl border border-white/8 p-8 rounded-2xl shadow-2xl transition-all duration-300 will-change-transform transform-[translateZ(0)]"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="space-y-2">
        <Label htmlFor="title">Título do Projeto</Label>
        <Input id="title" placeholder="Ex: EcoVolt Dashboard" {...register("title")} />
        {errors.title && <p className="text-red-400 text-xs">{errors.title.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição Curta</Label>
        <Input id="description" placeholder="Uma breve descrição sobre o projeto" {...register("description")} />
        {errors.description && <p className="text-red-400 text-xs">{errors.description.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="content">Conteúdo Detalhado (Markdown)</Label>
        <Textarea id="content" placeholder="Insira o texto detalhado do projeto..." rows={6} {...register("content")} />
        {errors.content && <p className="text-red-400 text-xs">{errors.content.message}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="imageUrl">URL da Imagem</Label>
        <Input id="imageUrl" placeholder="https://..." {...register("imageUrl")} />
        {errors.imageUrl && <p className="text-red-400 text-xs">{errors.imageUrl.message}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="githubUrl">URL do GitHub (Opcional)</Label>
          <Input id="githubUrl" placeholder="https://github.com/..." {...register("githubUrl")} />
          {errors.githubUrl && <p className="text-red-400 text-xs">{errors.githubUrl.message}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="liveUrl">URL do Projeto (Opcional)</Label>
          <Input id="liveUrl" placeholder="https://..." {...register("liveUrl")} />
          {errors.liveUrl && <p className="text-red-400 text-xs">{errors.liveUrl.message}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="tags">Tags (Separadas por vírgula)</Label>
        <Input id="tags" placeholder="React, Next.js, Tailwind" {...register("tags")} />
      </div>

      <div className="flex items-center gap-2">
        <input type="checkbox" id="featured" {...register("featured")} className="rounded border-white/10 bg-transparent text-primary-500 focus:ring-primary-500" />
        <Label htmlFor="featured">Destacar projeto na Home</Label>
      </div>

      {formError && <p className="text-red-400 text-sm text-center font-medium">{formError}</p>}

      <div className="flex justify-end gap-4 pt-4 border-t border-white/10">
        {onCancel && (
          <Button type="button" variant="ghost" onClick={onCancel}>
            Cancelar
          </Button>
        )}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Salvando..." : "Salvar Projeto"}
        </Button>
      </div>
    </motion.form>
  );
}
