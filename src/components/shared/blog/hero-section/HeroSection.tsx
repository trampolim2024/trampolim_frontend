import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";


interface HeroSectionProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
}

export const HeroSection = ({ searchQuery, setSearchQuery }: HeroSectionProps) => {
  const searchSuggestions = ["marketing", "finanças", "gestão", "vendas"];

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 py-16 md:py-24">
      <div className="backdrop-blur-lg bg-[#F5F5F5]/80 rounded-3xl p-8 md:p-12 border border-[#F5F5F5]/20">
        <div className="space-y-8 mb-12">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-[#3A6ABE] to-[#F79B4B]">
            Conhecimento compartilhado para{' '}
            <span className="whitespace-nowrap">empreendedores</span>
          </h1>

          <p className="text-xl md:text-2xl text-[#3A6ABE]/90 max-w-3xl mx-auto">
            Aprenda, compartilhe e cresça com nossa comunidade de especialistas e colegas empreendedores
          </p>
        </div>

        <div className="relative max-w-2xl mx-auto">
          <div className="relative flex items-center">
            <div className="absolute left-5 flex items-center pointer-events-none">
              <FiSearch className="h-6 w-6 text-[#F79B4B]" />
            </div>

            <Input
              type="text"
              placeholder="Buscar artigos, tópicos ou autores..."
              className="pl-16 pr-36 py-7 text-lg rounded-2xl border-none bg-[#F5F5F5]/60 focus:bg-[#F5F5F5]/80 backdrop-blur-sm transition-all duration-300 placeholder-[#3A6ABE]/60 focus-visible:ring-2 focus-visible:ring-[#F79B4B]/50"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            <Button
              className="absolute right-3 transform -translate-y-1/2 top-1/2 h-12 px-8 rounded-xl font-medium hidden sm:inline-flex items-center gap-2 bg-gradient-to-r from-[#F79B4B] to-[#F79B4B]/80 hover:from-[#F79B4B]/90 hover:to-[#F79B4B] text-[#F5F5F5] transition-all duration-300"
              size="lg"
            >
              Buscar
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-3 text-base">
            {searchSuggestions.map((suggestion) => (
              <button
                key={suggestion}
                className="text-[#3A6ABE] hover:text-[#F79B4B] transition-colors px-3 py-1.5 rounded-lg bg-[#F5F5F5]/40 hover:bg-[#F5F5F5]/60 backdrop-blur-sm"
                onClick={() => setSearchQuery(suggestion)}
              >
                {suggestion}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};