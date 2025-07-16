import { useState } from 'react';
import { FiChevronDown, FiHelpCircle } from 'react-icons/fi';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqItems = [
    {
      question: "Como posso me inscrever no Programa Trampolim?",
      answer: "As inscrições são feitas através do nosso site durante os períodos de cadastro. Basta acessar a página de inscrição, preencher o formulário com seus dados e informações do projeto, e enviar para nossa avaliação."
    },
    {
      question: "Quais são os critérios de seleção?",
      answer: "Avaliamos o potencial de impacto do projeto, inovação, escalabilidade, equipe envolvida e aderência aos objetivos do programa. Não há restrição por área de atuação ou estágio do projeto."
    },
    {
      question: "Existe algum custo para participar?",
      answer: "O Programa Trampolim é totalmente gratuito para os selecionados. Nós acreditamos no potencial dos empreendedores e cobrimos todos os custos do programa através de nossos parceiros e patrocinadores."
    },
    {
      question: "Quanto tempo dura o programa?",
      answer: "O ciclo completo tem duração de 6 meses, divididos em 3 fases: imersão, desenvolvimento e aceleração. Cada fase tem objetivos específicos para o crescimento do seu projeto."
    },
    {
      question: "Quais benefícios além da mentoria eu recebo?",
      answer: "Além do suporte especializado, você terá acesso a nossa rede de contatos, possibilidade de investimento, espaço de coworking quando necessário, e visibilidade para sua marca."
    },
    {
      question: "Posso participar de outro lugar que não seja o Agreste?",
      answer: "Atualmente o programa está focado no ecossistema do Agreste, mas temos planos de expansão. Projetos de outras regiões com potencial de impacto na nossa área podem ser considerados."
    }
  ];

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#F0F4FF] to-white z-0"></div>
      
      <div className="relative z-10 pt-12 pb-20 md:pb-28">
        <div className="container mx-auto px-6 lg:px-8 xl:px-12 2xl:px-16">
          <div className="flex flex-col items-center">
            <div className="flex flex-col items-center mb-12 md:mb-16">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#3A6ABE] text-white mb-4">
                <FiHelpCircle className="w-8 h-8" />
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#3A6ABE] text-center leading-tight">
                Perguntas Frequentes
                <span className="block w-24 h-1 mx-auto mt-4 bg-[#F79B4B]"></span>
              </h2>
            </div>
            
            <div className="w-full max-w-4xl space-y-4">
              {faqItems.map((item, index) => (
                <div key={index} className="overflow-hidden rounded-xl bg-white shadow-md">
                  <div
                    className={`flex items-center justify-between p-6 cursor-pointer ${activeIndex === index ? 'bg-[#3A6ABE] text-white' : 'bg-white text-[#3A6ABE]'}`}
                    onClick={() => toggleAccordion(index)}
                  >
                    <h3 className="text-lg md:text-xl font-semibold pr-4">
                      {item.question}
                    </h3>
                    <FiChevronDown 
                      className={`w-6 h-6 min-w-[24px] transition-transform duration-300 ${activeIndex === index ? 'transform rotate-180 text-white' : 'text-[#3A6ABE]'}`} 
                    />
                  </div>

                  {activeIndex === index && (
                    <div className="p-6 bg-white/90 text-[#555] border-t border-gray-200">
                      <p className="leading-relaxed">{item.answer}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-16 text-center">
              <p className="text-lg md:text-xl text-[#555] max-w-3xl mb-8 leading-relaxed">
                Não encontrou sua dúvida? Entre em contato com nossa equipe.
              </p>
              
              <div className="mt-8">
                <button className="relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90 hover:from-[#F79B4B] hover:to-[#F79B4B]/90 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-500 group overflow-hidden">
                  <span className="relative z-10">Fale conosco</span>
                  <span className="absolute inset-0 bg-[#F79B4B] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;