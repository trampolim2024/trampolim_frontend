import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/shared/platform/app-header/AppHeader';
import { AppSidebar } from '@/components/shared/platform/app-sidebar/AppSidebar';
import { FiUsers, FiZap, FiFileText, FiBookmark, FiLogOut } from 'react-icons/fi';
import { ReviewersSection } from '@/components/shared/platform/reviewer-section/ReviewerSection';
import { IdeasSection } from '@/components/shared/platform/ideas-section/IdeasSection';
import { EditaisSection } from '@/components/shared/platform/edital-section/EditalSection';
import { BlogSectionADM } from '@/components/shared/platform/blog-section/BlogSection[ADM]';
// ProfileSection removed for admin UI

const API_BASE_URL = 'http://localhost:7070';


interface Edital {
  _id: string;
  name: string;
  submissionStartDate?: string;
  submissionEndDate?: string;
}

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
  reviewer?: { specializationAreas?: string[] };
  entrepreneur?: {
    companyName?: string;
    businessDescription?: string;
    companyWebsite?: string;
  };
}

interface Project {
  _id: string;
  nomeProjeto: string;
  estagioIdeia: string;
  status: 'Pendente' | 'Aprovado' | 'Reprovado' | 'Em Análise';
  edital: Edital;
  lider: { nome: string; cpf: string; fotoUrl: string; };
  integrantes: { nome: string; cpf: string; fotoUrl: string; }[];
  createdAt: string;
  descricaoIdeia: string;
  diferencialInovacao: string;
  modeloNegocio: string;
  tecnologiasUtilizadas: string[];
  linkPitch?: string;
  videoPitchUrl?: string;
  createdBy: UserData; 
}

const PlatformAdminPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('ideias');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const [reviewers, setReviewers] = useState<UserData[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeEdital, setActiveEdital] = useState<Edital | null>(null);
  const [adminToken, setAdminToken] = useState<string | null>(null);

  // Inicializar token do admin ao montar
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    setAdminToken(token);
  }, []);

  const fetchActiveEdital = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/editals`);
      if (!response.ok) throw new Error('Erro ao carregar editais');
      
      const data = await response.json();
      const allEditals: Edital[] = data.editals || [];

      // Encontrar edital vigente
      const now = new Date();
      const currentActiveEdital = allEditals.find(edital => {
        if (!edital.submissionStartDate || !edital.submissionEndDate) return false;
        const startDate = new Date(edital.submissionStartDate);
        const endDate = new Date(edital.submissionEndDate);
        return now >= startDate && now <= endDate;
      });

      if (currentActiveEdital) {
        setActiveEdital(currentActiveEdital);
      }
    } catch (err: any) {
      console.error('Erro ao buscar edital vigente:', err);
    }
  };

  // Buscar edital vigente ao montar
  useEffect(() => {
    fetchActiveEdital();
  }, []);

  const fetchUsers = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) { 
        setError("Autenticação necessária."); 
        return; 
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/users`, { headers: { 'Authorization': `Bearer ${token}` } });
      if (!response.ok) { 
        const errorData = await response.json(); 
        throw new Error(errorData.message || 'Falha ao carregar usuários.'); 
      }
      const data = await response.json();
      console.log('🔵 Response de usuários:', data);
      
      // Tratamento robusto para múltiplas estruturas
      const users = data.users || data || [];
      const usersList = Array.isArray(users) ? users : [];
      
      const reviewerUsers = usersList.filter((user: UserData) => user.type && user.type.includes('reviewer'));
      setReviewers(reviewerUsers);
      console.log('✅ Revisores carregados:', reviewerUsers.length);
    } catch (err: any) { 
      console.error('❌ Erro ao carregar usuários:', err);
      setError(err.message); 
    }
  };
  


  const fetchProjects = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) { 
        setError("Autenticação necessária."); 
        return; 
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/projects`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Falha ao carregar os projetos.");
      }
      const data = await response.json();
      console.log('🔵 Response de projetos:', data);
      
      // Tratamento robusto para múltiplas estruturas
      const projects = data.projects || data || [];
      const projectsList = Array.isArray(projects) ? projects : [];
      
      setProjects(projectsList);
      console.log('✅ Projetos carregados:', projectsList.length);
    } catch (err: any) {
      console.error('❌ Erro ao carregar projetos:', err);
      setError(err.message);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
    setIsLoading(true);
    const loadData = async () => {
      setError(null);
      if (activeSection === 'avaliadores') {
        await fetchUsers();
      } else if (activeSection === 'ideias') {
        await Promise.all([fetchProjects(), fetchUsers()]);
      }
      setIsLoading(false);
    };
    loadData();
  }, [activeSection]);

  // Determine header user avatar: if logged user is admin, always use public/adm-profile.png
  const getHeaderUser = (): { name: string; avatar: string; role?: string } => {
    const storageUser = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
    let isAdmin = false;
    let name = 'Administrador';
    let photoUrl: string | undefined;

    if (storageUser) {
      try {
        const parsed = JSON.parse(storageUser);
        name = parsed.fullName || name;
        isAdmin = parsed.type?.includes('admin');
        photoUrl = parsed.photoUrl;
      } catch {
        // ignore parse errors and keep defaults
      }
    }

    return {
      name,
      avatar: isAdmin ? '/adm-profile.png' : (photoUrl ? `${API_BASE_URL}${photoUrl}` : 'https://randomuser.me/api/portraits/men/75.jpg'),
      role: isAdmin ? 'Administrador' : undefined
    };
  };

  const user = getHeaderUser();
  const menuItems = [
    { id: 'avaliadores', label: 'Avaliadores', icon: <FiUsers className="w-5 h-5"/> },
    { id: 'ideias', label: 'Ideias', icon: <FiZap className="w-5 h-5"/> },
    { id: 'editais', label: 'Editais', icon: <FiFileText className="w-5 h-5"/> },
    { id: 'blog', label: 'Blog', icon: <FiBookmark className="w-5 h-5"/> },
    { id: 'sair', label: 'Sair', icon: <FiLogOut className="w-5 h-5"/> }
  ];

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleToggleAdminStatus = async (userId: string, isCurrentlyAdmin: boolean) => {
    const action = isCurrentlyAdmin ? 'revoke' : 'grant';
    const endpoint = `${API_BASE_URL}/api/v1/trampolim/users/${userId}/${action}-admin`;
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(endpoint, { method: 'PATCH', headers: { 'Authorization': `Bearer ${token}` } });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      alert(data.message);
      fetchUsers();
    } catch (err: any) {
      alert(`Erro: ${err.message}`);
    }
  };

  const renderActiveSection = () => {
    if (isLoading) {
      return <div className="text-center p-10 font-medium text-lg text-gray-500">Carregando...</div>;
    }
    if (error) {
      return <div className="text-center p-10 text-red-600 bg-red-50 rounded-lg"><strong>Erro:</strong> {error}</div>;
    }

    switch (activeSection) {
      case 'avaliadores':
        return <ReviewersSection reviewers={reviewers} currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} onToggleAdmin={handleToggleAdminStatus} />;
      
      case 'ideias':
        // Modo Admin: usar editalId e adminToken se disponível
        if (activeEdital && adminToken) {
          return (
            <IdeasSection
              editalId={activeEdital._id}
              adminToken={adminToken}
              itemsPerPage={itemsPerPage}
            />
          );
        }
        // Fallback para modo compatibilidade
        return (
          <IdeasSection
            ideas={projects} 
            reviewers={reviewers}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            onPageChange={handlePageChange}
          />
        );
      
      case 'editais':
        return <EditaisSection />;
      
      case 'blog':
        return <BlogSectionADM />;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <AppHeader user={user} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="container mx-auto px-4 py-8 flex">
        <AppSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} activeSection={activeSection} setActiveSection={setActiveSection} menuItems={menuItems} />
        <main className="flex-1 ml-0 lg:ml-6">{renderActiveSection()}</main>
      </div>
    </div>
  );
};

export default PlatformAdminPage;