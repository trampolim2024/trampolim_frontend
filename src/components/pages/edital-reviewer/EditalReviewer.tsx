import { EditalReviewerPage } from "../edital-page-reviewer/EditalReviewerPage";

export default function EditalReviewer() {
  const hasActiveEdital = true;
  
  const editalData = {
    id: "edital-2023-01",
    name: "Edital de Inovação para o Agreste Pernambucano 2023",
    description: "Este edital tem como objetivo fomentar ideias inovadoras que contribuam para o desenvolvimento econômico e social da região do Agreste Pernambucano. Serão selecionados projetos nas áreas de tecnologia, agronegócio, educação e saúde que apresentem soluções criativas para os desafios regionais.",
    startDate: "01/10/2023",
    endDate: "30/11/2023",
    submissionDate: "15/09/2023",
    rules: [
      "Podem participar empreendedores individuais ou equipes de até 5 pessoas",
      "Todos os membros devem residir no Agreste Pernambucano",
      "Cada participante/equipe pode submeter apenas uma ideia por edital",
      "A ideia deve ser original e inédita",
      "O pitch deve ter no máximo 3 minutos"
    ],
    benefits: [
      "Mentoria especializada por 6 meses",
      "Acesso a rede de investidores",
      "Capital semente de até R$ 20.000,00",
      "Espaço no coworking por 1 ano",
      "Aceleração com especialistas do setor"
    ],
    aiSummary: "Este edital busca projetos inovadores para o desenvolvimento do Agreste Pernambucano, com foco em tecnologia, agronegócio, educação e saúde. Oferece mentoria, networking, financiamento e espaço de trabalho para as melhores propostas. Ideal para empreendedores locais com ideias transformadoras."
  };

  return (
    <EditalReviewerPage 
      hasActiveEdital={hasActiveEdital} 
      edital={hasActiveEdital ? editalData : undefined} 
    />
  );
}