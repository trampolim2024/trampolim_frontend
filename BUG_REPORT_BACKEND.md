# 🐛 BUG REPORT - Backend: Projeto não é recuperado após submissão

## 📋 Resumo do Problema

Após um usuário submeter um projeto com sucesso via `POST /api/v1/trampolim/projects` (retorna 201), quando o frontend tenta recuperar esse projeto usando `GET /api/v1/trampolim/projects/my/{editalId}`, o backend retorna **404 Not Found**.

**Esperado:** O projeto deveria estar salvo e ser recuperável via GET.
**Atual:** GET retorna 404, como se o projeto não existisse.

---

## 🔍 Detalhes Técnicos

### Fluxo que está falhando:

1. **POST Sucesso** ✅
   ```
   POST http://localhost:7070/api/v1/trampolim/projects
   Status: 201
   Response Body: { project: { _id, nomeProjeto, ... }, ... }
   ```

2. **GET Falha** ❌
   ```
   GET http://localhost:7070/api/v1/trampolim/projects/my/{editalId}
   Headers: Authorization: Bearer {token}
   Status: 404 ← 🐛 ERRO! Deveria ser 200
   ```

### Informações da Requisição GET:

- **URL:** `http://localhost:7070/api/v1/trampolim/projects/my/68f14a8eae653699091b7511`
- **Método:** GET
- **Headers:**
  - `Authorization: Bearer {valido}`
  - `Content-Type: application/json`
- **Usuário:** Autenticado (token é válido, confirmado por múltiplas requisições)
- **Edital ID:** `68f14a8eae653699091b7511` (ativo e vigente)

### Logs do Frontend:

```
📤 [handleSubmit] POST Response status: 201
📤 [handleSubmit] POST Response body: { project: {...}, ... }
✅ Projeto submetido com sucesso!
💾 Projeto armazenado no localStorage

[Recarregar página...]

🔵 [Effect 2] Token: EXISTE
🔵 [Effect 2] Edital ID: 68f14a8eae653699091b7511
🔵 [Effect 2] Fazendo GET em: http://localhost:7070/api/v1/trampolim/projects/my/68f14a8eae653699091b7511
🔵 [Effect 2] Response status: 404 ← 🐛 ERRO AQUI
```

---

## 🔧 O que Verificar no Backend

### 1. **Rota GET `/api/v1/trampolim/projects/my/{editalId}`**
   - [ ] Verificar se está usando o `userId` correto (do token JWT)
   - [ ] Verificar se está filtrando por `edital === {editalId}`
   - [ ] Verificar se está filtrando por `createdBy === {userId}`
   - [ ] Verificar a query no MongoDB (usar `.explain()` para analisar)

### 2. **Modelo Project/Schema**
   - [ ] Campo `edital` está sendo populado corretamente após POST?
   - [ ] Campo `createdBy` está sendo definido corretamente?
   - [ ] Verificar tipos de dados (string vs ObjectId)
   - [ ] Verificar se há indices criados para essas queries

### 3. **Middleware de Autenticação**
   - [ ] O `req.user` está sendo populado corretamente no middleware JWT?
   - [ ] O `userId` no token está correto?

### 4. **Possíveis Causas:**
   - ❓ Query retorna resultado mas middleware filtra errado?
   - ❓ Campo `edital` não está sendo salvo corretamente?
   - ❓ Problema de ObjectId vs String na comparação?
   - ❓ Usuário não tem permissão (401/403) mas está retornando 404?

---

## 📝 Solução Esperada

O endpoint `GET /api/v1/trampolim/projects/my/{editalId}` deve:

```javascript
// Pseudocódigo
GET /api/v1/trampolim/projects/my/{editalId}

1. Validar token JWT (extrair userId)
2. Validar que editalId é um ObjectId válido
3. Query:
   db.projects.findOne({
     createdBy: userId,
     edital: editalId
   })
4. Se encontrar → 200 + { project: {...} }
5. Se NÃO encontrar → 404
6. Se não autenticado → 401
7. Se sem permissão → 403
```

---

## ✅ Verificação Após Correção

Após corrigir, testar:

```bash
# 1. Submeter projeto
POST http://localhost:7070/api/v1/trampolim/projects
Response: 201 { project: { _id: "abc123", edital: "68f14a8e...", ... } }

# 2. Recuperar imediatamente (sem recarregar página)
GET http://localhost:7070/api/v1/trampolim/projects/my/68f14a8eae653699091b7511
Response: 200 { project: { _id: "abc123", ... } } ✅

# 3. Recarregar página e tentar novamente
GET http://localhost:7070/api/v1/trampolim/projects/my/68f14a8eae653699091b7511
Response: 200 { project: { _id: "abc123", ... } } ✅
```

---

## 🛠️ Workaround Temporário (Frontend)

Enquanto o bug não é corrigido, o frontend está armazenando o projeto localmente após submissão:

```javascript
// Após POST bem-sucedido (201)
localStorage.setItem(
  `trampolim_project_${editalId}`,
  JSON.stringify(submittedProject)
);

// Ao carregar página, se GET retorna 404, tenta recuperar do localStorage
const storedProject = localStorage.getItem(`trampolim_project_${editalId}`);
if (storedProject) {
  // Mostra projeto armazenado localmente
  setUserProject(JSON.parse(storedProject));
}
```

⚠️ **Isso é apenas um workaround temporário.** A raiz do problema está no backend e deve ser corrigida.

---

## 📞 Contexto Adicional

- **Timestamp do bug:** 2025-10-17 09:36:00 (aproximado)
- **Ambiente:** Desenvolvimento (localhost:7070)
- **Frequência:** 100% reproduzível
- **Impacto:** Alta - Usuários que recarregam página veem form de submissão novamente, em vez do projeto enviado

---

## ❓ Perguntas para o Backend

1. O endpoint GET `/api/v1/trampolim/projects/my/{editalId}` faz população (populate) de campos relacionados?
2. Há validações adicionais que podem estar rejeitando a query?
3. O ObjectId do edital está sendo comparado corretamente com string/ObjectId?
4. Há algum middleware que remove projetos após certo tempo ou status?
5. O campo `edital` está sendo persistido na collection depois do POST?

---

## 🎯 Conclusão

**Requisição:** Revisar e corrigir a rota `GET /api/v1/trampolim/projects/my/{editalId}` para que retorne corretamente os projetos já submetidos pelo usuário autenticado para um determinado edital.

Obrigado! 🙏
