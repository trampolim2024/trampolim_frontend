import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const AboutTrampolim = () => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
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
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 10
      }
    }
  };

  const videoVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        stiffness: 60,
        delay: 0.5
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: '0 20px 25px -5px rgba(58, 106, 190, 0.3)'
    }
  };

  return (
    <section className="relative py-20 md:py-32 bg-gradient-to-br from-[#F5F5F5] to-[#F0F4FF] overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-20 left-10 w-40 h-40 rounded-full bg-[#3A6ABE] blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full bg-[#F79B4B] blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16 items-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <motion.div className="space-y-6 md:space-y-8" variants={itemVariants}>
            <motion.h2 
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3A6ABE] leading-tight"
              variants={itemVariants}
            >
              Sobre o Programa{' '}
              <span className="relative inline-block">
                Trampolim
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-2 bg-[#F79B4B] opacity-30"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.8 }}
                  viewport={{ once: true }}
                />
              </span>
            </motion.h2>
            
            <motion.p 
              className="text-lg md:text-xl text-[#333] leading-relaxed md:leading-relaxed"
              variants={itemVariants}
            >
              O Programa Trampolim é uma iniciativa revolucionária que conecta talentos emergentes 
              com oportunidades de crescimento. Através de uma plataforma inteligente, oferecemos 
              ferramentas, mentoria e acesso a um ecossistema vibrante para impulsionar carreiras 
              e negócios.
            </motion.p>
            
            <motion.p 
              className="text-lg md:text-xl text-[#555] leading-relaxed md:leading-relaxed"
              variants={itemVariants}
            >
              Com uma abordagem inovadora, combinamos tecnologia avançada com metodologias 
              comprovadas para criar um ambiente onde criatividade e eficiência se encontram, 
              gerando resultados transformadores para participantes e parceiros.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <button className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden">
                <span className="relative z-10">Saiba mais</span>
                <motion.span 
                  className="absolute inset-0 bg-[#F79B4B] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={{ x: -100 }}
                  whileHover={{ x: 0 }}
                />
              </button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            variants={videoVariants}
            whileHover={!isMobile ? "hover" : {}}
          >
            <div className="aspect-w-16 aspect-h-9 w-full">
              {!isVideoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-[#3A6ABE]/10">
                  <div className="w-16 h-16 border-4 border-[#3A6ABE] border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}
              <iframe
                src="https://www.youtube.com/embed/BYENSnrppms?autoplay=0&mute=0&enablejsapi=1"
                className={`w-full h-full min-h-[300px] md:min-h-[400px] rounded-2xl ${isVideoLoaded ? 'opacity-100' : 'opacity-0'}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => setIsVideoLoaded(true)}
                title="Vídeo sobre o Programa Trampolim"
              />
            </div>
            
            <motion.div 
              className="absolute inset-0 rounded-2xl pointer-events-none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              transition={{ 
                repeat: Infinity,
                repeatType: "reverse",
                duration: 2
              }}
            >
              <div className="absolute inset-0 border-2 border-[#3A6ABE] rounded-2xl blur-md"></div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutTrampolim;