import { FiClock, FiEye, FiStar } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CourseCardRecommendedProps {
  course: {
    id: number;
    title: string;
    thumbnail: string;
    instructor: string;
    modules: string;
    duration: string;
    rating: string;
  };
}

export const CourseCardRecommended = ({ course }: CourseCardRecommendedProps) => {
  return (
    <Card className="overflow-hidden border border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all duration-300 rounded-xl bg-[#F5F5F5]/50 group h-full flex flex-col">
      <div className="relative flex-1">
        <div className="aspect-video overflow-hidden">
          <img 
            src={course.thumbnail} 
            alt={course.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>
        
        {/* Badge de avaliação */}
        <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-[#F79B4B] text-sm font-bold px-3 py-1.5 rounded-full shadow-sm flex items-center">
          <FiStar className="mr-1 fill-[#F79B4B]/80" size={14} />
          {course.rating}
        </div>
      </div>
      
      <div className="p-5 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="font-bold text-xl text-[#3A6ABE] line-clamp-2 leading-tight mb-1.5">
            {course.title}
          </h3>
          <p className="text-sm text-[#3A6ABE]/70">Por <span className="font-medium">{course.instructor}</span></p>
        </div>
        
        <div className="mt-auto">
          <div className="flex items-center gap-4 text-sm text-[#3A6ABE]/80 mb-4">
            <div className="flex items-center">
              <FiClock className="mr-1.5 text-[#F79B4B]" size={16} />
              <span>{course.duration}</span>
            </div>
            <div className="w-px h-4 bg-[#3A6ABE]/30"></div>
            <div>
              <span>{course.modules}</span>
            </div>
          </div>
          
          <Button 
            variant="outline" 
            className="w-full border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10 hover:border-[#3A6ABE]/80 h-11 rounded-lg font-medium transition-colors duration-200 group-hover:shadow-sm"
          >
            <FiEye className="mr-2" size={18} /> 
            Ver detalhes do curso
          </Button>
        </div>
      </div>
    </Card>
  );
};