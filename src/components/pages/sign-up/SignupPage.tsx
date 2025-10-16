import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUser, FaGraduationCap, FaBriefcase, FaVenusMars, FaIdCard,
  FaPhone, FaMapMarkerAlt, FaLinkedin, FaFileAlt, FaEnvelope,
  FaLock, FaUserTie, FaLightbulb, FaCamera, FaGlobe
} from 'react-icons/fa';
import Navbar from '@/components/shared/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

interface SignUpResponse {
  message: string;
  token: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    type: string[];
  };
}

const SignUpPage = () => {
  const navigate = useNavigate();
  const [userType, setUserType] = useState<'entrepreneur' | 'reviewer' | null>(null);

  const [formData, setFormData] = useState({
    fullName: "",
    educationLevel: "",
    fieldOfActivity: "",
    gender: "",
    cpf: "",
    phone: "",
    zipCode: "",
    state: "",
    city: "",
    neighborhood: "",
    address: "",
    linkedin: "",
    miniResume: "",
    email: "",
    password: "",
    confirmPassword: "",
    photoUrl: null as File | null,
    companyName: "",
    businessDescription: "",
    companyWebsite: "",
    mentoredStartup: false,
    incubationDescription: "",
    specializationAreas: [] as string[]
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  // Debug helpers
  const [debugLogs, setDebugLogs] = useState<string[]>([]);
  const [showDebug, setShowDebug] = useState(false);

  const addDebug = (msg: string) => {
    const timestamp = new Date().toISOString();
    const entry = `${timestamp} - ${msg}`;
    // keep recent first, cap at 200 lines
    setDebugLogs(prev => [entry, ...prev].slice(0, 200));
    // also print to the browser console
    console.debug('[Signup DEBUG]', entry);
  };

  const dumpFormDataEntries = (fd: FormData) => {
    const obj: Record<string, any> = {};
    try {
      for (const pair of fd.entries()) {
        const k = pair[0];
        const v = pair[1];
        if (k === 'password' || k === 'confirmPassword') {
          obj[k] = '***';
        } else if (v instanceof File) {
          obj[k] = { name: v.name, size: v.size, type: v.type };
        } else {
          obj[k] = v;
        }
      }
    } catch (e: any) {
      addDebug('Erro ao extrair FormData: ' + (e.message || String(e)));
    }
    return obj;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (error) setError(null);
    if (success) setSuccess(null);

    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => {
        const currentAreas = prev.specializationAreas;
        if (checked) {
          return { ...prev, specializationAreas: [...currentAreas, value] };
        } else {
          return { ...prev, specializationAreas: currentAreas.filter(area => area !== value) };
        }
      });
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, photoUrl: e.target.files![0] }));
    }
  };

  // === HELPER FUNCTIONS ===

  /**
   * Valida um email com regex básico
   */
  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  /**
   * Valida um CPF com verificadores de dígito
   */
  const isValidCPF = (cpf: string): boolean => {
    // CPF com todos os dígitos iguais é inválido
    if (/^(\d)\1{10}$/.test(cpf)) {
      return false;
    }
    
    // Validar primeiro dígito verificador
    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) {
      sum += parseInt(cpf.substring(i - 1, i), 10) * (11 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(9, 10), 10)) {
      return false;
    }

    // Validar segundo dígito verificador
    sum = 0;
    for (let i = 1; i <= 10; i++) {
      sum += parseInt(cpf.substring(i - 1, i), 10) * (12 - i);
    }
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) {
      remainder = 0;
    }
    if (remainder !== parseInt(cpf.substring(10, 11), 10)) {
      return false;
    }

    return true;
  };

  /**
   * Valida TODOS os dados do formulário
   */
  const validateFormData = (formData: any, userType: string | null): { isValid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // Validar tipo de usuário
    if (!userType) {
      errors.push('Selecione um tipo de cadastro (Empreendedor ou Avaliador)');
    }

    // --- VALIDAÇÕES DE CAMPOS PESSOAIS ---

    // Full Name
    if (!formData.fullName?.trim()) {
      errors.push('Nome completo é obrigatório');
    }

    // Email
    if (!formData.email?.trim()) {
      errors.push('E-mail é obrigatório');
    } else if (!isValidEmail(formData.email)) {
      errors.push('E-mail inválido');
    }

    // CPF - ⭐ CRÍTICO: Deve ter exatamente 11 dígitos
    if (!formData.cpf?.trim()) {
      errors.push('CPF é obrigatório');
    } else {
      const cleanCPF = formData.cpf.replace(/\D/g, '');
      if (cleanCPF.length !== 11) {
        errors.push(`CPF deve ter 11 dígitos (você tem ${cleanCPF.length})`);
      } else if (!isValidCPF(cleanCPF)) {
        errors.push('CPF inválido');
      }
    }

    // Phone - ⭐ CRÍTICO: Deve ter 10 ou 11 dígitos
    if (!formData.phone?.trim()) {
      errors.push('Telefone é obrigatório');
    } else {
      const cleanPhone = formData.phone.replace(/\D/g, '');
      if (cleanPhone.length < 10 || cleanPhone.length > 11) {
        errors.push(`Telefone deve ter 10 ou 11 dígitos (você tem ${cleanPhone.length})`);
      }
    }

    // CEP - ⭐ CRÍTICO: Deve ter exatamente 8 dígitos
    if (!formData.zipCode?.trim()) {
      errors.push('CEP é obrigatório');
    } else {
      const cleanZipCode = formData.zipCode.replace(/\D/g, '');
      if (cleanZipCode.length !== 8) {
        errors.push(`CEP deve ter 8 dígitos (você tem ${cleanZipCode.length})`);
      }
    }

    // State
    if (!formData.state?.trim()) {
      errors.push('Estado é obrigatório');
    }

    // City
    if (!formData.city?.trim()) {
      errors.push('Cidade é obrigatória');
    }

    // Neighborhood
    if (!formData.neighborhood?.trim()) {
      errors.push('Bairro é obrigatório');
    }

    // Address
    if (!formData.address?.trim()) {
      errors.push('Endereço completo é obrigatório');
    }

    // Gender
    if (!formData.gender?.trim()) {
      errors.push('Gênero é obrigatório');
    }

    // Education Level
    if (!formData.educationLevel?.trim()) {
      errors.push('Grau de escolaridade é obrigatório');
    }

    // Field of Activity
    if (!formData.fieldOfActivity?.trim()) {
      errors.push('Área de atuação é obrigatória');
    }

    // Mini Resume
    if (!formData.miniResume?.trim()) {
      errors.push(`${userType === 'entrepreneur' ? 'Sobre o Empreendedor' : 'Mini Currículo'} é obrigatório`);
    }

    // --- VALIDAÇÃO DE FOTO ---
    if (!formData.photoUrl) {
      errors.push('Foto de perfil é obrigatória');
    } else {
      // Validar tipo de arquivo
      if (!formData.photoUrl.type.startsWith('image/')) {
        errors.push('Arquivo deve ser uma imagem (JPEG, PNG, etc)');
      }
      // Validar tamanho (5MB = 5242880 bytes)
      const MAX_FILE_SIZE = 5 * 1024 * 1024;
      if (formData.photoUrl.size > MAX_FILE_SIZE) {
        const sizeMB = (formData.photoUrl.size / (1024 * 1024)).toFixed(1);
        errors.push(`Foto é muito grande: ${sizeMB}MB (máximo 5MB)`);
      }
    }

    // --- VALIDAÇÕES DE CREDENCIAIS ---

    // Password - ⭐ CRÍTICO: Mínimo 6 caracteres
    if (!formData.password) {
      errors.push('Senha é obrigatória');
    } else if (formData.password.length < 6) {
      errors.push(`Senha deve ter no mínimo 6 caracteres (você tem ${formData.password.length})`);
    }

    // Confirm Password
    if (!formData.confirmPassword) {
      errors.push('Confirmação de senha é obrigatória');
    } else if (formData.password !== formData.confirmPassword) {
      errors.push('As senhas não coincidem');
    }

    // --- VALIDAÇÕES ESPECÍFICAS POR TIPO ---

    if (userType === 'entrepreneur') {
      if (!formData.companyName?.trim()) {
        errors.push('Nome da empresa/startup é obrigatório');
      }
      if (!formData.businessDescription?.trim()) {
        errors.push('Descrição do negócio é obrigatória');
      }
    } else if (userType === 'reviewer') {
      if (!formData.incubationDescription?.trim()) {
        errors.push('Descrição de experiência com incubação é obrigatória');
      }
      if (formData.specializationAreas.length === 0) {
        errors.push('Selecione pelo menos uma área de especialização');
      }
    }

    return {
      isValid: errors.length === 0,
      errors
    };
  };

 const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError(null);
  setSuccess(null);

  // ✅ VALIDAR ANTES DE ENVIAR
  const validation = validateFormData(formData, userType);
  if (!validation.isValid) {
    setError(validation.errors.join('\n'));
    window.scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  setIsLoading(true);

  const dataToSend = new FormData();

  // Adiciona os campos de texto simples
  dataToSend.append('fullName', formData.fullName);
  dataToSend.append('educationLevel', formData.educationLevel);
  dataToSend.append('fieldOfActivity', formData.fieldOfActivity);
  dataToSend.append('gender', formData.gender);
  dataToSend.append('cpf', formData.cpf.replace(/\D/g, ''));
  dataToSend.append('phone', formData.phone.replace(/\D/g, ''));
  dataToSend.append('zipCode', formData.zipCode.replace(/\D/g, ''));
  dataToSend.append('state', formData.state);
  dataToSend.append('city', formData.city);
  dataToSend.append('neighborhood', formData.neighborhood);
  dataToSend.append('address', formData.address);
  dataToSend.append('linkedin', formData.linkedin);
  dataToSend.append('miniResume', formData.miniResume);
  dataToSend.append('email', formData.email);
  dataToSend.append('password', formData.password);
  
  if (userType) {
    dataToSend.append('type', userType);
  }

  if (formData.photoUrl) {
    dataToSend.append('photo', formData.photoUrl);
  }

  if (userType === 'entrepreneur') {
    const entrepreneurData = {
      companyName: formData.companyName,
      businessDescription: formData.businessDescription,
      companyWebsite: formData.companyWebsite,
    };
    dataToSend.append('entrepreneur', JSON.stringify(entrepreneurData));

  } else if (userType === 'reviewer') {
    const reviewerData = {
      mentoredStartup: formData.mentoredStartup,
      incubationDescription: formData.incubationDescription,
      specializationAreas: formData.specializationAreas,
    };
    dataToSend.append('reviewer', JSON.stringify(reviewerData));
  }

  try {
    const url = 'http://localhost:7070/api/v1/trampolim/auth/signup';
    addDebug(`Enviando requisição POST para ${url}`);
    try {
      addDebug('Payload FormData preview: ' + JSON.stringify(dumpFormDataEntries(dataToSend)));
    } catch (e) {
      addDebug('Falha ao serializar preview do FormData: ' + String(e));
    }

    const response = await fetch(url, {
      method: 'POST',
      body: dataToSend,
    });

    addDebug(`Resposta recebida: status=${response.status} ${response.statusText}`);

    let responseBody: SignUpResponse | string | null = null;
    try {
      const contentType = (response.headers.get('content-type') || '').toLowerCase();
      if (contentType.includes('application/json')) {
        responseBody = await response.json() as SignUpResponse;
        addDebug('Resposta JSON: ' + JSON.stringify(responseBody));
      } else {
        // tenta texto para ter alguma pista
        const text = await response.text();
        responseBody = text;
        addDebug('Resposta Texto: ' + text.slice(0, 2000));
      }
    } catch (parseErr: any) {
      addDebug('Falha ao ler corpo da resposta: ' + (parseErr?.message || String(parseErr)));
    }

    if (!response.ok) {
      let serverMessage = `HTTP ${response.status}`;
      if (responseBody && typeof responseBody !== 'string' && 'message' in responseBody) {
        serverMessage = (responseBody as SignUpResponse).message;
      } else if (typeof responseBody === 'string') {
        serverMessage = responseBody;
      }
      throw new Error(serverMessage);
    }

    // sucesso
    setSuccess('Cadastro realizado com sucesso! Você será redirecionado para o login em instantes.');
    addDebug('Cadastro realizado com sucesso. Redirecionando para /login');
    setTimeout(() => {
      navigate('/login');
    }, 2500);

  } catch (err: any) {
    // Trata erros de rede / CORS / fetch
    const msg = err?.message || String(err);
    addDebug('Erro capturado no submit: ' + msg);

    // Mensagens mais amigáveis para erros comuns
    if (msg.includes('Failed to fetch') || msg.includes('NetworkError') || msg.includes('NetworkError when attempting to fetch resource')) {
      setError('Falha na requisição: verifique se o backend está rodando em http://localhost:7070 e se a rota /api/v1/trampolim/auth/signup existe. (Possível CORS ou servidor offline)');
      addDebug('Sugestão: erro típico de CORS/servidor offline. Verifique cabeçalhos CORS (Access-Control-Allow-Origin) no backend.');
    } else if (msg.includes('404') || msg.toLowerCase().includes('not found')) {
      setError('Recurso não encontrado (404): verifique a URL da API e se o servidor está executando.');
    } else if (msg.toLowerCase().includes('cors')) {
      setError('Erro CORS: o backend não permite requisições desta origem. Configure Access-Control-Allow-Origin no servidor.');
    } else {
      setError(msg || 'Não foi possível conectar ao servidor.');
    }
  } finally {
    setIsLoading(false);
  }
};

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <Navbar />

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
                className={`p-8 rounded-2xl shadow-lg transition-all duration-300 flex flex-col items-center ${userType === 'entrepreneur' ? 'bg-[#3A6ABE] text-white' : 'bg-white text-[#3A6ABE] hover:bg-[#F5F5F5]'}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserType('entrepreneur')}
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
                className={`p-8 rounded-2xl shadow-lg transition-all duration-300 flex flex-col items-center ${userType === 'reviewer' ? 'bg-[#3A6ABE] text-white' : 'bg-white text-[#3A6ABE] hover:bg-[#F5F5F5]'}`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setUserType('reviewer')}
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
                  {success && <div className="p-4 mb-6 text-sm text-green-700 bg-green-100 rounded-lg text-center">{success}</div>}
                  {error && (
                    <div className="p-4 mb-6 text-sm text-red-700 bg-red-100 rounded-lg">
                      <div className="font-bold mb-2">Erros encontrados:</div>
                      <ul className="list-disc list-inside space-y-1">
                        {error.split('\n').map((err, idx) => (
                          <li key={idx}>{err}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <div className="flex flex-col md:flex-row gap-8">
                    <motion.div
                      className="w-full md:w-1/3 lg:w-1/4 flex flex-col items-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      <div className="relative w-40 h-40 rounded-full bg-[#F5F5F5] mb-4 overflow-hidden border-2 border-[#3A6ABE]/20">
                        {formData.photoUrl ? (
                          <img
                            src={URL.createObjectURL(formData.photoUrl)}
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
                          name="photoUrl"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </label>
                      <p className="text-sm text-[#3A6ABE]/70 mt-2">Tamanho máximo: 5MB</p>
                    </motion.div>

                    <motion.form
                      onSubmit={handleSubmit}
                      className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      {/* Debug toggle and panel */}
                      <div className="md:col-span-2 flex justify-end">
                        <button type="button" onClick={() => setShowDebug(s => !s)} className="text-sm text-[#3A6ABE] underline">{showDebug ? 'Ocultar debug' : 'Mostrar debug'}</button>
                      </div>

                      {showDebug && (
                        <div className="md:col-span-2 bg-[#111827] text-white p-4 rounded-lg max-h-64 overflow-auto">
                          <div className="text-xs text-[#9CA3AF] mb-2">Últimos eventos (debug)</div>
                          <ul className="text-xs font-mono leading-tight">
                            {debugLogs.length === 0 && <li className="text-[#9CA3AF]">(sem logs ainda)</li>}
                            {debugLogs.map((line, idx) => (
                              <li key={idx} className="mb-1 break-words">{line}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                      <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-[#3A6ABE] mb-4 border-b border-[#3A6ABE]/20 pb-2">
                          Informações Pessoais
                        </h3>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="fullName" className="text-[#3A6ABE] font-medium">Nome Completo</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaUser className="text-[#3A6ABE]" />
                          <input type="text" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="email" className="text-[#3A6ABE] font-medium">E-mail</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaEnvelope className="text-[#3A6ABE]" />
                          <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="cpf" className="text-[#3A6ABE] font-medium">CPF</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaIdCard className="text-[#3A6ABE]" />
                          <input type="text" id="cpf" name="cpf" value={formData.cpf} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="phone" className="text-[#3A6ABE] font-medium">Telefone</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaPhone className="text-[#3A6ABE]" />
                          <input type="text" id="phone" name="phone" value={formData.phone} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="gender" className="text-[#3A6ABE] font-medium">Gênero</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaVenusMars className="text-[#3A6ABE]" />
                          <select id="gender" name="gender" value={formData.gender} onChange={handleChange} className="w-full outline-none bg-transparent" required>
                            <option value="">Selecione</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                            <option value="Outro">Outro</option>
                            <option value="Prefiro não informar">Prefiro não informar</option>
                          </select>
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="educationLevel" className="text-[#3A6ABE] font-medium">Grau de Escolaridade</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaGraduationCap className="text-[#3A6ABE]" />
                          <input type="text" id="educationLevel" name="educationLevel" value={formData.educationLevel} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="fieldOfActivity" className="text-[#3A6ABE] font-medium">Área de Atuação</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaBriefcase className="text-[#3A6ABE]" />
                          <input type="text" id="fieldOfActivity" name="fieldOfActivity" value={formData.fieldOfActivity} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="linkedin" className="text-[#3A6ABE] font-medium">LinkedIn (opcional)</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaLinkedin className="text-[#3A6ABE]" />
                          <input type="url" id="linkedin" name="linkedin" value={formData.linkedin} onChange={handleChange} className="w-full outline-none bg-transparent" />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-[#3A6ABE] mb-4 border-b border-[#3A6ABE]/20 pb-2 mt-6">Endereço</h3>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="zipCode" className="text-[#3A6ABE] font-medium">CEP</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaMapMarkerAlt className="text-[#3A6ABE]" />
                          <input type="text" id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="state" className="text-[#3A6ABE] font-medium">Estado</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaMapMarkerAlt className="text-[#3A6ABE]" />
                          <input type="text" id="state" name="state" value={formData.state} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="city" className="text-[#3A6ABE] font-medium">Cidade</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaMapMarkerAlt className="text-[#3A6ABE]" />
                          <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="neighborhood" className="text-[#3A6ABE] font-medium">Bairro</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaMapMarkerAlt className="text-[#3A6ABE]" />
                          <input type="text" id="neighborhood" name="neighborhood" value={formData.neighborhood} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1 md:col-span-2">
                        <label htmlFor="address" className="text-[#3A6ABE] font-medium">Endereço Completo</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaMapMarkerAlt className="text-[#3A6ABE]" />
                          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-[#3A6ABE] mb-4 border-b border-[#3A6ABE]/20 pb-2 mt-6">
                          {userType === 'entrepreneur' ? 'Sobre seu Negócio' : 'Sua Experiência'}
                        </h3>
                      </div>

                      {userType === 'entrepreneur' ? (
                        <>
                          <div className="flex flex-col gap-1 md:col-span-2">
                            <label htmlFor="companyName" className="text-[#3A6ABE] font-medium">Nome da Empresa/Startup</label>
                            <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                              <FaBriefcase className="text-[#3A6ABE]" />
                              <input type="text" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1">
                            <label htmlFor="companyWebsite" className="text-[#3A6ABE] font-medium">Site da Empresa (opcional)</label>
                            <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                              <FaGlobe className="text-[#3A6ABE]" />
                              <input type="url" id="companyWebsite" name="companyWebsite" value={formData.companyWebsite} onChange={handleChange} className="w-full outline-none bg-transparent" />
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 md:col-span-2">
                            <label htmlFor="businessDescription" className="text-[#3A6ABE] font-medium">Descreva seu Negócio</label>
                            <div className="flex items-start gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20 min-h-[100px]">
                              <FaFileAlt className="text-[#3A6ABE] mt-1" />
                              <textarea id="businessDescription" name="businessDescription" value={formData.businessDescription} onChange={handleChange} className="w-full outline-none bg-transparent resize-none" required />
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex flex-col gap-1">
                            <label htmlFor="mentoredStartup" className="text-[#3A6ABE] font-medium">Já monitorou alguma startup?</label>
                            <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                              <FaFileAlt className="text-[#3A6ABE]" />
                              <select id="mentoredStartup" name="mentoredStartup" value={String(formData.mentoredStartup)} onChange={(e) => setFormData(prev => ({ ...prev, mentoredStartup: e.target.value === 'true' }))} className="w-full outline-none bg-transparent" required>
                                <option value="false">Não</option>
                                <option value="true">Sim</option>
                              </select>
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 md:col-span-2">
                            <label className="text-[#3A6ABE] font-medium">Áreas de Especialização</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                              {['TI', 'Marketing', 'Finanças', 'RH', 'Operações', 'Jurídico', 'Vendas', 'Design', 'Outros'].map(area => (
                                <label key={area} className="flex items-center gap-2 cursor-pointer">
                                  <input type="checkbox" value={area} name="specializationAreas" checked={formData.specializationAreas.includes(area)} onChange={handleChange} className="text-[#3A6ABE] rounded" />
                                  <span className="text-[#3A6ABE]">{area}</span>
                                </label>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-col gap-1 md:col-span-2">
                            <label htmlFor="incubationDescription" className="text-[#3A6ABE] font-medium">Descreva sua experiência com incubação/aceleração</label>
                            <div className="flex items-start gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20 min-h-[100px]">
                              <FaFileAlt className="text-[#3A6ABE] mt-1" />
                              <textarea id="incubationDescription" name="incubationDescription" value={formData.incubationDescription} onChange={handleChange} className="w-full outline-none bg-transparent resize-none" required />
                            </div>
                          </div>
                        </>
                      )}

                      <div className="flex flex-col gap-1 md:col-span-2">
                        <label htmlFor="miniResume" className="text-[#3A6ABE] font-medium">{userType === 'entrepreneur' ? 'Sobre o Empreendedor' : 'Mini Currículo'}</label>
                        <div className="flex items-start gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20 min-h-[150px]">
                          <FaFileAlt className="text-[#3A6ABE] mt-1" />
                          <textarea id="miniResume" name="miniResume" value={formData.miniResume} onChange={handleChange} className="w-full outline-none bg-transparent resize-none" required />
                        </div>
                      </div>

                      <div className="md:col-span-2">
                        <h3 className="text-xl font-bold text-[#3A6ABE] mb-4 border-b border-[#3A6ABE]/20 pb-2 mt-6">Credenciais de Acesso</h3>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="password" className="text-[#3A6ABE] font-medium">Senha</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaLock className="text-[#3A6ABE]" />
                          <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="confirmPassword" className="text-[#3A6ABE] font-medium">Confirmar Senha</label>
                        <div className="flex items-center gap-2 p-2 border border-[#3A6ABE]/30 rounded-lg focus-within:border-[#3A6ABE] focus-within:ring-2 focus-within:ring-[#3A6ABE]/20">
                          <FaLock className="text-[#3A6ABE]" />
                          <input type="password" id="confirmPassword" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className="w-full outline-none bg-transparent" required />
                        </div>
                      </div>

                      <div className="md:col-span-2 flex justify-center mt-8">
                        <motion.button
                          type="submit"
                          disabled={isLoading}
                          className="px-12 py-3 bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 disabled:opacity-50"
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isLoading ? 'Enviando...' : 'Finalizar Cadastro'}
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