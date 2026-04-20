import Link from "next/link";
import { ArrowLeft, FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background p-6">
      <div className="flex flex-col items-center text-center max-w-md">
        <div className="p-4 bg-white/5 rounded-full mb-6 border border-white/10">
          <FileQuestion className="w-12 h-12 text-white/50" />
        </div>
        
        <h1 className="text-4xl font-bold text-white mb-3">
          404
        </h1>
        
        <h2 className="text-xl font-medium text-white/80 mb-4">
          Página não encontrada
        </h2>
        
        <p className="text-white/50 mb-8 leading-relaxed">
          A página que você está procurando não existe ou foi movida.
        </p>
        
        <Link
          href="/pt"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 rounded-lg hover:bg-primary-500 transition-colors text-white font-medium shadow-[0_0_30px_-10px_rgba(99,102,241,0.4)]"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao Início
        </Link>
      </div>
    </main>
  );
}
