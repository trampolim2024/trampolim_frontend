import { AppHeader } from '@/components/shared/platform/app-header/AppHeader';
import { AppSidebar } from '@/components/shared/platform/app-sidebar/AppSidebar';
import { IdeaCardReviewer } from '@/components/shared/platform/idea-card-reviewer/IdeaCardReviewer';
import { IdeasPagination } from '@/components/shared/platform/ideas-pagination/IdeasPagination';
import { SectionPlaceholder } from '@/components/shared/platform/selection-placeholder/SelectionPlaceholder';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FiUser, FiFileText, FiZap, FiLogOut } from 'react-icons/fi';


const PlatformReviewerPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('ideias');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // Mock data
  const user = {
    name: 'Ana Revisora',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  };

  const menuItems = [
    { id: 'perfil', label: 'Perfil', icon: <FiUser className="w-5 h-5" /> },
    { id: 'edital', label: 'Edital', icon: <FiFileText className="w-5 h-5" /> },
    { id: 'ideias', label: 'Ideias submetidas', icon: <FiZap className="w-5 h-5" /> },
    { id: 'sair', label: 'Sair', icon: <FiLogOut className="w-5 h-5" /> }
  ];

  // Mock data for ideas to review
  const allIdeas = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    entrepreneur: {
      name: `Empreendedor ${i + 1}`,
      avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${(i % 50) + 1}.jpg`,
    },
    projectName: `Projeto ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
    edital: `Edital ${['Inovação', 'Tecnologia', 'Sustentabilidade', 'Social'][i % 4]}`,
    submissionDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    status: ['Não avaliado', 'Em análise', 'Avaliado'][i % 3]
  }));

  // Pagination logic
  const totalPages = Math.ceil(allIdeas.length / itemsPerPage);
  const currentIdeas = allIdeas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <AppHeader 
        user={user} 
        isMenuOpen={isMenuOpen} 
        setIsMenuOpen={setIsMenuOpen} 
      />
      
      <div className="container mx-auto px-4 py-8 flex">
        <AppSidebar
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          menuItems={menuItems}
        />

        <main className="flex-1">
          {activeSection === 'ideias' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#3A6ABE] mb-2">Ideias para avaliação</h2>
                <p className="text-[#3A6ABE]/80">Você tem {allIdeas.length} ideias para avaliar</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {currentIdeas.map((idea) => (
                  <IdeaCardReviewer key={idea.id} idea={idea} />
                ))}
              </div>

              <IdeasPagination 
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {activeSection !== 'ideias' && (
            <>
              <SectionPlaceholder
                icon={menuItems.find(item => item.id === activeSection)?.icon}
                title={menuItems.find(item => item.id === activeSection)?.label || ''}
                description={activeSection === 'sair' ? 'Deseja realmente sair?' : 'Seção em desenvolvimento'}
              />
              {activeSection === 'sair' && (
                <Button variant="outline" className="mt-4 border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10">
                  Confirmar saída
                </Button>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default PlatformReviewerPage;