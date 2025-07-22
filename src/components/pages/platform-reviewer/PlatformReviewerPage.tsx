import { AppHeader } from '@/components/shared/platform/app-header/AppHeader';
import { AppSidebar } from '@/components/shared/platform/app-sidebar/AppSidebar';
import { IdeaCardReviewer } from '@/components/shared/platform/idea-card-reviewer/IdeaCardReviewer';
import { IdeasPagination } from '@/components/shared/platform/ideas-pagination/IdeasPagination';
import { ProfileSection } from '@/components/shared/platform/profile-section/ProfileSection';
import { SectionPlaceholder } from '@/components/shared/platform/selection-placeholder/SelectionPlaceholder';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { FiUser, FiFileText, FiZap, FiLogOut } from 'react-icons/fi';
import EditalPage from '../edital-page/EditalPage';
import EditalReviewer from '../edital-reviewer/EditalReviewer';


interface Idea {
  id: number;
  entrepreneur: {
    name: string;
    avatar: string;
    email?: string;
    phone?: string;
  };
  projectName: string;
  problem: string;
  solution: string;
  targetAudience: string;
  differential: string;
  resourcesNeeded: string;
  implementationTime: string;
  edital: string;
  submissionDate: string;
  status: string;
}

const PlatformReviewerPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('ideias');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;




  // Mock data completo para o perfil do avaliador
  const user = {
    name: 'Ana Revisora',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    // Dados para o perfil
    nomeCompleto: "Ana Revisora",
    email: "ana.revisora@trampolim.com",
    cpf: "987.654.321-00",
    telefone: "(21) 99876-5432",
    genero: "Feminino",
    grauEscolaridade: "Doutorado",
    areaAtuacao: "Avaliação de Projetos",
    linkedin: "linkedin.com/in/ana-revisora",
    fotoPerfil: "https://randomuser.me/api/portraits/women/44.jpg",
    cep: "22451-000",
    estado: "RJ",
    cidade: "Rio de Janeiro",
    bairro: "Ipanema",
    endereco: "Rua Visconde de Pirajá, 550",
    nomeEmpresa: "Consultoria Inovação",
    siteEmpresa: "consultoriainovacao.com.br",
    descricaoNegocio: "Consultoria especializada em avaliação de projetos de inovação",
    miniCurriculo: "Avaliadora de projetos há 10 anos, com experiência em programas de aceleração e incubação. Especialista em modelos de negócio inovadores.",
    role: "Avaliadora Sênior",
    areasEspecializacao: ["TI", "Marketing", "Finanças"],
    descricaoIncubacao: "Experiência com mais de 50 startups avaliadas em programas de incubação"
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
        user={{ name: user.name, avatar: user.avatar }}
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
          {activeSection === 'ideias' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#3A6ABE] mb-2">Ideias para avaliação</h2>
                <p className="text-[#3A6ABE]/80">Você tem {allIdeas.length} ideias para avaliar</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {currentIdeas.map((idea) => (
                  <IdeaCardReviewer idea={{
                    id: 1,
                    entrepreneur: {
                      name: "Empreendedor Exemplo",
                      avatar: "url-da-avatar.jpg"
                    },
                    projectName: "Projeto Inovador",
                    problem: "Problema que o projeto resolve",
                    solution: "Solução proposta",
                    targetAudience: "Público-alvo",
                    differential: "Diferenciais competitivos",
                    resourcesNeeded: "Recursos necessários",
                    implementationTime: "6 meses",
                    edital: "Edital de Inovação 2023",
                    submissionDate: "2023-10-15",
                    status: "Em análise"
                  }} />
                ))}
              </div>

              <IdeasPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}

          {activeSection === 'perfil' && (
            <ProfileSection user={{
              nomeCompleto: user.nomeCompleto,
              email: user.email,
              cpf: user.cpf,
              telefone: user.telefone,
              genero: user.genero,
              grauEscolaridade: user.grauEscolaridade,
              areaAtuacao: user.areaAtuacao,
              linkedin: user.linkedin,
              fotoPerfil: user.fotoPerfil,
              cep: user.cep,
              estado: user.estado,
              cidade: user.cidade,
              bairro: user.bairro,
              endereco: user.endereco,
              nomeEmpresa: user.nomeEmpresa,
              siteEmpresa: user.siteEmpresa,
              descricaoNegocio: user.descricaoNegocio,
              miniCurriculo: user.miniCurriculo,
              role: user.role
            }} />
          )}

          {activeSection === 'edital' && (
            <EditalReviewer />
          )}


          {activeSection === 'sair' && (
            <Button variant="outline" className="mt-4 border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10">
              Confirmar saída
            </Button>
          )}


        </main>
      </div>
    </div>
  );
};

export default PlatformReviewerPage;