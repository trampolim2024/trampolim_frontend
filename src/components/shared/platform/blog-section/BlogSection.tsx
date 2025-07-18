import { useState } from 'react';
import { FiUpload, FiEdit, FiSave, FiTrash2, FiCalendar, FiPlus } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TiptapEditor } from '@/components/features/tiptap-editor/TiptapEditor';
// import { Badge } from 'lucide-react';


export const BlogSection = () => {
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    coverImage: null as File | null
  });

  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBlogForm({ ...blogForm, coverImage: e.target.files[0] });
    }
  };

  const mockPosts = [
    {
      id: 1,
      title: 'Novas oportunidades para empreendedores em 2023',
      excerpt: 'Descubra as principais tendências e oportunidades para empreendedores neste ano que está apenas começando...',
      date: '15/03/2023',
      image: 'https://source.unsplash.com/random/600x400/?startup,1',
      status: 'published'
    },
    {
      id: 2,
      title: 'Dicas essenciais para validar sua ideia de negócio',
      excerpt: 'Antes de investir tempo e recursos, aprenda como validar sua ideia de negócio com essas dicas práticas...',
      date: '28/02/2023',
      image: 'https://source.unsplash.com/random/600x400/?business,2',
      status: 'published'
    },
    {
      id: 3,
      title: 'Como participar do próximo edital de inovação',
      excerpt: 'Tudo o que você precisa saber para se inscrever e ter sucesso no próximo edital de fomento à inovação...',
      date: '10/02/2023',
      image: 'https://source.unsplash.com/random/600x400/?innovation,3',
      status: 'draft'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#3A6ABE] mb-1">Gerenciar Blog</h2>
          <p className="text-[#3A6ABE]/80">Crie e publique conteúdo para a comunidade</p>
        </div>
        
        <div className="flex space-x-2">
          <Button 
            variant={activeTab === 'create' ? 'default' : 'outline'}
            className={activeTab === 'create' ? 'bg-[#3A6ABE] hover:bg-[#3A6ABE]/90' : 'border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10'}
            onClick={() => setActiveTab('create')}
          >
            <FiPlus className="mr-2" /> Nova Publicação
          </Button>
          <Button 
            variant={activeTab === 'list' ? 'default' : 'outline'}
            className={activeTab === 'list' ? 'bg-[#3A6ABE] hover:bg-[#3A6ABE]/90' : 'border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10'}
            onClick={() => setActiveTab('list')}
          >
            Todas as Publicações
          </Button>
        </div>
      </div>

      {activeTab === 'create' && (
        <Card className="p-6 border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all rounded-xl">
          <h3 className="text-xl font-bold text-[#3A6ABE] mb-6 flex items-center">
            <span className="w-2 h-6 bg-[#F79B4B] rounded-full mr-3"></span>
            Nova Publicação
          </h3>
          
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="blog-title" className="text-[#3A6ABE]/80">Título da Notícia</Label>
              <Input 
                id="blog-title" 
                placeholder="Ex: Novas oportunidades para empreendedores" 
                value={blogForm.title}
                onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
                className="border-[#3A6ABE]/40 focus:border-[#3A6ABE]/60"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="blog-image" className="text-[#3A6ABE]/80">Imagem de Capa</Label>
              <div className="flex items-center space-x-4">
                <div className="relative flex-1">
                  <Label 
                    htmlFor="blog-image" 
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-[#3A6ABE]/30 border-dashed rounded-lg cursor-pointer hover:bg-[#3A6ABE]/5 transition-colors"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <FiUpload className="w-8 h-8 mb-2 text-[#3A6ABE]/60" />
                      <p className="text-sm text-[#3A6ABE]/80">
                        {blogForm.coverImage ? (
                          <span className="font-medium">{blogForm.coverImage.name}</span>
                        ) : (
                          <>Clique para enviar ou arraste uma imagem</>
                        )}
                      </p>
                    </div>
                    <Input 
                      id="blog-image" 
                      type="file" 
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </Label>
                </div>
                {blogForm.coverImage && (
                  <div className="w-32 h-32 rounded-md overflow-hidden border border-[#3A6ABE]/20">
                    <img 
                      src={URL.createObjectURL(blogForm.coverImage)} 
                      alt="Preview" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-[#3A6ABE]/80 mb-2 block">Conteúdo</Label>
              <div className="border border-[#3A6ABE]/20 rounded-lg overflow-hidden">
                <TiptapEditor 
                  content={blogForm.content} 
                  onChange={(content) => setBlogForm({...blogForm, content})}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10 h-11 rounded-lg font-medium"
              >
                <FiSave className="mr-2" /> Salvar Rascunho
              </Button>
              <Button className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90 h-11 rounded-lg font-medium">
                <FiEdit className="mr-2" /> Publicar Notícia
              </Button>
            </div>
          </div>
        </Card>
      )}

      {activeTab === 'list' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#3A6ABE]">Publicações Recentes</h3>
            <div className="flex space-x-2">
              <Button variant="outline" className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10">
                Todos
              </Button>
              <Button variant="outline" className="border-[#3A6ABE]/30 text-[#3A6ABE]/80 hover:bg-[#3A6ABE]/5">
                Publicados
              </Button>
              <Button variant="outline" className="border-[#3A6ABE]/30 text-[#3A6ABE]/80 hover:bg-[#3A6ABE]/5">
                Rascunhos
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockPosts.map((post) => (
              <Card 
                key={post.id} 
                className="overflow-hidden border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all rounded-xl group"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <span
                    className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold
                      ${post.status === 'published'
                        ? 'bg-[#3A6ABE] text-white'
                        : 'border border-[#F79B4B] text-[#F79B4B] bg-white'}
                    `}
                  >
                    {post.status === 'published' ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
                <div className="p-5">
                  <div className="flex items-center text-sm text-[#3A6ABE]/70 mb-3">
                    <FiCalendar className="mr-2" />
                    {post.date}
                  </div>
                  <h4 className="font-bold text-lg text-[#3A6ABE] mb-2 line-clamp-2 leading-tight">
                    {post.title}
                  </h4>
                  <p className="text-sm text-[#3A6ABE]/80 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex justify-end space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10"
                    >
                      Editar
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-red-500 text-red-500 hover:bg-red-500/10"
                    >
                      <FiTrash2 className="mr-1" /> Excluir
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};