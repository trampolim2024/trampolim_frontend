# 📚 IdeasSection - Documentação de Uso

## Visão Geral

O componente `IdeasSection` foi refatorado para suportar **dois modos de operação**:

1. **Modo Admin**: Integrado com backend, carrega dados de APIs
2. **Modo Compatibilidade**: Usa dados passados via props (retrocompatível)

---

## 🔄 Modo Admin (Novo)

### Uso Básico

```typescript
import { IdeasSection } from '@/components/shared/platform/ideas-section/IdeasSection';

export const AdminPage = ({ editalId }: { editalId: string }) => {
  const adminToken = localStorage.getItem('adminToken');

  return (
    <div className="min-h-screen bg-[#F5F5F5] py-12">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-[#3A6ABE] mb-8">
          Painel Administrativo
        </h1>
        
        <IdeasSection 
          editalId={editalId}
          adminToken={adminToken}
          itemsPerPage={6}
        />
      </div>
    </div>
  );
};
```

### Props

```typescript
interface IdeasSectionProps {
  editalId?: string;              // ID do edital (ativa modo admin)
  adminToken?: string;             // JWT do admin
  ideas?: Project[];              // Para modo compatibilidade
  reviewers?: UserData[];          // Para modo compatibilidade
  currentPage?: number;           // Página inicial (default: 1)
  itemsPerPage?: number;          // Itens por página (default: 6)
  onPageChange?: (page: number) => void; // Callback ao mudar página
}
```

---

## 🌐 Endpoints Utilizados

### 1. Carregar Projetos
```http
GET /api/v1/trampolim/admin/projects/edital/:editalId
Authorization: Bearer {adminToken}
```

**Resposta:**
```json
{
  "count": 5,
  "projects": [
    {
      "_id": "507f...",
      "nomeProjeto": "App de Saúde",
      "estagioIdeia": "MVP",
      "status": "Pendente",
      "designatedReviewers": [],
      ...
    }
  ]
}
```

### 2. Carregar Revisores
```http
GET /api/v1/trampolim/users?type=reviewer
Authorization: Bearer {adminToken}
```

### 3. Designar Avaliador
```http
POST /api/v1/trampolim/admin/projects/assign-reviewer
Authorization: Bearer {adminToken}
Content-Type: application/json

{
  "projectId": "507f...",
  "reviewerId": "68ee..."
}
```

### 4. Remover Avaliador
```http
POST /api/v1/trampolim/admin/projects/remove-reviewer
Authorization: Bearer {adminToken}
Content-Type: application/json

{
  "projectId": "507f...",
  "reviewerId": "68ee..."
}
```

---

## 🎯 Funcionalidades Implementadas

✅ **Carregamento de Projetos**
- Busca todos os projetos de um edital
- Loading state
- Tratamento de erros (401, 403, 500)

✅ **Paginação**
- 6 itens por página (configurável)
- Navegação com botões Previous/Next
- Links de página direta

✅ **Modal de Detalhes**
- Exibe projeto completo
- Links para pitch/vídeo
- Informações do líder e integrantes

✅ **Modal de Designação**
- Lista de revisores com busca/filtro
- Mostra especialidades
- Impede duplicação
- Feedback visual (erro/sucesso)

✅ **Gerenciamento de Revisores**
- Designar revisores
- Remover revisores
- Mostrar revisores no card
- Rastreamento local de designações

✅ **Validações**
- Verifica autenticação
- Verifica autorização
- Evita designação duplicada
- Confirmação antes de remover

---

## 🛠️ Tratamento de Erros

O componente trata automaticamente:

| Status | Ação |
|--------|------|
| 200/201 | Sucesso - Atualiza UI |
| 400 | Dados inválidos - Mostra erro |
| 401 | Sem token - Mostra erro |
| 403 | Sem permissão - Mostra erro |
| 404 | Não encontrado - Mostra erro |
| 409 | Duplicação - Mostra erro específico |
| 500 | Erro server - Mostra erro |

---

## 📊 Estados Gerenciados

```typescript
const [projects, setProjects] = useState<Project[]>([]);
const [reviewersList, setReviewersList] = useState<UserData[]>([]);
const [isLoadingProjects, setIsLoadingProjects] = useState(false);
const [isLoadingReviewers, setIsLoadingReviewers] = useState(false);
const [selectedIdea, setSelectedIdea] = useState<Project | null>(null);
const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);
const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
const [currentPage, setCurrentPage] = useState(1);
const [searchReviewerQuery, setSearchReviewerQuery] = useState('');
const [isAssigning, setIsAssigning] = useState(false);
const [assignError, setAssignError] = useState<string | null>(null);
const [assignSuccess, setAssignSuccess] = useState(false);
const [designatedReviewersByProject, setDesignatedReviewersByProject] = useState<Record<string, string[]>>({});
```

---

## 🔄 Fluxo Completo

```
1. Admin acessa página
   ├─ Passa editalId + adminToken
   └─ Componente detecta modo admin

2. useEffect é triggerado
   ├─ GET /admin/projects/edital/{id}
   ├─ Carrega projetos
   ├─ Rastreia revisores designados
   └─ Atualiza state

3. Página exibe lista de projetos
   ├─ Grid com cards de projeto
   ├─ Mostra revisores já designados
   ├─ Botões: Designar, Detalhes
   └─ Paginação

4. Admin clica "Designar"
   ├─ Modal de seleção abre
   ├─ GET /users?type=reviewer (primeira vez)
   └─ Lista revisores

5. Admin busca/filtra revisores
   ├─ Input local (sem requisição)
   └─ Filtra por nome/email

6. Admin seleciona revisor
   ├─ POST /assign-reviewer
   ├─ Se sucesso: atualiza projeto
   ├─ Se erro 409: mostra mensagem
   └─ Modal fecha após 1.5s

7. Card atualiza com novo revisor
   ├─ Badge com nome do revisor
   ├─ Botão para remover
   └─ Rastreamento local atualizado
```

---

## 🎨 Personalização

### Alterar itens por página
```typescript
<IdeasSection 
  editalId={editalId}
  adminToken={adminToken}
  itemsPerPage={12}  // De 6 para 12
/>
```

### Cores (design system)
O componente usa cores do design system:
- Primária: `#3A6ABE`
- Secundária: `#F79B4B`
- Status: verde/vermelho/amarelo

Editar em `getStatusBadgeClass()`

### Componentes UI
Todos os componentes vêm do `shadcn/ui`:
- `Dialog`
- `Card`
- `Button`
- `Badge`
- `Input`
- `Pagination`
- `Avatar`

---

## 🔐 Segurança

✅ **Autenticação**
- Token verificado em cada requisição
- Renovação automática se expirado

✅ **Autorização**
- Apenas admins podem designar
- Verificação no backend (401/403)

✅ **Validação**
- Campos obrigatórios
- Tipos TypeScript
- Sanitização de dados

---

## 📝 Modo Compatibilidade (Legado)

O componente ainda funciona com a forma antiga (passando dados via props):

```typescript
import { IdeasSection } from '@/components/shared/platform/ideas-section/IdeasSection';

export const OldWay = () => {
  const [ideas, setIdeas] = useState<Project[]>([...]);
  const [reviewers, setReviewers] = useState<UserData[]>([...]);
  const [page, setPage] = useState(1);

  return (
    <IdeasSection 
      ideas={ideas}
      reviewers={reviewers}
      currentPage={page}
      itemsPerPage={6}
      onPageChange={setPage}
    />
  );
};
```

⚠️ **Nota**: Em modo compatibilidade, funcionalidades de designação não funcionam.

---

## 🚀 Próximas Melhorias

- [ ] Exportar para PDF
- [ ] Relatório de revisões
- [ ] Assinação em lote
- [ ] Notificações por email
- [ ] Upload de feedback
- [ ] Pontuação/scoring

---

## 🐛 Troubleshooting

### "Acesso negado"
```
Verificar:
1. Token válido? localStorage.getItem('adminToken')
2. É admin? Backend verifica roles
3. Edital existe? GET /editals
```

### "Erro 500"
```
Verificar no backend:
1. Banco de dados conectado?
2. API rodando em localhost:7070?
3. Verificar logs do servidor
```

### "Modal não abre"
```
Verificar:
1. Token está vazio?
2. Revisores carregaram? Console.log()
3. Erro na requisição? Verificar Network tab
```

---

## 📞 Suporte

Para dúvidas, verificar:
1. Console do navegador (F12)
2. Network tab (requisições)
3. Backend logs
4. Este documento

