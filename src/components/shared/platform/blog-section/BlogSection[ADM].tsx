import { useState, useEffect } from 'react';
import { FiUpload, FiEdit, FiSave, FiTrash2, FiCalendar, FiPlus } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TiptapEditor } from '@/components/features/tiptap-editor/TiptapEditor';

interface Post {
  _id: string;
  title: string;
  content: string;
  coverImage: string;
  author: {
    fullName: string;
  };
  createdAt: string;
}

export const BlogSectionADM = () => {
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    coverImage: null as File | null
  });

  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState<'create' | 'list'>('create');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch('http://localhost:8080/api/v1/trampolim/posts');
      if (!response.ok) throw new Error('Falha ao buscar as publicações.');
      const data = await response.json();
      setPosts(data.posts || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'list') {
      fetchPosts();
    }
  }, [activeTab]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBlogForm({ ...blogForm, coverImage: e.target.files[0] });
    }
  };

  const handleContentChange = (content: string) => {
    setBlogForm(prev => ({ ...prev, content }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!blogForm.title || !blogForm.content || !blogForm.coverImage) {
      setError("Título, conteúdo e imagem de capa são obrigatórios.");
      return;
    }

    setIsLoading(true);
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("Autenticação necessária.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('title', blogForm.title);
    formData.append('content', blogForm.content);
    formData.append('coverImage', blogForm.coverImage);

    try {
      const response = await fetch('http://localhost:8080/api/v1/trampolim/posts', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Falha ao publicar notícia.');

      setSuccess('Notícia publicada com sucesso!');
      setBlogForm({ title: '', content: '', coverImage: null });
      setActiveTab('list');

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (postId: string) => {
    if (!window.confirm('Tem certeza que deseja excluir esta publicação?')) return;

    setError(null);
    setSuccess(null);
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("Autenticação necessária.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/v1/trampolim/posts/${postId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Falha ao excluir a publicação.');

      setSuccess('Publicação excluída com sucesso!');
      setPosts(prevPosts => prevPosts.filter(p => p._id !== postId));

    } catch (err: any) {
      setError(err.message);
    }
  };


  const API_BASE_URL = 'http://localhost:8080';

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

      {success && <div className="p-3 my-4 text-sm text-center text-green-700 bg-green-100 rounded-lg">{success}</div>}
      {error && <div className="p-3 my-4 text-sm text-center text-red-700 bg-red-100 rounded-lg">{error}</div>}

      {activeTab === 'create' && (
        <Card className="p-6 border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all rounded-xl">
          <form onSubmit={handleSubmit}>
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
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
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
                        <p className="text-sm text-[#3A6ABE]/80 text-center">
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
                    <div className="w-32 h-32 rounded-md overflow-hidden border border-[#3A6ABE]/20 shrink-0">
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
                    onChange={handleContentChange}
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10 h-11 rounded-lg font-medium"
                >
                  <FiSave className="mr-2" /> Salvar Rascunho
                </Button>
                <Button type="submit" disabled={isLoading} className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90 h-11 rounded-lg font-medium">
                  {isLoading ? 'Publicando...' : <><FiEdit className="mr-2" /> Publicar Notícia</>}
                </Button>
              </div>
            </div>
          </form>
        </Card>
      )}

      {activeTab === 'list' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-[#3A6ABE]">Publicações Recentes</h3>
          </div>

          {isLoading ? (
            <p className="text-[#3A6ABE]/80 col-span-full text-center py-8">Carregando publicações...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* --- CORREÇÃO APLICADA AQUI --- */}
              {posts.map((post) => (
                <Card
                  key={post._id}
                  className="overflow-hidden border-[#3A6ABE]/20 hover:border-[#3A6ABE]/40 hover:shadow-lg transition-all rounded-xl group flex flex-col"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <img
                      src={`${API_BASE_URL}${post.coverImage}`}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                  </div>
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="flex items-center text-sm text-[#3A6ABE]/70 mb-3">
                      <FiCalendar className="mr-2" />
                      {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                    <h4 className="font-bold text-lg text-[#3A6ABE] mb-2 line-clamp-2 leading-tight flex-grow">
                      {post.title}
                    </h4>
                    <div className="flex justify-end space-x-2 mt-4">
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
                        onClick={() => handleDelete(post._id)}
                      >
                        <FiTrash2 className="mr-1" /> Excluir
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
              {posts.length === 0 && (
                <p className="text-[#3A6ABE]/80 col-span-full text-center py-8">Nenhuma publicação encontrada.</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
