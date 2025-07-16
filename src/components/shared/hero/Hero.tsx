import AgresteMap from '@/components/features/agreste-map/AgresteMap';
import React from 'react';
import Navbar from '../navbar/Navbar';
import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';

const Hero: React.FC = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-[calc(100vh-4rem)] bg-[#F5F5F5] pt-16 relative overflow-hidden flex items-center">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#3A6ABE] blur-[80px]"></div>
          <div className="absolute bottom-1/3 right-1/4 w-64 h-64 rounded-full bg-[#F79B4B] blur-[80px]"></div>
        </div>

        <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
          <motion.div 
            className="flex flex-col lg:flex-row items-center gap-8 xl:gap-16 w-full"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
          >
            <motion.div 
              className="w-full lg:w-1/2 space-y-8"
              variants={containerVariants}
            >
              <motion.div className="max-w-xl" variants={itemVariants}>
                <div className="mb-6">
                  <span className="text-[#3A6ABE] text-lg font-semibold">
                    PROGRAMA TRAMPOLIM
                  </span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#3A6ABE] mb-6 leading-tight">
                  Conectando <span className="text-[#F79B4B]">talentos</span> a oportunidades
                </h1>
                <p className="text-lg text-[#3A6ABE]/90 mb-8">
                  Plataforma inteligente que oferece ferramentas, mentoria e acesso 
                  a um ecossistema vibrante para impulsionar carreiras e negócios.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <motion.button 
                    className="px-8 py-3.5 bg-[#3A6ABE] text-white rounded-lg font-medium hover:bg-[#2E5AA7] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    variants={itemVariants}
                  >
                    Comece agora
                  </motion.button>
                  <motion.button 
                    className="px-8 py-3.5 bg-[#F79B4B] text-white rounded-lg font-medium hover:bg-[#E68C3D] transition-colors"
                    whileHover={{ scale: 1.02 }}
                    variants={itemVariants}
                  >
                    Como funciona
                  </motion.button>
                </div>
              </motion.div>

              <motion.div 
                className="flex flex-wrap gap-4 mt-12"
                variants={itemVariants}
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F79B4B]"></div>
                  <span className="text-[#3A6ABE]">Mentoria especializada</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F79B4B]"></div>
                  <span className="text-[#3A6ABE]">Ferramentas exclusivas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#F79B4B]"></div>
                  <span className="text-[#3A6ABE]">Rede de conexões</span>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              className="w-full lg:w-1/2 h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] xl:h-[700px] flex items-center justify-center"
              variants={itemVariants}
            >
              <div className="w-full h-full">
                <AgresteMap />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default Hero;