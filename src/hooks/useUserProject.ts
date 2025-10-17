import { useState, useCallback } from 'react';

const API_BASE_URL = 'http://localhost:7070';

export interface ProjectMember {
  nome: string;
  cpf: string;
  fotoUrl: string;
}

export interface ProjectEdital {
  _id: string;
  name: string;
  submissionEndDate: string;
  sobre?: string;
  regulamento?: string;
  beneficios?: string;
}

export interface ProjectCreatedBy {
  _id: string;
  fullName: string;
  email: string;
}

export interface UserProject {
  _id: string;
  nomeProjeto: string;
  estagioIdeia: 'Ideação' | 'Validação' | 'MVP' | 'Operação' | 'Tração';
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
  lider: ProjectMember;
  integrantes: ProjectMember[];
  edital: ProjectEdital;
  createdBy: ProjectCreatedBy;
}

export type SubmissionState = 'loading' | 'no-active-edital' | 'not-submitted' | 'submitted' | 'error';

export interface UseUserProjectReturn {
  state: SubmissionState;
  project: UserProject | null;
  error: string | null;
  fetchProjectForEdital: (editalId: string) => Promise<void>;
}

export const useUserProject = (): UseUserProjectReturn => {
  const [state, setState] = useState<SubmissionState>('loading');
  const [project, setProject] = useState<UserProject | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchProjectForEdital = useCallback(async (editalId: string) => {
    setState('loading');
    setError(null);
    setProject(null);

    const token = localStorage.getItem('authToken');

    if (!token) {
      setState('error');
      setError('Autenticação necessária. Por favor, faça login novamente.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/projects/my/${editalId}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.status === 401) {
        setState('error');
        setError('Sua sessão expirou. Faça login novamente.');
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        // Redirecionar para login pode ser feito no componente
        return;
      }

      if (response.status === 403) {
        setState('error');
        setError('Você não tem acesso a este projeto.');
        return;
      }

      if (response.status === 404) {
        setState('not-submitted');
        setProject(null);
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao buscar seu projeto.');
      }

      const data = await response.json();
      setProject(data.project);
      setState('submitted');

    } catch (err: any) {
      setState('error');
      setError(err.message || 'Erro ao buscar seu projeto. Tente novamente.');
    }
  }, []);

  return {
    state,
    project,
    error,
    fetchProjectForEdital
  };
};
