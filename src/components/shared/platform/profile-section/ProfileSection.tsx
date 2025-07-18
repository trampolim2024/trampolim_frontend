import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { FiEdit, FiGlobe, FiLinkedin, FiMail, FiPhone, FiMapPin, FiLock } from 'react-icons/fi';

interface UserProfile {
  nomeCompleto: string;
  email: string;
  cpf: string;
  telefone: string;
  genero: string;
  grauEscolaridade: string;
  areaAtuacao: string;
  linkedin?: string;
  fotoPerfil: string;
  cep: string;
  estado: string;
  cidade: string;
  bairro: string;
  endereco: string;
  nomeEmpresa: string;
  siteEmpresa: string;
  descricaoNegocio: string;
  miniCurriculo: string;
  role?: string;
}

interface ProfileSectionProps {
  user: UserProfile;
}

export const ProfileSection = ({ user }: ProfileSectionProps) => {
  const [isEditing, setIsEditing] = useState(false);
  
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Sidebar de Perfil */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 shadow-sm">
            <div className="flex flex-col items-center">
              <Avatar className="w-32 h-32 border-4 border-[#3A6ABE]/30 mb-4">
                <AvatarImage src={user.fotoPerfil} alt={user.nomeCompleto} />
                <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE] text-4xl font-medium">
                  {user.nomeCompleto.charAt(0)}
                </AvatarFallback>
              </Avatar>
              
              <h2 className="text-2xl font-bold text-[#3A6ABE] text-center mb-1">
                {user.nomeCompleto}
              </h2>
              
              <p className="text-[#F79B4B] font-medium mb-4">
                {user.role || 'Empreendedor(a)'}
              </p>
              
              <div className="flex space-x-3 mb-6">
                {user.linkedin && (
                  <Button variant="outline" size="icon" className="text-[#3A6ABE] border-[#3A6ABE]/40 hover:bg-[#3A6ABE]/10">
                    <FiLinkedin className="w-5 h-5" />
                  </Button>
                )}
                {user.siteEmpresa && (
                  <Button variant="outline" size="icon" className="text-[#3A6ABE] border-[#3A6ABE]/40 hover:bg-[#3A6ABE]/10">
                    <FiGlobe className="w-5 h-5" />
                  </Button>
                )}
              </div>
              
              <Button 
                onClick={() => setIsEditing(!isEditing)}
                className="w-full bg-[#3A6ABE] hover:bg-[#3A6ABE]/90 mb-6"
              >
                <FiEdit className="mr-2" /> 
                {isEditing ? 'Salvar Alterações' : 'Editar Perfil'}
              </Button>
              
              <div className="w-full space-y-4">
                <div className="flex items-center text-[#3A6ABE]">
                  <FiMail className="mr-3 text-[#3A6ABE]/70" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center text-[#3A6ABE]">
                  <FiPhone className="mr-3 text-[#3A6ABE]/70" />
                  <span className="text-sm">{user.telefone}</span>
                </div>
                <div className="flex items-center text-[#3A6ABE]">
                  <FiMapPin className="mr-3 text-[#3A6ABE]/70" />
                  <span className="text-sm">{user.cidade} - {user.estado}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Conteúdo Principal */}
        <div className="lg:col-span-2 space-y-6">
          {/* Seção da Empresa */}
          <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#3A6ABE] mb-4 flex items-center">
              <span className="w-2 h-6 bg-[#F79B4B] rounded-full mr-3"></span>
              Minha Empresa
            </h3>
            
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-[#3A6ABE]/80">Nome da Empresa</Label>
                  <Input id="companyName" defaultValue={user.nomeEmpresa} className="border-[#3A6ABE]/40" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyWebsite" className="text-[#3A6ABE]/80">Site da Empresa</Label>
                  <Input id="companyWebsite" defaultValue={user.siteEmpresa} className="border-[#3A6ABE]/40" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="businessDescription" className="text-[#3A6ABE]/80">Descrição do Negócio</Label>
                  <Textarea 
                    id="businessDescription" 
                    defaultValue={user.descricaoNegocio} 
                    className="border-[#3A6ABE]/40 min-h-[120px]" 
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-[#3A6ABE]/70">Nome da Empresa</h4>
                  <p className="text-[#3A6ABE]">{user.nomeEmpresa}</p>
                </div>
                <div>
                  <h4 className="font-medium text-[#3A6ABE]/70">Site</h4>
                  <a 
                    href={`https://${user.siteEmpresa}`} 
                    className="text-[#3A6ABE] hover:underline" 
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {user.siteEmpresa}
                  </a>
                </div>
                <div>
                  <h4 className="font-medium text-[#3A6ABE]/70">Descrição do Negócio</h4>
                  <p className="text-[#3A6ABE]">{user.descricaoNegocio}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Seção Informações Pessoais */}
          <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#3A6ABE] mb-4 flex items-center">
              <span className="w-2 h-6 bg-[#F79B4B] rounded-full mr-3"></span>
              Informações Pessoais
            </h3>
            
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="text-[#3A6ABE]/80">Nome Completo</Label>
                  <Input id="fullName" defaultValue={user.nomeCompleto} className="border-[#3A6ABE]/40" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cpf" className="text-[#3A6ABE]/80">CPF</Label>
                  <Input id="cpf" defaultValue={user.cpf} className="border-[#3A6ABE]/40" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="gender" className="text-[#3A6ABE]/80">Gênero</Label>
                  <Select defaultValue={user.genero}>
                    <SelectTrigger className="border-[#3A6ABE]/40">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Masculino">Masculino</SelectItem>
                      <SelectItem value="Feminino">Feminino</SelectItem>
                      <SelectItem value="Outro">Outro</SelectItem>
                      <SelectItem value="Prefiro não informar">Prefiro não informar</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="education" className="text-[#3A6ABE]/80">Escolaridade</Label>
                  <Select defaultValue={user.grauEscolaridade}>
                    <SelectTrigger className="border-[#3A6ABE]/40">
                      <SelectValue placeholder="Selecione" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Ensino Fundamental">Ensino Fundamental</SelectItem>
                      <SelectItem value="Ensino Médio">Ensino Médio</SelectItem>
                      <SelectItem value="Superior Incompleto">Superior Incompleto</SelectItem>
                      <SelectItem value="Superior Completo">Superior Completo</SelectItem>
                      <SelectItem value="Pós-graduação">Pós-graduação</SelectItem>
                      <SelectItem value="Mestrado">Mestrado</SelectItem>
                      <SelectItem value="Doutorado">Doutorado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="area" className="text-[#3A6ABE]/80">Área de Atuação</Label>
                  <Input id="area" defaultValue={user.areaAtuacao} className="border-[#3A6ABE]/40" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin" className="text-[#3A6ABE]/80">LinkedIn</Label>
                  <Input id="linkedin" defaultValue={user.linkedin} className="border-[#3A6ABE]/40" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="about" className="text-[#3A6ABE]/80">Sobre o Empreendedor</Label>
                  <Textarea 
                    id="about" 
                    defaultValue={user.miniCurriculo} 
                    className="border-[#3A6ABE]/40 min-h-[120px]" 
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-[#3A6ABE]/70">CPF</h4>
                  <p className="text-[#3A6ABE]">{user.cpf}</p>
                </div>
                <div>
                  <h4 className="font-medium text-[#3A6ABE]/70">Gênero</h4>
                  <p className="text-[#3A6ABE]">{user.genero}</p>
                </div>
                <div>
                  <h4 className="font-medium text-[#3A6ABE]/70">Escolaridade</h4>
                  <p className="text-[#3A6ABE]">{user.grauEscolaridade}</p>
                </div>
                <div>
                  <h4 className="font-medium text-[#3A6ABE]/70">Área de Atuação</h4>
                  <p className="text-[#3A6ABE]">{user.areaAtuacao}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-medium text-[#3A6ABE]/70">Sobre o Empreendedor</h4>
                  <p className="text-[#3A6ABE]">{user.miniCurriculo}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Seção Endereço */}
          <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 shadow-sm">
            <h3 className="text-xl font-bold text-[#3A6ABE] mb-4 flex items-center">
              <span className="w-2 h-6 bg-[#F79B4B] rounded-full mr-3"></span>
              Endereço
            </h3>
            
            {isEditing ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="cep" className="text-[#3A6ABE]/80">CEP</Label>
                  <Input id="cep" defaultValue={user.cep} className="border-[#3A6ABE]/40" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state" className="text-[#3A6ABE]/80">Estado</Label>
                  <Input id="state" defaultValue={user.estado} className="border-[#3A6ABE]/40" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="text-[#3A6ABE]/80">Cidade</Label>
                  <Input id="city" defaultValue={user.cidade} className="border-[#3A6ABE]/40" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="neighborhood" className="text-[#3A6ABE]/80">Bairro</Label>
                  <Input id="neighborhood" defaultValue={user.bairro} className="border-[#3A6ABE]/40" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address" className="text-[#3A6ABE]/80">Endereço Completo</Label>
                  <Input id="address" defaultValue={user.endereco} className="border-[#3A6ABE]/40" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-[#3A6ABE]/70">CEP</h4>
                  <p className="text-[#3A6ABE]">{user.cep}</p>
                </div>
                <div>
                  <h4 className="font-medium text-[#3A6ABE]/70">Estado</h4>
                  <p className="text-[#3A6ABE]">{user.estado}</p>
                </div>
                <div>
                  <h4 className="font-medium text-[#3A6ABE]/70">Cidade</h4>
                  <p className="text-[#3A6ABE]">{user.cidade}</p>
                </div>
                <div>
                  <h4 className="font-medium text-[#3A6ABE]/70">Bairro</h4>
                  <p className="text-[#3A6ABE]">{user.bairro}</p>
                </div>
                <div className="md:col-span-2">
                  <h4 className="font-medium text-[#3A6ABE]/70">Endereço</h4>
                  <p className="text-[#3A6ABE]">{user.endereco}</p>
                </div>
              </div>
            )}
          </div>
          
          {/* Seção Segurança (visível apenas ao editar) */}
          {isEditing && (
            <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 shadow-sm">
              <h3 className="text-xl font-bold text-[#3A6ABE] mb-4 flex items-center">
                <span className="w-2 h-6 bg-[#F79B4B] rounded-full mr-3"></span>
                Segurança
              </h3>
              
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword" className="text-[#3A6ABE]/80 flex items-center">
                    <FiLock className="mr-2" /> Senha Atual
                  </Label>
                  <Input 
                    id="currentPassword" 
                    type="password" 
                    className="border-[#3A6ABE]/40" 
                    placeholder="Digite sua senha atual" 
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="newPassword" className="text-[#3A6ABE]/80">Nova Senha</Label>
                    <Input 
                      id="newPassword" 
                      type="password" 
                      className="border-[#3A6ABE]/40" 
                      placeholder="Digite a nova senha" 
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-[#3A6ABE]/80">Confirmar Senha</Label>
                    <Input 
                      id="confirmPassword" 
                      type="password" 
                      className="border-[#3A6ABE]/40" 
                      placeholder="Confirme a nova senha" 
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};