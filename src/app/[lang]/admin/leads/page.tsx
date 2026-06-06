"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Mail, MailOpen, Trash2, CheckCircle, ArrowLeft, Loader2, Inbox } from "lucide-react";
import Link from "next/link";

export default function LeadsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = use(params);
  const leads = useQuery(api.leads.getLeads);
  const updateStatus = useMutation(api.leads.updateLeadStatus);
  const deleteLead = useMutation(api.leads.deleteLead);

  const [filter, setFilter] = useState<string>("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleStatusChange = async (id: any, newStatus: string) => {
    try {
      await updateStatus({ id, status: newStatus });
    } catch (e) {
      console.error(e);
      alert("Erro ao atualizar status da mensagem.");
    }
  };

  const handleDelete = async (id: any) => {
    if (!confirm("Tem certeza que deseja excluir esta mensagem permanentemente?")) {
      return;
    }
    setDeletingId(id);
    try {
      await deleteLead({ id });
    } catch (e) {
      console.error(e);
      alert("Erro ao excluir mensagem.");
    } finally {
      setDeletingId(null);
    }
  };

  const filteredLeads = leads?.filter((lead) => {
    if (filter === "all") return true;
    return lead.status === filter;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-primary-500/10 text-primary-400 border border-primary-500/20">Não Lida</span>;
      case "read":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-white/5 text-white/50 border border-white/5">Lida</span>;
      case "replied":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Respondida</span>;
      case "archived":
        return <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-yellow-500/10 text-yellow-400 border border-yellow-500/20">Arquivada</span>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Link 
            href={`/${lang}/admin`}
            className="inline-flex items-center gap-2 text-xs text-muted-foreground hover:text-white mb-3 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar ao painel</span>
          </Link>
          <h1 className="text-3xl font-bold text-white flex items-center gap-3">
            <Mail className="w-8 h-8 text-primary-400" />
            Mensagens / Leads
          </h1>
          <p className="text-muted-foreground mt-1">Gerencie os contatos recebidos através do seu portfólio.</p>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-secondary/30 border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Total de Mensagens</h3>
          <p className="text-3xl font-bold text-white tabular-nums">{leads?.length || 0}</p>
        </div>
        <div className="bg-secondary/30 border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Não Lidas</h3>
          <p className="text-3xl font-bold text-primary-400 tabular-nums">
            {leads?.filter((l) => l.status === "unread").length || 0}
          </p>
        </div>
        <div className="bg-secondary/30 border border-white/5 rounded-xl p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-1">Respondidas</h3>
          <p className="text-3xl font-bold text-emerald-400 tabular-nums">
            {leads?.filter((l) => l.status === "replied").length || 0}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/5 pb-4">
        {[
          { key: "all", label: "Todas" },
          { key: "unread", label: "Não Lidas" },
          { key: "read", label: "Lidas" },
          { key: "replied", label: "Respondidas" },
          { key: "archived", label: "Arquivadas" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key)}
            className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
              filter === tab.key
                ? "bg-primary-600 text-white"
                : "text-muted-foreground hover:text-white hover:bg-white/5"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {leads === undefined ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-primary-500 animate-spin" />
        </div>
      ) : filteredLeads && filteredLeads.length > 0 ? (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredLeads.map((lead) => (
              <motion.div
                key={lead._id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`border rounded-xl p-6 transition-all ${
                  lead.status === "unread"
                    ? "bg-primary-950/10 border-primary-500/20 shadow-md shadow-primary-950/10"
                    : "bg-secondary/20 border-white/5"
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="font-bold text-white text-lg">{lead.name}</h3>
                      {getStatusBadge(lead.status || "unread")}
                    </div>
                    <a
                      href={`mailto:${lead.email}`}
                      className="text-sm text-primary-400 hover:underline inline-block mt-1"
                    >
                      {lead.email}
                    </a>
                  </div>
                  <span className="text-xs text-muted-foreground tabular-nums">
                    {new Date(lead.createdAt).toLocaleString("pt-BR", {
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </span>
                </div>

                <div className="p-4 bg-black/40 border border-white/5 rounded-lg mb-6">
                  <p className="text-white/80 text-sm whitespace-pre-wrap leading-relaxed">{lead.message}</p>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/5">
                  <div className="flex flex-wrap gap-2">
                    {lead.status === "unread" && (
                      <Button
                        size="sm"
                        variant="secondary"
                        onClick={() => handleStatusChange(lead._id, "read")}
                        className="gap-1.5"
                      >
                        <MailOpen className="w-4 h-4" />
                        Marcar como lida
                      </Button>
                    )}
                    {lead.status !== "unread" && lead.status !== "replied" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(lead._id, "unread")}
                        className="gap-1.5"
                      >
                        <Mail className="w-4 h-4" />
                        Marcar como não lida
                      </Button>
                    )}
                    {lead.status !== "replied" && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleStatusChange(lead._id, "replied")}
                        className="gap-1.5 border-emerald-500/20 hover:border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/5 hover:text-emerald-300"
                      >
                        <CheckCircle className="w-4 h-4" />
                        Marcar como respondida
                      </Button>
                    )}
                    {lead.status !== "archived" && (
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleStatusChange(lead._id, "archived")}
                      >
                        Arquivar
                      </Button>
                    )}
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/5"
                    disabled={deletingId === lead._id}
                    onClick={() => handleDelete(lead._id)}
                  >
                    {deletingId === lead._id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-white/10 rounded-2xl bg-secondary/5">
          <Inbox className="w-12 h-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-bold text-white mb-1">Nenhuma mensagem</h3>
          <p className="text-muted-foreground text-sm">Não há contatos cadastrados sob este filtro.</p>
        </div>
      )}
    </div>
  );
}