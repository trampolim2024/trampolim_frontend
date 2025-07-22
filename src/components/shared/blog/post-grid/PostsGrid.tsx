import { FiSearch } from "react-icons/fi";
import { PostCard } from "../post-card/PostCard";

interface PostsGridProps {
  posts: any[];
  expandedPost: string | null;
  setExpandedPost: (id: string | null) => void;
  handleSavePost: (id: string) => void;
}

export const PostsGrid = ({
  posts,
  expandedPost,
  setExpandedPost,
  handleSavePost,
}: PostsGridProps) => {
  return (
    <div className="mb-12">
      <h2 className="text-2xl font-bold text-[#3A6ABE] mb-6">Artigos Recentes</h2>

      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              expandedPost={expandedPost}
              setExpandedPost={setExpandedPost}
              handleSavePost={handleSavePost}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="mx-auto w-24 h-24 bg-[#3A6ABE]/10 rounded-full flex items-center justify-center mb-4">
            <FiSearch className="text-[#3A6ABE] text-3xl" />
          </div>
          <h3 className="text-xl font-medium text-[#3A6ABE] mb-2">Nenhum artigo encontrado</h3>
          <p className="text-[#3A6ABE]/80 max-w-md mx-auto">
            Não encontramos artigos correspondentes à sua busca. Tente ajustar os filtros ou buscar por termos diferentes.
          </p>
        </div>
      )}
    </div>
  );
};