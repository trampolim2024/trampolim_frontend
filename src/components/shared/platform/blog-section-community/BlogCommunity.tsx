import { useState } from "react";
import { HeroSection } from "../../blog/hero-section/HeroSection";
import { CategoryFilter } from "../../blog/category-filter/CategoryFilter";
import { ContentTabs } from "../../blog/content-tabs/ContentTabs";
import { FeaturedPost } from "../../blog/featured-post/FeaturedPost";
import { CommentsSection } from "../../blog/comments-section/CommentsSection";
import { SavedPosts } from "../../blog/saved-post/SavedPosts";
import { PostsGrid } from "../../blog/post-grid/PostsGrid";
import { NewsletterCTA } from "../../blog/news-letter-cta/NewsletterCTA";

export default function BlogCommunity() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("posts");
  const [expandedPost, setExpandedPost] = useState<string | null>(null);
  const [commentText, setCommentText] = useState("");

  // Dados mockados
  const categories = [
    { id: "all", name: "Todos" },
    { id: "marketing", name: "Marketing" },
    { id: "finance", name: "Finanças" },
    { id: "management", name: "Gestão" },
    { id: "sales", name: "Vendas" },
    { id: "technology", name: "Tecnologia" },
  ];

  const featuredPost = {
    id: "1",
    title: "Como aumentar suas vendas com marketing digital em 2023",
    excerpt: "Descubra as estratégias mais eficazes para impulsionar suas vendas online neste ano.",
    content: "Conteúdo completo do artigo sobre marketing digital...",
    image: "/images/featured-post.jpg",
    tags: ["marketing", "vendas", "digital"],
    author: {
      name: "Carlos Silva",
      role: "Especialista em Marketing",
      avatar: "/avatars/carlos.jpg",
    },
    date: "15 de Maio, 2023",
    likes: 124,
    comments: 28,
  };

  const regularPosts = [
    {
      id: "2",
      title: "Gestão financeira para pequenos negócios",
      excerpt: "Aprenda a gerenciar suas finanças e manter seu negócio saudável.",
      image: "/images/post1.jpg",
      tags: ["finanças", "gestão"],
      author: {
        name: "Ana Oliveira",
        role: "Consultora Financeira",
        avatar: "/avatars/ana.jpg",
      },
      date: "10 de Maio, 2023",
      likes: 89,
      comments: 14,
    },
  ];

  const comments = [
    {
      id: "c1",
      author: {
        name: "João Mendes",
        avatar: "/avatars/joao.jpg",
      },
      date: "2 dias atrás",
      content: "Ótimo artigo! Já implementei algumas dessas estratégias e os resultados foram impressionantes.",
      likes: 12,
      replies: [
        {
          id: "r1",
          author: {
            name: "Autor do Artigo",
            avatar: "/avatars/carlos.jpg",
          },
          date: "1 dia atrás",
          content: "Que bom que gostou, João! Fico feliz que esteja tendo bons resultados.",
          likes: 5,
        },
      ],
    },
  ];

  const handleLikePost = (postId: string) => {
    console.log(`Post ${postId} curtido`);
    // Implementar lógica de curtida
  };

  const handleSavePost = (postId: string) => {
    console.log(`Post ${postId} salvo`);
    // Implementar lógica de salvar post
  };

  const handleAddComment = () => {
    if (commentText.trim()) {
      console.log("Novo comentário:", commentText);
      setCommentText("");
    }
  };

  // Filtragem de posts
  const filteredPosts = activeCategory === "all" 
    ? regularPosts 
    : regularPosts.filter(post => post.tags.includes(activeCategory));

  return (
    <div className="bg-[#F5F5F5] min-h-screen">
      <HeroSection searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CategoryFilter 
          categories={categories} 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
          filteredPostsCount={filteredPosts.length}
        />

        <ContentTabs activeTab={activeTab} setActiveTab={setActiveTab} />

        {activeTab === 'posts' && (
          <>
            {featuredPost && (
              <FeaturedPost
                post={featuredPost}
                expandedPost={expandedPost}
                setExpandedPost={setExpandedPost}
                handleLikePost={handleLikePost}
                handleSavePost={handleSavePost}
              />
            )}

            <PostsGrid
              posts={filteredPosts}
              expandedPost={expandedPost}
              setExpandedPost={setExpandedPost}
              handleSavePost={handleSavePost}
            />
          </>
        )}

        {activeTab === 'saved' && <SavedPosts setActiveTab={setActiveTab} />}

        {expandedPost && (
          <CommentsSection
            comments={comments}
            commentText={commentText}
            setCommentText={setCommentText}
            handleAddComment={handleAddComment}
          />
        )}

        <NewsletterCTA />
      </div>
    </div>
  );
}