import { FiCalendar, FiClock, FiFileText, FiAward, FiAlertCircle, FiCpu } from "react-icons/fi";
import { Button } from "@/components/ui/button";

interface EditalDetailsPageProps {
  hasActiveEdital: boolean;
  edital?: {
    id: string;
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    submissionDate: string;
    rules: string[];
    benefits: string[];
    aiSummary?: string;
  };
}

export const EditalReviewerPage = ({ hasActiveEdital, edital }: EditalDetailsPageProps) => {
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
              No momento não há editais abertos para avaliação.
            </p>
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
              <span className="text-[#3A6ABE] font-medium">Início: {edital.startDate}</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-[#3A6ABE]/20">
              <FiCalendar className="text-[#F79B4B] mr-2" />
              <span className="text-[#3A6ABE] font-medium">Término: {edital.endDate}</span>
            </div>
            <div className="flex items-center bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 border border-[#3A6ABE]/20">
              <FiClock className="text-[#F79B4B] mr-2" />
              <span className="text-[#3A6ABE] font-medium">Publicado em: {edital.submissionDate}</span>
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
              <p className="text-[#3A6ABE]/90 leading-relaxed">
                {edital.description}
              </p>
            </div>

            {/* Regulamento */}
            <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#3A6ABE] mb-4 flex items-center">
                <FiFileText className="mr-2 text-[#F79B4B]" />
                Regulamento
              </h2>
              <ul className="space-y-3 text-[#3A6ABE]/90">
                {edital.rules.map((rule, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-[#3A6ABE]/10 text-[#3A6ABE] rounded-full w-6 h-6 flex items-center justify-center mr-3 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span>{rule}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Benefícios */}
            <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-[#3A6ABE] mb-4 flex items-center">
                <FiAward className="mr-2 text-[#F79B4B]" />
                Benefícios para Projetos Selecionados
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {edital.benefits.map((benefit, index) => (
                  <div key={index} className="bg-[#F5F5F5] rounded-lg p-4 border border-[#3A6ABE]/20">
                    <div className="flex items-center">
                      <div className="bg-[#3A6ABE]/10 text-[#3A6ABE] rounded-full w-8 h-8 flex items-center justify-center mr-3 flex-shrink-0">
                        <FiAward className="text-[#F79B4B]" />
                      </div>
                      <span className="font-medium text-[#3A6ABE]">{benefit}</span>
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
                </div>
              )}
            </div>

            {/* Informações do Edital */}
            <div className="bg-gradient-to-br from-[#3A6ABE] to-[#3A6ABE]/90 rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-4">Detalhes do Edital</h3>
              <p className="mb-6">Informações sobre o edital vigente para avaliação.</p>
              
              <Button variant="outline" className="w-full bg-transparent border-white text-white hover:bg-white/10 mb-4">
                Baixar Edital Completo
              </Button>

              <div className="mt-6 pt-6 border-t border-white/20">
                <h4 className="font-medium mb-2">Período de Submissões</h4>
                <div className="flex items-center justify-between bg-white/10 rounded-lg p-3">
                  <div>
                    <p className="text-sm">Início</p>
                    <p className="font-medium">{edital.startDate}</p>
                  </div>
                  <div className="h-px bg-white/30 flex-1 mx-4"></div>
                  <div className="text-right">
                    <p className="text-sm">Término</p>
                    <p className="font-medium">{edital.endDate}</p>
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