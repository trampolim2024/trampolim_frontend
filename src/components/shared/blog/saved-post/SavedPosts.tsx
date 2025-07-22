import { Button } from "@/components/ui/button";
import { FiBookmark } from "react-icons/fi";

interface SavedPostsProps {
  setActiveTab: (tab: string) => void;
}

export const SavedPosts = ({ setActiveTab }: SavedPostsProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#3A6ABE] mb-6">Seus Artigos Salvos</h2>

      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-[#F79B4B]/10 rounded-full flex items-center justify-center mb-4">
          <FiBookmark className="text-[#F79B4B] text-3xl" />
        </div>
        <h3 className="text-xl font-medium text-[#3A6ABE] mb-2">Nenhum artigo salvo ainda</h3>
        <p className="text-[#3A6ABE]/80 max-w-md mx-auto mb-6">
          Quando encontrar artigos interessantes, salve-os aqui para ler depois.
        </p>
        <Button
          className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90"
          onClick={() => setActiveTab('posts')}
        >
          Explorar Artigos
        </Button>
      </div>
    </div>
  );
};