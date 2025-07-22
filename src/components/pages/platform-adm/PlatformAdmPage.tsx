import { AppHeader } from '@/components/shared/platform/app-header/AppHeader';
import { AppSidebar } from '@/components/shared/platform/app-sidebar/AppSidebar';
import {  BlogSectionADM } from '@/components/shared/platform/blog-section/BlogSection[ADM]';
import { EditaisSection } from '@/components/shared/platform/edital-section/EditalSection';
import { IdeasSection } from '@/components/shared/platform/ideas-section/IdeasSection';
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
    role: 'Administrador do Sistema',
    // Adicionando mais dados para o perfil
    email: 'admin@trampolim.com',
    telefone: '(11) 99999-9999',
    genero: 'Masculino',
    grauEscolaridade: 'Mestrado',
    areaAtuacao: 'Gestão de Inovação',
    nomeEmpresa: 'Trampolim Innovation',
    siteEmpresa: 'www.trampolim.com.br',
    descricaoNegocio: 'Plataforma de gestão de inovação e empreendedorismo',
    miniCurriculo: 'Especialista em gestão de inovação com 10 anos de experiência em programas de aceleração de startups.',
    cep: '01311-000',
    estado: 'SP',
    cidade: 'São Paulo',
    bairro: 'Bela Vista',
    endereco: 'Av. Paulista, 1000'
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

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMakeAdmin = (reviewerId: number) => {
    console.log(`Avaliador ${reviewerId} promovido a admin`);
    // Implementar lógica real aqui
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

        <main className="flex-1 ml-0 lg:ml-6">
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

          {activeSection === 'blog' && <BlogSectionADM />}

          {activeSection === 'perfil' && <ProfileSection user={{
            nomeCompleto: "Ana Carolina Silva",
            email: "ana.silva@empresa.com",
            cpf: "123.456.789-00",
            telefone: "(11) 98765-4321",
            genero: "Feminino",
            grauEscolaridade: "Superior Completo",
            areaAtuacao: "Tecnologia",
            linkedin: "linkedin.com/in/ana-silva",
            fotoPerfil: "https://randomuser.me/api/portraits/women/44.jpg",
            cep: "01311-000",
            estado: "SP",
            cidade: "São Paulo",
            bairro: "Bela Vista",
            endereco: "Av. Paulista, 1000",
            nomeEmpresa: "TechSolutions Ltda",
            siteEmpresa: "techsolutions.com.br",
            descricaoNegocio: "Desenvolvimento de soluções inovadoras em SaaS para o mercado financeiro",
            miniCurriculo: "Empreendedora com 10 anos de experiência no mercado de tecnologia, especializada em desenvolvimento de software e gestão de equipes ágeis.",
            role: "Empreendedora"
          }} />}
        </main>
      </div>
    </div>
  );
};

export default PlatformAdminPage;