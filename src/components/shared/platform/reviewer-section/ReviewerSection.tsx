import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { FiMail, FiAward } from 'react-icons/fi';

interface Reviewer {
  id: number;
  name: string;
  avatar: string;
  formation: string;
  age: number;
  isAdmin: boolean;
}

interface ReviewersSectionProps {
  reviewers: Reviewer[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number, maxPages: number) => void;
  onMakeAdmin: (reviewerId: number) => void;
}

export const ReviewersSection = ({
  reviewers,
  currentPage,
  itemsPerPage,
  onPageChange,
  onMakeAdmin
}: ReviewersSectionProps) => {
  const totalPages = Math.ceil(reviewers.length / itemsPerPage);
  const paginatedReviewers = reviewers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#3A6ABE] mb-2">Gerenciar Avaliadores</h2>
        <p className="text-[#3A6ABE]/80">Total de {reviewers.length} avaliadores cadastrados</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {paginatedReviewers.map((reviewer) => (
          <Card key={reviewer.id} className="overflow-hidden border border-gray-200 hover:border-[#3A6ABE]/30 hover:shadow-md transition-all">
            <div className="p-4">
              <div className="flex flex-col items-center mb-4">
                <Avatar className="w-16 h-16 border-2 border-[#3A6ABE]/50 mb-3">
                  <AvatarImage src={reviewer.avatar} alt={reviewer.name} />
                  <AvatarFallback>{reviewer.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg text-[#3A6ABE] text-center">{reviewer.name}</h3>
                {reviewer.isAdmin && (
                  <span className="text-xs bg-[#3A6ABE] text-white px-2 py-1 rounded-full mt-1">Administrador</span>
                )}
              </div>
              
              <div className="space-y-2 mb-4">
                <p className="text-sm text-[#3A6ABE]">
                  <span className="font-medium">Formação:</span> {reviewer.formation}
                </p>
                <p className="text-sm text-[#3A6ABE]">
                  <span className="font-medium">Idade:</span> {reviewer.age} anos
                </p>
              </div>
              
              <div className="flex space-x-2">
                <Button variant="outline" className="flex-1 border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10">
                  <FiMail className="mr-2" /> Email
                </Button>
                <Button 
                  variant={reviewer.isAdmin ? "default" : "outline"} 
                  className={`flex-1 ${reviewer.isAdmin ? 'bg-[#F79B4B] hover:bg-[#F79B4B]/90' : 'border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10'}`}
                  onClick={() => onMakeAdmin(reviewer.id)}
                >
                  <FiAward className="mr-2" /> {reviewer.isAdmin ? 'Admin' : 'Tornar Admin'}
                </Button>
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
    </div>
  );
};