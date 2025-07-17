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
    <Card className="overflow-hidden border border-gray-200 hover:border-[#3A6ABE]/30 hover:shadow-md transition-all group">
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
        />
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-6 bg-gradient-to-t from-black/70 to-transparent">
          <h3 className="font-semibold text-lg text-white mb-1">{course.title}</h3>
          <div className="flex items-center text-sm text-white/80 mb-2">
            <FiClock className="mr-1" />
            <span className="mr-3">{course.duration}</span>
            <span>{course.modules}</span>
          </div>
          <div className="mb-2">
            <Progress value={course.progress} className="h-2 bg-white/20" />
          </div>
          <div className="flex justify-between text-xs text-white/80">
            <span>{course.progress}% completo</span>
            <span>Último acesso: {course.lastWatched}</span>
          </div>
        </div>
      </div>
      <div className="p-4">
        <Button className="w-full bg-[#3A6ABE] hover:bg-[#3A6ABE]/90">
          <FiPlay className="mr-2" /> Continuar
        </Button>
      </div>
    </Card>
  );
};  