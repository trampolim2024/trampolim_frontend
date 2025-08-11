import { useState } from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiSearch, FiUserPlus, FiInfo, FiEye, FiUserCheck, FiFileText, FiLink, FiVideo, FiX } from "react-icons/fi";

// --- INTERFACES UNIFICADAS E COMPLETAS ---
interface Edital {
  _id: string;
  name: string;
}

interface UserData {
  _id: string;
  fullName: string;
  educationLevel?: string;
  photoUrl?: string;
  reviewer?: { specializationAreas?: string[] };
}

interface Project {
  _id: string;
  nomeProjeto: string;
  estagioIdeia: string;
  status: 'Pendente' | 'Aprovado' | 'Reprovado' | 'Em Análise';
  edital: Edital | null; // O edital pode ser nulo se for deletado
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
}

interface IdeasSectionProps {
  ideas: Project[];
  reviewers: UserData[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
}

const API_BASE_URL = 'http://localhost:8080';

export const IdeasSection = ({ ideas, reviewers, currentPage, itemsPerPage, onPageChange }: IdeasSectionProps) => {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<Project | null>(null);

  const totalPages = Math.ceil(ideas.length / itemsPerPage);
  const paginatedIdeas = ideas.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleOpenAssignModal = (idea: Project) => {
    setSelectedIdea(idea);
    setIsAssignModalOpen(true);
  };
  
  const handleOpenDetailsModal = (idea: Project) => {
    setSelectedIdea(idea);
    setIsDetailsModalOpen(true);
  };

  const confirmAssign = (reviewerName: string) => {
    alert(`Ideia "${selectedIdea?.nomeProjeto}" designada para ${reviewerName}`);
    setIsAssignModalOpen(false);
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
        case 'Aprovado': return 'bg-green-100 text-green-800 border-green-200';
        case 'Reprovado': return 'bg-red-100 text-red-800 border-red-200';
        case 'Em Análise': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#3A6ABE] mb-2">Todas as Ideias</h2>
        <p className="text-[#3A6ABE]/80">Total de {ideas.length} ideias submetidas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedIdeas.map((idea) => (
          <Card key={idea._id} className="overflow-hidden border border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all rounded-xl group flex flex-col">
            <div className="p-5 flex flex-col flex-grow">
              <div className="flex items-start space-x-4 mb-5">
                <Avatar className="w-12 h-12 border-2 border-[#3A6ABE]/30">
                  <AvatarImage src={idea.lider.fotoUrl ? `${API_BASE_URL}${idea.lider.fotoUrl}` : ''} alt={idea.lider.nome} />
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
                                if (currentPage > 1) onPageChange(currentPage - 1);
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
                                    onPageChange(pageNum);
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
                                if (currentPage < totalPages) onPageChange(currentPage + 1);
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
            {selectedIdea?.linkPitch && <div><strong>Pitch:</strong> <a href={selectedIdea.linkPitch} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Abrir Link <FiLink className="inline ml-1"/></a></div>}
            {selectedIdea?.videoPitchUrl && <div><strong>Vídeo:</strong> <a href={`${API_BASE_URL}${selectedIdea.videoPitchUrl}`} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Assistir Vídeo <FiVideo className="inline ml-1"/></a></div>}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsModalOpen(false)}><FiX className="mr-2"/> Fechar</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- MODAL DE DESIGNAR AVALIADOR --- */}
      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Designar Avaliador para "{selectedIdea?.nomeProjeto}"</DialogTitle>
            <DialogDescription>Selecione um avaliador qualificado.</DialogDescription>
          </DialogHeader>
          <Input placeholder="Buscar avaliador..." className="my-4" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
            {reviewers.map(reviewer => (
              <Card key={reviewer._id} className="p-4 flex items-center space-x-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={reviewer.photoUrl ? `${API_BASE_URL}${reviewer.photoUrl}` : undefined} />
                  <AvatarFallback>{reviewer.fullName.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h4 className="font-semibold">{reviewer.fullName}</h4>
                  <p className="text-sm text-gray-500">{reviewer.educationLevel}</p>
                  <div className="mt-2 flex justify-end">
                    <Button size="sm" onClick={() => confirmAssign(reviewer.fullName)}><FiUserPlus className="mr-2" /> Designar</Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};