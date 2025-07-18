import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { FiMail, FiAward, FiBook, FiCalendar, FiShield } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";


interface Reviewer {
  id: number;
  name: string;
  avatar: string;
  formation: string;
  age: number;
  isAdmin?: boolean;
  areasEspecializacao?: string[]; 
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
          <Card
            key={reviewer.id}
            className="overflow-hidden border border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all duration-300 rounded-xl group"
          >
            <div className="p-5 flex flex-col h-full">
              {/* Cabeçalho com avatar */}
              <div className="flex flex-col items-center mb-4">
                <div className="relative">
                  <Avatar className="w-20 h-20 border-[3px] border-[#3A6ABE]/30 group-hover:border-[#F79B4B] transition-colors mx-auto">
                    <AvatarImage src={reviewer.avatar} alt={reviewer.name} />
                    <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE] text-2xl font-medium">
                      {reviewer.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {reviewer.isAdmin && (
                    <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-[#F79B4B] hover:bg-[#F79B4B]/90 text-white shadow-md flex items-center">
                        <FiShield className="mr-1" size={12} /> Admin
                      </Badge>
                    </div>
                  )}
                </div>

                <h3 className="font-bold text-xl text-[#3A6ABE] text-center leading-tight">
                  {reviewer.name}
                </h3>
              </div>

              {/* Informações principais */}
              <div className="flex-1 space-y-3 mb-5">
                <div className="flex items-center text-sm text-[#3A6ABE]">
                  <FiBook className="mr-3 text-[#F79B4B]" size={16} />
                  <span className="flex-1">
                    <span className="font-medium">Formação:</span> {reviewer.formation}
                  </span>
                </div>

                <div className="flex items-center text-sm text-[#3A6ABE]">
                  <FiCalendar className="mr-3 text-[#F79B4B]" size={16} />
                  <span className="flex-1">
                    <span className="font-medium">Idade:</span> {reviewer.age} anos
                  </span>
                </div>

                {/* Áreas de especialização */}
                {reviewer.areasEspecializacao && (
                  <div className="pt-2">
                    <h4 className="text-xs font-medium text-[#3A6ABE]/70 mb-1">Especializações:</h4>
                    <div className="flex flex-wrap gap-2">
                      {reviewer.areasEspecializacao.map((area, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs border-[#3A6ABE]/30 text-[#3A6ABE]/80"
                        >
                          {area}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Ações */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10 h-10"
                >
                  <FiMail className="mr-2" /> Email
                </Button>

                <Button
                  size="sm"
                  className={`h-10 ${reviewer.isAdmin ? 'bg-[#F79B4B] hover:bg-[#F79B4B]/90' : 'bg-[#3A6ABE] hover:bg-[#3A6ABE]/90'}`}
                  onClick={() => onMakeAdmin(reviewer.id)}
                >
                  <FiAward className="mr-2" />
                  {reviewer.isAdmin ? 'Admin' : 'Promover'}
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