import { FiClock, FiEye } from 'react-icons/fi';
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
    <Card key={course.id} className="overflow-hidden border border-gray-200 hover:border-[#3A6ABE]/30 hover:shadow-md transition-all group">
      <div className="relative">
        <img 
          src={course.thumbnail} 
          alt={course.title} 
          className="w-full h-40 object-cover group-hover:opacity-90 transition-opacity"
        />
        <div className="absolute top-2 right-2 bg-white/90 text-[#F79B4B] text-xs font-bold px-2 py-1 rounded">
          ⭐ {course.rating}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg text-[#3A6ABE] mb-2 line-clamp-2">{course.title}</h3>
        <p className="text-sm text-[#3A6ABE]/80 mb-3">Por {course.instructor}</p>
        <div className="flex items-center text-sm text-[#3A6ABE]/80 mb-4">
          <FiClock className="mr-1" />
          <span className="mr-3">{course.duration}</span>
          <span>{course.modules}</span>
        </div>
        <Button variant="outline" className="w-full border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10 hover:border-[#3A6ABE]/80">
          <FiEye className="mr-2" /> Ver curso
        </Button>
      </div>
    </Card>
  );
};