import Navbar from '@/components/shared/navbar/Navbar';
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


const EntrepreneurPage = () => {
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
      description: "Transforme sua ideia em negócio com nosso processo estruturado de aceleração.",
      color: "#F79B4B"
    },
    {
      icon: <FiUsers className="w-8 h-8" />,
      title: "Mentorias Especializadas",
      description: "Acesso a mentores experientes em diversas áreas do empreendedorismo.",
      color: "#3A6ABE"
    },
    {
      icon: <FiTrendingUp className="w-8 h-8" />,
      title: "Crescimento Garantido",
      description: "Metodologias comprovadas para escalar seu negócio rapidamente.",
      color: "#F79B4B"
    },
    {
      icon: <FiDollarSign className="w-8 h-8" />,
      title: "Acesso a Investimentos",
      description: "Conexão direta com investidores e programas de financiamento.",
      color: "#3A6ABE"
    }
  ];

  const courses = [
    {
      icon: <FiBriefcase className="w-6 h-6" />,
      title: "Modelagem de Negócios",
      description: "Aprenda a estruturar seu modelo de negócios de forma inovadora.",
      color: "#3A6ABE"
    },
    {
      icon: <FiBarChart2 className="w-6 h-6" />,
      title: "Métricas e Growth",
      description: "Domine as métricas essenciais para escalar seu negócio.",
      color: "#F79B4B"
    },
    {
      icon: <FiGlobe className="w-6 h-6" />,
      title: "Mercado Global",
      description: "Prepare seu negócio para competir no mercado internacional.",
      color: "#3A6ABE"
    },
    {
      icon: <FiAward className="w-6 h-6" />,
      title: "Pitch Perfeito",
      description: "Aprenda a apresentar seu negócio para investidores.",
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
                  PARA EMPREENDEDORES
                </span>
                <motion.h1 
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3A6ABE] mb-6 leading-tight"
                  variants={itemVariants}
                >
                  Transforme sua <span className="text-[#F79B4B]">ideia</span> em um negócio de sucesso
                </motion.h1>
                <motion.p 
                  className="text-lg text-[#3A6ABE]/90 mb-8 leading-relaxed"
                  variants={itemVariants}
                >
                  O Programa Trampolim é a plataforma perfeita para empreendedores inovadores do Agreste que querem acelerar seus negócios com mentorias especializadas, cursos capacitantes e acesso a investimentos.
                </motion.p>
                <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
                  <button className="px-8 py-3.5 bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-500">
                    Quero me inscrever
                  </button>
                  <button className="px-8 py-3.5 bg-white text-[#3A6ABE] border border-[#3A6ABE] rounded-lg font-medium hover:bg-[#F5F5F5] transition-colors">
                    Ver editais abertos
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
                <h3 className="text-2xl font-bold text-[#3A6ABE] mb-6">Por que participar?</h3>
                <ul className="space-y-4">
                  {[
                    "Mentorias individuais com especialistas do mercado",
                    "Cursos exclusivos para desenvolver habilidades empreendedoras",
                    "Acesso a rede de investidores e parceiros estratégicos",
                    "Visibilidade para seu negócio no ecossistema de inovação",
                    "Suporte para modelagem e validação do seu negócio"
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
                    Edital aberto para empreendedores do Agreste até 30/11/2023
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
              O que você ganha no{' '}
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

      {/* Courses Section */}
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
                Cursos <span className="text-[#F79B4B]">exclusivos</span> para impulsionar seu negócio
              </motion.h2>
              
              <motion.p 
                className="text-lg text-[#3A6ABE]/90 mb-8 leading-relaxed"
                variants={itemVariants}
              >
                Nossa trilha de capacitação foi desenvolvida por especialistas para fornecer as habilidades essenciais que todo empreendedor de sucesso precisa dominar.
              </motion.p>
              
              <motion.div variants={itemVariants}>
                <button className="px-8 py-3.5 bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all duration-500">
                  Conheça o programa completo
                </button>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className="w-full lg:w-1/2"
              variants={itemVariants}
            >
              <div className="space-y-6">
                {courses.map((course, index) => (
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
                        backgroundColor: `${course.color}10`,
                        color: course.color
                      }}
                    >
                      {course.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-[#3A6ABE] mb-2">{course.title}</h3>
                      <p className="text-[#3A6ABE]/90">{course.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
          <motion.div
            className="flex flex-col items-center text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.h2 
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3A6ABE] mb-12 md:mb-16 leading-tight"
              variants={itemVariants}
            >
              Quem participou <span className="text-[#F79B4B]">recomenda</span>
            </motion.h2>
            
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full"
              variants={containerVariants}
            >
              {[
                {
                  quote: "As mentorias do Trampolim foram transformadoras para meu negócio. Em 6 meses, crescemos 300%!",
                  author: "Carlos Silva - AgroTech",
                  color: "#3A6ABE"
                },
                {
                  quote: "Os cursos me deram as ferramentas exatas que precisava para validar minha ideia e atrair investidores.",
                  author: "Ana Paula - EcoModa",
                  color: "#F79B4B"
                },
                {
                  quote: "A rede de contatos que construí no programa valeu mais que qualquer investimento em dinheiro.",
                  author: "Roberto Almeida - Saúde 360",
                  color: "#3A6ABE"
                }
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  className="relative bg-[#F5F5F5] rounded-2xl p-8 shadow-lg overflow-hidden"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="relative z-10 flex flex-col h-full">
                    <div className="text-6xl font-serif text-[#3A6ABE]/20 mb-4">"</div>
                    <p className="text-lg text-[#3A6ABE]/90 mb-6 flex-grow">
                      {testimonial.quote}
                    </p>
                    <div className="mt-auto">
                      <div className={`w-8 h-1 mb-3 ${testimonial.color === '#3A6ABE' ? 'bg-[#3A6ABE]' : 'bg-[#F79B4B]'}`}></div>
                      <p className="font-semibold text-[#3A6ABE]">{testimonial.author}</p>
                    </div>
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
              Pronto para alavancar seu negócio?
            </motion.h2>
            
            <motion.p 
              className="text-lg text-white/90 mb-8 max-w-3xl leading-relaxed"
              variants={itemVariants}
            >
              Inscreva-se agora no Programa Trampolim e dê o salto que seu negócio precisa para decolar!
            </motion.p>
            
            <motion.div className="flex flex-col sm:flex-row gap-4" variants={itemVariants}>
              <button className="px-8 py-3.5 bg-white text-[#3A6ABE] font-semibold rounded-lg shadow-lg hover:shadow-xl hover:bg-[#F5F5F5] transition-all duration-300">
                Inscreva-se agora
              </button>
              <button className="px-8 py-3.5 bg-transparent text-white border border-white rounded-lg font-medium hover:bg-white/10 transition-colors">
                Baixar edital
              </button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default EntrepreneurPage;