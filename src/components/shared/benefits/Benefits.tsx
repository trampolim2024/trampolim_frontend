import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  FiZap, 
  FiUsers, 
  FiTrendingUp, 
  FiAward,
  FiGlobe,
  FiBriefcase,
  FiDollarSign,
  FiBarChart2
} from 'react-icons/fi';

const Benefits = () => {
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
      icon: <FiZap className="w-8 h-8" />,
      title: "Aceleração de Projetos",
      description: "Processo estruturado para levar seu projeto do conceito à execução em tempo recorde.",
      color: "#F79B4B"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Rede de Contatos",
      description: "Acesso exclusivo a mentores, investidores e outros empreendedores da região.",
      color: "#3A6ABE"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Crescimento Garantido",
      description: "Metodologias comprovadas para escalar seu negócio de forma sustentável.",
      color: "#F79B4B"
    },
    {
      icon: <FiAward className="w-8 h-8" />,
      title: "Reconhecimento",
      description: "Certificação e visibilidade para seu projeto no ecossistema de inovação.",
      color: "#3A6ABE"
    },
    {
      icon: <FiGlobe className="w-8 h-8" />,
      title: "Abordagem Global",
      description: "Conectamos seu projeto com oportunidades internacionais de negócios.",
      color: "#F79B4B"
    },
    {
      icon: <FiBriefcase className="w-8 h-8" />,
      title: "Suporte Personalizado",
      description: "Acompanhamento individualizado para cada etapa do seu desenvolvimento.",
      color: "#3A6ABE"
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Acesso a Investimentos",
      description: "Conexão direta com fundos de investimento e programas de financiamento.",
      color: "#F79B4B"
    },
    {
      icon: <FiBarChart2 className="w-8 h-8" />,
      title: "Métricas de Sucesso",
      description: "Ferramentas para monitorar e otimizar o desempenho do seu negócio.",
      color: "#3A6ABE"
    }
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#F5F5F5] to-[#F0F4FF] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-20 left-10 w-60 h-60 rounded-full bg-[#3A6ABE] blur-[100px]"></div>
        {/* Bolha laranja ajustada - subi 20px e aumentei o blur */}
        <div className="absolute bottom-50 right-10 w-80 h-80 rounded-full bg-[#F79B4B] blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16">
        <motion.div
          className="flex flex-col items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          {/* Título */}
          <motion.h2 
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3A6ABE] text-center mb-12 md:mb-16 leading-tight"
            variants={itemVariants}
          >
            Benefícios Exclusivos do{' '}
            <span className="relative inline-block">
              Trampolim
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-2 bg-[#F79B4B] opacity-60"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
              />
            </span>
          </motion.h2>
          
          {/* Descrição */}
          <motion.p 
            className="text-lg md:text-xl text-[#555] text-center max-w-4xl mb-12 md:mb-16 leading-relaxed"
            variants={itemVariants}
          >
            O Programa Trampolim oferece uma combinação única de recursos e oportunidades 
            para impulsionar seu projeto a novos patamares. Conheça nossos diferenciais:
          </motion.p>
          
          {/* Cards de benefícios */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full"
            variants={containerVariants}
          >
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="relative bg-white rounded-2xl p-8 shadow-lg overflow-hidden group hover:border-l-4 transition-all duration-300"
                variants={itemVariants}
                whileHover="hover"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                style={{
                  borderLeftColor: benefit.color
                }}
              >
                {/* Conteúdo do card */}
                <div className="relative z-10 flex flex-col items-start h-full">
                  {/* Ícone */}
                  <div 
                    className="p-3 rounded-xl mb-6 transition-all duration-300 group-hover:bg-opacity-20"
                    style={{ 
                      backgroundColor: `${benefit.color}10`,
                      color: benefit.color
                    }}
                  >
                    {benefit.icon}
                  </div>
                  
                  {/* Título */}
                  <h3 
                    className="text-xl md:text-2xl font-bold text-[#3A6ABE] mb-3 group-hover:text-opacity-90 transition-colors duration-300"
                  >
                    {benefit.title}
                  </h3>
                  
                  {/* Descrição */}
                  <p 
                    className="text-[#555] group-hover:text-opacity-90 transition-colors duration-300 mb-6"
                  >
                    {benefit.description}
                  </p>
                  
                  {/* Saiba mais */}
                  <div className="mt-auto w-full">
                    <div 
                      className="flex items-center text-sm font-medium transition-all duration-300 group-hover:translate-x-1"
                      style={{ color: benefit.color }}
                    >
                      <span className="group-hover:font-semibold">Saiba mais</span>
                      <svg 
                        className="w-4 h-4 ml-2 transition-all duration-300 group-hover:translate-x-1" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24" 
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <button className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden">
                <span className="relative z-10">Quero participar do programa</span>
                <motion.span 
                  className="absolute inset-0 bg-[#F79B4B] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ x: -100 }}
                  whileHover={{ x: 0 }}
                />
              </button>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Benefits;