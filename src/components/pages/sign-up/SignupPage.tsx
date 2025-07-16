import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaUser,
  FaGraduationCap,
  FaBriefcase,
  FaVenusMars,
  FaIdCard,
  FaPhone,
  FaMapMarkerAlt,
  FaLinkedin,
  FaFileAlt,
  FaEnvelope,
  FaLock,
  FaUserTie,
  FaLightbulb,
  FaCamera,
  FaGlobe
} from 'react-icons/fa';
import Navbar from '@/components/shared/navbar/Navbar';

const SignUpPage = () => {
  const [userType, setUserType] = useState<'empreendedor' | 'avaliador' | null>(null);
  const [formData, setFormData] = useState({
    // Dados comuns
    nomeCompleto: "",
    grauEscolaridade: "",
    areaAtuacao: "",
    genero: "",
    cpf: "",
    telefone: "",
    cep: "",
    estado: "",
    cidade: "",
    bairro: "",
    endereco: "",
    linkedin: "",
    miniCurriculo: "",
    email: "",
    senha: "",
    fotoPerfil: null as File | null,
    
    // Dados específicos do empreendedor
    nomeEmpresa: "",
    descricaoNegocio: "",
    siteEmpresa: "",
    
    // Dados específicos do avaliador
    monitorouStartup: "",
    descricaoIncubacao: "",
    areasEspecializacao: [] as string[]
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, fotoPerfil: e.target.files![0] }));
    }
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked, value } = e.target;
    setFormData(prev => {
      if (checked) {
        return { ...prev, areasEspecializacao: [...prev.areasEspecializacao, value] };
      } else {
        return { ...prev, areasEspecializacao: prev.areasEspecializacao.filter(item => item !== value) };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Dados enviados:', { ...formData, userType });
    alert(`Cadastro de ${userType} enviado com sucesso!`);
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 md:pt-36 md:pb-28 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#3A6ABE] blur-[100px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#F79B4B] blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1,
                  delayChildren: 0.2
                }
              }
            }}
          >
            <motion.div 
              className="max-w-3xl"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
            >
              <span className="inline-block bg-[#3A6ABE] text-white text-sm font-semibold px-3 py-1 rounded-full mb-6">
                JUNTE-SE AO TRAMPOLIM
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3A6ABE] mb-6 leading-tight">
                Faça parte do <span className="text-[#F79B4B]">ecossistema</span> de inovação
              </h1>
              <p className="text-lg text-[#3A6ABE]/90 mb-8 leading-relaxed">
                Seja um empreendedor inovador ou um avaliador especialista - seu talento é essencial para transformar o Agreste.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* User Type Selection */}
      <section className="relative py-10 md:py-16 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <motion.div
            className="flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.2
                }
              }
            }}
          >
            <motion.h2 
              className="text-2xl md:text-3xl font-bold text-[#3A6ABE] text-center mb-8 md:mb-12 leading-tight"
              variants={{
                hidden: { y: 20, opacity: 0 },
                visible: { y: 0, opacity: 1 }
              }}
            >
              Como você quer se cadastrar?
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1 }
              }}
            >
              <motion.button
                className={`p-8 rounded-2xl shadow-lg transition-all duration-300 flex flex-col items-center ${userType === 'empreendedor' ? 'bg-[#3A6ABE] text-white' : 'bg-white text-[#3A6ABE] hover:bg-[#F5F5F5]'}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserType('empreendedor')}
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
              >
                <FaLightbulb className="text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Empreendedor</h3>
                <p className="text-sm">Tenho um negócio inovador e quero acelerar meu crescimento</p>
              </motion.button>
              
              <motion.button
                className={`p-8 rounded-2xl shadow-lg transition-all duration-300 flex flex-col items-center ${userType === 'avaliador' ? 'bg-[#3A6ABE] text-white' : 'bg-white text-[#3A6ABE] hover:bg-[#F5F5F5]'}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserType('avaliador')}
                variants={{
                  hidden: { y: 40, opacity: 0 },
                  visible: { y: 0, opacity: 1 }
                }}
              >
                <FaUserTie className="text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2">Avaliador</h3>
                <p className="text-sm">Quero contribuir com meu conhecimento para avaliar projetos</p>
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <AnimatePresence>
        {userType && (
          <motion.section 
            className="relative py-10 md:py-16 bg-[#F5F5F5] overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
              <motion.div
                className="bg-white rounded-2xl shadow-xl overflow-hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="p-6 md:p-8 lg:p-10">
                  <div className="flex flex-col md:flex-row gap-8">
                    {/* Photo Upload */}
                    <motion.div 
                      className="w-full md:w-1/3 lg:w-1/4 flex flex-col items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="relative w-40 h-40 rounded-full bg-[#F5F5F5] mb-4 overflow-hidden border-2 border-[#3A6ABE]/20">
                        {formData.fotoPerfil ? (
                          <img 
                            src={URL.createObjectURL(formData.fotoPerfil)} 
                            alt="Preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#3A6ABE]/30">
                            <FaCamera className="text-4xl" />
                          </div>
                        )}
                      </div>
                      <label className="cursor-pointer">
                        <span className="px-4 py-2 bg-[#3A6ABE] text-white rounded-lg hover:bg-[#2E5AA7] transition-colors">
                          Adicionar Foto
                        </span>
                        <input 
                          type="file" 
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      <p className="text-sm text-[#3A6ABE]/70 mt-2">Tamanho máximo: 5MB</p>
                    </motion.div>
                    
                    {/* Form */}
                    <motion.form 
                      onSubmit={handleSubmit}
                      className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {/* Common Fields */}
                      <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-[#3A6ABE] mb-4 border-b border-[#3A6ABE]/20 pb-2">
                          Informações Pessoais
                        </h3>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="nomeCompleto" className="text-[#3A6ABE] font-medium">
                          Nome Completo
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaUser className="text-[#3A6ABE]" />
                          <input
                            type="text"
                            id="nomeCompleto"
                            name="nomeCompleto"
                            value={formData.nomeCompleto}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-[#3A6ABE] font-medium">
                          E-mail
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaEnvelope className="text-[#3A6ABE]" />
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="cpf" className="text-[#3A6ABE] font-medium">
                          CPF
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaIdCard className="text-[#3A6ABE]" />
                          <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={formData.cpf}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="telefone" className="text-[#3A6ABE] font-medium">
                          Telefone
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaPhone className="text-[#3A6ABE]" />
                          <input
                            type="text"
                            id="telefone"
                            name="telefone"
                            value={formData.telefone}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="genero" className="text-[#3A6ABE] font-medium">
                          Gênero
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaVenusMars className="text-[#3A6ABE]" />
                          <select
                            id="genero"
                            name="genero"
                            value={formData.genero}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                            required
                          >
                            <option value="">Selecione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                            <option value="Prefiro não informar">Prefiro não informar</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="grauEscolaridade" className="text-[#3A6ABE] font-medium">
                          Grau de Escolaridade
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaGraduationCap className="text-[#3A6ABE]" />
                          <input
                            type="text"
                            id="grauEscolaridade"
                            name="grauEscolaridade"
                            value={formData.grauEscolaridade}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="areaAtuacao" className="text-[#3A6ABE] font-medium">
                          Área de Atuação
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaBriefcase className="text-[#3A6ABE]" />
                          <input
                            type="text"
                            id="areaAtuacao"
                            name="areaAtuacao"
                            value={formData.areaAtuacao}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="linkedin" className="text-[#3A6ABE] font-medium">
                          LinkedIn (opcional)
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaLinkedin className="text-[#3A6ABE]" />
                          <input
                            type="url"
                            id="linkedin"
                            name="linkedin"
                            value={formData.linkedin}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                          />
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-[#3A6ABE] mb-4 border-b border-[#3A6ABE]/20 pb-2 mt-6">
                          Endereço
                        </h3>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="cep" className="text-[#3A6ABE] font-medium">
                          CEP
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaMapMarkerAlt className="text-[#3A6ABE]" />
                          <input
                            type="text"
                            id="cep"
                            name="cep"
                            value={formData.cep}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="estado" className="text-[#3A6ABE] font-medium">
                          Estado
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaMapMarkerAlt className="text-[#3A6ABE]" />
                          <input
                            type="text"
                            id="estado"
                            name="estado"
                            value={formData.estado}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="cidade" className="text-[#3A6ABE] font-medium">
                          Cidade
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaMapMarkerAlt className="text-[#3A6ABE]" />
                          <input
                            type="text"
                            id="cidade"
                            name="cidade"
                            value={formData.cidade}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="bairro" className="text-[#3A6ABE] font-medium">
                          Bairro
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaMapMarkerAlt className="text-[#3A6ABE]" />
                          <input
                            type="text"
                            id="bairro"
                            name="bairro"
                            value={formData.bairro}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1 md:col-span-2">
                        <label htmlFor="endereco" className="text-[#3A6ABE] font-medium">
                          Endereço Completo
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaMapMarkerAlt className="text-[#3A6ABE]" />
                          <input
                            type="text"
                            id="endereco"
                            name="endereco"
                            value={formData.endereco}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-[#3A6ABE] mb-4 border-b border-[#3A6ABE]/20 pb-2 mt-6">
                          {userType === 'empreendedor' ? 'Sobre seu Negócio' : 'Sua Experiência'}
                        </h3>
                      </div>
                      
                      {userType === 'empreendedor' ? (
                        <>
                          <div className="flex flex-col gap-1 md:col-span-2">
                            <label htmlFor="nomeEmpresa" className="text-[#3A6ABE] font-medium">
                              Nome da Empresa/Startup
                            </label>
                            <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                              <FaBriefcase className="text-[#3A6ABE]" />
                              <input
                                type="text"
                                id="nomeEmpresa"
                                name="nomeEmpresa"
                                value={formData.nomeEmpresa}
                                onChange={handleChange}
                                className="w-full outline-none bg-transparent"
                                required
                              />
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-1">
                            <label htmlFor="siteEmpresa" className="text-[#3A6ABE] font-medium">
                              Site da Empresa (opcional)
                            </label>
                            <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                              <FaGlobe className="text-[#3A6ABE]" />
                              <input
                                type="url"
                                id="siteEmpresa"
                                name="siteEmpresa"
                                value={formData.siteEmpresa}
                                onChange={handleChange}
                                className="w-full outline-none bg-transparent"
                              />
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-1 md:col-span-2">
                            <label htmlFor="descricaoNegocio" className="text-[#3A6ABE] font-medium">
                              Descreva seu Negócio
                            </label>
                            <div className="flex items-start gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20 min-h-[100px]">
                              <FaFileAlt className="text-[#3A6ABE] mt-1" />
                              <textarea
                                id="descricaoNegocio"
                                name="descricaoNegocio"
                                value={formData.descricaoNegocio}
                                onChange={handleChange}
                                className="w-full outline-none bg-transparent resize-none"
                                required
                              />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col gap-1">
                            <label htmlFor="monitorouStartup" className="text-[#3A6ABE] font-medium">
                              Já monitorou alguma startup?
                            </label>
                            <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                              <FaFileAlt className="text-[#3A6ABE]" />
                              <select
                                id="monitorouStartup"
                                name="monitorouStartup"
                                value={formData.monitorouStartup}
                                onChange={handleChange}
                                className="w-full outline-none bg-transparent"
                                required
                              >
                                <option value="">Selecione</option>
                                <option value="Sim">Sim</option>
                                <option value="Não">Não</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-1 md:col-span-2">
                            <label className="text-[#3A6ABE] font-medium">
                              Áreas de Especialização
                            </label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                              {['TI', 'Marketing', 'Finanças', 'RH', 'Operações', 'Jurídico', 'Vendas', 'Design', 'Outros'].map(area => (
                                <label key={area} className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    value={area}
                                    checked={formData.areasEspecializacao.includes(area)}
                                    onChange={handleCheckboxChange}
                                    className="text-[#3A6ABE] rounded"
                                  />
                                  <span className="text-[#3A6ABE]">{area}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-1 md:col-span-2">
                            <label htmlFor="descricaoIncubacao" className="text-[#3A6ABE] font-medium">
                              Descreva sua experiência com incubação/aceleração
                            </label>
                            <div className="flex items-start gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20 min-h-[100px]">
                              <FaFileAlt className="text-[#3A6ABE] mt-1" />
                              <textarea
                                id="descricaoIncubacao"
                                name="descricaoIncubacao"
                                value={formData.descricaoIncubacao}
                                onChange={handleChange}
                                className="w-full outline-none bg-transparent resize-none"
                                required
                              />
                            </div>
                          </div>
                        </>
                      )}
                      
                      <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-[#3A6ABE] mb-4 border-b border-[#3A6ABE]/20 pb-2 mt-6">
                          Credenciais de Acesso
                        </h3>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="senha" className="text-[#3A6ABE] font-medium">
                          Senha
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaLock className="text-[#3A6ABE]" />
                          <input
                            type="password"
                            id="senha"
                            name="senha"
                            value={formData.senha}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <label htmlFor="confirmarSenha" className="text-[#3A6ABE] font-medium">
                          Confirmar Senha
                        </label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaLock className="text-[#3A6ABE]" />
                          <input
                            type="password"
                            id="confirmarSenha"
                            name="confirmarSenha"
                            className="w-full outline-none bg-transparent"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="flex flex-col gap-1 md:col-span-2">
                        <label htmlFor="miniCurriculo" className="text-[#3A6ABE] font-medium">
                          {userType === 'empreendedor' ? 'Sobre o Empreendedor' : 'Mini Currículo'}
                        </label>
                        <div className="flex items-start gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20 min-h-[150px]">
                          <FaFileAlt className="text-[#3A6ABE] mt-1" />
                          <textarea
                            id="miniCurriculo"
                            name="miniCurriculo"
                            value={formData.miniCurriculo}
                            onChange={handleChange}
                            className="w-full outline-none bg-transparent resize-none"
                            required
                          />
                        </div>
                      </div>
                      
                      <div className="md:col-span-2 flex justify-center mt-8">
                        <motion.button
                          type="submit"
                          className="px-12 py-3 bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-500"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Finalizar Cadastro
                        </motion.button>
                      </div>
                    </motion.form>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SignUpPage;