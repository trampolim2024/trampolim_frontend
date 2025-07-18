import { FiLogOut } from 'react-icons/fi';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const LogoutModal = ({ isOpen, onClose, onConfirm }: LogoutModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Conteúdo do Modal - Corrigido o problema do botão */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative z-50 w-full max-w-md rounded-2xl bg-[#F5F5F5] p-6 shadow-xl"
          >
            {/* Botão de fechar */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-[#3A6ABE] focus:ring-offset-2"
            >
              <X className="h-5 w-5 text-[#3A6ABE]" />
              <span className="sr-only">Fechar</span>
            </button>

            {/* Conteúdo principal */}
            <div className="flex flex-col items-center text-center">
              {/* Ícone */}
              <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#3A6ABE]/10 to-[#3A6ABE]/20">
                <FiLogOut className="text-3xl text-[#3A6ABE]" />
              </div>

              {/* Textos */}
              <h3 className="text-xl font-semibold text-[#3A6ABE]">
                Confirmar saída
              </h3>
              <p className="mt-2 text-sm text-[#3A6ABE]/80">
                Você será desconectado e redirecionado para a página de login
              </p>

              {/* Botões - CORREÇÃO APLICADA AQUI */}
              <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
                <Button
                  variant="outline"
                  onClick={onClose}
                  className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={onConfirm}
                  className="bg-[#F79B4B] text-white hover:bg-[#F79B4B]/90"
                >
                  Confirmar
                </Button>
              </div>

              {/* Link de suporte */}
              <div className="mt-4 text-xs text-[#3A6ABE]/70 hover:text-[#3A6ABE]">
                <button className="hover:underline">Precisa de ajuda?</button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};