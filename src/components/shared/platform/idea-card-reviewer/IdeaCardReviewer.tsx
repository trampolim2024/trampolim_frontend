import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useState } from "react";
import { FiAlertCircle, FiCheck, FiX } from "react-icons/fi";

interface Entrepreneur {
  name: string;
  avatar: string;
  email?: string;
  phone?: string;
}

interface IdeaDetails {
  id: number;
  entrepreneur: Entrepreneur;
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

interface IdeaCardReviewerProps {
  idea: IdeaDetails;
}

export const IdeaCardReviewer = ({ idea }: IdeaCardReviewerProps) => {
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [isSummaryModalOpen, setIsSummaryModalOpen] = useState(false);
  const [evaluation, setEvaluation] = useState({
    score: 0,
    comment: ''
  });

  const handleEvaluate = () => {
    setIsDetailsModalOpen(false);
    setIsEvaluationModalOpen(true);
  };

  const handleSubmitEvaluation = () => {
    setIsEvaluationModalOpen(false);
    setIsSummaryModalOpen(true);
  };

  return (
    <>
      <Card className="overflow-hidden border border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all duration-300 rounded-xl bg-[#F5F5F5]/50">
        <div className="p-5 md:p-6">
          {/* Cabeçalho */}
          <div className="flex items-start space-x-4 mb-5">
            <Avatar className="w-12 h-12 border-2 border-[#3A6ABE]/30 shadow-sm">
              <AvatarImage src={idea.entrepreneur.avatar} alt={idea.entrepreneur.name} />
              <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE] font-medium">
                {idea.entrepreneur.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-[#3A6ABE] truncate">{idea.entrepreneur.name}</h3>
              <span className="text-sm text-[#3A6ABE]/70">
                {new Date(idea.submissionDate).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric'
                })}
              </span>
            </div>
          </div>
          
          {/* Detalhes principais */}
          <div className="mb-5 space-y-2">
            <h4 className="font-bold text-xl text-[#3A6ABE] line-clamp-2 leading-tight">
              {idea.projectName}
            </h4>
            <p className="text-sm text-[#3A6ABE]/80">
              <span className="font-medium">Edital:</span> {idea.edital}
            </p>
          </div>
          
          {/* Status */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
            <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
              idea.status === 'Avaliado' 
                ? 'bg-[#3A6ABE]/10 text-[#3A6ABE]' 
                : idea.status === 'Em análise' 
                  ? 'bg-[#F79B4B]/10 text-[#F79B4B]' 
                  : 'bg-gray-200/50 text-gray-600'
            }`}>
              {idea.status}
            </span>
          </div>
          
          {/* Botão de ação */}
          <Button 
            className="w-full bg-[#3A6ABE] hover:bg-[#3A6ABE]/90 h-11 rounded-lg font-medium text-white shadow-sm transition-colors duration-200"
            onClick={() => setIsDetailsModalOpen(true)}
          >
            Ver detalhes da ideia
          </Button>
        </div>
      </Card>

      {/* Modal de Detalhes */}
      <Dialog open={isDetailsModalOpen} onOpenChange={setIsDetailsModalOpen}>
        <DialogContent className="max-w-2xl rounded-lg border-[#3A6ABE]/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#3A6ABE]">
              {idea.projectName}
            </DialogTitle>
            <div className="flex items-center gap-2 pt-2">
              <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                idea.status === 'Avaliado' ? 'bg-[#3A6ABE]/10 text-[#3A6ABE]' 
                : 'bg-[#F79B4B]/10 text-[#F79B4B]'
              }`}>
                {idea.status}
              </span>
              <span className="text-sm text-[#3A6ABE]/70">
                Submetido em: {new Date(idea.submissionDate).toLocaleDateString('pt-BR')}
              </span>
            </div>
          </DialogHeader>

          <div className="grid gap-6 py-4">
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#3A6ABE] mb-2">Problema</h4>
                <p className="text-[#3A6ABE]/90">{idea.problem}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-[#3A6ABE] mb-2">Solução Proposta</h4>
                <p className="text-[#3A6ABE]/90">{idea.solution}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-[#3A6ABE] mb-2">Público-Alvo</h4>
                <p className="text-[#3A6ABE]/90">{idea.targetAudience}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#3A6ABE] mb-2">Diferencial Competitivo</h4>
                <p className="text-[#3A6ABE]/90">{idea.differential}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-[#3A6ABE] mb-2">Recursos Necessários</h4>
                <p className="text-[#3A6ABE]/90">{idea.resourcesNeeded}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-[#3A6ABE] mb-2">Tempo de Implementação</h4>
                <p className="text-[#3A6ABE]/90">{idea.implementationTime}</p>
              </div>
            </div>
          </div>

          <DialogFooter className="border-t border-[#3A6ABE]/10 pt-4">
            <Button 
              variant="outline" 
              className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10"
              onClick={() => setIsDetailsModalOpen(false)}
            >
              <FiX className="mr-2" /> Fechar
            </Button>
            <Button 
              className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90"
              onClick={handleEvaluate}
            >
              <FiCheck className="mr-2" /> Avaliar Ideia
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Avaliação */}
      <Dialog open={isEvaluationModalOpen} onOpenChange={setIsEvaluationModalOpen}>
        <DialogContent className="max-w-md rounded-lg border-[#3A6ABE]/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#3A6ABE]">
              Avaliar Ideia
            </DialogTitle>
            <DialogDescription className="text-[#3A6ABE]/80">
              Atribua uma nota e comente sobre a ideia "{idea.projectName}"
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            <div>
              <h4 className="font-semibold text-[#3A6ABE] mb-3">Nota (1-5)</h4>
              <div className="flex justify-between">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-medium ${
                      evaluation.score === num
                        ? 'bg-[#3A6ABE] text-white'
                        : 'bg-[#3A6ABE]/10 text-[#3A6ABE] hover:bg-[#3A6ABE]/20'
                    }`}
                    onClick={() => setEvaluation({...evaluation, score: num})}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold text-[#3A6ABE] mb-2">Comentários</h4>
              <textarea
                className="w-full min-h-[120px] p-3 border border-[#3A6ABE]/40 rounded-lg focus:ring-2 focus:ring-[#3A6ABE]/50 focus:border-[#3A6ABE]/50"
                placeholder="Descreva os pontos fortes e áreas para melhoria..."
                value={evaluation.comment}
                onChange={(e) => setEvaluation({...evaluation, comment: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter className="border-t border-[#3A6ABE]/10 pt-4">
            <Button 
              variant="outline" 
              className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10"
              onClick={() => setIsEvaluationModalOpen(false)}
            >
              <FiX className="mr-2" /> Cancelar
            </Button>
            <Button 
              className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90"
              onClick={handleSubmitEvaluation}
              disabled={evaluation.score === 0}
            >
              <FiCheck className="mr-2" /> Enviar Avaliação
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modal de Confirmação */}
      <Dialog open={isSummaryModalOpen} onOpenChange={setIsSummaryModalOpen}>
        <DialogContent className="max-w-md rounded-lg border-[#3A6ABE]/20">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-[#3A6ABE]">
              Avaliação Enviada
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="bg-[#3A6ABE]/5 p-4 rounded-lg">
              <h4 className="font-semibold text-[#3A6ABE] mb-1">Nota Final</h4>
              <div className="flex items-center">
                <span className="text-3xl font-bold text-[#3A6ABE] mr-2">
                  {evaluation.score}
                </span>
                <span className="text-[#3A6ABE]/80">/5</span>
              </div>
            </div>
            
            <div className="bg-[#F79B4B]/5 p-4 rounded-lg">
              <h4 className="font-semibold text-[#F79B4B] mb-1">Seus Comentários</h4>
              <p className="text-[#3A6ABE]/90">
                {evaluation.comment || "Nenhum comentário fornecido"}
              </p>
            </div>
            
            <div className="flex items-center text-sm text-[#3A6ABE]/80 p-3 bg-[#3A6ABE]/5 rounded-lg">
              <FiAlertCircle className="text-[#F79B4B] mr-2" />
              Esta avaliação será enviada ao empreendedor e à equipe de curadoria.
            </div>
          </div>

          <DialogFooter className="border-t border-[#3A6ABE]/10 pt-4">
            <Button 
              className="w-full bg-[#3A6ABE] hover:bg-[#3A6ABE]/90"
              onClick={() => setIsSummaryModalOpen(false)}
            >
              <FiCheck className="mr-2" /> Confirmar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};