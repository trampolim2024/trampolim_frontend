import { FiCalendar, FiFileText, FiAward, FiAlertCircle, FiCpu } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface EditalDetailsPageProps {
  hasActiveEdital: boolean;
  edital?: {
    _id: string;
    name: string;
    submissionStartDate: string;
    submissionEndDate: string;
    pdfUrl: string;
    sobre: string;
    regulamento: string;
    beneficios: string;
    aiSummary?: string;
  };
}

export const EditalDetailsPage = ({ hasActiveEdital, edital }: EditalDetailsPageProps) => {
  if (!hasActiveEdital || !edital) {
    return (
      <div className="bg-[#F5F5F5] min-h-screen py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-8 md:p-12">
            <div className="mx-auto w-24 h-24 bg-[#F79B4B]/10 rounded-full flex items-center justify-center mb-6">
              <FiAlertCircle className="text-[#F79B4B] text-3xl" />
            </div>
            <h1 className="text-3xl font-bold text-[#3A6ABE] mb-4">
              Nenhum Edital Vigente
            </h1>
            <p className="text-lg text-[#3A6ABE]/80 mb-6">
              No momento não há editais abertos para consulta. Fique atento às nossas comunicações para o próximo edital.
            </p>
            <Button className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90">
              Receber Notificações
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cabeçalho */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#3A6ABE] to-[#F79B4B] mb-4">
            {edital.name}
          </h1>
          <div className="flex flex-wrap justify-center gap-4 mt-6">
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-[#3A6ABE]/20">
              <FiCalendar className="text-[#F79B4B] mr-2" />
              <span className="text-[#3A6ABE] font-medium">
                Início: {new Date(edital.submissionStartDate).toLocaleDateString('pt-BR')}
              </span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-[#3A6ABE]/20">
              <FiCalendar className="text-[#F79B4B] mr-2" />
              <span className="text-[#3A6ABE] font-medium">
                Término: {new Date(edital.submissionEndDate).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </div>
        </div>

        {/* Grid de conteúdo */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna principal */}
          <div className="lg:col-span-2 space-y-8">
            {/* Descrição */}
            <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#3A6ABE] mb-4 flex items-center">
                <FiFileText className="mr-2 text-[#F79B4B]" />
                Sobre o Edital
              </h2>
              <p className="text-[#3A6ABE]/90 leading-relaxed whitespace-pre-wrap">
                {edital.sobre}
              </p>
            </div>

            {/* Regulamento */}
            <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#3A6ABE] mb-4 flex items-center">
                <FiFileText className="mr-2 text-[#F79B4B]" />
                Regulamento
              </h2>
              <div className="space-y-3 text-[#3A6ABE]/90">
                {edital.regulamento.split('\n').filter((line: string) => line.trim()).map((rule: string, index: number) => (
                  <div key={index} className="flex items-start">
                    <span className="bg-[#3A6ABE]/10 text-[#3A6ABE] rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0 text-xs font-medium">
                      {index + 1}
                    </span>
                    <span>{rule.trim()}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefícios */}
            <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#3A6ABE] mb-4 flex items-center">
                <FiAward className="mr-2 text-[#F79B4B]" />
                Benefícios para Projetos Selecionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {edital.beneficios.split('\n').filter((line: string) => line.trim()).map((benefit: string, index: number) => (
                  <div key={index} className="bg-[#F5F5F5] rounded-lg p-4 border border-[#3A6ABE]/20">
                    <div className="flex items-start">
                      <div className="bg-[#3A6ABE]/10 text-[#3A6ABE] rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                        <FiAward className="text-[#F79B4B]" />
                      </div>
                      <span className="font-medium text-[#3A6ABE]">{benefit.trim()}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Resumo por IA */}
            <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 md:p-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-[#3A6ABE] flex items-center">
                  <FiCpu className="mr-2 text-[#F79B4B]" />
                  Resumo por IA
                </h2>
                <span className="bg-[#F79B4B]/10 text-[#F79B4B] text-xs font-medium px-2 py-1 rounded-full">
                  POWERED BY AI
                </span>
              </div>
              
              {edital.aiSummary ? (
                <div className="bg-[#F5F5F5]/50 rounded-lg p-4 border border-[#3A6ABE]/10">
                  <p className="text-[#3A6ABE]/90 italic mb-3">"{edital.aiSummary}"</p>
                  <p className="text-xs text-[#3A6ABE]/60">Resumo gerado automaticamente por inteligência artificial com base no edital completo.</p>
                </div>
              ) : (
                <div className="bg-[#F5F5F5]/50 rounded-lg p-4 border border-[#3A6ABE]/10 text-center">
                  <p className="text-[#3A6ABE]/70 mb-2">Gerando resumo automático...</p>
                  <Button variant="outline" size="sm" className="border-[#3A6ABE] text-[#3A6ABE]">
                    <FiCpu className="mr-2" />
                    Gerar Resumo
                  </Button>
                </div>
              )}
            </div>

            {/* Ações */}
            <div className="bg-gradient-to-br from-[#3A6ABE] to-[#3A6ABE]/90 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Participe deste Edital</h3>
              <p className="mb-6">Submeta sua ideia inovadora e concorra aos benefícios oferecidos.</p>
              
              <div className="space-y-3">
                <Button className="w-full bg-white text-[#3A6ABE] hover:bg-white/90">
                  Submeter Ideia
                </Button>
                <Button variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white/10">
                  Baixar Edital Completo
                </Button>
                <Button variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white/10">
                  Tire suas Dúvidas
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <h4 className="font-medium mb-2">Período de Submissões</h4>
                <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                  <div>
                    <p className="text-sm">Início</p>
                    <p className="font-medium">{new Date(edital.submissionStartDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                  <div className="h-px bg-white/30 flex-1 mx-4"></div>
                  <div className="text-right">
                    <p className="text-sm">Término</p>
                    <p className="font-medium">{new Date(edital.submissionEndDate).toLocaleDateString('pt-BR')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};