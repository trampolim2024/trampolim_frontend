import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const ImpactMetrics = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    },
    hover: {
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  const metrics = [
    { value: "+1000", label: "Empreendedores Impactados", color: "#F79B4B" },
    { value: "+500", label: "Projetos Submetidos", color: "#3A6ABE" },
    { value: "+300", label: "Projetos Aprovados", color: "#F79B4B" },
    { value: "+200", label: "Projetos em Execução", color: "#3A6ABE" }
  ];

  return (
    <section className="relative py-20 md:py-28 bg-gradient-to-br from-[#3A6ABE] to-[#2A4B8F] overflow-hidden">
      {/* Efeitos de background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-20">
        <div className="absolute top-1/4 left-1/4 w-60 h-60 rounded-full bg-[#F79B4B] blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 rounded-full bg-[#3A6ABE] blur-[100px]"></div>
      </div>
      
      {/* Container principal */}
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
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 md:mb-16 leading-tight"
            variants={itemVariants}
          >
            Impacto do Programa{' '}
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
          
          {/* Métricas */}
          <motion.div 
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 w-full"
            variants={containerVariants}
          >
            {metrics.map((metric, index) => (
              <motion.div
                key={index}
                className="relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-white/20 shadow-lg overflow-hidden"
                variants={itemVariants}
                whileHover={!isMobile ? "hover" : {}}
              >
                {/* Efeito de brilho */}
                <div 
                  className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-300"
                  style={{ 
                    background: `radial-gradient(circle at center, ${metric.color}40 0%, transparent 70%)` 
                  }}
                />
                
                <div className="relative z-10 flex flex-col items-center text-center h-full">
                  <motion.span 
                    className="text-4xl md:text-5xl font-bold text-white mb-2 md:mb-4"
                    initial={{ scale: 0.9 }}
                    whileInView={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {metric.value}
                  </motion.span>
                  <motion.p 
                    className="text-white/90 text-lg md:text-xl leading-relaxed"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    {metric.label}
                  </motion.p>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {/* Rodapé da seção */}
          <motion.div 
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <motion.p 
              className="text-white/80 text-lg md:text-xl max-w-3xl leading-relaxed"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              Esses números refletem nosso compromisso com o desenvolvimento econômico 
              e social da região, transformando vidas através do empreendedorismo e inovação.
            </motion.p>
            
            <motion.div 
              className="mt-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <button className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#F79B4B] to-[#F79B4B]/90 hover:from-white hover:to-white/90 text-[#3A6ABE] font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden">
                <span className="relative z-10">Ver casos de sucesso</span>
                <motion.span 
                  className="absolute inset-0 bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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

export default ImpactMetrics;