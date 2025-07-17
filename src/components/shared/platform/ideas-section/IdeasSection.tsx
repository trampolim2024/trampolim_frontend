import { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

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

interface Reviewer {
  id: number;
  name: string;
  avatar: string;
  formation: string;
}

interface IdeasSectionProps {
  ideas: Idea[];
  reviewers: Reviewer[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number, maxPages: number) => void;
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
          <Card key={idea.id} className="overflow-hidden border border-gray-200 hover:border-[#3A6ABE]/30 hover:shadow-md transition-all">
            <div className="p-4">
              <div className="flex items-center space-x-3 mb-4">
                <Avatar className="w-10 h-10 border border-[#3A6ABE]/30">
                  <AvatarImage src={idea.entrepreneur.avatar} alt={idea.entrepreneur.name} />
                  <AvatarFallback>{idea.entrepreneur.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium text-[#3A6ABE]">{idea.entrepreneur.name}</h3>
                  <span className="text-xs text-[#3A6ABE]/80">{idea.submissionDate}</span>
                </div>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-lg text-[#3A6ABE] mb-1">{idea.projectName}</h4>
                <p className="text-sm text-[#3A6ABE]/80">Edital: {idea.edital}</p>
                {idea.assignedReviewer && (
                  <p className="text-sm text-[#3A6ABE]/80 mt-1">
                    Avaliador: <span className="font-medium">{idea.assignedReviewer}</span>
                  </p>
                )}
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <span className={`text-xs px-2 py-1 rounded-full ${
                  idea.status === 'Avaliado' 
                    ? 'bg-green-100 text-green-800' 
                    : idea.status === 'Em análise' 
                      ? 'bg-yellow-100 text-yellow-800' 
                      : 'bg-gray-100 text-gray-800'
                }`}>
                  {idea.status}
                </span>
              </div>
              
              <Button 
                className="w-full bg-[#3A6ABE] hover:bg-[#3A6ABE]/90 mb-2"
                onClick={() => handleAssignReviewer(idea.id)}
              >
                Designar Avaliador
              </Button>
              <Button variant="outline" className="w-full border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10">
                Ver detalhes
              </Button>
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
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-[#3A6ABE]">Designar Avaliador para Ideia #{selectedIdea}</DialogTitle>
          </DialogHeader>
          <div className="max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviewers.map(reviewer => (
                <Card key={reviewer.id} className="p-4 flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarImage src={reviewer.avatar} alt={reviewer.name} />
                      <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium text-[#3A6ABE]">{reviewer.name}</h4>
                      <p className="text-sm text-[#3A6ABE]/80">{reviewer.formation}</p>
                    </div>
                  </div>
                  <Button 
                    size="sm" 
                    className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90"
                    onClick={() => confirmAssign(reviewer.name)}
                  >
                    Designar
                  </Button>
                </Card>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};