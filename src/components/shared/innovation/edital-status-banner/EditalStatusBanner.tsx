import { Button } from "@/components/ui/button";

interface EditalStatusBannerProps {
  hasActiveEdital: boolean;
  editalInfo?: {
    name: string;
    deadline: string;
    description: string;
  };
}

export const EditalStatusBanner = ({ hasActiveEdital, editalInfo }: EditalStatusBannerProps) => {
  return (
    <div className={`rounded-xl p-6 mb-8 ${hasActiveEdital ? 'bg-gradient-to-r from-[#3A6ABE] to-[#3A6ABE]/90' : 'bg-gradient-to-r from-[#F79B4B] to-[#F79B4B]/90'}`}>
      <div className="max-w-4xl mx-auto text-white">
        <h2 className="text-2xl font-bold mb-2">
          {hasActiveEdital ? 'Edital Ativo' : 'Nenhum Edital Ativo'}
        </h2>
        
        {hasActiveEdital && editalInfo ? (
          <>
            <p className="text-lg mb-1"><strong>{editalInfo.name}</strong></p>
            <p className="mb-4">{editalInfo.description}</p>
            <div className="flex items-center gap-4">
              <div className="bg-white/20 rounded-full px-4 py-2">
                <span className="font-medium">Prazo: {editalInfo.deadline}</span>
              </div>
              <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10">
                Ver regulamento completo
              </Button>
            </div>
          </>
        ) : (
          <p className="mb-4">No momento não há nenhum edital aberto para submissão de ideias inovadoras.</p>
        )}
      </div>
    </div>
  );
};