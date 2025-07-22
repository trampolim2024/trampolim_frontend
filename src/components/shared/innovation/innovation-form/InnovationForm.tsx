import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

import { FiPlus } from "react-icons/fi";
import { MemberInput } from "../members-input/MemberInput";

interface InnovationFormProps {
  hasActiveEdital: boolean;
  hasSubmitted: boolean;
  onSubmit: (data: any) => void;
}

export const InnovationForm = ({ hasActiveEdital, hasSubmitted, onSubmit }: InnovationFormProps) => {
  const [formData, setFormData] = useState({
    projectName: '',
    stage: '',
    description: '',
    innovation: '',
    businessModel: '',
    technologies: '',
    pitchLink: '',
    members: [
      { name: '', cpf: '', photo: '' } 
    ]
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleMemberChange = (index: number, field: string, value: string) => {
    const updatedMembers = [...formData.members];
    updatedMembers[index] = { ...updatedMembers[index], [field]: value };
    setFormData(prev => ({ ...prev, members: updatedMembers }));
  };

  const handleMemberPhotoChange = (index: number, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const updatedMembers = [...formData.members];
      updatedMembers[index] = { ...updatedMembers[index], photo: e.target?.result as string };
      setFormData(prev => ({ ...prev, members: updatedMembers }));
    };
    reader.readAsDataURL(file);
  };

  const addMember = () => {
    if (formData.members.length < 5) {
      setFormData(prev => ({
        ...prev,
        members: [...prev.members, { name: '', cpf: '', photo: '' }]
      }));
    }
  };

  const removeMember = (index: number) => {
    if (formData.members.length > 1) {
      const updatedMembers = [...formData.members];
      updatedMembers.splice(index, 1);
      setFormData(prev => ({ ...prev, members: updatedMembers }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  if (hasSubmitted) {
    return (
      <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-8 text-center">
        <div className="mx-auto w-24 h-24 bg-[#3A6ABE]/10 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3A6ABE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
        </div>
        <h3 className="text-xl font-medium text-[#3A6ABE] mb-2">Submissão realizada com sucesso!</h3>
        <p className="text-[#3A6ABE]/80 mb-6">
          Sua ideia inovadora foi submetida com sucesso ao edital atual. Você será notificado sobre o andamento do processo.
        </p>
        <Button className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90">
          Ver minha submissão
        </Button>
      </div>
    );
  }

  if (!hasActiveEdital) {
    return (
      <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-8 text-center">
        <div className="mx-auto w-24 h-24 bg-[#F79B4B]/10 rounded-full flex items-center justify-center mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F79B4B" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h3 className="text-xl font-medium text-[#3A6ABE] mb-2">Nenhum edital ativo no momento</h3>
        <p className="text-[#3A6ABE]/80 mb-6">
          No momento não há editais abertos para submissão de ideias inovadoras. Fique atento às nossas comunicações para o próximo edital.
        </p>
        <Button className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90">
          Receber notificações
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 md:p-8">
        <h3 className="text-xl font-bold text-[#3A6ABE] mb-6">Informações Básicas</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Nome do Projeto *</label>
            <Input
              placeholder="Digite o nome do seu projeto"
              value={formData.projectName}
              onChange={(e) => handleChange('projectName', e.target.value)}
              className="border-[#3A6ABE]/40"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Estágio da Ideia *</label>
            <Select onValueChange={(value) => handleChange('stage', value)} required>
              <SelectTrigger className="border-[#3A6ABE]/40">
                <SelectValue placeholder="Selecione o estágio" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="idea">Ideia (Conceito)</SelectItem>
                <SelectItem value="prototype">Protótipo</SelectItem>
                <SelectItem value="mvp">MVP (Produto Mínimo Viável)</SelectItem>
                <SelectItem value="product">Produto no Mercado</SelectItem>
                <SelectItem value="scaling">Escalonamento</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Descrição da Ideia *</label>
          <Textarea
            placeholder="Descreva sua ideia inovadora com detalhes"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="border-[#3A6ABE]/40 min-h-[120px]"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Diferencial de Inovação *</label>
          <Textarea
            placeholder="O que torna sua ideia inovadora? Qual problema ela resolve?"
            value={formData.innovation}
            onChange={(e) => handleChange('innovation', e.target.value)}
            className="border-[#3A6ABE]/40 min-h-[100px]"
            required
          />
        </div>
      </div>
      
      <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 md:p-8">
        <h3 className="text-xl font-bold text-[#3A6ABE] mb-6">Equipe do Projeto</h3>
        
        {formData.members.map((member, index) => (
          <MemberInput
            key={index}
            index={index}
            member={member}
            onRemove={removeMember}
            onChange={handleMemberChange}
            onPhotoChange={handleMemberPhotoChange}
            isLeader={index === 0}
          />
        ))}
        
        {formData.members.length < 5 && (
          <Button
            type="button"
            variant="outline"
            className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10 w-full"
            onClick={addMember}
          >
            <FiPlus className="mr-2" /> Adicionar Integrante
          </Button>
        )}
      </div>
      
      <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 md:p-8">
        <h3 className="text-xl font-bold text-[#3A6ABE] mb-6">Detalhes Adicionais</h3>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Modelo de Negócio *</label>
          <Textarea
            placeholder="Como sua ideia irá gerar valor e se sustentar financeiramente?"
            value={formData.businessModel}
            onChange={(e) => handleChange('businessModel', e.target.value)}
            className="border-[#3A6ABE]/40 min-h-[100px]"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Tecnologias Utilizadas</label>
          <Input
            placeholder="Liste as principais tecnologias, ferramentas ou metodologias utilizadas"
            value={formData.technologies}
            onChange={(e) => handleChange('technologies', e.target.value)}
            className="border-[#3A6ABE]/40"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-[#3A6ABE] mb-1">Link do Pitch (Vídeo ou Apresentação) *</label>
          <Input
            placeholder="Cole o link do seu pitch (YouTube, Google Drive, etc)"
            value={formData.pitchLink}
            onChange={(e) => handleChange('pitchLink', e.target.value)}
            className="border-[#3A6ABE]/40"
            required
          />
          <p className="text-xs text-[#3A6ABE]/60 mt-1">O pitch deve ter no máximo 3 minutos explicando sua ideia</p>
        </div>
      </div>
      
      <div className="flex justify-end">
        <Button
          type="submit"
          className="bg-gradient-to-r from-[#3A6ABE] to-[#F79B4B] hover:from-[#3A6ABE]/90 hover:to-[#F79B4B]/90 h-12 px-8 rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
        >
          Submeter Ideia
        </Button>
      </div>
    </form>
  );
};