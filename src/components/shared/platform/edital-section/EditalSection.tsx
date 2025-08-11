import { useState, useEffect } from 'react';
import { FiUpload, FiCalendar, FiPlus, FiTrash2 } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from '@/components/ui/textarea';

interface EvaluationSystem {
  _id: string;
  name: string;
}

interface Edital {
  _id: string;
  name: string;
  submissionStartDate: string;
  submissionEndDate: string;
}

interface Topic {
  topicName: string;
  maxScore: number;
}

export const EditaisSection = () => {
  const [editalForm, setEditalForm] = useState({
    name: '',
    submissionStartDate: '',
    submissionEndDate: '',
    evaluationSystem: '',
    pdfFile: null as File | null
  });

  const [systemForm, setSystemForm] = useState({
    name: '',
    description: '',
    topics: [{ topicName: '', maxScore: 10 }] as Topic[]
  });

  const [evaluationSystems, setEvaluationSystems] = useState<EvaluationSystem[]>([]);
  const [editais, setEditais] = useState<Edital[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalLoading, setIsModalLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async () => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("Autenticação necessária.");
      return;
    }
    try {
      const systemsRes = await fetch('http://localhost:8080/api/v1/trampolim/evaluation-systems', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!systemsRes.ok) throw new Error('Falha ao buscar sistemas de avaliação.');
      const systemsData = await systemsRes.json();
      setEvaluationSystems(systemsData.evaluationSystems || []);

      const editaisRes = await fetch('http://localhost:8080/api/v1/trampolim/editals', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (!editaisRes.ok) throw new Error('Falha ao buscar editais.');
      const editaisData = await editaisRes.json();
      setEditais(editaisData.editals || []);
    } catch (err: any) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEditalForm(prev => ({ ...prev, [id]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditalForm({ ...editalForm, pdfFile: e.target.files[0] });
    }
  };

  const handleEditalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    const { name, submissionStartDate, submissionEndDate, evaluationSystem, pdfFile } = editalForm;

    if (!name || !submissionStartDate || !submissionEndDate || !evaluationSystem || !pdfFile) {
      setError("Todos os campos do edital são obrigatórios.");
      setIsLoading(false);
      return;
    }

    const token = localStorage.getItem('authToken');
    if (!token) {
      setError("Autenticação necessária para publicar.");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('submissionStartDate', submissionStartDate);
    formData.append('submissionEndDate', submissionEndDate);
    formData.append('evaluationSystem', evaluationSystem);
    formData.append('pdfFile', pdfFile);

    try {
      const response = await fetch('http://localhost:8080/api/v1/trampolim/editals', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Falha ao criar o edital.');

      setSuccess('Edital publicado com sucesso!');
      setEditalForm({ name: '', submissionStartDate: '', submissionEndDate: '', evaluationSystem: '', pdfFile: null });
      fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTopicChange = (index: number, field: keyof Topic, value: string | number) => {
    const newTopics = [...systemForm.topics];
    (newTopics[index] as any)[field] = value;
    setSystemForm(prev => ({ ...prev, topics: newTopics }));
  };

  const addTopic = () => {
    setSystemForm(prev => ({
      ...prev,
      topics: [...prev.topics, { topicName: '', maxScore: 10 }]
    }));
  };

  const removeTopic = (index: number) => {
    if (systemForm.topics.length <= 1) return; 
    const newTopics = systemForm.topics.filter((_, i) => i !== index);
    setSystemForm(prev => ({ ...prev, topics: newTopics }));
  };

  const handleSystemSubmit = async () => {
    setIsModalLoading(true);
    setError(null);

    const token = localStorage.getItem('authToken');
    try {
      const response = await fetch('http://localhost:8080/api/v1/trampolim/evaluation-systems', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(systemForm),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Falha ao criar sistema.');

      setSystemForm({ name: '', description: '', topics: [{ topicName: '', maxScore: 10 }] });
      setIsModalOpen(false);
      fetchData(); 
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsModalLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-[#3A6ABE] mb-2">Gerenciar Editais</h2>
        <p className="text-[#3A6ABE]/80">Crie e gerencie os editais disponíveis</p>
      </div>

      <Card className="p-6 mb-8">
        <h3 className="text-xl font-semibold text-[#3A6ABE] mb-4">Criar Novo Edital</h3>
        
        {success && <div className="p-3 mb-4 text-sm text-green-700 bg-green-100 rounded-lg">{success}</div>}
        {error && <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

        <form onSubmit={handleEditalSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-[#3A6ABE]">Nome do Edital</Label>
            <Input id="name" placeholder="Ex: Edital de Inovação 2025" value={editalForm.name} onChange={handleInputChange} />
          </div>
          
          <div>
            <Label htmlFor="evaluationSystem" className="text-[#3A6ABE]">Sistema de Avaliação</Label>
            <div className="flex items-center gap-2">
              <Select value={editalForm.evaluationSystem} onValueChange={(value) => setEditalForm(prev => ({ ...prev, evaluationSystem: value }))}>
                <SelectTrigger id="evaluationSystem">
                  <SelectValue placeholder="Selecione um sistema de avaliação" />
                </SelectTrigger>
                <SelectContent>
                  {evaluationSystems.length > 0 ? (
                    evaluationSystems.map(system => (
                      <SelectItem key={system._id} value={system._id}>{system.name}</SelectItem>
                    ))
                  ) : (
                    <SelectItem value="loading" disabled>Carregando...</SelectItem>
                  )}
                </SelectContent>
              </Select>
              <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button type="button" variant="outline" className="shrink-0">Criar Nova Avaliação</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px]">
                  <DialogHeader>
                    <DialogTitle className="text-[#3A6ABE]">Novo Sistema de Avaliação</DialogTitle>
                    <DialogDescription>
                      Defina os critérios e pontuações que serão usados para avaliar os projetos deste edital.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto pr-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="system-name" className="text-right">Nome</Label>
                      <Input id="system-name" value={systemForm.name} onChange={(e) => setSystemForm(prev => ({ ...prev, name: e.target.value }))} className="col-span-3" />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                      <Label htmlFor="system-desc" className="text-right">Descrição</Label>
                      <Textarea id="system-desc" value={systemForm.description} onChange={(e) => setSystemForm(prev => ({ ...prev, description: e.target.value }))} className="col-span-3" />
                    </div>
                    <div className="col-span-4 mt-4">
                      <h4 className="font-semibold text-[#3A6ABE]">Tópicos de Avaliação</h4>
                      {systemForm.topics.map((topic, index) => (
                        <div key={index} className="flex items-center gap-2 mt-2">
                          <Input placeholder="Nome do Tópico" value={topic.topicName} onChange={(e) => handleTopicChange(index, 'topicName', e.target.value)} />
                          <Input type="number" placeholder="Nota Máx." value={topic.maxScore} onChange={(e) => handleTopicChange(index, 'maxScore', parseInt(e.target.value) || 0)} className="w-28" />
                          <Button type="button" variant="destructive" size="icon" onClick={() => removeTopic(index)} disabled={systemForm.topics.length <= 1}>
                            <FiTrash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button type="button" variant="outline" size="sm" onClick={addTopic} className="mt-2">
                        <FiPlus className="mr-2 h-4 w-4" /> Adicionar Tópico
                      </Button>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="button" onClick={handleSystemSubmit} disabled={isModalLoading} className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90">
                      {isModalLoading ? 'Salvando...' : 'Salvar Sistema'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="submissionStartDate" className="text-[#3A6ABE]">Data de Início</Label>
              <Input id="submissionStartDate" type="date" value={editalForm.submissionStartDate} onChange={handleInputChange} />
            </div>
            <div>
              <Label htmlFor="submissionEndDate" className="text-[#3A6ABE]">Data de Término</Label>
              <Input id="submissionEndDate" type="date" value={editalForm.submissionEndDate} onChange={handleInputChange} />
            </div>
          </div>

          <div>
            <Label htmlFor="pdfFile" className="text-[#3A6ABE]">Documento do Edital (PDF)</Label>
            <div className="flex items-center space-x-2">
              <Input id="pdfFile" type="file" accept=".pdf" onChange={handleFileChange} className="cursor-pointer" />
              {editalForm.pdfFile && (
                <span className="text-sm text-[#3A6ABE]/80 truncate">{editalForm.pdfFile.name}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading} className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90">
              {isLoading ? 'Publicando...' : <><FiUpload className="mr-2" /> Publicar Edital</>}
            </Button>
          </div>
        </form>
      </Card>

      <h3 className="text-xl font-semibold text-[#3A6ABE] mb-4">Editais Ativos</h3>
      <div className="space-y-4">
        {editais.length > 0 ? editais.map((edital) => (
          <Card key={edital._id} className="p-4 hover:border-[#3A6ABE]/30 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-lg text-[#3A6ABE]">{edital.name}</h4>
                <p className="text-sm text-[#3A6ABE]/80 mt-1">
                  <FiCalendar className="inline mr-1" /> 
                  {new Date(edital.submissionStartDate).toLocaleDateString()} - {new Date(edital.submissionEndDate).toLocaleDateString()}
                </p>
                <p className="text-sm text-[#3A6ABE]/80">
                  <span className="font-medium">Ideias submetidas:</span> 0 
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10">Editar</Button>
                <Button variant="outline" size="sm" className="border-[#F79B4B] text-[#F79B4B] hover:bg-[#F79B4B]/10">Encerrar</Button>
              </div>
            </div>
          </Card>
        )) : (
          <p className="text-[#3A6ABE]/80">Nenhum edital ativo no momento.</p>
        )}
      </div>
    </div>
  );
};