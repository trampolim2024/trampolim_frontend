import { FiMenu, FiX, FiBell, FiHelpCircle } from 'react-icons/fi';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom'; 

interface AppHeaderProps {
  user: {
    name: string;
    avatar: string; 
    role?: string;
  };
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
}

export const AppHeader = ({ user, isMenuOpen, setIsMenuOpen }: AppHeaderProps) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-[#3A6ABE]/10 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo e Ícone de Menu para mobile */}
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden text-[#3A6ABE] hover:text-[#F79B4B] hover:bg-[#3A6ABE]/10"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <FiX className="w-5 h-5" /> : <FiMenu className="w-5 h-5" />}
            </Button>
            
            <Link to="/" className="flex items-center">
              <img
                src="/trampolim-hero.png"
                alt="Logo do Trampolim"
                className="h-10 sm:h-12 w-auto transition-all duration-300 hover:opacity-90"
              />
              {user.role && (
                <span className="ml-3 hidden lg:inline-block text-xs px-2 py-1 bg-[#F79B4B]/10 text-[#F79B4B] rounded-full font-medium">
                  {user.role}
                </span>
              )}
            </Link>
          </div>

          {/* Área de ações do usuário */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <Button variant="ghost" size="icon" className="text-[#3A6ABE] hover:text-[#F79B4B] hover:bg-[#3A6ABE]/10 relative" aria-label="Notificações">
              <FiBell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#F79B4B] rounded-full"></span>
            </Button>
            
            <Button variant="ghost" size="icon" className="hidden sm:inline-flex text-[#3A6ABE] hover:text-[#F79B4B] hover:bg-[#3A6ABE]/10" aria-label="Ajuda">
              <FiHelpCircle className="w-5 h-5" />
            </Button>
            
            <div className="hidden md:flex flex-col items-end mr-2">
              <span className="font-medium text-[#3A6ABE]">{user.name}</span>
              {user.role && (
                <span className="text-xs text-[#3A6ABE]/70">{user.role}</span>
              )}
            </div>
            
            <Avatar className="w-9 h-9 sm:w-10 sm:h-10 border-2 border-[#3A6ABE]/30 hover:border-[#F79B4B] transition-colors cursor-pointer">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE] font-medium">
                {user.name ? user.name.charAt(0).toUpperCase() : '?'}
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
};