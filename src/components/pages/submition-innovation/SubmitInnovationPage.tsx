import { useState, useEffect } from 'react';
import { EditalStatusBanner } from "@/components/shared/innovation/edital-status-banner/EditalStatusBanner";
import { InnovationForm } from "@/components/shared/innovation/innovation-form/InnovationForm";
import { FiAlertTriangle } from "react-icons/fi";

// --- INTERFACES PARA OS DADOS DA API ---
interface Edital {
  _id: string;
  name: string;
  submissionStartDate: string;
  submissionEndDate: string;
}

// A URL da sua API
const API_BASE_URL = 'http://localhost:8080';

export default function SubmitInnovationPage() {
  const [activeEdital, setActiveEdital] = useState<Edital | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const fetchPublicEditals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // --- CORREÇÃO APLICADA AQUI: 'editais' -> 'editals' ---
        const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/editals`);

        if (!response.ok) {
          throw new Error("Não foi possível carregar os editais do servidor. Tente novamente mais tarde.");
        }
        
        const data = await response.json();
        const allEditais: Edital[] = data.editals || [];

        const now = new Date();
        const currentActiveEdital = allEditais.find(edital => {
          const startDate = new Date(edital.submissionStartDate);
          const endDate = new Date(edital.submissionEndDate);
          return now >= startDate && now <= endDate;
        });
        
        setActiveEdital(currentActiveEdital || null);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicEditals();
  }, []);

  const handleSubmit = async (formDataFromForm: any) => {
    if (!activeEdital) {
      alert("Nenhum edital ativo para submeter a ideia.");
      return;
    }
    const token = localStorage.getItem('authToken');
    if (!token) {
      alert("Você precisa estar logado para submeter uma ideia.");
      return;
    }
    const formData = new FormData();
    formData.append('nomeProjeto', formDataFromForm.nomeProjeto);
    formData.append('estagioIdeia', formDataFromForm.estagioIdeia);
    formData.append('descricaoIdeia', formDataFromForm.descricaoIdeia);
    formData.append('diferencialInovacao', formDataFromForm.diferencialInovacao);
    formData.append('modeloNegocio', formDataFromForm.modeloNegocio);
    formData.append('tecnologiasUtilizadas', JSON.stringify(formDataFromForm.tecnologiasUtilizadas || []));
    formData.append('linkPitch', formDataFromForm.linkPitch || '');
    formData.append('edital', activeEdital._id);
    formData.append('leader[name]', formDataFromForm.lider.nome);
    formData.append('leader[cpf]', formDataFromForm.lider.cpf);
    if (formDataFromForm.lider.foto) formData.append('leader[photo]', formDataFromForm.lider.foto);
    formDataFromForm.integrantes.forEach((integrante: any, index: number) => {
        formData.append(`members[${index}][name]`, integrante.nome);
        formData.append(`members[${index}][cpf]`, integrante.cpf);
        if (integrante.foto) formData.append(`members[${index}][photo]`, integrante.foto);
    });
    if (formDataFromForm.videoPitch) formData.append('pitchVideo', formDataFromForm.videoPitch);

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/projects`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || "Ocorreu um erro ao submeter o projeto.");
      }
      alert("Projeto submetido com sucesso!");
      setHasSubmitted(true);
    } catch (err: any) {
      alert("Erro na Submissão: " + err.message);
    }
  };

  if (isLoading) {
    return <div className="text-center py-20 text-xl text-gray-600">Verificando editais abertos...</div>;
  }
  
  if (error) {
    return <div className="text-center py-20 text-xl text-red-500 bg-red-50 p-8 rounded-lg max-w-4xl mx-auto">{error}</div>;
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3A6ABE] to-[#F79B4B]">
            Submeta sua Ideia Inovadora
          </h1>
          <p className="text-xl text-[#3A6ABE]/90 max-w-3xl mx-auto mt-4">
            Transforme sua ideia em realidade com o apoio do nosso programa de inovação
          </p>
        </div>
        
        <EditalStatusBanner 
          hasActiveEdital={!!activeEdital} 
          editalInfo={activeEdital ? {
            name: activeEdital.name,
            deadline: new Date(activeEdital.submissionEndDate).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric'}),
            description: `Submissões abertas de ${new Date(activeEdital.submissionStartDate).toLocaleDateString()} até ${new Date(activeEdital.submissionEndDate).toLocaleDateString()}`
          } : undefined} 
        />
        
        {!!activeEdital && !hasSubmitted && (
          <div className="bg-[#F79B4B]/10 border-l-4 border-[#F79B4B] p-4 my-8 rounded-r-lg flex items-start">
            <FiAlertTriangle className="text-[#F79B4B] mt-1 mr-3 flex-shrink-0" />
            <p className="text-[#3A6ABE]/90">
              <strong>Atenção:</strong> Cada participante pode submeter apenas uma ideia por edital.
            </p>
          </div>
        )}
        
        <InnovationForm 
          hasActiveEdital={!!activeEdital}
          hasSubmitted={hasSubmitted}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}