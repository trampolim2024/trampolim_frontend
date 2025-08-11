import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { FiPlus } from "react-icons/fi";
import { MemberInput } from "../members-input/MemberInput";

interface MemberState {
  nome: string;
  cpf: string;
  foto: File | null; 
  previewUrl: string | undefined; 
}

interface InnovationFormProps {
  hasActiveEdital: boolean;
  hasSubmitted: boolean;
  onSubmit: (data: any) => Promise<void>;
}

export const InnovationForm = ({ hasActiveEdital, hasSubmitted, onSubmit }: InnovationFormProps) => {
  const [formData, setFormData] = useState({
    nomeProjeto: '',
    estagioIdeia: '',
    descricaoIdeia: '',
    diferencialInovacao: '',
    modeloNegocio: '',
    tecnologiasUtilizadas: '',
    linkPitch: '',
    videoPitch: null as File | null,
    members: [{ nome: '', cpf: '', foto: null, previewUrl: undefined }] as MemberState[],
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (field: string, value: string | File | null) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMemberTextChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...formData.members];
    const stateField = field === 'name' ? 'nome' : field;
    if (stateField === 'nome' || stateField === 'cpf') {
      updatedMembers[index][stateField] = value;
      setFormData(prev => ({ ...prev, members: updatedMembers }));
    }
  };

  const handleMemberPhotoChange = (index: number, file: File | null) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index].foto = file;
    updatedMembers[index].previewUrl = file ? URL.createObjectURL(file) : undefined;
    setFormData(prev => ({ ...prev, members: updatedMembers }));
  };

  const addMember = () => {
    if (formData.members.length < 5) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, { nome: '', cpf: '', foto: null, previewUrl: undefined }]
      }));
    }
  };

  const removeMember = (index: number) => {
    if (index > 0) {
      const memberToRemove = formData.members[index];
      if (memberToRemove.previewUrl) {
        URL.revokeObjectURL(memberToRemove.previewUrl);
      }
      const updatedMembers = formData.members.filter((_, i) => i !== index);
      setFormData(prev => ({ ...prev, members: updatedMembers }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const [lider, ...integrantes] = formData.members;
    
    const submissionData = {
      nomeProjeto: formData.nomeProjeto,
      estagioIdeia: formData.estagioIdeia,
      descricaoIdeia: formData.descricaoIdeia,
      diferencialInovacao: formData.diferencialInovacao,
      modeloNegocio: formData.modeloNegocio,
      tecnologiasUtilizadas: formData.tecnologiasUtilizadas.split(',').map(tech => tech.trim()).filter(Boolean),
      linkPitch: formData.linkPitch,
      videoPitch: formData.videoPitch,
      lider,
      integrantes,
    };
    
    await onSubmit(submissionData);
    setIsLoading(false);
  };

  if (hasSubmitted) {
    return (
      <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-8 text-center">
        <div className="mx-auto w-24 h-24 bg-[#3A6ABE]/10 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#3A6ABE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
        </div>
        <h3 className="text-xl font-medium text-[#3A6ABE] mb-2">Submissão realizada com sucesso!</h3>
        <p className="text-[#3A6ABE]/80 mb-6">Sua ideia foi submetida. Você será notificado sobre o andamento do processo.</p>
        <Button className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90">Ver minha submissão</Button>
      </div>
    );
  }

  if (!hasActiveEdital) {
    return (
      <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-8 text-center">
        <div className="mx-auto w-24 h-24 bg-[#F79B4B]/10 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#F79B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
        </div>
        <h3 className="text-xl font-medium text-[#3A6ABE] mb-2">Nenhum edital ativo no momento</h3>
        <p className="text-[#3A6ABE]/80 mb-6">Não há editais abertos para submissão. Fique atento para o próximo edital.</p>
        <Button className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90">Receber notificações</Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Informações Básicas */}
      <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 md:p-8">
        <h3 className="text-xl font-bold text-[#3A6ABE] mb-6">Informações Básicas</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Nome do Projeto *</label>
            <Input onChange={(e) => handleChange('nomeProjeto', e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Estágio da Ideia *</label>
            <Select onValueChange={(value) => handleChange('estagioIdeia', value)} required>
              <SelectTrigger><SelectValue placeholder="Selecione o estágio" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="Ideação">Ideação</SelectItem>
                <SelectItem value="Validação">Validação</SelectItem>
                <SelectItem value="MVP">MVP</SelectItem>
                <SelectItem value="Operação">Operação</SelectItem>
                <SelectItem value="Tração">Tração</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Descrição da Ideia *</label>
          <Textarea onChange={(e) => handleChange('descricaoIdeia', e.target.value)} required />
        </div>
        <div>
          <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Diferencial de Inovação *</label>
          <Textarea onChange={(e) => handleChange('diferencialInovacao', e.target.value)} required />
        </div>
      </div>

      {/* Equipe do Projeto */}
      <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 md:p-8">
        <h3 className="text-xl font-bold text-[#3A6ABE] mb-6">Equipe do Projeto</h3>
        {formData.members.map((member, index) => (
          <MemberInput
            key={index}
            index={index}
            member={{ name: member.nome, cpf: member.cpf, photo: member.previewUrl }}
            onRemove={removeMember}
            onChange={handleMemberTextChange}
            onPhotoChange={handleMemberPhotoChange}
            isLeader={index === 0}
          />
        ))}
        {formData.members.length < 5 && (
          <Button type="button" variant="outline" className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10 w-full" onClick={addMember}>
            <FiPlus className="mr-2" /> Adicionar Integrante
          </Button>
        )}
      </div>
      
      {/* Detalhes Adicionais */}
      <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 md:p-8">
        <h3 className="text-xl font-bold text-[#3A6ABE] mb-6">Detalhes Adicionais</h3>
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Modelo de Negócio *</label>
          <Textarea onChange={(e) => handleChange('modeloNegocio', e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Tecnologias Utilizadas</label>
          <Input placeholder="Separe as tecnologias por vírgula" onChange={(e) => handleChange('tecnologiasUtilizadas', e.target.value)} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Link do Pitch (URL)</label>
            <Input placeholder="https://youtube.com/seu-video" onChange={(e) => handleChange('linkPitch', e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Ou Envie o Vídeo do Pitch</label>
            <Input type="file" accept="video/*" onChange={(e) => handleChange('videoPitch', e.target.files ? e.target.files[0] : null)} />
          </div>
        </div>
        <p className="text-xs text-center text-[#3A6ABE]/60 mt-4">Forneça o link do pitch OU faça o upload do vídeo.</p>
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-[#3A6ABE] to-[#F79B4B] hover:from-[#3A6ABE]/90 hover:to-[#F79B4B]/90 h-12 px-8">
          {isLoading ? 'Enviando...' : 'Submeter Ideia'}
        </Button>
      </div>
    </form>
  );
};