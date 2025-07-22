import { EditalStatusBanner } from "@/components/shared/innovation/edital-status-banner/EditalStatusBanner";
import { InnovationForm } from "@/components/shared/innovation/innovation-form/InnovationForm";
import { useState } from "react";

import { FiAlertTriangle } from "react-icons/fi";

export default function SubmitInnovationPage() {
  const [hasActiveEdital, setHasActiveEdital] = useState(true);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  
  const activeEdital = {
    name: "Edital de Inovação Agreste PE 2023",
    deadline: "15 de Novembro, 2023",
    description: "Incentivo a ideias inovadoras para o desenvolvimento do Agreste Pernambucano"
  };

  const handleSubmit = (formData: any) => {
    console.log("Dados submetidos:", formData);
    setHasSubmitted(true);
  };

  return (
    <div className="bg-[#F5F5F5] min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#3A6ABE] to-[#F79B4B] mb-4">
            Submeta sua Ideia Inovadora
          </h1>
          <p className="text-xl text-[#3A6ABE]/90 max-w-3xl mx-auto">
            Transforme sua ideia em realidade com o apoio do nosso programa de inovação
          </p>
        </div>
        
        <EditalStatusBanner 
          hasActiveEdital={hasActiveEdital} 
          editalInfo={activeEdital} 
        />
        
        {hasActiveEdital && (
          <div className="bg-[#F79B4B]/10 border-l-4 border-[#F79B4B] p-4 mb-8 rounded-r-lg flex items-start">
            <FiAlertTriangle className="text-[#F79B4B] mt-1 mr-3 flex-shrink-0" />
            <p className="text-[#3A6ABE]/90">
              <strong>Atenção:</strong> Cada participante pode submeter apenas uma ideia por edital. 
              Certifique-se de que todos os dados estão corretos antes de enviar.
            </p>
          </div>
        )}
        
        <InnovationForm 
          hasActiveEdital={hasActiveEdital}
          hasSubmitted={hasSubmitted}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}