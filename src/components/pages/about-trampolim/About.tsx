import Navbar from '@/components/shared/navbar/Navbar';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  FiZap, 
  FiUsers, 
  FiMap, 
  FiBriefcase,
  FiDollarSign,
} from 'react-icons/fi';

const About = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 40, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 10
      }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(58, 106, 190, 0.2)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const pillars = [
    {
      icon: <FiZap className="w-8 h-8" />,
      title: "Aceleração",
      description: "Processo estruturado para impulsionar negócios inovadores",
      color: "#F79B4B"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Conexões",
      description: "Rede de mentores, investidores e parceiros estratégicos",
      color: "#3A6ABE"
    },
    {
      icon: <FiMap className="w-8 h-8" />,
      title: "Desenvolvimento Regional",
      description: "Foco no potencial inovador do Agreste",
      color: "#F79B4B"
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Acesso a Capital",
      description: "Conexão com fontes de investimento e financiamento",
      color: "#3A6ABE"
    }
  ];

  const stats = [
    { value: "50+", label: "Projetos acelerados" },
    { value: "R$ 5M+", label: "Em investimentos captados" },
    { value: "80%", label: "Taxa de sobrevivência dos negócios" },
    { value: "100+", label: "Mentores especializados" }
  ];

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
            className="flex flex-col lg:flex-row items-center gap-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <div className="w-full lg:w-1/2">
              <motion.div variants={itemVariants}>
                <span className="inline-block bg-[#3A6ABE] text-white text-sm font-semibold px-3 py-1 rounded-full mb-6">
                  CONHEÇA O PROGRAMA
                </span>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3A6ABE] mb-6 leading-tight"
                  variants={itemVariants}
                >
                  O <span className="text-[#F79B4B]">Trampolim</span> para a inovação no Agreste
                </motion.h1>
                <motion.p 
                  className="text-lg text-[#3A6ABE]/90 mb-8 leading-relaxed"
                  variants={itemVariants}
                >
                  Uma iniciativa revolucionária que conecta talentos, ideias e oportunidades para transformar o ecossistema de inovação da região.
                </motion.p>
                <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                  <button className="px-8 py-3.5 bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-500">
                    Quero participar
                  </button>
                  <button className="px-8 py-3.5 bg-white text-[#3A6ABE] border border-[#3A6ABE] rounded-lg font-medium hover:bg-[#F5F5F5] transition-colors">
                    Ver editais
                  </button>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div 
              className="w-full lg:w-1/2 relative"
              variants={itemVariants}
            >
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-gradient-to-br from-[#3A6ABE] to-[#F79B4B]">
                {/* Espaço para sua foto principal */}
                <div className="absolute inset-0 flex items-center justify-center text-white/20">
                  <FiBriefcase className="w-32 h-32" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <p className="text-white font-medium">Empreendedores do Agreste transformando ideias em negócios</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <motion.div
            className="flex flex-col lg:flex-row items-center gap-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div 
              className="w-full lg:w-1/2"
              variants={itemVariants}
            >
              <div className="grid grid-cols-2 gap-4">
                {/* Espaço para fotos secundárias */}
                {[1, 2, 3, 4].map((item) => (
                  <motion.div
                    key={item}
                    className="aspect-square bg-[#F5F5F5] rounded-xl overflow-hidden flex items-center justify-center"
                    whileHover={{ scale: 0.98 }}
                  >
                    <div className="text-[#3A6ABE]/20">
                      <FiUsers className="w-12 h-12" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-1/2 space-y-8"
              variants={itemVariants}
            >
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3A6ABE] leading-tight"
                variants={itemVariants}
              >
                A <span className="text-[#F79B4B]">visão</span> por trás do Trampolim
              </motion.h2>
              
              <motion.p 
                className="text-lg text-[#3A6ABE]/90 leading-relaxed"
                variants={itemVariants}
              >
                O Programa Trampolim nasceu da necessidade de criar um ecossistema de inovação robusto no Agreste, conectando o potencial criativo da região com oportunidades de crescimento e desenvolvimento.
              </motion.p>
              
              <motion.p 
                className="text-lg text-[#3A6ABE]/90 leading-relaxed"
                variants={itemVariants}
              >
                Acreditamos que toda grande ideia merece uma chance para decolar, e é isso que proporcionamos através de nossa plataforma integrada de aceleração, mentoria e acesso a investimentos.
              </motion.p>
              
              <motion.div 
                className="grid grid-cols-2 gap-4 mt-8"
                variants={containerVariants}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="bg-[#F5F5F5] p-4 rounded-lg"
                    variants={itemVariants}
                  >
                    <div className="text-2xl md:text-3xl font-bold text-[#3A6ABE]">{stat.value}</div>
                    <div className="text-[#3A6ABE]/80">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="relative py-20 md:py-28 bg-[#F5F5F5] overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-[#3A6ABE] blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-[#F79B4B] blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <motion.div
            className="flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3A6ABE] text-center mb-12 md:mb-16 leading-tight"
              variants={itemVariants}
            >
              Os 4 <span className="text-[#F79B4B]">pilares</span> do programa
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
              variants={containerVariants}
            >
              {pillars.map((pillar, index) => (
                <motion.div
                  key={index}
                  className="relative bg-white rounded-2xl p-8 shadow-lg overflow-hidden group hover:border-l-4 transition-all duration-300"
                  variants={itemVariants}
                  whileHover="hover"
                  style={{
                    borderLeftColor: pillar.color
                  }}
                >
                  <div className="relative z-10 flex flex-col items-center text-center h-full">
                    <div 
                      className="p-3 rounded-xl mb-6 transition-all duration-300 group-hover:bg-opacity-20"
                      style={{ 
                        backgroundColor: `${pillar.color}10`,
                        color: pillar.color
                      }}
                    >
                      {pillar.icon}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-[#3A6ABE] mb-3">
                      {pillar.title}
                    </h3>
                    
                    <p className="text-[#3A6ABE]/90">
                      {pillar.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <motion.div
            className="flex flex-col items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3A6ABE] text-center mb-12 md:mb-16 leading-tight"
              variants={itemVariants}
            >
              O Trampolim <span className="text-[#F79B4B]">em ação</span>
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full"
              variants={containerVariants}
            >
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <motion.div
                  key={item}
                  className="aspect-[4/3] bg-[#F5F5F5] rounded-xl overflow-hidden flex items-center justify-center"
                  variants={itemVariants}
                  whileHover={{ scale: 0.98 }}
                >
                  <div className="text-[#3A6ABE]/20">
                    <FiUsers className="w-16 h-16" />
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 md:py-28 bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-white blur-[100px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#F79B4B] blur-[100px]"></div>
        </div>
        
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight"
              variants={itemVariants}
            >
              Pronto para dar o salto?
            </motion.h2>
            
            <motion.p 
              className="text-lg text-white/90 mb-8 max-w-3xl leading-relaxed"
              variants={itemVariants}
            >
              Seja um empreendedor, avaliador ou parceiro do Programa Trampolim e faça parte dessa transformação!
            </motion.p>
            
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <button className="px-8 py-3.5 bg-white text-[#3A6ABE] font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-[#F5F5F5] transition-all duration-300">
                Inscreva-se agora
              </button>
              <button className="px-8 py-3.5 bg-transparent text-white border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                Fale conosco
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;