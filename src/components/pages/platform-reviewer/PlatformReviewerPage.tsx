import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/shared/platform/app-header/AppHeader';
import { AppSidebar } from '@/components/shared/platform/app-sidebar/AppSidebar';
import { IdeaCardReviewer } from '@/components/shared/platform/idea-card-reviewer/IdeaCardReviewer';
import { IdeasPagination } from '@/components/shared/platform/ideas-pagination/IdeasPagination';
import { ProfileSection } from '@/components/shared/platform/profile-section/ProfileSection';
import { FiUser, FiFileText, FiZap, FiLogOut } from 'react-icons/fi';
import EditalReviewer from '../edital-reviewer/EditalReviewer';

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
  reviewer?: {
    specializationAreas?: string[];
    incubationDescription?: string;
  };

  entrepreneur?: {
    companyName?: string;
    businessDescription?: string;
    companyWebsite?: string;
  };
}

interface Project {
  _id: string;
  nomeProjeto: string;
  descricaoIdeia: string;
  diferencialInovacao: string;
  modeloNegocio: string;
  estagioIdeia: string;
  lider: { nome: string; fotoUrl: string; };
  edital: { name: string };
  createdAt: string;
  status: string;
}

interface Evaluation {
    _id: string;
    project: Project;
    reviewer: string; 
}

const PlatformReviewerPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('ideias');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [userData, setUserData] = useState<UserData | null>(null);
  const [assignedIdeas, setAssignedIdeas] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    const token = localStorage.getItem('authToken');
    const userFromStorage = localStorage.getItem('user');

    if (!token || !userFromStorage) {
      setError("Sessão inválida. Por favor, faça login novamente.");
      setIsLoading(false);
      return;
    }

    try {
      const loggedInUser = JSON.parse(userFromStorage);
      const userId = loggedInUser?._id;
      if (!userId) throw new Error("ID do usuário não encontrado.");

      const [profileResponse, evaluationsResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/api/v1/trampolim/users/${userId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`${API_BASE_URL}/api/v1/trampolim/evaluations`, {
            headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (!profileResponse.ok) throw new Error('Falha ao carregar dados do perfil.');
      const profileData = await profileResponse.json();
      setUserData(profileData.user);

      if (!evaluationsResponse.ok) throw new Error('Falha ao carregar ideias designadas.');
      const evaluationsData = await evaluationsResponse.json();
      
      const projects = evaluationsData.evaluations
        .filter((evaluation: Evaluation) => evaluation.project)
        .map((evaluation: Evaluation) => evaluation.project);
      setAssignedIdeas(projects);

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const menuItems = [
    { id: 'perfil', label: 'Meu Perfil', icon: <FiUser className="w-5 h-5" /> },
    { id: 'edital', label: 'Edital', icon: <FiFileText className="w-5 h-5" /> },
    { id: 'ideias', label: 'Ideias para Avaliar', icon: <FiZap className="w-5 h-5" /> },
    { id: 'sair', label: 'Sair', icon: <FiLogOut className="w-5 h-5" /> }
  ];

  const totalPages = Math.ceil(assignedIdeas.length / itemsPerPage);
  const currentIdeas = assignedIdeas.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const renderActiveSection = () => {
    if (isLoading) {
        return <div className="text-center p-10 font-medium text-lg text-gray-500">Carregando dados...</div>;
    }
    if (error) {
        return <div className="text-center p-10 text-red-600 bg-red-50 rounded-lg"><strong>Erro:</strong> {error}</div>;
    }
    if (!userData) {
        return <div className="text-center p-10 text-gray-500">Não foi possível carregar os dados do usuário.</div>;
    }

    switch (activeSection) {
      case 'ideias':
        return (
          <div>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-[#3A6ABE] mb-2">Ideias para avaliação</h2>
              <p className="text-[#3A6ABE]/80">Você tem {assignedIdeas.length} ideias para avaliar</p>
            </div>
            {currentIdeas.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {currentIdeas.map((idea, index) => (
                            <IdeaCardReviewer key={idea._id} idea={{
                                id: index, 
                                projectName: idea.nomeProjeto,
                                status: idea.status,
                                edital: idea.edital?.name || 'Não informado',
                                submissionDate: idea.createdAt,
                                entrepreneur: {
                                    name: idea.lider.nome,
                                    avatar: `${API_BASE_URL}${idea.lider.fotoUrl}`
                                },
                                problem: idea.descricaoIdeia,
                                solution: idea.diferencialInovacao,
                                differential: idea.diferencialInovacao,
                                targetAudience: 'Não especificado',
                                resourcesNeeded: 'Não especificado',
                                implementationTime: 'Não especificado'
                            }} />
                        ))}
                    </div>
                    <IdeasPagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
                </>
            ) : (
                <p className="text-center text-gray-500 mt-10">Nenhuma ideia foi designada a você ainda.</p>
            )}
          </div>
        );

      case 'perfil':
        const profileProps = {
            nomeCompleto: userData.fullName,
            email: userData.email,
            cpf: userData.cpf,
            telefone: userData.phone,
            genero: userData.gender,
            grauEscolaridade: userData.educationLevel,
            areaAtuacao: userData.fieldOfActivity,
            linkedin: userData.linkedin || "",
            fotoPerfil: userData.photoUrl ? `${API_BASE_URL}${userData.photoUrl}` : "",
            cep: userData.zipCode,
            estado: userData.state,
            cidade: userData.city,
            bairro: userData.neighborhood,
            endereco: userData.address,
            miniCurriculo: userData.miniResume,
            nomeEmpresa: userData.entrepreneur?.companyName || "",
            siteEmpresa: userData.entrepreneur?.companyWebsite || "",
            descricaoNegocio: userData.entrepreneur?.businessDescription || "",
            areasEspecializacao: userData.reviewer?.specializationAreas || [],
            descricaoIncubacao: userData.reviewer?.incubationDescription || ""
        };
        return <ProfileSection user={profileProps} />;
      
      case 'edital':
        return <EditalReviewer />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <AppHeader
        user={{ 
          name: userData?.fullName || 'Carregando...', 
          avatar: userData?.photoUrl ? `${API_BASE_URL}${userData.photoUrl}` : 'https://randomuser.me/api/portraits/women/1.jpg',
          role: userData?.type?.includes('reviewer') ? 'Avaliador' : undefined
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

export default PlatformReviewerPage;