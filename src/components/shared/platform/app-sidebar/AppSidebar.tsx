import { useState } from 'react';
import { FiX, FiUser } from 'react-icons/fi'; // Adicionei FiUser para o ícone do perfil
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { LogoutModal } from '../logout-modal/LogoutModal';

interface MenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

interface AppSidebarProps {
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  menuItems: MenuItem[];
}

export const AppSidebar = ({
  isMenuOpen,
  setIsMenuOpen,
  activeSection,
  setActiveSection,
  menuItems
}: AppSidebarProps) => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Garantir que o item de perfil esteja presente nos menuItems
  const completeMenuItems = [
    {
      id: 'perfil',
      label: 'Meu Perfil',
      icon: <FiUser className="w-5 h-5" />
    },
    ...menuItems.filter(item => item.id !== 'perfil') // Remove duplicatas se existirem
  ];

  const handleLogout = () => {
    console.log('Logout realizado');
    setShowLogoutModal(false);
    // Adicione sua lógica de logout aqui
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden md:block w-56 pr-6">
        <nav className="space-y-2">
          {completeMenuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'ghost'}
              className={`w-full justify-start rounded-lg transition-all ${
                activeSection === item.id 
                  ? 'bg-[#3A6ABE] text-white hover:bg-[#3A6ABE]/90' 
                  : 'text-[#3A6ABE] hover:bg-[#3A6ABE]/10 hover:text-[#3A6ABE]'
              }`}
              onClick={() => {
                if (item.id === 'sair') {
                  setShowLogoutModal(true);
                } else {
                  setActiveSection(item.id);
                }
              }}
            >
              <span className="mr-3">{item.icon}</span>
              {item.label}
            </Button>
          ))}
        </nav>
      </aside>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-20 md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />
            
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween' }}
              className="fixed top-0 left-0 h-full w-64 bg-white z-30 shadow-xl md:hidden"
            >
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h2 className="text-xl font-bold text-[#3A6ABE]">Menu</h2>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-[#3A6ABE] hover:text-[#F79B4B] hover:bg-transparent"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FiX className="w-5 h-5" />
                </Button>
              </div>
              <nav className="p-2 space-y-2">
                {completeMenuItems.map((item) => (
                  <Button
                    key={item.id}
                    variant={activeSection === item.id ? 'default' : 'ghost'}
                    className={`w-full justify-start rounded-lg transition-all ${
                      activeSection === item.id 
                        ? 'bg-[#3A6ABE] text-white hover:bg-[#3A6ABE]/90' 
                        : 'text-[#3A6ABE] hover:bg-[#3A6ABE]/10 hover:text-[#3A6ABE]'
                    }`}
                    onClick={() => {
                      if (item.id === 'sair') {
                        setShowLogoutModal(true);
                      } else {
                        setActiveSection(item.id);
                      }
                      setIsMenuOpen(false);
                    }}
                  >
                    <span className="mr-3">{item.icon}</span>
                    {item.label}
                  </Button>
                ))}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Modal de Logout */}
      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </>
  );
};