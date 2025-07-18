import { AppHeader } from '@/components/shared/platform/app-header/AppHeader';
import { AppSidebar } from '@/components/shared/platform/app-sidebar/AppSidebar';
import { CourseCardProgress } from '@/components/shared/platform/course-card-progress/CourseCardProgress';
import { CourseCardRecommended } from '@/components/shared/platform/course-card-recommended/CourseCardRecommended';
import { ProfileSection } from '@/components/shared/platform/profile-section/ProfileSection';
import { SectionPlaceholder } from '@/components/shared/platform/selection-placeholder/SelectionPlaceholder';
import { useState } from 'react';
import { FiUser, FiBook, FiFileText, FiZap, FiBookmark } from 'react-icons/fi';

const PlatformEntrepreneur = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('cursos');
  
  // Mock data completo para o perfil
  const user = {
    name: 'João Silva',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    // Dados para o perfil
    nomeCompleto: "João Silva",
    email: "joao.silva@empresa.com",
    cpf: "123.456.789-00",
    telefone: "(11) 98765-4321",
    genero: "Masculino",
    grauEscolaridade: "Superior Completo",
    areaAtuacao: "Tecnologia",
    linkedin: "linkedin.com/in/joao-silva",
    fotoPerfil: "https://randomuser.me/api/portraits/men/32.jpg",
    cep: "01311-000",
    estado: "SP",
    cidade: "São Paulo",
    bairro: "Bela Vista",
    endereco: "Av. Paulista, 1000",
    nomeEmpresa: "TechStart Ltda",
    siteEmpresa: "techstart.com.br",
    descricaoNegocio: "Desenvolvimento de aplicativos inovadores para pequenas empresas",
    miniCurriculo: "Empreendedor há 5 anos no mercado de tecnologia, com experiência em desenvolvimento de software e gestão de equipes.",
    role: "Empreendedor",
    // Dados para cursos
    coursesInProgress: [
      {
        id: 1,
        title: 'Marketing Digital para Empreendedores',
        progress: 65,
        thumbnail: 'https://img.freepik.com/free-psd/digital-marketing-social-media-post-template_505751-2766.jpg',
        lastWatched: '15 minutos atrás',
        modules: '12 módulos',
        duration: '8 horas'
      },
      {
        id: 2,
        title: 'Gestão Financeira para Startups',
        progress: 30,
        thumbnail: 'https://img.freepik.com/free-vector/financial-analytics-concept-illustration_114360-8171.jpg',
        lastWatched: '2 dias atrás',
        modules: '8 módulos',
        duration: '6 horas'
      }
    ],
    recommendedCourses: [
      {
        id: 3,
        title: 'Como Validar sua Ideia de Negócio',
        thumbnail: 'https://img.freepik.com/free-vector/business-idea-concept-illustration_114360-1645.jpg',
        instructor: 'Maria Souza',
        modules: '5 módulos',
        duration: '4 horas',
        rating: '4.8'
      },
      {
        id: 4,
        title: 'Vendas Consultivas',
        thumbnail: 'https://img.freepik.com/free-vector/sales-concept-illustration_114360-2125.jpg',
        instructor: 'Carlos Mendes',
        modules: '7 módulos',
        duration: '5 horas',
        rating: '4.9'
      },
      {
        id: 5,
        title: 'Design Thinking na Prática',
        thumbnail: 'https://img.freepik.com/free-vector/design-thinking-concept-illustration_114360-8223.jpg',
        instructor: 'Ana Lúcia',
        modules: '6 módulos',
        duration: '4.5 horas',
        rating: '4.7'
      },
      {
        id: 6,
        title: 'Plano de Negócios Simplificado',
        thumbnail: 'https://img.freepik.com/free-vector/business-plan-concept-illustration_114360-1618.jpg',
        instructor: 'Roberto Alves',
        modules: '9 módulos',
        duration: '7 horas',
        rating: '4.6'
      }
    ]
  };

  const menuItems = [
    { id: 'perfil', label: 'Perfil', icon: <FiUser className="w-5 h-5" /> },
    { id: 'cursos', label: 'Cursos', icon: <FiBook className="w-5 h-5" /> },
    { id: 'editais', label: 'Editais', icon: <FiFileText className="w-5 h-5" /> },
    { id: 'ideia', label: 'Minha Ideia', icon: <FiZap className="w-5 h-5" /> },
    { id: 'blog', label: 'Blog', icon: <FiBookmark className="w-5 h-5" /> }
  ];

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
          {activeSection === 'cursos' && (
            <div>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#3A6ABE] mb-4">Continue aprendendo</h2>
                <p className="text-[#3A6ABE]/80">Continue de onde parou nos seus cursos</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {user.coursesInProgress.map((course) => (
                  <CourseCardProgress key={course.id} course={course} />
                ))}
              </div>

              <div className="mb-8">
                <h2 className="text-2xl font-bold text-[#3A6ABE] mb-4">Cursos recomendados</h2>
                <p className="text-[#3A6ABE]/80">Baseado no seu perfil e interesses</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {user.recommendedCourses.map((course) => (
                  <CourseCardRecommended key={course.id} course={course} />
                ))}
              </div>
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

          {!['cursos', 'perfil'].includes(activeSection) && (
            <SectionPlaceholder
              icon={menuItems.find(item => item.id === activeSection)?.icon}
              title={menuItems.find(item => item.id === activeSection)?.label || ''}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default PlatformEntrepreneur;