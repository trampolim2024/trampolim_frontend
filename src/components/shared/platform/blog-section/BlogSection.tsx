import { useState } from 'react';
import { FiUpload, FiEdit } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { TiptapEditor } from '@/components/features/tiptap-editor/TiptapEditor';

export const BlogSection = () => {
  const [blogForm, setBlogForm] = useState({
    title: '',
    content: '',
    coverImage: null as File | null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setBlogForm({ ...blogForm, coverImage: e.target.files[0] });
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#3A6ABE] mb-2">Gerenciar Blog</h2>
        <p className="text-[#3A6ABE]/80">Crie e publique novas notícias</p>
      </div>

      <Card className="p-6">
        <h3 className="text-xl font-semibold text-[#3A6ABE] mb-4">Nova Publicação</h3>
        <div className="space-y-4">
          <div>
            <Label htmlFor="blog-title" className="text-[#3A6ABE]">Título da Notícia</Label>
            <Input 
              id="blog-title" 
              placeholder="Ex: Novas oportunidades para empreendedores" 
              value={blogForm.title}
              onChange={(e) => setBlogForm({...blogForm, title: e.target.value})}
            />
          </div>

          <div>
            <Label htmlFor="blog-image" className="text-[#3A6ABE]">Imagem de Capa</Label>
            <div className="flex items-center space-x-2">
              <Input 
                id="blog-image" 
                type="file" 
                accept="image/*"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {blogForm.coverImage && (
                <span className="text-sm text-[#3A6ABE]/80">{blogForm.coverImage.name}</span>
              )}
            </div>
          </div>

          <div>
            <Label className="text-[#3A6ABE] mb-2 block">Conteúdo</Label>
            <TiptapEditor 
              content={blogForm.content} 
              onChange={(content) => setBlogForm({...blogForm, content})}
            />
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10">
              Salvar Rascunho
            </Button>
            <Button className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90">
              <FiEdit className="mr-2" /> Publicar Notícia
            </Button>
          </div>
        </div>
      </Card>

      {/* List of existing posts */}
      <h3 className="text-xl font-semibold text-[#3A6ABE] mt-8 mb-4">Publicações Recentes</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3].map((post) => (
          <Card key={post} className="overflow-hidden hover:border-[#3A6ABE]/30 hover:shadow-md transition-all">
            <img 
              src={`https://source.unsplash.com/random/600x400/?business,${post}`} 
              alt="Post cover" 
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h4 className="font-semibold text-lg text-[#3A6ABE] mb-2">
                {['Novas oportunidades', 'Dicas para empreendedores', 'Evento de inovação'][post - 1]}
              </h4>
              <p className="text-sm text-[#3A6ABE]/80 mb-4 line-clamp-3">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula...
              </p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-[#3A6ABE]/80">Publicado em 0{post}/0{post}/2023</span>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10">
                    Editar
                  </Button>
                  <Button variant="outline" size="sm" className="border-red-500 text-red-500 hover:bg-red-500/10">
                    Excluir
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};