import { useState } from 'react';
import { FiUpload, FiCalendar } from 'react-icons/fi';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const EditaisSection = () => {
  const [editalForm, setEditalForm] = useState({
    name: '',
    startDate: '',
    endDate: '',
    file: null as File | null
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEditalForm({ ...editalForm, file: e.target.files[0] });
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
        <div className="space-y-4">
          <div>
            <Label htmlFor="edital-name" className="text-[#3A6ABE]">Nome do Edital</Label>
            <Input 
              id="edital-name" 
              placeholder="Ex: Edital de Inovação 2023" 
              value={editalForm.name}
              onChange={(e) => setEditalForm({...editalForm, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="start-date" className="text-[#3A6ABE]">Data de Início</Label>
              <Input 
                id="start-date" 
                type="date" 
                value={editalForm.startDate}
                onChange={(e) => setEditalForm({...editalForm, startDate: e.target.value})}
              />
            </div>
            <div>
              <Label htmlFor="end-date" className="text-[#3A6ABE]">Data de Término</Label>
              <Input 
                id="end-date" 
                type="date" 
                value={editalForm.endDate}
                onChange={(e) => setEditalForm({...editalForm, endDate: e.target.value})}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="edital-file" className="text-[#3A6ABE]">Documento do Edital (PDF)</Label>
            <div className="flex items-center space-x-2">
              <Input 
                id="edital-file" 
                type="file" 
                accept=".pdf"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              {editalForm.file && (
                <span className="text-sm text-[#3A6ABE]/80">{editalForm.file.name}</span>
              )}
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="bg-[#3A6ABE] hover:bg-[#3A6ABE]/90">
              <FiUpload className="mr-2" /> Publicar Edital
            </Button>
          </div>
        </div>
      </Card>

      {/* List of existing editais */}
      <h3 className="text-xl font-semibold text-[#3A6ABE] mb-4">Editais Ativos</h3>
      <div className="space-y-4">
        {[1, 2, 3].map((edital) => (
          <Card key={edital} className="p-4 hover:border-[#3A6ABE]/30 hover:shadow-md transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-semibold text-lg text-[#3A6ABE]">Edital de {['Inovação', 'Tecnologia', 'Sustentabilidade'][edital - 1]} 2023</h4>
                <p className="text-sm text-[#3A6ABE]/80 mt-1">
                  <FiCalendar className="inline mr-1" /> 01/0{edital}/2023 - 30/0{edital}/2023
                </p>
                <p className="text-sm text-[#3A6ABE]/80">
                  <span className="font-medium">Ideias submetidas:</span> {edital * 5}
                </p>
              </div>
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="border-[#3A6ABE] text-[#3A6ABE] hover:bg-[#3A6ABE]/10">
                  Editar
                </Button>
                <Button variant="outline" size="sm" className="border-[#F79B4B] text-[#F79B4B] hover:bg-[#F79B4B]/10">
                  Encerrar
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};