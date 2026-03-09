"use server";

import { z } from "zod";
import { createClient } from "@supabase/supabase-js";
import { Database } from "@/types/database.types";

const contactSchema = z.object({
  name: z.string().min(2, "Nome é obrigatório"),
  email: z.string().email("Endereço de e-mail inválido"),
  message: z.string().min(10, "Mensagem precisa ter no mínimo 10 caracteres"),
});

export async function submitContactForm(prevState: unknown, formData: FormData) {
  try {
    const rawData = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Validação com Zod no lado do servidor
    const validatedData = contactSchema.parse(rawData);

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey) {
      console.error("Faltam as variáveis de ambiente do Supabase");
      return { success: false, message: "Erro de configuração do servidor. Tente conectar-se pelo LinkedIn." };
    }

    const supabase = createClient<Database>(supabaseUrl, supabaseKey);

    // Inserindo no Supabase (bypass RLS localmente se não testado, mas usamos a chave Anon pra simular visitante)
    const { error: dbError } = await supabase.from("leads").insert({
      name: validatedData.name,
      email: validatedData.email,
      message: validatedData.message,
    });

    if (dbError) {
      console.error("Database Insert Error:", dbError);
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
