import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";


export const NewsletterCTA = () => {
  return (
    <div className="bg-gradient-to-r from-[#3A6ABE] to-[#F79B4B] rounded-xl p-8 md:p-10 text-white mt-16">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold mb-3">Não perca novos artigos</h2>
            <p className="text-white/90 mb-4">
              Inscreva-se para receber os melhores conteúdos sobre empreendedorismo diretamente no seu email.
            </p>
          </div>
          <div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                placeholder="Seu melhor email"
                className="bg-white/90 border-none text-[#3A6ABE] placeholder-[#3A6ABE]/70 py-5 rounded-lg flex-1"
              />
              <Button
                className="bg-white text-[#3A6ABE] hover:bg-white/90 py-5 rounded-lg font-medium whitespace-nowrap"
              >
                Assinar Newsletter
              </Button>
            </div>
            <p className="text-xs text-white/70 mt-2">
              Respeitamos sua privacidade. Nunca enviamos spam.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};