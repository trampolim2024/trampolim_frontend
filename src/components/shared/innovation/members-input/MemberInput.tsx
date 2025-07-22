
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiTrash2, FiUpload } from "react-icons/fi";

interface MemberInputProps {
  index: number;
  member: {
    name: string;
    cpf: string;
    photo?: string;
  };
  onRemove: (index: number) => void;
  onChange: (index: number, field: string, value: string) => void;
  onPhotoChange: (index: number, file: File) => void;
  isLeader?: boolean;
}

export const MemberInput = ({
  index,
  member,
  onRemove,
  onChange,
  onPhotoChange,
  isLeader = false
}: MemberInputProps) => {
  return (
    <div className="border border-[#3A6ABE]/30 rounded-lg p-4 mb-4 bg-white/50 backdrop-blur-sm">
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <Avatar className="w-14 h-14 border-2 border-[#F79B4B]/50">
            {member.photo ? (
              <AvatarImage src={member.photo} alt={member.name} />
            ) : (
              <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE]">
                {member.name.charAt(0) || '?'}
              </AvatarFallback>
            )}
          </Avatar>
          <label className="mt-2 flex items-center justify-center text-xs text-[#3A6ABE] cursor-pointer">
            <FiUpload className="mr-1" />
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => e.target.files?.[0] && onPhotoChange(index, e.target.files[0])}
            />
            Foto
          </label>
        </div>
        
        <div className="flex-1 space-y-3">
          <div>
            <label className="block text-sm font-medium text-[#3A6ABE] mb-1">
              {isLeader ? 'Líder do Projeto' : `Integrante ${index}`}
            </label>
            <Input
              placeholder="Nome completo"
              value={member.name}
              onChange={(e) => onChange(index, 'name', e.target.value)}
              className="border-[#3A6ABE]/40"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#3A6ABE] mb-1">CPF</label>
            <Input
              placeholder="000.000.000-00"
              value={member.cpf}
              onChange={(e) => onChange(index, 'cpf', e.target.value)}
              className="border-[#3A6ABE]/40"
            />
          </div>
        </div>
        
        {!isLeader && (
          <Button
            variant="ghost"
            size="icon"
            className="text-[#3A6ABE]/70 hover:text-[#F79B4B]"
            onClick={() => onRemove(index)}
          >
            <FiTrash2 />
          </Button>
        )}
      </div>
    </div>
  );
};