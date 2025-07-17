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
    <Card className="overflow-hidden border border-gray-200 hover:border-[#3A6ABE]/30 hover:shadow-md transition-all">
      <div className="p-4">
        <div className="flex items-center space-x-3 mb-4">
          <Avatar className="w-10 h-10 border border-[#3A6ABE]/30">
            <AvatarImage src={idea.entrepreneur.avatar} alt={idea.entrepreneur.name} />
            <AvatarFallback>{idea.entrepreneur.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium text-[#3A6ABE]">{idea.entrepreneur.name}</h3>
            <span className="text-xs text-[#3A6ABE]/80">{idea.submissionDate}</span>
          </div>
        </div>
        
        <div className="mb-4">
          <h4 className="font-semibold text-lg text-[#3A6ABE] mb-1">{idea.projectName}</h4>
          <p className="text-sm text-[#3A6ABE]/80">Edital: {idea.edital}</p>
        </div>
        
        <div className="flex justify-between items-center mb-4">
          <span className={`text-xs px-2 py-1 rounded-full ${
            idea.status === 'Avaliado' 
              ? 'bg-green-100 text-green-800' 
              : idea.status === 'Em análise' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-gray-100 text-gray-800'
          }`}>
            {idea.status}
          </span>
        </div>
        
        <Button className="w-full bg-[#3A6ABE] hover:bg-[#3A6ABE]/90">
          Ver ideia
        </Button>
      </div>
    </Card>
  );
};