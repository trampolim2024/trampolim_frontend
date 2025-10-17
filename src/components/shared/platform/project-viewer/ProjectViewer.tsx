import type { UserProject } from '@/hooks/useUserProject';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FiCalendar, FiUser, FiUsers, FiZap, FiLink2 } from 'react-icons/fi';

interface ProjectViewerProps {
  project: UserProject;
}

const getStatusColor = (status: string): 'default' | 'secondary' | 'destructive' | 'outline' => {
  switch (status) {
    case 'Aprovado':
      return 'default';
    case 'Reprovado':
      return 'destructive';
    case 'Pendente':
    default:
      return 'outline';
  }
};

const getStatusLabel = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    'Pendente': '⏳ Pendente',
    'Aprovado': '✅ Aprovado',
    'Reprovado': '❌ Reprovado'
  };
  return statusMap[status] || status;
};

const getStageColor = (stage: string): string => {
  const colors: { [key: string]: string } = {
    'Ideação': 'bg-blue-100 text-blue-800',
    'Validação': 'bg-purple-100 text-purple-800',
    'MVP': 'bg-green-100 text-green-800',
    'Operação': 'bg-orange-100 text-orange-800',
    'Tração': 'bg-red-100 text-red-800'
  };
  return colors[stage] || 'bg-gray-100 text-gray-800';
};

const formatCPF = (cpf: string): string => {
  const clean = cpf.replace(/\D/g, '');
  if (clean.length !== 11) return cpf;
  return `${clean.substring(0, 3)}.${clean.substring(3, 6)}.${clean.substring(6, 9)}-${clean.substring(9)}`;
};

const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('pt-BR');
};

export const ProjectViewer = ({ project }: ProjectViewerProps) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Status e Data */}
      <div className="mb-8 p-6 bg-white rounded-lg border border-[#3A6ABE]/20">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-sm text-[#3A6ABE]/70 mb-2">Status da Submissão</p>
            <Badge variant={getStatusColor(project.status)} className="text-lg px-4 py-2">
              {getStatusLabel(project.status)}
            </Badge>
          </div>
          <div className="flex items-center gap-2 text-[#3A6ABE]/70">
            <FiCalendar className="w-5 h-5" />
            <span>Submetido em {formatDate(project.createdAt)}</span>
          </div>
        </div>
      </div>

      {/* Informações Principais */}
      <Card className="mb-8 p-6 border-[#3A6ABE]/20">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-[#3A6ABE] mb-4">{project.nomeProjeto}</h2>
          <div className="flex flex-wrap gap-3 items-center">
            <Badge className={getStageColor(project.estagioIdeia)}>
              {project.estagioIdeia}
            </Badge>
            <span className="text-sm text-[#3A6ABE]/70">Etapa do Projeto</span>
          </div>
        </div>

        {/* Descrição e Diferencial */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-[#3A6ABE] mb-2">Descrição da Ideia</h3>
            <p className="text-[#3A6ABE]/80 whitespace-pre-wrap">{project.descricaoIdeia}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#3A6ABE] mb-2">Diferencial de Inovação</h3>
            <p className="text-[#3A6ABE]/80 whitespace-pre-wrap">{project.diferencialInovacao}</p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-[#3A6ABE] mb-2">Modelo de Negócio</h3>
            <p className="text-[#3A6ABE]/80 whitespace-pre-wrap">{project.modeloNegocio}</p>
          </div>
        </div>
      </Card>

      {/* Tecnologias */}
      {project.tecnologiasUtilizadas && project.tecnologiasUtilizadas.length > 0 && (
        <Card className="mb-8 p-6 border-[#3A6ABE]/20">
          <h3 className="text-lg font-semibold text-[#3A6ABE] mb-4">Tecnologias Utilizadas</h3>
          <div className="flex flex-wrap gap-2">
            {project.tecnologiasUtilizadas.map((tech, index) => (
              <Badge key={index} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Pitch */}
      <Card className="mb-8 p-6 border-[#3A6ABE]/20">
        <h3 className="text-lg font-semibold text-[#3A6ABE] mb-4 flex items-center gap-2">
          <FiZap className="w-5 h-5" />
          Pitch
        </h3>

        {project.videoPitchUrl && (
          <div className="mb-6">
            <p className="text-sm text-[#3A6ABE]/70 mb-3">Vídeo Pitch</p>
            <video
              src={project.videoPitchUrl}
              controls
              className="w-full rounded-lg bg-black aspect-video"
            />
          </div>
        )}

        {project.linkPitch && (
          <div>
            <p className="text-sm text-[#3A6ABE]/70 mb-2">Link do Pitch</p>
            <a
              href={project.linkPitch}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#F79B4B] hover:text-[#F79B4B]/80 underline"
            >
              <FiLink2 className="w-4 h-4" />
              Abrir Pitch
            </a>
          </div>
        )}
      </Card>

      {/* Líder */}
      <Card className="mb-8 p-6 border-[#3A6ABE]/20">
        <h3 className="text-lg font-semibold text-[#3A6ABE] mb-4 flex items-center gap-2">
          <FiUser className="w-5 h-5" />
          Líder do Projeto
        </h3>
        <div className="flex items-center gap-4">
          <Avatar className="w-16 h-16 border-2 border-[#3A6ABE]/30">
            <AvatarImage src={project.lider.fotoUrl} alt={project.lider.nome} />
            <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE] font-semibold">
              {project.lider.nome.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold text-[#3A6ABE]">{project.lider.nome}</p>
            <p className="text-sm text-[#3A6ABE]/70">CPF: {formatCPF(project.lider.cpf)}</p>
          </div>
        </div>
      </Card>

      {/* Integrantes */}
      {project.integrantes && project.integrantes.length > 0 && (
        <Card className="mb-8 p-6 border-[#3A6ABE]/20">
          <h3 className="text-lg font-semibold text-[#3A6ABE] mb-4 flex items-center gap-2">
            <FiUsers className="w-5 h-5" />
            Integrantes ({project.integrantes.length})
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {project.integrantes.map((member, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-[#3A6ABE]/5 rounded-lg">
                <Avatar className="w-12 h-12 border-2 border-[#3A6ABE]/30">
                  <AvatarImage src={member.fotoUrl} alt={member.nome} />
                  <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE] font-semibold">
                    {member.nome.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-[#3A6ABE] truncate">{member.nome}</p>
                  <p className="text-xs text-[#3A6ABE]/70 truncate">CPF: {formatCPF(member.cpf)}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {/* Pontuação e Feedback */}
      {project.averageScore !== undefined && project.averageScore > 0 && (
        <Card className="mb-8 p-6 bg-blue-50 border-blue-200">
          <h3 className="text-lg font-semibold text-blue-900 mb-2">Pontuação</h3>
          <p className="text-3xl font-bold text-blue-900">{project.averageScore.toFixed(1)} / 10</p>
        </Card>
      )}

      {project.status === 'Reprovado' && project.finalJustification && (
        <Card className="mb-8 p-6 bg-red-50 border-red-200">
          <h3 className="text-lg font-semibold text-red-900 mb-3">Feedback</h3>
          <p className="text-red-900/80 whitespace-pre-wrap">{project.finalJustification}</p>
        </Card>
      )}
    </div>
  );
};
