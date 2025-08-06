import { useState, useEffect } from 'react';
import { AppHeader } from '@/components/shared/platform/app-header/AppHeader';
import { AppSidebar } from '@/components/shared/platform/app-sidebar/AppSidebar';
import { BlogSectionADM } from '@/components/shared/platform/blog-section/BlogSection[ADM]';
import { EditaisSection } from '@/components/shared/platform/edital-section/EditalSection';
import { IdeasSection } from '@/components/shared/platform/ideas-section/IdeasSection';
import { ProfileSection } from '@/components/shared/platform/profile-section/ProfileSection';
import { ReviewersSection } from '@/components/shared/platform/reviewer-section/ReviewerSection';
import { FiUser, FiUsers, FiZap, FiFileText, FiBookmark, FiLogOut } from 'react-icons/fi';

// A URL da sua API
const API_BASE_URL = 'http://localhost:8080';

// Interface para os dados do usuário que vêm do back-end
// Esta interface deve ser completa para atender tanto a lista quanto o perfil
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
  };
  entrepreneur?: {
    companyName?: string;
    businessDescription?: string;
    companyWebsite?: string;
  };
}

const PlatformAdminPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('avaliadores');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // --- ESTADOS PARA OS DADOS DA API ---
  const [reviewers, setReviewers] = useState<UserData[]>([]);
  const [profileData, setProfileData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // --- FUNÇÃO PARA BUSCAR TODOS OS USUÁRIOS (para seção de avaliadores) ---
  const fetchUsers = async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("Autenticação necessária para acessar esta página.");
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/users`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao carregar os dados dos usuários.');
      }
      const data = await response.json();
      const filteredReviewers = data.users.filter((user: UserData) => user.type.includes('reviewer'));
      setReviewers(filteredReviewers);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  
  // --- FUNÇÃO PARA BUSCAR DADOS DO PERFIL DO USUÁRIO LOGADO ---
  const fetchProfileData = async () => {
    setIsLoading(true);
    setError(null);
    const token = localStorage.getItem('authToken');
    const userDataFromStorage = localStorage.getItem('user');
    
    if (!token || !userDataFromStorage) {
      setError("Dados do usuário não encontrados. Faça login novamente.");
      setIsLoading(false);
      return;
    }
    try {
      const loggedInUser = JSON.parse(userDataFromStorage);
      const userId = loggedInUser?._id;
      if (!userId) throw new Error("ID do usuário não encontrado no localStorage.");

      const response = await fetch(`${API_BASE_URL}/api/v1/trampolim/users/${userId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Falha ao carregar os dados do perfil.');
      }
      const data = await response.json();
      setProfileData(data.user);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- useEffect ATUALIZADO PARA CARREGAR DADOS DA SEÇÃO ATIVA ---
  useEffect(() => {
    setCurrentPage(1); // Reseta a página ao mudar de seção
    if (activeSection === 'avaliadores') {
      fetchUsers();
    } else if (activeSection === 'perfil') {
      fetchProfileData();
    }
  }, [activeSection]);

  // --- DADOS MOCADOS (Mantidos para as outras seções) ---
  const user = { name: 'Admin Master', avatar: 'https://randomuser.me/api/portraits/men/75.jpg', role: 'Administrador do Sistema' };
  const menuItems = [
    { id: 'perfil', label: 'Perfil', icon: <FiUser className="w-5 h-5" /> },
    { id: 'avaliadores', label: 'Avaliadores', icon: <FiUsers className="w-5 h-5" /> },
    { id: 'ideias', label: 'Ideias', icon: <FiZap className="w-5 h-5" /> },
    { id: 'editais', label: 'Editais', icon: <FiFileText className="w-5 h-5" /> },
    { id: 'blog', label: 'Blog', icon: <FiBookmark className="w-5 h-5" /> },
    { id: 'sair', label: 'Sair', icon: <FiLogOut className="w-5 h-5" /> }
  ];
  const allIdeas = Array.from({ length: 36 }, (_, i) => ({
    id: i + 1,
    entrepreneur: { name: `Empreendedor ${i + 1}`, avatar: `https://randomuser.me/api/portraits/${i % 2 === 0 ? 'men' : 'women'}/${(i % 50) + 1}.jpg` },
    projectName: `Projeto ${String.fromCharCode(65 + (i % 26))}${i + 1}`,
    edital: `Edital ${['Inovação', 'Tecnologia', 'Sustentabilidade', 'Social'][i % 4]}`,
    submissionDate: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
    status: ['Não avaliado', 'Em análise', 'Avaliado'][i % 3],
    assignedReviewer: i % 3 === 0 ? `Avaliador ${Math.floor(Math.random() * 24) + 1}` : null
  }));

  // --- FUNÇÕES DE MANIPULAÇÃO ---
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleToggleAdminStatus = async (userId: string, isCurrentlyAdmin: boolean) => {
    const action = isCurrentlyAdmin ? 'revoke' : 'grant';
    const endpoint = `${API_BASE_URL}/api/v1/trampolim/users/${userId}/${action}-admin`;
    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      alert(data.message); // Usando alert conforme solicitado
      fetchUsers(); // Recarrega a lista para mostrar a mudança
    } catch (err: any) {
      alert(`Erro: ${err.message}`); // Usando alert para erro
    }
  };

  // --- RENDERIZAÇÃO DA SEÇÃO ATIVA ---
  const renderActiveSection = () => {
    if (isLoading && (activeSection === 'avaliadores' || activeSection === 'perfil')) {
      return <div className="text-center p-10 font-medium text-lg text-gray-500">Carregando...</div>;
    }
    if (error) {
      return <div className="text-center p-10 text-red-600 bg-red-50 rounded-lg"><strong>Erro:</strong> {error}</div>;
    }

    switch (activeSection) {
      case 'avaliadores':
        return <ReviewersSection reviewers={reviewers} currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} onToggleAdmin={handleToggleAdminStatus} />;
      
      case 'ideias':
        return <IdeasSection ideas={allIdeas} reviewers={[]} currentPage={currentPage} itemsPerPage={itemsPerPage} onPageChange={handlePageChange} />;
      
      case 'editais':
        return <EditaisSection />;
      
      case 'blog':
        return <BlogSectionADM />;
      
      case 'perfil':
        if (profileData) {
          const profileProps = {
            nomeCompleto: profileData.fullName,
            email: profileData.email,
            cpf: profileData.cpf,
            telefone: profileData.phone,
            genero: profileData.gender,
            grauEscolaridade: profileData.educationLevel,
            areaAtuacao: profileData.fieldOfActivity,
            linkedin: profileData.linkedin || "",
            fotoPerfil: profileData.photoUrl ? `${API_BASE_URL}${profileData.photoUrl}` : "https://avatar.vercel.sh/random",
            cep: profileData.zipCode,
            estado: profileData.state,
            cidade: profileData.city,
            bairro: profileData.neighborhood,
            endereco: profileData.address,
            miniCurriculo: profileData.miniResume,
            nomeEmpresa: profileData.entrepreneur?.companyName || "",
            siteEmpresa: profileData.entrepreneur?.companyWebsite || "",
            descricaoNegocio: profileData.entrepreneur?.businessDescription || "",
            role: profileData.type.map(t => t.charAt(0).toUpperCase() + t.slice(1)).join(', ') // Ex: "Reviewer, Admin"
          };
          return <ProfileSection user={profileProps} />;
        }
        return <div>Não foi possível carregar os dados do perfil.</div>;

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <AppHeader user={user} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
      <div className="container mx-auto px-4 py-8 flex">
        <AppSidebar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} activeSection={activeSection} setActiveSection={setActiveSection} menuItems={menuItems} />
        <main className="flex-1 ml-0 lg:ml-6">
          {renderActiveSection()}
        </main>
      </div>
    </div>
  );
};

export default PlatformAdminPage;