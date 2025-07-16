import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${scrolled ? 'shadow-lg' : 'shadow-md'}`}>
      <motion.div 
        className="absolute inset-0 border-b border-[#3A6ABE]/10"
        animate={{
          backgroundColor: scrolled ? 'rgba(245, 245, 245, 0.98)' : 'rgba(245, 245, 245, 0.92)',
          backdropFilter: scrolled ? 'blur(16px)' : 'blur(12px)'
        }}
        transition={{ duration: 0.5 }}
      />
      
      <div className="container relative flex h-24 items-center justify-between px-6 2xl:px-8 mx-auto">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center group relative z-10"
        >
          <div className="relative w-48 md:w-56 lg:w-64 xl:w-72 h-auto transition-all duration-300">
            <img
              src="/trampolim-header.svg"
              alt="Trampolim Logo"
              className="w-full h-auto object-contain drop-shadow-md hover:drop-shadow-lg transition-all"
            />
            <motion.div 
              className="absolute inset-0 bg-[#3A6ABE] opacity-0 group-hover:opacity-10 rounded-full blur-md"
              initial={{ scale: 0.8 }}
              animate={{ scale: isMenuOpen ? 1.2 : 1 }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </motion.div>

        <nav className="hidden md:flex items-center gap-0.5 lg:gap-1 xl:gap-2">
          {['Home', 'Cidades', 'Economia', 'Cultura', 'Contato'].map((item, index) => (
            <motion.div
              key={item}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 + 0.2, type: 'spring' }}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="ghost" 
                className="text-[#3A6ABE] hover:text-[#F79B4B] px-5 lg:px-6 py-5 lg:py-6 rounded-xl font-medium text-base lg:text-lg xl:text-xl transition-all duration-300 hover:bg-[#3A6ABE]/5"
              >
                <span className="relative">
                  {item}
                  <motion.span 
                    className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#F79B4B]"
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.3 }}
                  />
                </span>
              </Button>
            </motion.div>
          ))}
          
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="ml-2 lg:ml-4"
          >
            <Button 
              className="bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white px-6 lg:px-8 py-5 lg:py-6 rounded-xl shadow-lg hover:shadow-[#F79B4B]/40 transition-all duration-500"
            >
              <span className="font-semibold">Acessar</span>
            </Button>
          </motion.div>
        </nav>

        <div className="md:hidden">
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="text-[#3A6ABE] relative w-12 h-12 group"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                <motion.div
                  animate={isMenuOpen ? "open" : "closed"}
                  variants={{
                    open: { rotate: 90, scale: 1.1 },
                    closed: { rotate: 0, scale: 1 }
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-8 w-8" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: -90, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-8 w-8" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Button>
            </SheetTrigger>
            
            <SheetContent 
              side="right" 
              className="bg-[#F5F5F5]/98 backdrop-blur-2xl border-l border-[#3A6ABE]/15 w-full max-w-xs p-0 overflow-hidden"
            >
              <motion.div 
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ type: 'spring', damping: 25 }}
                className="flex flex-col h-full"
              >
                {/* Header do menu mobile */}
                <div className="px-6 pt-8 pb-6 border-b border-[#3A6ABE]/10">
                  <div className="relative w-40 h-12">
                    <img
                      src="/trampolim-header.svg"
                      alt="Trampolim Logo"
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                
                <div className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
                  {['Home', 'Cidades', 'Economia', 'Cultura', 'Contato'].map((item, index) => (
                    <motion.div
                      key={item}
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                      whileHover={{ x: 5 }}
                      className="px-2"
                    >
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-[#3A6ABE] hover:text-[#F79B4B] hover:bg-[#3A6ABE]/5 text-lg p-5 rounded-lg transition-colors"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {item}
                      </Button>
                    </motion.div>
                  ))}
                </div>
                
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="px-6 pb-8 pt-4 border-t border-[#3A6ABE]/10"
                >
                  <Button 
                    className="w-full bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white py-4 text-lg rounded-lg shadow hover:shadow-md transition-all"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Acessar
                  </Button>
                </motion.div>
              </motion.div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;