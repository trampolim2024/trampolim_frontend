import { AppHeader } from '@/components/shared/platform/app-header/AppHeader';
import { AppSidebar } from '@/components/shared/platform/app-sidebar/AppSidebar';
import { BlogSection } from '@/components/shared/platform/blog-section/BlogSection';
import { EditaisSection } from '@/components/shared/platform/edital-section/EditalSection';
import { IdeasSection } from '@/components/shared/platform/ideas-section/IdeasSection';
import { LogoutSection } from '@/components/shared/platform/logout-section/LogoutSection';
import { ProfileSection } from '@/components/shared/platform/profile-section/ProfileSection';
import { ReviewersSection } from '@/components/shared/platform/reviewer-section/ReviewerSection';
import { useState } from 'react';
import { FiUser, FiUsers, FiZap, FiFileText, FiBookmark, FiLogOut } from 'react-icons/fi';


const PlatformAdminPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('avaliadores');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  // Mock data
  const user = {
    name: 'Admin Master',
    avatar: 'https://randomuser.me/api/portraits/men/75.jpg',
  };

  const menuItems = [
    { id: 'perfil', label: 'Perfil', icon: <FiUser className="w-5 h-5" /> },
    { id: 'avaliadores', label: 'Avaliadores', icon: <FiUsers className="w-5 h-5" /> },
    { id: 'ideias', label: 'Ideias', icon: <FiZap className="w-5 h-5" /> },
    { id: 'editais', label: 'Editais', icon: <FiFileText className="w-5 h-5" /> },
    { id: 'blog', label: 'Blog', icon: <FiBookmark className="w-5 h-5" /> },
    { id: 'sair', label: 'Sair', icon: <FiLogOut className="w-5 h-5" /> }
  ];

  // Mock data for reviewers
  const allReviewers = Array.from({ length: 24 }, (_, i) => ({
    id: i + 1,
    name: `Avaliador ${i + 1}`,
    avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${(i % 50) + 1}.jpg`,
    formation: ['Engenharia', 'Administração', 'Tecnologia', 'Design'][i % 4],
    age: 30 + (i % 15),
    isAdmin: i % 5 === 0
  }));

  // Mock data for ideas
  const allIdeas = Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    entrepreneur: {
      name: `Empreendedor ${i + 1}`,
      avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${(i % 50) + 1}.jpg`,
    },
    projectName: `Projeto ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
    edital: `Edital ${['Inovação', 'Tecnologia', 'Sustentabilidade', 'Social'][i % 4]}`,
    submissionDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    status: ['Não avaliado', 'Em análise', 'Avaliado'][i % 3],
    assignedReviewer: i % 3 === 0 ? `Avaliador ${Math.floor(Math.random() * 24) + 1}` : null
  }));

  const handlePageChange = (page: number, maxPages: number) => {
    if (page >= 1 && page <= maxPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleMakeAdmin = (reviewerId: number) => {
    alert(`Avaliador ${reviewerId} promovido a admin`);
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
          {activeSection === 'avaliadores' && (
            <ReviewersSection
              reviewers={allReviewers}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
              onMakeAdmin={handleMakeAdmin}
            />
          )}

          {activeSection === 'ideias' && (
            <IdeasSection
              ideas={allIdeas}
              reviewers={allReviewers}
              currentPage={currentPage}
              itemsPerPage={itemsPerPage}
              onPageChange={handlePageChange}
            />
          )}

          {activeSection === 'editais' && <EditaisSection />}

          {activeSection === 'blog' && <BlogSection />}

          {activeSection === 'perfil' && <ProfileSection user={user} />}

          {activeSection === 'sair' && (
            <LogoutSection onCancel={() => setActiveSection('avaliadores')} />
          )}
        </main>
      </div>
    </div>
  );
};

export default PlatformAdminPage;