import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiLock, FiEye, FiEyeOff, FiLogIn, FiArrowRight } from 'react-icons/fi';
import '../../../index.css';
import Navbar from '@/components/shared/navbar/Navbar';
import { useNavigate } from 'react-router-dom';

interface LoginResponse {
  message: string;
  token: string;
  user: {
    _id: string;
    fullName: string;
    email: string;
    type: string[];
  };
}

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); 
  const [shake, setShake] = useState(false);
  const [currentBg, setCurrentBg] = useState(0);
  const [isFocused, setIsFocused] = useState({
    email: false,
    password: false
  });
   const navigate = useNavigate();

  const backgrounds = [
    'bg-gradient-to-br from-[#3A6ABE]/10 to-[#F79B4B]/10',
    'bg-gradient-to-br from-[#F79B4B]/10 to-[#3A6ABE]/10',
    'bg-gradient-to-br from-[#3A6ABE]/20 to-[#F79B4B]/20'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgrounds.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };


  const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setError(null);

   if (!formData.email || !formData.password) {
     triggerShake();
     setError('Por favor, preencha todos os campos.');
     return;
   }

   setIsLoading(true);

   try {
     const response = await fetch('http://localhost:8080/api/v1/trampolim/auth/signin', {
       method: 'POST',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(formData),
     });

     const data: LoginResponse & { message: string } = await response.json();

     if (!response.ok) {
       throw new Error(data.message || 'Erro ao tentar fazer login. Verifique suas credenciais.');
     }
     
     const { token, user } = data;

     localStorage.setItem('authToken', token);
     localStorage.setItem('user', JSON.stringify(user));

     if (user.type.includes('admin')) {
       navigate('/logado-adm');
     } else if (user.type.includes('reviewer')) {
       navigate('/logado-avaliador');
     } else if (user.type.includes('entrepreneur')) {
       navigate('/logado-empreendedor');
     } else {
       navigate('/'); 
     }

   } catch (err: any) {
     setError(err.message);
     triggerShake();
   } finally {
     setIsLoading(false);
   }
 };

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 500);
  };

  return (
    <div className={`min-h-screen transition-all duration-1000 ${backgrounds[currentBg]}`}>
      <Navbar />
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-[#3A6ABE]/20"
            initial={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              opacity: Math.random() * 0.5 + 0.1
            }}
            animate={{
              x: Math.random() * 100,
              y: Math.random() * 100,
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        ))}
      </div>

      <section className="relative flex items-center justify-center p-4 sm:p-6 min-h-[calc(100vh-80px)]">
        <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl py-10 lg:py-20">
          <motion.div 
            className="flex flex-col lg:flex-row items-center justify-center gap-8 xl:gap-16 2xl:gap-24 w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="w-full lg:w-1/2 max-w-xl mb-10 lg:mb-0"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <div className="relative">
                <div className="absolute -top-12 -left-12 w-64 h-64 rounded-full bg-[#F79B4B]/10 blur-3xl z-0 hidden md:block"></div>
                <div className="absolute -bottom-8 -right-8 w-72 h-72 rounded-full bg-[#3A6ABE]/10 blur-3xl z-0 hidden md:block"></div>
                
                <div className="relative z-10 p-6 md:p-8 lg:p-10 bg-white/20 backdrop-blur-lg rounded-3xl border border-white/30 shadow-xl lg:shadow-2xl mt-8 sm:mt-0">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#3A6ABE] mb-3 md:mb-4 leading-tight">
                    Bem-vindo ao <span className="text-[#F79B4B]">Trampolim</span>
                  </h2>
                  <p className="text-base md:text-lg text-[#3A6ABE]/90 mb-6 md:mb-8">
                    Acesse o ecossistema de inovação mais dinâmico do Agreste e dê o próximo passo no seu negócio.
                  </p>
                  
                  <div className="space-y-4 md:space-y-6">
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#3A6ABE] text-white flex items-center justify-center">
                          <FiArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-[#3A6ABE]">Mentorias Especializadas</h3>
                        <p className="text-sm md:text-base text-[#3A6ABE]/80">Acesso aos melhores mentores do mercado</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#F79B4B] text-white flex items-center justify-center">
                          <FiArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-[#3A6ABE]">Cursos Exclusivos</h3>
                        <p className="text-sm md:text-base text-[#3A6ABE]/80">Desenvolva habilidades estratégicas</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3 md:gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-7 h-7 md:w-8 md:h-8 rounded-full bg-[#3A6ABE] text-white flex items-center justify-center">
                          <FiArrowRight className="w-3 h-3 md:w-4 md:h-4" />
                        </div>
                      </div>
                      <div>
                        <h3 className="text-lg md:text-xl font-semibold text-[#3A6ABE]">Rede de Contatos</h3>
                        <p className="text-sm md:text-base text-[#3A6ABE]/80">Conecte-se com investidores e parceiros</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className={`w-full lg:w-1/2 max-w-md ${shake ? 'animate-shake' : ''}`}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <div className="relative p-6 md:p-8 lg:p-10 bg-white/90 backdrop-blur-sm rounded-3xl shadow-xl lg:shadow-2xl overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-[#F79B4B]/10 blur-xl z-0 hidden md:block"></div>
                <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-[#3A6ABE]/10 blur-xl z-0 hidden md:block"></div>
                
                <div className="relative z-10">
                  <div className="text-center mb-6 md:mb-8 lg:mb-10">
                    <div className="mx-auto w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-r from-[#3A6ABE] to-[#F79B4B] flex items-center justify-center shadow-lg mb-4 md:mb-6">
                      <FiLogIn className="text-white text-xl md:text-2xl" />
                    </div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#3A6ABE] mb-1 md:mb-2">Faça seu login</h2>
                    <p className="text-sm md:text-base text-[#3A6ABE]/80">Entre com suas credenciais para acessar a plataforma</p>
                  </div>
                  
                  <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                    {error && (
                      <motion.div
                        className="p-3 mb-4 text-sm text-center text-red-800 bg-red-100 rounded-lg"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                      >
                        {error}
                      </motion.div>
                    )}

                    <div>
                      <label htmlFor="email" className="block text-sm md:text-base font-medium text-[#3A6ABE] mb-1 md:mb-2">
                        E-mail
                      </label>
                      <div className={`relative transition-all duration-300 ${isFocused.email ? 'ring-2 ring-[#3A6ABE]/50' : ''} rounded-xl overflow-hidden`}>
                        <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                          <FiMail className={`text-base md:text-lg ${isFocused.email ? 'text-[#3A6ABE]' : 'text-[#3A6ABE]/60'}`} />
                        </div>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                          onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                          className="w-full pl-10 md:pl-12 pr-3 md:pr-4 py-2 md:py-3 text-sm md:text-base bg-white/80 border border-[#3A6ABE]/20 rounded-xl focus:outline-none focus:border-[#3A6ABE] transition-all"
                          placeholder="seu@email.com"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label htmlFor="password" className="block text-sm md:text-base font-medium text-[#3A6ABE] mb-1 md:mb-2">
                        Senha
                      </label>
                      <div className={`relative transition-all duration-300 ${isFocused.password ? 'ring-2 ring-[#3A6ABE]/50' : ''} rounded-xl overflow-hidden`}>
                        <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
                          <FiLock className={`text-base md:text-lg ${isFocused.password ? 'text-[#3A6ABE]' : 'text-[#3A6ABE]/60'}`} />
                        </div>
                        <input
                          type={showPassword ? "text" : "password"}
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                          onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                          className="w-full pl-10 md:pl-12 pr-10 md:pr-12 py-2 md:py-3 text-sm md:text-base bg-white/80 border border-[#3A6ABE]/20 rounded-xl focus:outline-none focus:border-[#3A6ABE] transition-all"
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 md:pr-4 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <FiEyeOff className="text-base md:text-lg text-[#3A6ABE]/60 hover:text-[#3A6ABE] transition-colors" />
                          ) : (
                            <FiEye className="text-base md:text-lg text-[#3A6ABE]/60 hover:text-[#3A6ABE] transition-colors" />
                          )}
                        </button>
                      </div>
                    </div>
                    
                    {/* Submit Button */}
                    <div className="pt-2 md:pt-4">
                      <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full py-3 md:py-4 px-4 md:px-6 bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 flex items-center justify-center text-sm md:text-base"
                      >
                        {isLoading ? (
                          <span className="inline-block h-5 w-5 md:h-6 md:w-6 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <>
                            <span className="mr-2">Entrar</span>
                            <FiLogIn className="text-base md:text-lg" />
                          </>
                        )}
                      </motion.button>
                    </div>
                  </form>
                  
                  <div className="mt-6 md:mt-8 text-center">
                    <p className="text-sm md:text-base text-[#3A6ABE]/80">
                      Não tem uma conta?{' '}
                      <a 
                        href="/cadastro" 
                        className="text-[#3A6ABE] font-semibold hover:text-[#F79B4B] transition-colors"
                      >
                        Cadastre-se
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default LoginPage;