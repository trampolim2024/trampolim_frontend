import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FiHeart} from "react-icons/fi";


interface Author {
  name: string;
  avatar: string;
}

interface Comment {
  id: string;
  author: Author;
  date: string;
  content: string;
  likes: number;
  replies?: Comment[];
}

interface CommentsSectionProps {
  comments: Comment[];
  commentText: string;
  setCommentText: (text: string) => void;
  handleAddComment: () => void;
}

export const CommentsSection = ({
  comments,
  commentText,
  setCommentText,
  handleAddComment,
}: CommentsSectionProps) => {
  return (
    <div className="bg-white rounded-xl border border-[#3A6ABE]/20 p-6 md:p-8 mt-12">
      <h2 className="text-2xl font-bold text-[#3A6ABE] mb-6">Discussão ({comments.length})</h2>

      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b border-[#3A6ABE]/10 pb-6 last:border-0">
            <div className="flex items-start space-x-4">
              <Avatar className="w-10 h-10 border border-[#F79B4B]/50">
                <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE]">
                  {comment.author.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <h4 className="font-medium text-[#3A6ABE]">{comment.author.name}</h4>
                  <span className="text-xs text-[#3A6ABE]/70">{comment.date}</span>
                </div>
                <p className="text-[#3A6ABE]/90 mt-2 mb-3">{comment.content}</p>
                <div className="flex items-center space-x-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#3A6ABE]/80 hover:text-[#3A6ABE] hover:bg-[#3A6ABE]/10"
                  >
                    <FiHeart className="mr-1 text-[#F79B4B]" /> {comment.likes}
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-[#3A6ABE]/80 hover:text-[#3A6ABE] hover:bg-[#3A6ABE]/10"
                  >
                    Responder
                  </Button>
                </div>

                {comment.replies && comment.replies.length > 0 && (
                  <div className="mt-4 pl-4 border-l-2 border-[#F79B4B]/30">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="pt-4">
                        <div className="flex items-start space-x-3">
                          <Avatar className="w-8 h-8 border border-[#F79B4B]/30">
                            <AvatarImage src={reply.author.avatar} alt={reply.author.name} />
                            <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE] text-xs">
                              {reply.author.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                              <h4 className="font-medium text-[#3A6ABE] text-sm">{reply.author.name}</h4>
                              <span className="text-xs text-[#3A6ABE]/70">{reply.date}</span>
                            </div>
                            <p className="text-[#3A6ABE]/90 mt-1 text-sm">{reply.content}</p>
                            <div className="flex items-center space-x-3 mt-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-[#3A6ABE]/80 hover:text-[#3A6ABE] hover:bg-[#3A6ABE]/10 h-6"
                              >
                                <FiHeart className="mr-1 text-[#F79B4B] text-xs" /> {reply.likes}
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <h3 className="font-medium text-[#3A6ABE] mb-4">Adicione seu comentário</h3>
        <div className="flex items-start space-x-4">
          <Avatar className="w-10 h-10 border border-[#F79B4B]/50">
            <AvatarFallback className="bg-[#3A6ABE]/10 text-[#3A6ABE]">Y</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-3">
            <Input
              placeholder="Escreva seu comentário..."
              className="border-[#3A6ABE]/40 focus:border-[#3A6ABE]/60 min-h-[100px] py-3"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <div className="flex justify-end">
              <Button
                className="bg-gradient-to-r from-[#3A6ABE] to-[#F79B4B] hover:from-[#3A6ABE]/90 hover:to-[#F79B4B]/90"
                onClick={handleAddComment}
                disabled={!commentText.trim()}
              >
                Publicar Comentário
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};