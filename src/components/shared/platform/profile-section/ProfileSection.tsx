import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

interface ProfileSectionProps {
  user: {
    name: string;
    avatar: string;
  };
}

export const ProfileSection = ({ user }: ProfileSectionProps) => {
  return (
    <div className="flex flex-col items-center justify-center h-96 rounded-lg bg-white border border-gray-200">
      <Avatar className="w-24 h-24 border-2 border-[#3A6ABE] mb-4">
        <AvatarImage src={user.avatar} alt={user.name} />
        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-bold text-[#3A6ABE] mb-2">{user.name}</h2>
      <p className="text-[#3A6ABE]/80 mb-6">Administrador do Sistema</p>
      <Button variant="outline" className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10">
        Editar Perfil
      </Button>
    </div>
  );
};