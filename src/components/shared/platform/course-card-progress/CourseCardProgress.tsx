import { FiClock, FiPlay } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface CourseCardProgressProps {
  course: {
    id: number;
    title: string;
    progress: number;
    thumbnail: string;
    lastWatched: string;
    modules: string;
    duration: string;
  };
}

export const CourseCardProgress = ({ course }: CourseCardProgressProps) => {
  return (
    <Card className="overflow-hidden border border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all duration-300 rounded-xl bg-[#F5F5F5]/50 group">
      <div className="relative">
        <div className="aspect-video overflow-hidden">
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Overlay com informações */}
        <div className="absolute bottom-0 left-0 right-0 px-5 pb-4 pt-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <h3 className="font-bold text-xl text-white line-clamp-2 mb-2 leading-tight">
            {course.title}
          </h3>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-white/90 mb-3">
            <div className="flex items-center">
              <FiClock className="mr-1.5 text-[#F79B4B]" size={16} />
              <span>{course.duration}</span>
            </div>
            <div className="w-px h-4 bg-white/30"></div>
            <div>
              <span>{course.modules}</span>
            </div>
          </div>
          
          <div className="mb-3">
            <div className="flex justify-between text-sm text-white mb-1.5">
              <span>Progresso</span>
              <span className="font-medium text-[#F79B4B]">{course.progress}%</span>
            </div>
            <Progress 
              value={course.progress} 
              className="h-2 bg-white/20"
            />
          </div>
          
          <div className="text-xs text-white/70">
            <span>Último acesso: {new Date(course.lastWatched).toLocaleDateString('pt-BR', {
              day: '2-digit',
              month: 'short',
              year: 'numeric'
            })}</span>
          </div>
        </div>
        
        {/* Badge de progresso */}
        {course.progress > 0 && (
          <div className="absolute top-3 right-3 bg-[#F79B4B] text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
            {course.progress}%
          </div>
        )}
      </div>
      
      <div className="p-5">
        <Button className="w-full bg-[#3A6ABE] hover:bg-[#3A6ABE]/90 h-11 rounded-lg font-medium text-white shadow-sm transition-colors duration-200 group-hover:shadow-md">
          <FiPlay className="mr-2" size={18} />
          {course.progress > 0 ? 'Continuar' : 'Começar'}
        </Button>
      </div>
    </Card>
  );
};