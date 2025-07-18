
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FiSearch, FiUserPlus, FiInfo, FiEye, FiUserCheck, FiFileText } from "react-icons/fi";
import { useState } from "react";

interface Entrepreneur {
  name: string;
  avatar: string;
}

interface Idea {
  id: number;
  entrepreneur: Entrepreneur;
  projectName: string;
  edital: string;
  submissionDate: string;
  status: string;
  assignedReviewer: string | null;
}

interface IdeasSectionProps {
  ideas: Idea[];
  reviewers: Reviewer[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number, maxPages: number) => void;
}

// Tipagem para os avaliadores (adicione isso em seus tipos)
interface Reviewer {
  id: number;
  name: string;
  avatar: string;
  formation: string;
  isAdmin?: boolean;
  areasEspecializacao?: string[];
}

// Tipagem para as props do componente (se estiver criando um componente separado)
interface AssignReviewerModalProps {
  isAssignModalOpen: boolean;
  setIsAssignModalOpen: (open: boolean) => void;
  selectedIdea: number;
  reviewers: Reviewer[];
  confirmAssign: (reviewerName: string) => void;
}

export const IdeasSection = ({
  ideas,
  reviewers,
  currentPage,
  itemsPerPage,
  onPageChange
}: IdeasSectionProps) => {
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
  const [selectedIdea, setSelectedIdea] = useState<number | null>(null);

  const totalPages = Math.ceil(ideas.length / itemsPerPage);
  const paginatedIdeas = ideas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleAssignReviewer = (ideaId: number) => {
    setSelectedIdea(ideaId);
    setIsAssignModalOpen(true);
  };

  const confirmAssign = (reviewerName: string) => {
    alert(`Ideia ${selectedIdea} designada para ${reviewerName}`);
    setIsAssignModalOpen(false);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#3A6ABE] mb-2">Todas as Ideias</h2>
        <p className="text-[#3A6ABE]/80">Total de {ideas.length} ideias submetidas</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {paginatedIdeas.map((idea) => (
        <Card 
  key={idea.id}
  className="overflow-hidden border border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all duration-300 rounded-xl group"
>
  <div className="p-5">
    {/* Cabeçalho com avatar e informações do empreendedor */}
    <div className="flex items-start space-x-4 mb-5">
      <Avatar className="w-12 h-12 border-2 border-[#3A6ABE]/30 group-hover:border-[#F79B4B] transition-colors">
        <AvatarImage src={idea.entrepreneur.avatar} alt={idea.entrepreneur.name} />
        <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE] font-medium">
          {idea.entrepreneur.name.charAt(0)}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-semibold text-[#3A6ABE] truncate">{idea.entrepreneur.name}</h3>
        <span className="text-xs text-[#3A6ABE]/70">
          {new Date(idea.submissionDate).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
          })}
        </span>
      </div>
    </div>

    {/* Detalhes da ideia */}
    <div className="mb-5 space-y-3">
      <h4 className="font-bold text-xl text-[#3A6ABE] line-clamp-2 leading-tight">
        {idea.projectName}
      </h4>
      
      <div className="flex items-center text-sm text-[#3A6ABE]/80">
        <FiFileText className="mr-2 text-[#F79B4B]" size={16} />
        <span>Edital: {idea.edital}</span>
      </div>
      
      {idea.assignedReviewer && (
        <div className="flex items-center text-sm text-[#3A6ABE]/80">
          <FiUserCheck className="mr-2 text-[#F79B4B]" size={16} />
          <span>Avaliador: <span className="font-medium">{idea.assignedReviewer}</span></span>
        </div>
      )}
    </div>

    {/* Status e ações */}
    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
      <Badge 
        variant="outline" 
        className={`text-xs px-3 py-1.5 rounded-full font-medium ${
          idea.status === 'Avaliado' 
            ? 'bg-[#3A6ABE]/10 text-[#3A6ABE]' 
            : idea.status === 'Em análise' 
              ? 'bg-[#F79B4B]/10 text-[#F79B4B]' 
              : 'bg-gray-200/50 text-gray-600'
        }`}
      >
        {idea.status}
      </Badge>
      
      <div className="flex space-x-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="text-[#3A6ABE] border-[#3A6ABE]/40 hover:bg-[#3A6ABE]/10"
          onClick={() => handleAssignReviewer(idea.id)}
        >
          <FiUserPlus className="mr-1" size={14} />
          Designar
        </Button>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-[#3A6ABE] border-[#3A6ABE]/40 hover:bg-[#3A6ABE]/10"
        >
          <FiEye className="mr-1" size={14} />
          Detalhes
        </Button>
      </div>
    </div>
  </div>
</Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-8">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage - 1, totalPages);
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }

              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      onPageChange(pageNum, totalPages);
                    }}
                    isActive={pageNum === currentPage}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(currentPage + 1, totalPages);
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>

      {/* Assign Reviewer Modal */}
      <Dialog open={isAssignModalOpen} onOpenChange={setIsAssignModalOpen}>
        <DialogContent className="max-w-3xl rounded-xl border-[#3A6ABE]/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#3A6ABE] flex items-center">
              <span className="w-2 h-6 bg-[#F79B4B] rounded-full mr-3"></span>
              Designar Avaliador para Ideia #{selectedIdea}
            </DialogTitle>
            <DialogDescription className="text-[#3A6ABE]/80">
              Selecione um dos avaliadores qualificados para analisar esta ideia
            </DialogDescription>
          </DialogHeader>

          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="text-[#3A6ABE]/50" />
            </div>
            <Input
              type="text"
              placeholder="Buscar avaliador por nome ou especialização..."
              className="pl-10 border-[#3A6ABE]/40 focus:border-[#3A6ABE]/60 mb-4"
            // Adicione aqui a lógica de filtro
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-2">
            {reviewers.map(reviewer => (
              <Card
                key={reviewer.id}
                className="p-4 border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-md transition-all rounded-lg"
              >
                <div className="flex items-start space-x-4">
                  <Avatar className="h-14 w-14 border-2 border-[#3A6ABE]/30">
                    <AvatarImage src={reviewer.avatar} alt={reviewer.name} />
                    <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE] font-medium">
                      {reviewer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-[#3A6ABE] truncate">{reviewer.name}</h4>
                      {reviewer.isAdmin && (
                        <Badge className="bg-[#F79B4B]/10 text-[#F79B4B] text-xs">Admin</Badge>
                      )}
                    </div>

                    <p className="text-sm text-[#3A6ABE]/80 mt-1">{reviewer.formation}</p>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {reviewer.areasEspecializacao?.map((area, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs border-[#3A6ABE]/30 text-[#3A6ABE]/80"
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>

                    <div className="mt-3 flex justify-end">
                      <Button
                        size="sm"
                        className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90 h-9 rounded-lg font-medium"
                        onClick={() => confirmAssign(reviewer.name)}
                      >
                        <FiUserPlus className="mr-2" />
                        Designar
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <DialogFooter className="border-t border-[#3A6ABE]/10 pt-4">
            <div className="flex items-center text-sm text-[#3A6ABE]/80">
              <FiInfo className="mr-2" />
              <span>{reviewers.length} avaliadores disponíveis</span>
            </div>
            <Button
              variant="outline"
              className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10"
              onClick={() => setIsAssignModalOpen(false)}
            >
              Cancelar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};