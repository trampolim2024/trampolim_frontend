import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface Entrepreneur {
  name: string;
  avatar: string;
}

interface IdeaCardReviewerProps {
  idea: {
    id: number;
    entrepreneur: Entrepreneur;
    projectName: string;
    edital: string;
    submissionDate: string;
    status: string;
  };
}

export const IdeaCardReviewer = ({ idea }: IdeaCardReviewerProps) => {
  return (
    <Card className="overflow-hidden border border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all duration-300 rounded-xl bg-[#F5F5F5]/50">
      <div className="p-5 md:p-6">
        <div className="flex items-start space-x-4 mb-5">
          <Avatar className="w-12 h-12 border-2 border-[#3A6ABE]/30 shadow-sm">
            <AvatarImage src={idea.entrepreneur.avatar} alt={idea.entrepreneur.name} />
            <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE] font-medium">
              {idea.entrepreneur.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-[#3A6ABE] truncate">{idea.entrepreneur.name}</h3>
            <span className="text-sm text-[#3A6ABE]/70">{new Date(idea.submissionDate).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'long',
              year: 'numeric'
            })}</span>
          </div>
        </div>
        
        <div className="mb-5 space-y-2">
          <h4 className="font-bold text-xl text-[#3A6ABE] line-clamp-2 leading-tight">
            {idea.projectName}
          </h4>
          <p className="text-sm text-[#3A6ABE]/80">
            <span className="font-medium">Edital:</span> {idea.edital}
          </p>
        </div>
        
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
        
        <Button className="w-full bg-[#3A6ABE] hover:bg-[#3A6ABE]/90 h-11 rounded-lg font-medium text-white shadow-sm transition-colors duration-200">
          Ver detalhes da ideia
        </Button>
      </div>
    </Card>
  );
};