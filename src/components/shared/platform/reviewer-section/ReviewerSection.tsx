import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import { FiMail, FiAward, FiBook, FiShield, FiX, FiCheck } from "react-icons/fi";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

// URL base da API para construir o caminho da imagem
const API_BASE_URL = 'http://localhost:8080';

// --- INTERFACE CORRESPONDENDO AO MODELO DO BACK-END ---
interface Reviewer {
  _id: string;
  fullName: string;
  educationLevel: string;
  email: string;
  photoUrl?: string; // Opcional, pois nem todos os usuários podem ter foto
  type: Array<'entrepreneur' | 'reviewer' | 'admin'>;
  reviewer?: { // Objeto aninhado com dados específicos do avaliador
    specializationAreas?: string[];
  };
}

interface ReviewersSectionProps {
  reviewers: Reviewer[];
  currentPage: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onToggleAdmin: (reviewerId: string, isCurrentlyAdmin: boolean) => Promise<void>;
}

export const ReviewersSection = ({
  reviewers,
  currentPage,
  itemsPerPage,
  onPageChange,
  onToggleAdmin
}: ReviewersSectionProps) => {
  const totalPages = Math.ceil(reviewers.length / itemsPerPage);
  const paginatedReviewers = reviewers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleEmailClick = (email: string) => {
    window.location.href = `mailto:${email}`;
  };

  const handleToggleAdmin = async (reviewer: Reviewer) => {
    const isCurrentlyAdmin = reviewer.type.includes('admin');
    await onToggleAdmin(reviewer._id, isCurrentlyAdmin);
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#3A6ABE] mb-2">Gerenciar Avaliadores</h2>
        <p className="text-[#3A6ABE]/80">Total de {reviewers.length} avaliadores cadastrados</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {paginatedReviewers.map((reviewer) => {
          const isUserAdmin = reviewer.type.includes('admin');
          return (
            <Card
              key={reviewer._id}
              className="overflow-hidden border border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all duration-300 rounded-xl group"
            >
              <div className="p-5 flex flex-col h-full">
                <div className="flex flex-col items-center mb-4">
                  <div className="relative">
                    <Avatar className="w-20 h-20 border-[3px] border-[#3A6ABE]/30 group-hover:border-[#F79B4B] transition-colors mx-auto">
                      <AvatarImage src={reviewer.photoUrl ? `${API_BASE_URL}${reviewer.photoUrl}` : undefined} alt={reviewer.fullName} />
                      <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE] text-2xl font-medium">
                        {reviewer.fullName.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {isUserAdmin && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-[#F79B4B] hover:bg-[#F79B4B]/90 text-white shadow-md flex items-center">
                          <FiShield className="mr-1" size={12} /> Admin
                        </Badge>
                      </div>
                    )}
                  </div>
                  <h3 className="font-bold text-xl text-[#3A6ABE] text-center leading-tight mt-2">
                    {reviewer.fullName}
                  </h3>
                </div>

                <div className="flex-1 space-y-3 mb-5">
                  <div className="flex items-start text-sm text-[#3A6ABE]">
                    <FiBook className="mr-3 text-[#F79B4B] flex-shrink-0 mt-1" size={16} />
                    <span className="flex-1">
                      <span className="font-medium">Formação:</span> {reviewer.educationLevel}
                    </span>
                  </div>

                  {reviewer.reviewer?.specializationAreas && reviewer.reviewer.specializationAreas.length > 0 && (
                    <div className="pt-2">
                      <h4 className="text-xs font-semibold text-[#3A6ABE]/70 mb-2">Especializações:</h4>
                      <div className="flex flex-wrap gap-2">
                        {reviewer.reviewer.specializationAreas.map((area, index) => (
                          <Badge key={index} variant="outline" className="text-xs border-[#3A6ABE]/30 text-[#3A6ABE]/80">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-3 mt-auto">
                  <Button variant="outline" size="sm" className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10 h-10" onClick={() => handleEmailClick(reviewer.email)}>
                    <FiMail className="mr-2" /> Email
                  </Button>

                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm" className={`h-10 ${isUserAdmin ? 'bg-red-500 hover:bg-red-500/90' : 'bg-[#3A6ABE] hover:bg-[#3A6ABE]/90'}`}>
                        <FiAward className="mr-2" />
                        {isUserAdmin ? 'Revogar' : 'Promover'}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle className="text-[#3A6ABE]">
                          {isUserAdmin ? 'Revogar privilégio de Admin?' : 'Promover a Administrador?'}
                        </DialogTitle>
                        <DialogDescription className="text-[#3A6ABE]/80">
                          {isUserAdmin
                            ? `Ao confirmar, ${reviewer.fullName} perderá os privilégios de administrador.`
                            : `Ao confirmar, ${reviewer.fullName} ganhará acesso completo ao painel administrativo.`}
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter className="mt-4 sm:justify-start">
                        <DialogClose asChild>
                           <Button type="button" variant="outline" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-50">
                              <FiX className="mr-2" /> Cancelar
                           </Button>
                        </DialogClose>
                        <Button type="button" className={`flex-1 ${isUserAdmin ? 'bg-red-500 hover:bg-red-500/90' : 'bg-green-500 hover:bg-green-500/90'}`} onClick={() => handleToggleAdmin(reviewer)}>
                          <FiCheck className="mr-2" /> Confirmar
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </Card>
          )
        })}
      </div>

      {totalPages > 1 && (
         <div className="flex justify-center mt-8">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); if (currentPage > 1) onPageChange(currentPage - 1); }} className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''} />
                </PaginationItem>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                  <PaginationItem key={pageNum}>
                    <PaginationLink href="#" onClick={(e) => { e.preventDefault(); onPageChange(pageNum); }} isActive={pageNum === currentPage}>
                      {pageNum}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext href="#" onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) onPageChange(currentPage + 1); }} className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
      )}
    </div>
  );
};