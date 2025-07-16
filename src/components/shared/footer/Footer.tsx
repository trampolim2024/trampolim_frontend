import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { 
  FiFacebook, 
  FiInstagram, 
  FiLinkedin, 
  FiTwitter,
  FiMail,
  FiPhone,
  FiMapPin,
  FiClock
} from 'react-icons/fi';

const Footer = () => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
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

  const underlineVariant: Variants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 0.8
      }
    }
  };

  const socialLinks = [
    { icon: <FiFacebook className="w-5 h-5" />, url: "#", name: "Facebook" },
    { icon: <FiInstagram className="w-5 h-5" />, url: "#", name: "Instagram" },
    { icon: <FiLinkedin className="w-5 h-5" />, url: "#", name: "LinkedIn" },
    { icon: <FiTwitter className="w-5 h-5" />, url: "#", name: "Twitter" }
  ];

  const quickLinks = [
    { name: "Sobre Nós", url: "#" },
    { name: "Programas", url: "#" },
    { name: "Mentores", url: "#" },
    { name: "Depoimentos", url: "#" },
    { name: "Blog", url: "#" },
    { name: "FAQ", url: "#" }
  ];

  const contactInfo = [
    { icon: <FiMail className="w-5 h-5" />, text: "contato@trampolim.com.br" },
    { icon: <FiPhone className="w-5 h-5" />, text: "+55 (11) 98765-4321" },
    { icon: <FiMapPin className="w-5 h-5" />, text: "Av. Paulista, 1000 - São Paulo/SP" },
    { icon: <FiClock className="w-5 h-5" />, text: "Seg-Sex: 9h às 18h" }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-[#3A6ABE] to-[#2C5496] text-white overflow-hidden">
      {/* Efeitos de fundo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-80 h-80 rounded-full bg-[#F79B4B] blur-[100px]"></div>
        <div className="absolute bottom-0 right-1/4 w-60 h-60 rounded-full bg-white blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16 relative z-10">
        <motion.div
          className="py-16 md:py-20 lg:py-24"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 xl:gap-12">
            <motion.div variants={itemVariants}>
              <div className="mb-6">
                <img 
                  src="/trampolim-logo-white.svg" 
                  alt="Trampolim Logo" 
                  className="h-12 md:h-14 w-auto"
                />
              </div>
              <p className="text-white/80 mb-6 leading-relaxed">
                Impulsionando ideias e transformando sonhos em negócios de sucesso.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-white/20 p-2.5 rounded-lg transition-all duration-300"
                    whileHover={{ y: -3, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                Links Rápidos
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F79B4B]"
                  variants={underlineVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </h3>
              <ul className="space-y-3">
                {quickLinks.map((link, index) => (
                  <motion.li 
                    key={index}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a 
                      href={link.url} 
                      className="text-white/80 hover:text-white hover:underline underline-offset-4 transition-colors duration-300 flex items-center"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F79B4B] mr-3"></span>
                      {link.name}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                Contato
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F79B4B]"
                  variants={underlineVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </h3>
              <ul className="space-y-4">
                {contactInfo.map((info, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-[#F79B4B] mr-3 mt-0.5">{info.icon}</span>
                    <span className="text-white/80">{info.text}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={itemVariants}>
              <h3 className="text-xl font-bold mb-6 relative inline-block">
                Newsletter
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-0.5 bg-[#F79B4B]"
                  variants={underlineVariant}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                />
              </h3>
              <p className="text-white/80 mb-6">
                Assine nossa newsletter para receber atualizações e novidades.
              </p>
              <form className="space-y-4">
                <div>
                  <input 
                    type="email" 
                    placeholder="Seu e-mail" 
                    className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 focus:border-[#F79B4B] focus:outline-none text-white placeholder-white/60 transition-all duration-300"
                    required
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-gradient-to-r from-[#F79B4B] to-[#F79B4B]/90 hover:from-[#F79B4B]/90 hover:to-[#F79B4B] text-white font-semibold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-500 flex items-center justify-center"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span>Assinar</span>
                  <svg 
                    className="w-4 h-4 ml-2" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </form>
            </motion.div>
          </div>

          <motion.div 
            className="my-12 h-px bg-white/20"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          />

          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <motion.p 
              className="text-white/60 text-sm md:text-base"
              variants={itemVariants}
            >
              © {new Date().getFullYear()} Programa Trampolim. Todos os direitos reservados.
            </motion.p>
            
            <motion.div 
              className="flex flex-wrap gap-4 md:gap-6 justify-center"
              variants={containerVariants}
            >
              {['Termos de Serviço', 'Política de Privacidade', 'Cookies'].map((item, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-white/60 hover:text-white text-sm md:text-base transition-colors duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -2 }}
                >
                  {item}
                </motion.a>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;