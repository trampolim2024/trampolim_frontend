import Navbar from '@/components/shared/navbar/Navbar';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  FiAward,
  FiUsers,
  FiBarChart2,
  FiBriefcase,
  FiEye,
  FiThumbsUp,
  FiGlobe,
  FiTool
} from 'react-icons/fi';


const ReviewerPage = () => {
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

  const benefits = [
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Reconhecimento Profissional",
      description: "Destaque-se como especialista em sua área e ganhe visibilidade no ecossistema de inovação.",
      color: "#3A6ABE"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Networking de Alto Nível",
      description: "Conecte-se com outros especialistas, mentores e empreendedores promissores.",
      color: "#F79B4B"
    },
    {
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: "Acesso a Projetos Inovadores",
      description: "Esteja na vanguarda das novas ideias e tendências do mercado antes de todos.",
      color: "#3A6ABE"
    },
    {
      icon: <FiBriefcase className="w-8 h-8" />,
      title: "Desenvolvimento Contínuo",
      description: "Amplie seu conhecimento através da análise de diversos casos e modelos de negócio.",
      color: "#F79B4B"
    }
  ];

  const steps = [
    {
      icon: <FiEye className="w-6 h-6" />,
      title: "Análise Inicial",
      description: "Avaliação preliminar do projeto com base nos critérios estabelecidos.",
      color: "#3A6ABE"
    },
    {
      icon: <FiTool className="w-6 h-6" />,
      title: "Avaliação Técnica",
      description: "Análise detalhada da viabilidade técnica e inovação do projeto.",
      color: "#F79B4B"
    },
    {
      icon: <FiThumbsUp className="w-6 h-6" />,
      title: "Recomendações",
      description: "Sugestões de melhorias e potencial de crescimento do projeto.",
      color: "#3A6ABE"
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "Impacto Social",
      description: "Avaliação do potencial impacto social e econômico da iniciativa.",
      color: "#F79B4B"
    }
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
                  SEJA UM AVALIADOR
                </span>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3A6ABE] mb-6 leading-tight"
                  variants={itemVariants}
                >
                  Faça parte do <span className="text-[#F79B4B]">time</span> que transforma ideias em realidade
                </motion.h1>
                <motion.p 
                  className="text-lg text-[#3A6ABE]/90 mb-8 leading-relaxed"
                  variants={itemVariants}
                >
                  Como avaliador do Programa Trampolim, você terá a oportunidade de contribuir com seu conhecimento para selecionar e moldar os projetos mais promissores da região, enquanto expande sua rede profissional e ganha reconhecimento no ecossistema de inovação.
                </motion.p>
                <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                  <button className="px-8 py-3.5 bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-500">
                    Quero ser um avaliador
                  </button>
                  <button className="px-8 py-3.5 bg-white text-[#3A6ABE] border border-[#3A6ABE] rounded-lg font-medium hover:bg-[#F5F5F5] transition-colors">
                    Saiba mais
                  </button>
                </motion.div>
              </motion.div>
            </div>
            
            <motion.div 
              className="w-full lg:w-1/2 relative"
              variants={itemVariants}
            >
              <div className="relative bg-white rounded-2xl p-8 shadow-xl overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-[#3A6ABE] to-[#F79B4B]"></div>
                <h3 className="text-2xl font-bold text-[#3A6ABE] mb-6">Perfil do Avaliador</h3>
                <ul className="space-y-4">
                  {[
                    "Experiência comprovada em sua área de atuação",
                    "Capacidade analítica e visão estratégica",
                    "Disponibilidade para dedicar 4-6 horas mensais",
                    "Interesse em contribuir com o desenvolvimento regional",
                    "Boa comunicação e habilidades interpessoais"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex-shrink-0 mt-1">
                        <div className={`w-2 h-2 rounded-full ${index % 2 === 0 ? 'bg-[#3A6ABE]' : 'bg-[#F79B4B]'}`}></div>
                      </div>
                      <span className="text-[#3A6ABE]/90">{item}</span>
                    </motion.li>
                  ))}
                </ul>
                <div className="mt-8 pt-6 border-t border-[#3A6ABE]/10">
                  <p className="text-sm text-[#3A6ABE]/70">
                    Avaliadores recebem certificação e acesso exclusivo a eventos do ecossistema.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
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
              Vantagens de ser um{' '}
              <span className="relative inline-block">
                Avaliador Trampolim
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-2 bg-[#F79B4B] opacity-60"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full"
              variants={containerVariants}
            >
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="relative bg-[#F5F5F5] rounded-2xl p-8 shadow-lg overflow-hidden group hover:border-l-4 transition-all duration-300"
                  variants={itemVariants}
                  whileHover="hover"
                  style={{
                    borderLeftColor: benefit.color
                  }}
                >
                  <div className="relative z-10 flex flex-col items-start h-full">
                    <div 
                      className="p-3 rounded-xl mb-6 transition-all duration-300 group-hover:bg-opacity-20"
                      style={{ 
                        backgroundColor: `${benefit.color}10`,
                        color: benefit.color
                      }}
                    >
                      {benefit.icon}
                    </div>
                    
                    <h3 className="text-xl md:text-2xl font-bold text-[#3A6ABE] mb-3">
                      {benefit.title}
                    </h3>
                    
                    <p className="text-[#3A6ABE]/90 mb-6">
                      {benefit.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="relative py-20 md:py-28 bg-[#F5F5F5] overflow-hidden">
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
              <motion.h2 
                className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3A6ABE] mb-8 leading-tight"
                variants={itemVariants}
              >
                Como funciona o <span className="text-[#F79B4B]">processo</span> de avaliação
              </motion.h2>
              
              <motion.p 
                className="text-lg text-[#3A6ABE]/90 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Nosso processo de avaliação foi cuidadosamente desenhado para ser justo, transparente e eficiente, garantindo que os melhores projetos sejam selecionados.
              </motion.p>
              
              <motion.div variants={itemVariants}>
                <button className="px-8 py-3.5 bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-500">
                  Ver critérios completos
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-1/2"
              variants={itemVariants}
            >
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex items-start gap-6 p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-all"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                  >
                    <div 
                      className="flex-shrink-0 p-3 rounded-lg"
                      style={{ 
                        backgroundColor: `${step.color}10`,
                        color: step.color
                      }}
                    >
                      {step.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#3A6ABE] mb-2">{step.title}</h3>
                      <p className="text-[#3A6ABE]/90">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
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
              Pronto para fazer a diferença?
            </motion.h2>
            
            <motion.p 
              className="text-lg text-white/90 mb-8 max-w-3xl leading-relaxed"
              variants={itemVariants}
            >
              Junte-se ao nosso time de avaliadores e contribua para o desenvolvimento de projetos inovadores que estão transformando a região.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <button className="px-8 py-3.5 bg-white text-[#3A6ABE] font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-[#F5F5F5] transition-all duration-300">
                Inscreva-se como avaliador
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ReviewerPage;