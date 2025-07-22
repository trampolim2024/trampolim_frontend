import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FiHeart, FiMessageSquare, FiChevronRight, FiBookmark, FiShare2, FiCalendar } from "react-icons/fi";

interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  tags: string[];
  author: Author;
  date: string;
  likes: number;
  comments: number;
}

interface FeaturedPostProps {
  post: Post;
  expandedPost: string | null;
  setExpandedPost: (id: string | null) => void;
  handleLikePost: (id: string) => void;
  handleSavePost: (id: string) => void;
}

export const FeaturedPost = ({
  post,
  expandedPost,
  setExpandedPost,
  handleLikePost,
  handleSavePost,
}: FeaturedPostProps) => {
  return (
    <div className="mb-16">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#3A6ABE]">Destaque da Comunidade</h2>
        <div className="flex items-center text-sm text-[#3A6ABE]/80">
          <span className="bg-[#F79B4B]/10 text-[#F79B4B] px-3 py-1 rounded-full text-xs font-medium">
            Em Alta
          </span>
        </div>
      </div>

      <Card className="border-[#3A6ABE]/20 hover:shadow-lg transition-all rounded-xl overflow-hidden group relative">
        <div className="absolute inset-0 bg-gradient-to-r from-[#3A6ABE]/10 to-[#F79B4B]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"></div>

        <div className="grid grid-cols-1 lg:grid-cols-2 relative z-10">
          <div className="relative aspect-video lg:aspect-auto lg:h-full">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r"></div>
          </div>

          <div className="p-8 bg-white">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="border-[#3A6ABE]/30 text-[#3A6ABE] bg-[#3A6ABE]/10 hover:bg-[#3A6ABE]/20"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-[#3A6ABE] mb-3 leading-tight">
              {post.title}
            </h2>

            <p className="text-[#3A6ABE]/80 mb-6">{post.excerpt}</p>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div className="flex items-center space-x-3">
                <Avatar className="w-12 h-12 border-2 border-[#F79B4B]/50">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE]">
                    {post.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium text-[#3A6ABE]">{post.author.name}</h4>
                  <p className="text-sm text-[#3A6ABE]/70">{post.author.role}</p>
                </div>
              </div>
              <div className="flex items-center text-sm text-[#3A6ABE]/80">
                <FiCalendar className="mr-2 text-[#F79B4B]" />
                <span>{post.date}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 justify-between items-center">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  className="text-[#3A6ABE]/80 hover:text-[#3A6ABE] hover:bg-[#3A6ABE]/10"
                  onClick={() => handleLikePost(post.id)}
                >
                  <FiHeart className="mr-2" /> {post.likes} curtidas
                </Button>
                <Button
                  variant="ghost"
                  className="text-[#3A6ABE]/80 hover:text-[#3A6ABE] hover:bg-[#3A6ABE]/10"
                >
                  <FiMessageSquare className="mr-2" /> {post.comments} comentários
                </Button>
              </div>

              <Button
                className="bg-gradient-to-r from-[#3A6ABE] to-[#F79B4B] hover:from-[#3A6ABE]/90 hover:to-[#F79B4B]/90 h-11 rounded-lg font-medium px-8 shadow-md hover:shadow-lg transition-all"
                onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
              >
                {expandedPost === post.id ? 'Recolher' : 'Ler Artigo'}
                <FiChevronRight className="ml-1" />
              </Button>
            </div>

            {expandedPost === post.id && (
              <div className="mt-6 pt-6 border-t border-[#3A6ABE]/10">
                <p className="text-[#3A6ABE]/90 mb-6 whitespace-pre-line">
                  {post.content}
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    variant="outline"
                    className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10"
                    onClick={() => handleSavePost(post.id)}
                  >
                    <FiBookmark className="mr-2" /> Salvar para ler depois
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10"
                  >
                    <FiShare2 className="mr-2" /> Compartilhar
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
};