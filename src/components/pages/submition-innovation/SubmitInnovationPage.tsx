import { useState, useEffect } from 'react';
import { EditalStatusBanner } from "@/components/shared/innovation/edital-status-banner/EditalStatusBanner";
import { InnovationForm } from "@/components/shared/innovation/innovation-form/InnovationForm";
import { ProjectViewer } from "@/components/shared/platform/project-viewer/ProjectViewer";
import { FiAlertTriangle } from "react-icons/fi";

const API_BASE_URL = 'http://localhost:7070';

// ==================== TIPOS ====================
type SubmissionState = 'loading' | 'no-active-edital' | 'not-submitted' | 'submitted' | 'error';

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

interface UserProject {
  _id: string;
  nomeProjeto: string;
  estagioIdeia: string;
  descricaoIdeia: string;
  diferencialInovacao: string;
  modeloNegocio: string;
  tecnologiasUtilizadas: string[];
  linkPitch?: string;
  videoPitchUrl?: string;
  status: 'Pendente' | 'Aprovado' | 'Reprovado';
  createdAt: string;
  updatedAt: string;
  averageScore?: number;
  finalJustification?: string;
  lider: any;
  integrantes: any[];
  edital: any;
  createdBy: any;
}

// ==================== VALIDAÇÕES ====================
const VALID_ESTAGIOS = ['Ideação', 'Validação', 'MVP', 'Operação', 'Tração'];

const validateCPF = (cpf: string): boolean => {
  const cleanCPF = cpf.replace(/\D/g, '');
  return cleanCPF.length === 11 && /^\d{11}$/.test(cleanCPF);
};

const validateFormData = (formData: FormDataFromForm): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (!formData.nomeProjeto?.trim()) {
    errors.push('Nome do projeto é obrigatório');
  }

  if (!formData.estagioIdeia) {
    errors.push('Estágio da ideia é obrigatório');
  } else if (!VALID_ESTAGIOS.includes(formData.estagioIdeia)) {
    errors.push(`Estágio inválido. Valores aceitos: ${VALID_ESTAGIOS.join(', ')}`);
  }

  if (!formData.descricaoIdeia?.trim()) {
    errors.push('Descrição da ideia é obrigatória');
  }

  if (!formData.diferencialInovacao?.trim()) {
    errors.push('Diferencial de inovação é obrigatório');
  }

  if (!formData.modeloNegocio?.trim()) {
    errors.push('Modelo de negócio é obrigatório');
  }

  if (!formData.linkPitch?.trim() && !formData.videoPitch) {
    errors.push('Forneça um link do pitch (YouTube) OU faça upload do vídeo de pitch');
  }

  if (formData.linkPitch?.trim()) {
    try {
      new URL(formData.linkPitch);
    } catch {
      errors.push('Link do pitch deve ser uma URL válida');
    }
  }

  if (formData.videoPitch) {
    if (!formData.videoPitch.type.startsWith('video/')) {
      errors.push('Arquivo de pitch deve ser um vídeo');
    }
    if (formData.videoPitch.size > 50 * 1024 * 1024) {
      errors.push('Vídeo de pitch não pode exceder 50MB');
    }
  }

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
    if (!formData.lider.foto) {
      errors.push('Foto do líder é OBRIGATÓRIA');
    } else if (!formData.lider.foto.type.startsWith('image/')) {
      errors.push('Foto do líder deve ser uma imagem');
    }
  }

  if (!formData.integrantes || formData.integrantes.length === 0) {
    errors.push('Projeto deve ter pelo menos 1 integrante (além do líder)');
  } else {
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
      if (!integrante.foto) {
        errors.push(`Foto do integrante ${index + 1} é OBRIGATÓRIA`);
      } else if (!integrante.foto.type.startsWith('image/')) {
        errors.push(`Foto do integrante ${index + 1} deve ser uma imagem`);
      }
    });
  }

  return { isValid: errors.length === 0, errors };
};

// ==================== COMPONENTE PRINCIPAL ====================
export default function SubmitInnovationPage() {
  // Estados
  const [submissionState, setSubmissionState] = useState<SubmissionState>('loading');
  const [activeEdital, setActiveEdital] = useState<Edital | null>(null);
  const [userProject, setUserProject] = useState<UserProject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // ==================== EFEITO 1: Buscar edital vigente ====================
  useEffect(() => {
    const fetchPublicEditals = async () => {
      setSubmissionState('loading');
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/editals`);

        if (!response.ok) {
          throw new Error("Não foi possível carregar os editais do servidor.");
        }

        const data = await response.json();
        const allEditais: Edital[] = data.editals || [];

        // Encontrar edital vigente
        const now = new Date();
        const currentActiveEdital = allEditais.find(edital => {
          const startDate = new Date(edital.submissionStartDate);
          const endDate = new Date(edital.submissionEndDate);
          return now >= startDate && now <= endDate;
        });

        if (!currentActiveEdital) {
          setSubmissionState('no-active-edital');
          return;
        }

        setActiveEdital(currentActiveEdital);
        // ✅ Continua para EFEITO 2 via dependência
      } catch (err: any) {
        console.error('❌ Erro ao carregar editais:', err);
        setError(err.message);
        setSubmissionState('error');
      }
    };

    fetchPublicEditals();
  }, []);

  // ==================== EFEITO 2: Buscar projeto do usuário ====================
  useEffect(() => {
    if (!activeEdital) return; // Aguardar até ter edital

    const fetchUserProject = async () => {
      setSubmissionState('loading');
      setError(null);
      
      const token = localStorage.getItem('authToken');
      console.log('🔵 [Effect 2] Token:', token ? 'EXISTE' : 'NÃO EXISTE');
      console.log('🔵 [Effect 2] Edital ID:', activeEdital._id);

      if (!token) {
        console.log('🔵 [Effect 2] Sem token - NÃO LOGADO');
        setSubmissionState('not-submitted');
        return;
      }

      try {
        const url = `${API_BASE_URL}/api/v1/trampolim/projects/my/${activeEdital._id}`;
        console.log('🔵 [Effect 2] Fazendo GET em:', url);
        
        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('🔵 [Effect 2] Response status:', response.status);

        // ✅ Projeto encontrado
        if (response.status === 200) {
          const data = await response.json();
          console.log('✅ [Effect 2] Projeto encontrado:', data);
          setUserProject(data.project || data);
          setSubmissionState('submitted');
          return;
        }

        // ✅ Nenhum projeto encontrado (primeira submissão)
        if (response.status === 404) {
          console.log('⚠️ [Effect 2] Status 404 - Nenhum projeto encontrado');
          setSubmissionState('not-submitted');
          return;
        }

        // ❌ Erro 401 - sessão expirada
        if (response.status === 401) {
          console.log('❌ [Effect 2] Status 401 - Sessão expirada');
          localStorage.removeItem('authToken');
          localStorage.removeItem('user');
          setSubmissionState('not-submitted');
          return;
        }

        // ❌ Erro 403 - acesso negado
        if (response.status === 403) {
          console.log('❌ [Effect 2] Status 403 - Acesso negado');
          setError('Você não tem acesso a este projeto.');
          setSubmissionState('error');
          return;
        }

        // ❌ Outros erros
        console.log('❌ [Effect 2] Status desconhecido:', response.status);
        setError(`Erro ao buscar seu projeto (${response.status})`);
        setSubmissionState('error');
      } catch (err: any) {
        console.error('❌ [Effect 2] Erro na requisição:', err);
        setError('Erro ao buscar seu projeto. Tente recarregar a página.');
        setSubmissionState('error');
      }
    };

    fetchUserProject();
  }, [activeEdital]); // Roda quando activeEdital muda

  // ==================== HANDLER DE SUBMISSÃO ====================
  const handleSubmit = async (formDataFromForm: FormDataFromForm) => {
    setValidationErrors([]);

    // Validar formulário
    const validation = validateFormData(formDataFromForm);
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
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
    formData.append('nomeProjeto', formDataFromForm.nomeProjeto);
    formData.append('estagioIdeia', formDataFromForm.estagioIdeia);
    formData.append('descricaoIdeia', formDataFromForm.descricaoIdeia);
    formData.append('diferencialInovacao', formDataFromForm.diferencialInovacao);
    formData.append('modeloNegocio', formDataFromForm.modeloNegocio);
    formData.append('tecnologiasUtilizadas', JSON.stringify(formDataFromForm.tecnologiasUtilizadas || []));

    if (formDataFromForm.linkPitch?.trim()) {
      formData.append('linkPitch', formDataFromForm.linkPitch);
    }

    formData.append('edital', activeEdital._id);

    formData.append('leader[name]', formDataFromForm.lider.nome);
    formData.append('leader[cpf]', formDataFromForm.lider.cpf);
    if (formDataFromForm.lider.foto) {
      formData.append('leader[photo]', formDataFromForm.lider.foto);
    }

    formDataFromForm.integrantes.forEach((integrante, index) => {
      formData.append(`members[${index}][name]`, integrante.nome);
      formData.append(`members[${index}][cpf]`, integrante.cpf);
      if (integrante.foto) {
        formData.append(`members[${index}][photo]`, integrante.foto);
      }
    });

    if (formDataFromForm.videoPitch) {
      formData.append('pitchVideo', formDataFromForm.videoPitch);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/projects`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      console.log('📤 [handleSubmit] POST Response status:', response.status);
      const result = await response.json();
      console.log('📤 [handleSubmit] POST Response body:', result);

      // ⚡ NOVO: Capturar erro 409 (submissão duplicada)
      if (response.status === 409) {
        console.log('⚠️ Já existe submissão:', result);
        setError(result.message || 'Você já submeteu uma ideia para este edital.');

        // Buscar o projeto existente
        if (result.existingProjectId) {
          try {
            const projectResponse = await fetch(
              `${API_BASE_URL}/api/v1/trampolim/projects/my/${result.existingProjectId}`,
              {
                headers: {
                  'Authorization': `Bearer ${token}`,
                  'Content-Type': 'application/json'
                }
              }
            );

            if (projectResponse.status === 200) {
              const projectData = await projectResponse.json();
              setUserProject(projectData.project || projectData);
              setSubmissionState('submitted');
              console.log('✅ Projeto existente carregado:', projectData);
            }
          } catch (err) {
            console.error('❌ Erro ao buscar projeto existente:', err);
          }
        }

        window.scrollTo({ top: 0, behavior: 'smooth' });
        return;
      }

      // Erro na submissão
      if (!response.ok) {
        throw new Error(result?.message || `Erro ao submeter. Status ${response.status}`);
      }

      // ✅ Sucesso!
      console.log('✅ Projeto submetido com sucesso!');
      setError(null);
      setValidationErrors([]);
      
      // Atualizar estado para mostrar o projeto
      const submittedProject = result.project || result;
      setUserProject(submittedProject);
      setSubmissionState('submitted');
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('❌ Erro na submissão:', err);
      setError(`❌ Erro: ${err.message}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // ==================== RENDERIZAÇÃO CONDICIONAL ====================

  // Estado: Carregando
  if (submissionState === 'loading') {
    return (
      <div className="text-center py-20 text-xl text-gray-600">
        Carregando...
      </div>
    );
  }

  // Estado: Erro
  if (submissionState === 'error') {
    return (
      <div className="bg-[#F5F5F5] min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg flex items-start">
            <FiAlertTriangle className="text-red-500 mt-1 mr-3 flex-shrink-0 text-lg" />
            <div>
              <h3 className="text-red-800 font-bold mb-1">Erro</h3>
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Estado: Nenhum edital ativo
  if (submissionState === 'no-active-edital') {
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
  if (submissionState === 'submitted' && userProject) {
    return (
      <div className="bg-[#F5F5F5] min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#3A6ABE] to-[#F79B4B]">
              Sua Ideia Submetida
            </h1>
          </div>

          {activeEdital && (
            <EditalStatusBanner
              hasActiveEdital={true}
              editalInfo={{
                name: activeEdital.name,
                deadline: new Date(activeEdital.submissionEndDate).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                }),
                description: `Submissões abertas de ${new Date(activeEdital.submissionStartDate).toLocaleDateString('pt-BR')} até ${new Date(activeEdital.submissionEndDate).toLocaleDateString('pt-BR')}`
              }}
            />
          )}

          {error && (
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 my-8 rounded-r-lg flex items-start">
              <FiAlertTriangle className="text-yellow-500 mt-1 mr-3 flex-shrink-0" />
              <p className="text-yellow-700">{error}</p>
            </div>
          )}

          <ProjectViewer project={userProject as any} />
        </div>
      </div>
    );
  }

  // Estado: Pode submeter (não submeteu)
  return (
    <div className="bg-[#F5F5F5] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Erros de validação */}
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

        {/* Erro geral */}
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

        {activeEdital && (
          <EditalStatusBanner
            hasActiveEdital={true}
            editalInfo={{
              name: activeEdital.name,
              deadline: new Date(activeEdital.submissionEndDate).toLocaleDateString('pt-BR', {
                day: '2-digit',
                month: 'long',
                year: 'numeric'
              }),
              description: `Submissões abertas de ${new Date(activeEdital.submissionStartDate).toLocaleDateString('pt-BR')} até ${new Date(activeEdital.submissionEndDate).toLocaleDateString('pt-BR')}`
            }}
          />
        )}

        <div className="bg-[#F79B4B]/10 border-l-4 border-[#F79B4B] p-4 my-8 rounded-r-lg flex items-start">
          <FiAlertTriangle className="text-[#F79B4B] mt-1 mr-3 flex-shrink-0" />
          <p className="text-[#3A6ABE]/90">
            <strong>Atenção:</strong> Cada participante pode submeter apenas uma ideia por edital. <strong>Todos os campos marcados com * são obrigatórios.</strong>
          </p>
        </div>

        <InnovationForm
          hasActiveEdital={!!activeEdital}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}