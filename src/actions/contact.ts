"use server";

import { z } from "zod";
import { contactSchema } from "@/types/contact";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../convex/_generated/api";

export async function submitContactForm(prevState: unknown, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Validação com Zod no lado do servidor
    const validatedData = contactSchema.parse(rawData);

    try {
      await fetchMutation(api.leads.insertLead, {
        name: validatedData.name,
        email: validatedData.email,
        message: validatedData.message,
      });
    } catch (dbError) {
      console.error("Convex Insert Error:", dbError);
      return { success: false, message: "Ocorreu um erro ao salvar sua mensagem. Tente novamente mais tarde." };
    }

    // Integração com Webhook do n8n para automações externas (ex: Notificação WhatsApp)
    const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL;
    if (n8nWebhookUrl) {
      try {
        await fetch(n8nWebhookUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(validatedData),
        });
      } catch (n8nError) {
        console.error("N8N Webhook trigger failed:", n8nError);
        // Não quebra o sistema seletivo primário de inserção caso a automação do n8n falhe timeout
      }
    }

    return { success: true, message: "Recebi sua mensagem! Retornarei o contato em breve." };

  } catch (error) {
    if (error instanceof z.ZodError) {
      return { success: false, message: "Preencha todos os campos corretamente." };
    }
    return { success: false, message: "Algo deu errado. Tente novamente." };
  }
}
