import { useState, useEffect } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiUserPlus, FiEye, FiFileText, FiLink, FiVideo, FiX } from "react-icons/fi";

// --- INTERFACES UNIFICADAS E COMPLETAS ---
interface Edital {
  _id: string;
  name: string;
}

interface UserData {
  _id: string;
  fullName: string;
  email?: string;
  educationLevel?: string;
  photoUrl?: string;
  type?: string[];
  reviewer?: { 
    mentoredStartup?: boolean;
    incubationDescription?: string;
    specializationAreas?: string[] 
  };
}

interface Project {
  _id: string;
  nomeProjeto: string;
  estagioIdeia: string;
  status: 'Pendente' | 'Aprovado' | 'Reprovado' | 'Em Análise';
  edital: Edital | null;
  lider: { nome: string; cpf: string; fotoUrl: string; };
  integrantes: { nome: string; cpf: string; fotoUrl: string; }[];
  createdAt: string;
  descricaoIdeia: string;
  diferencialInovacao: string;
  modeloNegocio: string;
  tecnologiasUtilizadas: string[];
  linkPitch?: string;
  videoPitchUrl?: string;
  createdBy: UserData;
  designatedReviewers?: UserData[];
}

interface IdeasSectionProps {
  editalId?: string;
  adminToken?: string;
  ideas?: Project[];
  reviewers?: UserData[];
  currentPage?: number;
  itemsPerPage?: number;
  onPageChange?: (page: number) => void;
}

const API_BASE_URL = 'http://localhost:7070';

// ==================== FUNÇÃO AUXILIAR ====================
const getFullImageUrl = (imageUrl: string | undefined): string => {
  if (!imageUrl) return '';
  // Se é URL absoluta (começa com http/https), retorna como está
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) return imageUrl;
  // Se é URL relativa, concatena com base URL
  return `${API_BASE_URL}${imageUrl}`;
};

export const IdeasSection = (props: IdeasSectionProps) => {
  const {
    editalId,
    adminToken,
    ideas = [],
    reviewers = [],
    currentPage: externalCurrentPage = 1,
    itemsPerPage = 6,
    onPageChange
  } = props;
  // ==================== ESTADOS ====================
  const [projects, setProjects] = useState<Project[]>(ideas);
  const [reviewersList, setReviewersList] = useState<UserData[]>(reviewers);
  const [isLoadingProjects, setIsLoadingProjects] = useState(false);
  const [isLoadingReviewers, setIsLoadingReviewers] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Project | null>(null);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(externalCurrentPage);
  const [searchReviewerQuery, setSearchReviewerQuery] = useState('');
  const [isAssigning, setIsAssigning] = useState(false);
  const [assignError, setAssignError] = useState<string | null>(null);
  const [assignSuccess, setAssignSuccess] = useState(false);
  const [designatedReviewersByProject, setDesignatedReviewersByProject] = useState<Record<string, string[]>>({});

  // Se houver tanto editalId quanto adminToken, carrega dados do backend (modo admin)
  const isAdminMode = !!(editalId && adminToken);

  // ==================== EFEITO 1: Carregar Projetos (Modo Admin) ====================
  useEffect(() => {
    if (!isAdminMode) {
      // Modo compatibilidade: usar dados das props
      setProjects(ideas);
      setReviewersList(reviewers);
      return;
    }

    const fetchProjects = async () => {
      setIsLoadingProjects(true);
      setAssignError(null);

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/trampolim/admin/projects/edital/${editalId}`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${adminToken}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.status === 401 || response.status === 403) {
          throw new Error('Acesso negado. Apenas administradores podem acessar.');
        }

        if (!response.ok) throw new Error(`Erro ${response.status}`);

        const data = await response.json();
        setProjects(data.projects || []);

        // Rastrear revisores designados por projeto
        const trackingMap: Record<string, string[]> = {};
        (data.projects || []).forEach((project: Project) => {
          if (project.designatedReviewers && project.designatedReviewers.length > 0) {
            trackingMap[project._id] = project.designatedReviewers.map(r => r._id);
          }
        });
        setDesignatedReviewersByProject(trackingMap);

        console.log('✅ Projetos carregados:', data.projects?.length);
      } catch (err: any) {
        console.error('❌ Erro ao carregar projetos:', err);
        setAssignError(err.message);
      } finally {
        setIsLoadingProjects(false);
      }
    };

    fetchProjects();
  }, [editalId, adminToken, isAdminMode]);

  // ==================== HANDLERS ====================
  const handleOpenAssignModal = async (idea: Project) => {
    setSelectedIdea(idea);
    setSearchReviewerQuery('');
    setAssignError(null);
    setAssignSuccess(false);

    // Se em modo admin e lista de revisores vazia, carregar
    if (isAdminMode && reviewersList.length === 0 && !isLoadingReviewers) {
      setIsLoadingReviewers(true);

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/v1/trampolim/users?type=reviewer`,
          {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${adminToken}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (!response.ok) throw new Error(`Erro ${response.status}`);

        const data = await response.json();
        console.log('🔵 Response completo de revisores:', data);
        
        // Tratamento robusto para múltiplas estruturas de resposta
        let users = [];
        if (data.users && Array.isArray(data.users)) {
          users = data.users;
        } else if (data.data && Array.isArray(data.data)) {
          users = data.data;
        } else if (Array.isArray(data)) {
          users = data;
        }
        
        setReviewersList(users);
        console.log('✅ Revisores carregados:', users?.length);
      } catch (err: any) {
        console.error('❌ Erro ao carregar revisores:', err);
        setAssignError('Erro ao carregar revisores');
      } finally {
        setIsLoadingReviewers(false);
      }
    }

    setIsAssignModalOpen(true);
  };

  const handleOpenDetailsModal = (idea: Project) => {
    setSelectedIdea(idea);
    setIsDetailsModalOpen(true);
  };

  const handleAssignReviewer = async (reviewerId: string) => {
    if (!selectedIdea || !isAdminMode) return;

    // Verificar se já está designado
    const alreadyDesignated = designatedReviewersByProject[selectedIdea._id]?.includes(reviewerId);
    if (alreadyDesignated) {
      setAssignError('Este avaliador já foi designado para este projeto.');
      return;
    }

    setIsAssigning(true);
    setAssignError(null);
    setAssignSuccess(false);

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/trampolim/admin/projects/assign-reviewer`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            projectId: selectedIdea._id,
            reviewerId: reviewerId
          })
        }
      );

      const result = await response.json();

      if (response.status === 409) {
        setAssignError(result.message || 'Revisor já designado');
        return;
      }

      if (!response.ok) {
        throw new Error(result.message || `Erro ${response.status}`);
      }

      setAssignSuccess(true);

      // Atualizar lista de projetos
      setProjects(prev =>
        prev.map(p =>
          p._id === selectedIdea._id ? result.project : p
        )
      );

      // Atualizar rastreamento
      setDesignatedReviewersByProject(prev => ({
        ...prev,
        [selectedIdea._id]: [
          ...(prev[selectedIdea._id] || []),
          reviewerId
        ]
      }));

      console.log('✅ Avaliador designado com sucesso');

      // Fechar modal após 1.5 segundos
      setTimeout(() => {
        setIsAssignModalOpen(false);
        setSelectedIdea(null);
      }, 1500);
    } catch (err: any) {
      console.error('❌ Erro ao designar avaliador:', err);
      setAssignError(err.message || 'Erro ao designar avaliador');
    } finally {
      setIsAssigning(false);
    }
  };

  const handleRemoveReviewer = async (projectId: string, reviewerId: string) => {
    if (!adminToken || !isAdminMode) return;

    if (!confirm('Tem certeza que deseja remover este avaliador?')) return;

    try {
      const response = await fetch(
        `${API_BASE_URL}/api/v1/trampolim/admin/projects/remove-reviewer`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${adminToken}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            projectId: projectId,
            reviewerId: reviewerId
          })
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || `Erro ${response.status}`);
      }

      // Atualizar lista de projetos
      setProjects(prev =>
        prev.map(p =>
          p._id === projectId ? result.project : p
        )
      );

      // Atualizar rastreamento
      setDesignatedReviewersByProject(prev => ({
        ...prev,
        [projectId]: prev[projectId]?.filter(id => id !== reviewerId) || []
      }));

      console.log('✅ Avaliador removido com sucesso');
    } catch (err: any) {
      console.error('❌ Erro ao remover avaliador:', err);
      alert(`Erro: ${err.message}`);
    }
  };

  // ==================== LÓGICA DE FILTRO ====================
  const filteredReviewers = (Array.isArray(reviewersList) ? reviewersList : []).filter(reviewer => {
    if (!searchReviewerQuery) return true;

    const query = searchReviewerQuery.toLowerCase();
    return (
      reviewer.fullName.toLowerCase().includes(query) ||
      (reviewer.email && reviewer.email.toLowerCase().includes(query))
    );
  });

  const totalPages = Math.ceil(projects.length / itemsPerPage);
  const paginatedProjects = projects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'Aprovado': return 'bg-green-100 text-green-800 border-green-200';
      case 'Reprovado': return 'bg-red-100 text-red-800 border-red-200';
      case 'Em Análise': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (onPageChange) onPageChange(page);
  };

  if (isLoadingProjects) {
    return (
      <div className="flex justify-center items-center py-20">
        <p className="text-lg text-gray-600">Carregando projetos...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#3A6ABE] mb-2">Todas as Ideias</h2>
        <p className="text-[#3A6ABE]/80">Total de {projects.length} ideias submetidas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedProjects.map((idea) => (
          <Card key={idea._id} className="overflow-hidden border border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all rounded-xl group flex flex-col">
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-start space-x-4 mb-5">
                <Avatar className="w-12 h-12 border-2 border-[#3A6ABE]/30">
                  <AvatarImage src={getFullImageUrl(idea.lider.fotoUrl)} alt={idea.lider.nome} />
                  <AvatarFallback>{idea.lider.nome.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-[#3A6ABE] truncate" title={idea.lider.nome}>{idea.lider.nome}</h3>
                  <span className="text-xs text-[#3A6ABE]/70">{new Date(idea.createdAt).toLocaleDateString('pt-BR')}</span>
                </div>
              </div>

              <h4 className="font-bold text-xl text-[#3A6ABE] line-clamp-2 leading-tight flex-grow">{idea.nomeProjeto}</h4>

              <div className="text-sm text-[#3A6ABE]/80 mt-2">
                <FiFileText className="inline mr-2 text-[#F79B4B]" />
                Edital: <span className="font-medium">{idea.edital ? idea.edital.name : 'Não encontrado'}</span>
              </div>

              {/* NOVO: Mostrar Revisores Designados */}
              {idea.designatedReviewers && idea.designatedReviewers.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <p className="text-xs font-semibold text-[#3A6ABE] mb-2">
                    Avaliadores Designados ({idea.designatedReviewers.length}):
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {idea.designatedReviewers.map(reviewer => (
                      <Badge key={reviewer._id} variant="secondary" className="text-xs">
                        {reviewer.fullName}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between mt-auto pt-4">
                <Badge variant="outline" className={`text-xs ${getStatusBadgeClass(idea.status)}`}>{idea.status}</Badge>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" onClick={() => handleOpenAssignModal(idea)}><FiUserPlus className="mr-1" /> Designar</Button>
                  <Button variant="outline" size="sm" onClick={() => handleOpenDetailsModal(idea)}><FiEye className="mr-1" /> Detalhes</Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) handlePageChange(currentPage - 1);
                  }}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      handlePageChange(pageNum);
                    }}
                    isActive={pageNum === currentPage}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < totalPages) handlePageChange(currentPage + 1);
                  }}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* --- MODAL DE DETALHES DA IDEIA --- */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl text-[#3A6ABE]">{selectedIdea?.nomeProjeto}</DialogTitle>
            <DialogDescription>Submetido por {selectedIdea?.lider.nome} em {selectedIdea ? new Date(selectedIdea.createdAt).toLocaleDateString('pt-BR') : ''}</DialogDescription>
          </DialogHeader>
          <div className="max-h-[70vh] overflow-y-auto pr-4 space-y-4 text-sm text-gray-700">
            <div><strong className="text-[#3A6ABE]">Estágio da Ideia:</strong> {selectedIdea?.estagioIdeia}</div>
            <div><strong className="text-[#3A6ABE]">Descrição:</strong> <p className="mt-1">{selectedIdea?.descricaoIdeia}</p></div>
            <div><strong className="text-[#3A6ABE]">Diferencial de Inovação:</strong> <p className="mt-1">{selectedIdea?.diferencialInovacao}</p></div>
            <div><strong className="text-[#3A6ABE]">Modelo de Negócio:</strong> <p className="mt-1">{selectedIdea?.modeloNegocio}</p></div>
            <div><strong className="text-[#3A6ABE]">Tecnologias:</strong> {selectedIdea?.tecnologiasUtilizadas.join(', ')}</div>
            {selectedIdea?.linkPitch && <div><strong>Pitch:</strong> <a href={selectedIdea.linkPitch} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Abrir Link <FiLink className="inline ml-1" /></a></div>}
            {selectedIdea?.videoPitchUrl && <div><strong>Vídeo:</strong> <a href={`${API_BASE_URL}${selectedIdea.videoPitchUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Assistir Vídeo <FiVideo className="inline ml-1" /></a></div>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsModalOpen(false)}><FiX className="mr-2" /> Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- MODAL DE DESIGNAR AVALIADOR --- */}
      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              Designar Avaliador para "{selectedIdea?.nomeProjeto}"
            </DialogTitle>
            <DialogDescription>
              {selectedIdea?.designatedReviewers && selectedIdea.designatedReviewers.length > 0 && (
                <p className="mt-2 text-yellow-700">
                  ⚠️ {selectedIdea.designatedReviewers.length} avaliador(es) já designado(s)
                </p>
              )}
            </DialogDescription>
          </DialogHeader>

          {/* Mensagens de Erro/Sucesso */}
          {assignError && (
            <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
              <p className="text-red-700 text-sm">{assignError}</p>
            </div>
          )}

          {assignSuccess && (
            <div className="bg-green-50 border-l-4 border-green-500 p-3 rounded">
              <p className="text-green-700 text-sm">✅ Avaliador designado com sucesso!</p>
            </div>
          )}

          {/* Input de Busca */}
          <Input
            placeholder="Buscar avaliador por nome ou email..."
            value={searchReviewerQuery}
            onChange={(e) => setSearchReviewerQuery(e.target.value)}
            className="my-4"
            disabled={isAssigning}
          />

          {/* Lista de Revisores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
            {isLoadingReviewers ? (
              <p className="text-gray-500">Carregando avaliadores...</p>
            ) : filteredReviewers.length > 0 ? (
              filteredReviewers.map(reviewer => {
                const isAlreadyDesignated = selectedIdea?.designatedReviewers?.some(
                  r => r._id === reviewer._id
                );

                return (
                  <Card
                    key={reviewer._id}
                    className={`p-4 flex flex-col space-y-3 ${isAlreadyDesignated ? 'bg-gray-50 border-gray-300' : ''
                      }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={getFullImageUrl(reviewer.photoUrl)}
                        />
                        <AvatarFallback>{reviewer.fullName.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-sm">{reviewer.fullName}</h4>
                        <p className="text-xs text-gray-500">{reviewer.educationLevel}</p>
                        {reviewer.email && (
                          <p className="text-xs text-gray-400">{reviewer.email}</p>
                        )}
                      </div>
                    </div>

                    {reviewer.reviewer?.specializationAreas && (
                      <div className="flex flex-wrap gap-1">
                        {reviewer.reviewer.specializationAreas.slice(0, 2).map((area, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    )}

                    <div className="flex justify-end">
                      {isAlreadyDesignated ? (
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRemoveReviewer(selectedIdea!._id, reviewer._id)}
                          disabled={isAssigning}
                        >
                          <FiX className="mr-2 h-3 w-3" /> Remover
                        </Button>
                      ) : (
                        <Button
                          size="sm"
                          onClick={() => handleAssignReviewer(reviewer._id)}
                          disabled={isAssigning}
                        >
                          {isAssigning ? 'Designando...' : (
                            <>
                              <FiUserPlus className="mr-2 h-3 w-3" /> Designar
                            </>
                          )}
                        </Button>
                      )}
                    </div>
                  </Card>
                );
              })
            ) : (
              <p className="text-gray-500 text-sm">Nenhum avaliador encontrado</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAssignModalOpen(false)}>
              <FiX className="mr-2" /> Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};