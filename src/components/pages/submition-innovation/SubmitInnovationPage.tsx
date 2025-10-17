import { useState, useEffect } from 'react';
import { EditalStatusBanner } from "@/components/shared/innovation/edital-status-banner/EditalStatusBanner";
import { InnovationForm } from "@/components/shared/innovation/innovation-form/InnovationForm";
import { ProjectViewer } from "@/components/shared/platform/project-viewer/ProjectViewer";
import { useUserProject } from '@/hooks/useUserProject';
import { FiAlertTriangle, FiCheckCircle } from "react-icons/fi";

// --- INTERFACES PARA OS DADOS DA API ---
interface Edital {
  _id: string;
  name: string;
  submissionStartDate: string;
  submissionEndDate: string;
  sobre?: string;
  regulamento?: string;
  beneficios?: string;
}

interface FormDataFromForm {
  nomeProjeto: string;
  estagioIdeia: string;
  descricaoIdeia: string;
  diferencialInovacao: string;
  modeloNegocio: string;
  tecnologiasUtilizadas: string[];
  linkPitch?: string;
  videoPitch?: File;
  lider: {
    nome: string;
    cpf: string;
    foto?: File;
  };
  integrantes: Array<{
    nome: string;
    cpf: string;
    foto?: File;
  }>;
}

const API_BASE_URL = 'http://localhost:7070';
const VALID_ESTAGIOS = ['Ideação', 'Validação', 'MVP', 'Operação', 'Tração'];

// --- HELPER FUNCTIONS ---

/**
 * Valida um CPF (básico)
 */
const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF.length === 11 && /^\d{11}$/.test(cleanCPF);
};

/**
 * Valida todos os dados do formulário
 */
const validateFormData = (formData: FormDataFromForm): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  // Validar projeto
  if (!formData.nomeProjeto?.trim()) {
    errors.push('Nome do projeto é obrigatório');
  }

  // Validar estágio
  if (!formData.estagioIdeia) {
    errors.push('Estágio da ideia é obrigatório');
  } else if (!VALID_ESTAGIOS.includes(formData.estagioIdeia)) {
    errors.push(`Estágio inválido. Valores aceitos: ${VALID_ESTAGIOS.join(', ')}`);
  }

  // Validar descrição
  if (!formData.descricaoIdeia?.trim()) {
    errors.push('Descrição da ideia é obrigatória');
  }

  // Validar diferencial
  if (!formData.diferencialInovacao?.trim()) {
    errors.push('Diferencial de inovação é obrigatório');
  }

  // Validar modelo de negócio
  if (!formData.modeloNegocio?.trim()) {
    errors.push('Modelo de negócio é obrigatório');
  }

  // Validar pitch (OBRIGATÓRIO: link OU vídeo)
  if (!formData.linkPitch?.trim() && !formData.videoPitch) {
    errors.push('Forneça um link do pitch (YouTube) OU faça upload do vídeo de pitch');
  }

  // Validar link do pitch se fornecido
  if (formData.linkPitch?.trim()) {
    try {
      new URL(formData.linkPitch);
    } catch {
      errors.push('Link do pitch deve ser uma URL válida');
    }
  }

  // Validar vídeo do pitch se fornecido
  if (formData.videoPitch) {
    if (!formData.videoPitch.type.startsWith('video/')) {
      errors.push('Arquivo de pitch deve ser um vídeo');
    }
    // Limitar tamanho do vídeo (50MB)
    if (formData.videoPitch.size > 50 * 1024 * 1024) {
      errors.push('Vídeo de pitch não pode exceder 50MB');
    }
  }

  // --- VALIDAR LÍDER ---
  if (!formData.lider) {
    errors.push('Dados do líder são obrigatórios');
  } else {
    if (!formData.lider.nome?.trim()) {
      errors.push('Nome do líder é obrigatório');
    }
    if (!formData.lider.cpf?.trim()) {
      errors.push('CPF do líder é obrigatório');
    } else if (!validateCPF(formData.lider.cpf)) {
      errors.push('CPF do líder inválido');
    }
    // ⭐ CRÍTICO: Validar foto do líder
    if (!formData.lider.foto) {
      errors.push('Foto do líder é OBRIGATÓRIA');
    } else if (!formData.lider.foto.type.startsWith('image/')) {
      errors.push('Foto do líder deve ser uma imagem');
    }
  }

  // --- VALIDAR INTEGRANTES ---
  // ⭐ CRÍTICO: Deve ter pelo menos 1 integrante
  if (!formData.integrantes || formData.integrantes.length === 0) {
    errors.push('Projeto deve ter pelo menos 1 integrante (além do líder)');
  } else {
    // Validar cada integrante
    if (formData.integrantes.length > 4) {
      errors.push('Projeto pode ter no máximo 4 integrantes além do líder');
    }

    formData.integrantes.forEach((integrante, index) => {
      if (!integrante.nome?.trim()) {
        errors.push(`Nome do integrante ${index + 1} é obrigatório`);
      }
      if (!integrante.cpf?.trim()) {
        errors.push(`CPF do integrante ${index + 1} é obrigatório`);
      } else if (!validateCPF(integrante.cpf)) {
        errors.push(`CPF do integrante ${index + 1} inválido`);
      }
      // ⭐ CRÍTICO: Cada integrante PRECISA de foto
      if (!integrante.foto) {
        errors.push(`Foto do integrante ${index + 1} é OBRIGATÓRIA`);
      } else if (!integrante.foto.type.startsWith('image/')) {
        errors.push(`Foto do integrante ${index + 1} deve ser uma imagem`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

export default function SubmitInnovationPage() {
  const [activeEdital, setActiveEdital] = useState<Edital | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const { state: projectState, project: userProject, error: projectError, fetchProjectForEdital } = useUserProject();

  useEffect(() => {
    const fetchPublicEditals = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // ✅ Endpoint correto
        const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/editals`);

        if (!response.ok) {
          throw new Error("Não foi possível carregar os editais do servidor. Tente novamente mais tarde.");
        }
        
        const data = await response.json();
        const allEditais: Edital[] = data.editals || [];

        // ✅ Buscar edital vigente
        const now = new Date();
        const currentActiveEdital = allEditais.find(edital => {
          const startDate = new Date(edital.submissionStartDate);
          const endDate = new Date(edital.submissionEndDate);
          return now >= startDate && now <= endDate;
        });
        
        setActiveEdital(currentActiveEdital || null);

        // ✅ Se encontrou edital vigente, buscar projeto do usuário para este edital
        if (currentActiveEdital) {
          // If the user submitted just now (flag in localStorage), keep hasSubmitted true
          const pendingKey = `submissionSent:${currentActiveEdital._id}`;
          const pending = !!localStorage.getItem(pendingKey);
          if (pending) setHasSubmitted(true);

          await fetchProjectForEdital(currentActiveEdital._id);

          // If project was found, clear pending flag
          if (localStorage.getItem(pendingKey) && typeof (window) !== 'undefined') {
            // if hook resolved to submitted, it will update UI; remove pending flag
            localStorage.removeItem(pendingKey);
          }
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublicEditals();
  }, [fetchProjectForEdital]);

  const handleSubmit = async (formDataFromForm: FormDataFromForm) => {
    // Reset validation errors
    setValidationErrors([]);

    // ✅ VALIDAR ANTES DE ENVIAR
    const validation = validateFormData(formDataFromForm);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      // Scroll para erros
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (!activeEdital) {
      setError("Nenhum edital ativo para submeter a ideia.");
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("Você precisa estar logado para submeter uma ideia.");
      return;
    }

    const formData = new FormData();

    // Adicionar campos de texto
    formData.append('nomeProjeto', formDataFromForm.nomeProjeto);
    formData.append('estagioIdeia', formDataFromForm.estagioIdeia);
    formData.append('descricaoIdeia', formDataFromForm.descricaoIdeia);
    formData.append('diferencialInovacao', formDataFromForm.diferencialInovacao);
    formData.append('modeloNegocio', formDataFromForm.modeloNegocio);
    formData.append('tecnologiasUtilizadas', JSON.stringify(formDataFromForm.tecnologiasUtilizadas || []));
    
    // Adicionar pitch (link OU vídeo)
    if (formDataFromForm.linkPitch?.trim()) {
      formData.append('linkPitch', formDataFromForm.linkPitch);
    }

    formData.append('edital', activeEdital._id);

    // ✅ Adicionar dados do líder (FOTO OBRIGATÓRIA)
    formData.append('leader[name]', formDataFromForm.lider.nome);
    formData.append('leader[cpf]', formDataFromForm.lider.cpf);
    if (formDataFromForm.lider.foto) {
      formData.append('leader[photo]', formDataFromForm.lider.foto);
    }

    // ✅ Adicionar dados dos integrantes (FOTO OBRIGATÓRIA para cada um)
    formDataFromForm.integrantes.forEach((integrante, index) => {
      formData.append(`members[${index}][name]`, integrante.nome);
      formData.append(`members[${index}][cpf]`, integrante.cpf);
      if (integrante.foto) {
        formData.append(`members[${index}][photo]`, integrante.foto);
      }
    });

    // ✅ Adicionar vídeo de pitch se fornecido
    if (formDataFromForm.videoPitch) {
      formData.append('pitchVideo', formDataFromForm.videoPitch);
    }

    try {
      // mark pending submission so UI doesn't immediately show form on reload
      const pendingKey = `submissionSent:${activeEdital._id}`;
      localStorage.setItem(pendingKey, '1');

      const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/projects`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const result = await response.json();

      if (!response.ok) {
        // remove pending flag on failure
        localStorage.removeItem(pendingKey);
        // If backend returned a specific error, show it
        throw new Error(result?.message || `Ocorreu um erro ao submeter o projeto. Status ${response.status}`);
      }

      // POST succeeded (201). The backend may process asynchronously; retry GET /projects/my/:editalId a few times
      setError(null);
      setValidationErrors([]);
      setHasSubmitted(true);

      if (activeEdital) {
        const maxAttempts = 5;
        let attempt = 0;
        let found = false;
        while (attempt < maxAttempts && !found) {
          const exists = await fetchProjectForEdital(activeEdital._id);
          if (exists) {
            found = true;
            break;
          }
          attempt++;
          // wait before retrying
          await new Promise(res => setTimeout(res, 800));
        }

        // clear pending key if we couldn't find project after retries - still consider success but warn user
        if (!found) {
          // keep pending key so on reload we try fetch again; show notice
          setError('Projeto submetido, mas a confirmação ainda está sendo processada pelo servidor. Se não aparecer em alguns segundos, atualize a página.');
        } else {
          localStorage.removeItem(pendingKey);
        }
      }

      // Scroll para cima para ver a mensagem de sucesso / aviso
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      setError(`❌ Erro na Submissão: ${err.message}`);
      // ensure pending flag is removed if there was an error
      if (activeEdital) localStorage.removeItem(`submissionSent:${activeEdital._id}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (isLoading) {
    return <div className="text-center py-20 text-xl text-gray-600">Verificando editais abertos...</div>;
  }
  
  if (error && !validationErrors.length && projectState !== 'submitted' && projectState !== 'not-submitted') {
    return <div className="text-center py-20 text-xl text-red-500 bg-red-50 p-8 rounded-lg max-w-4xl mx-auto">{error}</div>;
  }

  // Estado: Nenhum edital ativo
  if (!activeEdital && !isLoading) {
    return (
      <div className="bg-[#F5F5F5] min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-20">
            <h1 className="text-3xl font-bold text-[#3A6ABE] mb-4">Nenhum Edital Ativo</h1>
            <p className="text-lg text-[#3A6ABE]/80">Nenhum edital ativo no momento. Volte mais tarde para submeter sua ideia!</p>
          </div>
        </div>
      </div>
    );
  }

  // Estado: Projeto já submetido
  if (projectState === 'submitted' && userProject) {
    return (
      <div className="bg-[#F5F5F5] min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Banner de sucesso */}
          <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-8 rounded-r-lg flex items-start">
            <FiCheckCircle className="text-green-500 mt-1 mr-3 flex-shrink-0 text-xl" />
            <div>
              <h3 className="text-green-800 font-bold mb-1">Projeto Submetido!</h3>
              <p className="text-green-700">Seu projeto foi submetido com sucesso. Confira os dados abaixo.</p>
            </div>
          </div>

          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3A6ABE] to-[#F79B4B]">
              Sua Ideia Inovadora
            </h1>
          </div>

          <EditalStatusBanner 
            hasActiveEdital={!!activeEdital} 
            editalInfo={activeEdital ? {
              name: activeEdital.name,
              deadline: new Date(activeEdital.submissionEndDate).toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric'
              }),
              description: `Submissões abertas de ${new Date(activeEdital.submissionStartDate).toLocaleDateString('pt-BR')} até ${new Date(activeEdital.submissionEndDate).toLocaleDateString('pt-BR')}`
            } : undefined} 
          />

          <ProjectViewer project={userProject} />
        </div>
      </div>
    );
  }

  // Estado: Carregando projeto
  if (projectState === 'loading') {
    return <div className="text-center py-20 text-xl text-gray-600">Verificando seu status de submissão...</div>;
  }

  // Estado: Erro ao carregar projeto
  if (projectState === 'error' && projectError) {
    return (
      <div className="bg-[#F5F5F5] min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg flex items-start">
            <FiAlertTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0 text-lg" />
            <div>
              <h3 className="text-red-800 font-bold mb-1">Erro</h3>
              <p className="text-red-700">{projectError}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Estado: Não submetido / Pode submeter
  if (projectState === 'not-submitted') {
    return (
      <div className="bg-[#F5F5F5] min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- BANNER DE ERROS DE VALIDAÇÃO --- */}
          {validationErrors.length > 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
              <div className="flex items-start">
                <FiAlertTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0 text-lg" />
                <div>
                  <h3 className="text-red-800 font-bold mb-2">Erros no Formulário:</h3>
                  <ul className="text-red-700 list-disc list-inside space-y-1">
                    {validationErrors.map((err, idx) => (
                      <li key={idx}>{err}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* --- BANNER DO ERRO GERAL --- */}
          {error && validationErrors.length === 0 && (
            <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8 rounded-r-lg">
              <div className="flex items-start">
                <FiAlertTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0" />
                <p className="text-red-700">{error}</p>
              </div>
            </div>
          )}

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
              deadline: new Date(activeEdital.submissionEndDate).toLocaleDateString('pt-BR', { 
                day: '2-digit', 
                month: 'long', 
                year: 'numeric'
              }),
              description: `Submissões abertas de ${new Date(activeEdital.submissionStartDate).toLocaleDateString('pt-BR')} até ${new Date(activeEdital.submissionEndDate).toLocaleDateString('pt-BR')}`
            } : undefined} 
          />
          
          {!!activeEdital && !hasSubmitted && (
            <div className="bg-[#F79B4B]/10 border-l-4 border-[#F79B4B] p-4 my-8 rounded-r-lg flex items-start">
              <FiAlertTriangle className="text-[#F79B4B] mt-1 mr-3 flex-shrink-0" />
              <p className="text-[#3A6ABE]/90">
                <strong>Atenção:</strong> Cada participante pode submeter apenas uma ideia por edital. <strong>Todos os campos marcados com * são obrigatórios.</strong>
              </p>
            </div>
          )}
          
          <InnovationForm 
            hasActiveEdital={!!activeEdital}
            hasSubmitted={hasSubmitted}
            onSubmit={handleSubmit}
            userProject={userProject}
          />
        </div>
      </div>
    );
  }

  // Fallback (não deve chegar aqui)
  return null;
}