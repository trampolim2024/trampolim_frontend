import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FiHeart, FiMessageSquare, FiBookmark, FiCalendar } from "react-icons/fi";


interface Author {
  name: string;
  role: string;
  avatar: string;
}

interface Post {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  tags: string[];
  author: Author;
  date: string;
  likes: number;
  comments: number;
}

interface PostCardProps {
  post: Post;
  expandedPost: string | null;
  setExpandedPost: (id: string | null) => void;
  handleSavePost: (id: string) => void;
}

export const PostCard = ({ post, expandedPost, setExpandedPost, handleSavePost }: PostCardProps) => {
  return (
    <Card
      className="overflow-hidden border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all duration-300 rounded-xl group h-full flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="p-6 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-2 mb-3">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              className="text-xs border-[#3A6ABE]/30 text-[#3A6ABE] bg-[#3A6ABE]/10 hover:bg-[#3A6ABE]/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <h2 className="text-xl font-bold text-[#3A6ABE] mb-2 line-clamp-2 leading-tight">
          {post.title}
        </h2>

        <p className="text-[#3A6ABE]/80 mb-4 line-clamp-3 flex-1">
          {post.excerpt}
        </p>

        <div className="flex items-center justify-between text-sm text-[#3A6ABE]/80 mb-4">
          <div className="flex items-center">
            <FiCalendar className="mr-2 text-[#F79B4B]" />
            <span>{post.date}</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="flex items-center">
              <FiHeart className="mr-1 text-[#F79B4B]" /> {post.likes}
            </span>
            <span className="flex items-center">
              <FiMessageSquare className="mr-1 text-[#F79B4B]" /> {post.comments}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-3 mt-auto">
          <Avatar className="w-10 h-10 border-2 border-[#F79B4B]/50">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE]">
              {post.author.name.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="font-medium text-[#3A6ABE]">{post.author.name}</h4>
            <p className="text-xs text-[#3A6ABE]/70">{post.author.role}</p>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button
            variant="outline"
            size="sm"
            className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10"
            onClick={() => handleSavePost(post.id)}
          >
            <FiBookmark className="mr-1" /> Salvar
          </Button>
          <Button
            size="sm"
            className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90"
            onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)}
          >
            Ler Mais
          </Button>
        </div>
      </div>
    </Card>
  );
};