import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/shared/platform/app-header/AppHeader';
import { AppSidebar } from '@/components/shared/platform/app-sidebar/AppSidebar';
import BlogCommunity from '@/components/shared/platform/blog-section-community/BlogCommunity';
import { CourseCardProgress } from '@/components/shared/platform/course-card-progress/CourseCardProgress';
import { CourseCardRecommended } from '@/components/shared/platform/course-card-recommended/CourseCardRecommended';
import { ProfileSection } from '@/components/shared/platform/profile-section/ProfileSection';
import { FiUser, FiBook, FiFileText, FiZap, FiBookmark, FiLogOut } from 'react-icons/fi';
import SubmitInnovationPage from '../submition-innovation/SubmitInnovationPage';
import EditalPage from '../edital-page/EditalPage';
import { useNavigate } from 'react-router-dom';

const API_BASE_URL = 'http://localhost:7070';

interface UserData {
  _id: string;
  fullName: string;
  educationLevel: string;
  fieldOfActivity: string;
  gender: string;
  cpf: string;
  phone: string;
  zipCode: string;
  state: string;
  city: string;
  neighborhood: string;
  address: string;
  linkedin?: string;
  miniResume: string;
  email: string;
  photoUrl?: string;
  type: Array<'entrepreneur' | 'reviewer' | 'admin'>;
  entrepreneur?: {
    companyName?: string;
    businessDescription?: string;
    companyWebsite?: string;
  };
}

const PlatformEntrepreneur = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('cursos');
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('authToken');
      const userFromStorage = localStorage.getItem('user');

      if (!token || !userFromStorage) {
        setError("Sessão inválida. Por favor, faça login novamente.");
        setIsLoading(false);
        navigate('/login'); // Usando hook useNavigate corretamente
        return;
      }

      try {
        const loggedInUser = JSON.parse(userFromStorage);
        const userId = loggedInUser?._id;
        if (!userId) throw new Error("ID do usuário não encontrado.");

        const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/users/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Não foi possível carregar seus dados.");
        }
        
        const data = await response.json();

        // --- A CORREÇÃO ESTÁ AQUI ---
        // Acessamos o objeto do usuário que está dentro da propriedade 'data'
        setUserData(data.data); 

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchUserData();
  }, [navigate]);

  const coursesInProgress = [
    { id: 1, title: 'Marketing Digital para Empreendedores', progress: 65, thumbnail: 'https://img.freepik.com/free-psd/digital-marketing-social-media-post-template_505751-2766.jpg', lastWatched: '15 minutos atrás', modules: '12 módulos', duration: '8 horas' },
    { id: 2, title: 'Gestão Financeira para Startups', progress: 30, thumbnail: 'https://img.freepik.com/free-vector/financial-analytics-concept-illustration_114360-8171.jpg', lastWatched: '2 dias atrás', modules: '8 módulos', duration: '6 horas' }
  ];

  const recommendedCourses = [
    { id: 3, title: 'Como Validar sua Ideia de Negócio', thumbnail: 'https://img.freepik.com/free-vector/business-idea-concept-illustration_114360-1645.jpg', instructor: 'Maria Souza', modules: '5 módulos', duration: '4 horas', rating: '4.8' },
    { id: 4, title: 'Vendas Consultivas', thumbnail: 'https://img.freepik.com/free-vector/sales-concept-illustration_114360-2125.jpg', instructor: 'Carlos Mendes', modules: '7 módulos', duration: '5 horas', rating: '4.9' },
    { id: 5, title: 'Design Thinking na Prática', thumbnail: 'https://img.freepik.com/free-vector/design-thinking-concept-illustration_114360-8223.jpg', instructor: 'Ana Lúcia', modules: '6 módulos', duration: '4.5 horas', rating: '4.7' },
    { id: 6, title: 'Plano de Negócios Simplificado', thumbnail: 'https://img.freepik.com/free-vector/business-plan-concept-illustration_114360-1618.jpg', instructor: 'Roberto Alves', modules: '9 módulos', duration: '7 horas', rating: '4.6' }
  ];

  const menuItems = [
    { id: 'perfil', label: 'Meu Perfil', icon: <FiUser className="w-5 h-5" /> },
    { id: 'cursos', label: 'Cursos', icon: <FiBook className="w-5 h-5" /> },
    { id: 'editais', label: 'Editais', icon: <FiFileText className="w-5 h-5" /> },
    { id: 'ideia', label: 'Minha Ideia', icon: <FiZap className="w-5 h-5" /> },
    { id: 'blog', label: 'Blog', icon: <FiBookmark className="w-5 h-5" /> },
    { id: 'sair', label: 'Sair', icon: <FiLogOut className="w-5 h-5" /> }
  ];

  const renderActiveSection = () => {
    if (isLoading) {
      return <div className="text-center p-10 font-medium text-lg text-gray-500">Carregando dados...</div>;
    }
    if (error) {
      return <div className="text-center p-10 text-red-600 bg-red-50 rounded-lg"><strong>Erro:</strong> {error}</div>;
    }
    if (!userData && activeSection === 'perfil') {
      return <div className="text-center p-10 text-gray-600">Não foi possível carregar os dados do perfil.</div>;
    }

    switch (activeSection) {
      case 'cursos':
        return (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#3A6ABE] mb-4">Continue aprendendo</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {coursesInProgress.map((course) => <CourseCardProgress key={course.id} course={course} />)}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#3A6ABE] mb-4">Cursos recomendados</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recommendedCourses.map((course) => <CourseCardRecommended key={course.id} course={course} />)}
              </div>
            </div>
          </div>
        );
      case 'perfil':
        const profileProps = {
          nomeCompleto: userData!.fullName, email: userData!.email, cpf: userData!.cpf,
          telefone: userData!.phone, genero: userData!.gender, grauEscolaridade: userData!.educationLevel,
          areaAtuacao: userData!.fieldOfActivity, linkedin: userData!.linkedin || "",
          fotoPerfil: userData!.photoUrl ? `${API_BASE_URL}${userData!.photoUrl}` : "",
          cep: userData!.zipCode, estado: userData!.state, cidade: userData!.city,
          bairro: userData!.neighborhood, endereco: userData!.address, miniCurriculo: userData!.miniResume,
          nomeEmpresa: userData!.entrepreneur?.companyName || "", siteEmpresa: userData!.entrepreneur?.companyWebsite || "",
          descricaoNegocio: userData!.entrepreneur?.businessDescription || "",
          role: userData!.type.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ')
        };
        return <ProfileSection user={profileProps} />;
      case 'ideia':
        return <SubmitInnovationPage />;
      case 'editais':
        return <EditalPage />;
      case 'blog':
        return <BlogCommunity />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <AppHeader
        user={{ 
          name: userData?.fullName || 'Carregando...', 
          avatar: userData?.photoUrl ? `${API_BASE_URL}${userData.photoUrl}` : 'https://randomuser.me/api/portraits/men/1.jpg',
          role: 'Empreendedor'
        }}
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
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default PlatformEntrepreneur;