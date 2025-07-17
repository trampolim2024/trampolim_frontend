import { FiLogOut } from 'react-icons/fi';
import { Button } from '@/components/ui/button';

interface LogoutSectionProps {
  onCancel: () => void;
}

export const LogoutSection = ({ onCancel }: LogoutSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 rounded-lg bg-white border border-gray-200">
      <div className="text-[#3A6ABE] text-5xl mb-4">
        <FiLogOut />
      </div>
      <h2 className="text-2xl font-bold text-[#3A6ABE] mb-2">Deseja realmente sair?</h2>
      <p className="text-[#3A6ABE]/80 mb-6">Você será redirecionado para a página de login</p>
      <div className="flex space-x-4">
        <Button 
          variant="outline" 
          className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10"
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button className="bg-[#F79B4B] hover:bg-[#F79B4B]/90">
          Confirmar saída
        </Button>
      </div>
    </div>
  );
};