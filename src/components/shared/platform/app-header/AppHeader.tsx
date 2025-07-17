import { FiMenu, FiX } from 'react-icons/fi';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface AppHeaderProps {
  user: {
    name: string;
    avatar: string;
  };
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const AppHeader = ({ user, isMenuOpen, setIsMenuOpen }: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <img
          src="/trampolim-hero.png"
          alt="Logo do Trampolim"
          className="h-20 sm:h-30 w-auto max-w-[160px] sm:max-w-xs"
        />
        
        <div className="flex items-center space-x-4">
          <span className="hidden sm:inline-block font-medium text-[#3A6ABE]">{user.name}</span>
          <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-[#3A6ABE]/30 hover:border-[#F79B4B] transition-colors">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <Button 
            variant="ghost" 
            size="icon" 
            className="md:hidden text-[#3A6ABE] hover:text-[#F79B4B] hover:bg-transparent"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <FiX className="w-5 h-5" />
            ) : (
              <FiMenu className="w-5 h-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
};