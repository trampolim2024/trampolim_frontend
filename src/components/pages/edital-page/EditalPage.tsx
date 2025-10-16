import { useState, useEffect } from 'react';
import { EditalDetailsPage } from "@/components/shared/platform/edital-details-page/EditalDetailsPage";

// URL base da sua API
const API_BASE_URL = 'http://localhost:7070';

// Interface para os dados do edital que vêm da API
// A estrutura é a mesma, pois esperamos receber o mesmo tipo de objeto
interface EditalFromAPI {
  _id: string;
  name: string;
  submissionStartDate: string; 
  submissionEndDate: string;
  createdAt: string;
  pdfUrl: string;
  sobre?: string;
  regulamento?: string;
  beneficios?: string;
  description?: string;
  rules?: string[];
  benefits?: string[];
  aiSummary?: string;
}

export default function EditalPage() {
  const [activeEdital, setActiveEdital] = useState<EditalFromAPI | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // A função de busca agora é muito mais simples
    const fetchActiveEdital = async () => {
      try {
        // --- MUDANÇA PRINCIPAL: Usamos a nova rota específica ---
        const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/editals/active/current`);

        // Se a resposta for 404, significa que não há edital ativo.
        // Isso não é um erro, é um estado válido da aplicação.
        if (response.status === 404) {
          setActiveEdital(null);
          return; // Finaliza a execução aqui
        }

        // Trata outros erros de servidor (como 500)
        if (!response.ok) {
          throw new Error('Falha ao buscar o edital vigente.');
        }

        const data = await response.json();
        
        // A resposta agora deve ser o objeto do edital, provavelmente dentro de uma propriedade "data" ou "edital"
        // Vamos checar as duas possibilidades para robustez.
        setActiveEdital(data.data || data.edital || null);

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchActiveEdital();
  }, []); // O array vazio [] garante que a busca só acontece uma vez

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F5F5F5]">
        <p className="text-lg text-[#3A6ABE] font-medium animate-pulse">Buscando editais vigentes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[#F5F5F5]">
        <p className="text-lg text-red-600">Erro: {error}</p>
      </div>
    );
  }

  // A lógica para preparar os dados para o componente filho continua a mesma
  const editalDataForChild = activeEdital ? {
    _id: activeEdital._id,
    name: activeEdital.name,
    submissionStartDate: activeEdital.submissionStartDate,
    submissionEndDate: activeEdital.submissionEndDate,
    pdfUrl: activeEdital.pdfUrl,
    sobre: activeEdital.sobre || "Descrição não fornecida.",
    regulamento: activeEdital.regulamento || "Regulamento não fornecido.",
    beneficios: activeEdital.beneficios || "Benefícios não fornecidos.",
    aiSummary: activeEdital.aiSummary || "Resumo por IA indisponível."
  } : undefined;

  return (
    <EditalDetailsPage 
      hasActiveEdital={!!activeEdital} 
      edital={editalDataForChild} 
    />
  );
}