# N3 Platform — Plano de Estudos Laina Santos Almeida

> Plataforma de estudos para certificações de TI · 18 meses · 5h/dia · 8 plataformas · 12 certificações

## 📁 Estrutura de Pastas

```
n3platform/
│
├── index.html              ← Roadmap principal (18 meses, fases, livros, homelab)
├── quiz.html               ← Página de Quiz (escalável para 1000+ questões)
├── README.md
│
├── assets/
│   ├── css/
│   │   ├── main.css        ← Estilos globais (design tokens, hero, fases, nav)
│   │   └── quiz.css        ← Estilos do quiz, filtros, tabs, dots, flashcards
│   │
│   └── js/
│       ├── quiz-engine.js  ← Motor do quiz (render, estado, resultado, API pública)
│       └── quote-engine.js ← Frases motivacionais rotativas
│
├── data/
│   ├── questions.js        ← Banco base de questões (31 questões)
│   └── questions-extra.js  ← Template para adicionar pacotes extras
│
└── components/             ← (futuro) Web components reutilizáveis
```

## 🚀 Deploy no GitHub Pages

### 1. Criar repositório
```bash
git init
git add .
git commit -m "feat: N3 Platform initial release"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/n3platform.git
git push -u origin main
```

### 2. Ativar GitHub Pages
- Vá em **Settings → Pages**
- Source: **Deploy from a branch**
- Branch: `main` / `/ (root)`
- Clique em **Save**

Seu site estará em: `https://SEU_USUARIO.github.io/n3platform/`

### 3. Adicionar imagem hero
Coloque `laina.png` na pasta `assets/` e o hero do roadmap irá carregá-la automaticamente.

---

## ➕ Como adicionar mais questões (escalar para 1000+)

### Opção A — Adicionar no arquivo existente
Abra `data/questions.js` e adicione objetos no array `QUESTIONS_DB`:

```js
// Estrutura de cada questão:
{
  level:  'beginner',           // beginner | intermediate | advanced
  topic:  'Redes',              // tópico livre (aparece nos filtros)
  cert:   ['CCNA', 'Network+'], // certs que a questão cobre
  source: 'Roteamento',         // categoria/fonte (opcional)
  q:      'Texto da pergunta?',
  opts:   ['A', 'B', 'C', 'D'], // sempre 4 opções
  answer: 1,                    // índice da correta (0, 1, 2 ou 3)
  exp:    'Explicação detalhada da resposta correta.'
}
```

### Opção B — Criar pacotes temáticos (recomendado para 100+ questões)

1. Crie `data/questions-ccna.js`:
```js
var QUESTIONS_CCNA = [
  { level: 'intermediate', topic: 'CCNA', ... },
  // ... mais questões
];
addQuestions(QUESTIONS_CCNA);
```

2. Inclua no `quiz.html` **antes** do `quiz-engine.js`:
```html
<script src="data/questions.js"></script>
<script src="data/questions-ccna.js"></script>
<script src="data/questions-linux.js"></script>
<script src="data/questions-azure.js"></script>
<script src="assets/js/quiz-engine.js"></script>
```

O motor carrega tudo automaticamente — os filtros de tópico e cert atualizam sozinhos.

---

## 🎯 Funcionalidades do Quiz

| Feature | Descrição |
|---|---|
| Filtro por nível | Iniciante / Intermediário / Avançado |
| Filtro por tópico | Todos os tópicos dos dados carregados |
| Filtro por certificação | Network+, CCNA, Linux+, AZ-104, etc |
| Busca livre | Filtra por texto na pergunta ou explicação |
| Modo aleatório | Embaralha toda a pool de questões |
| Dots de navegação | Clique em qualquer questão diretamente |
| Feedback explicado | Explicação detalhada após cada resposta |
| Tela de resultado | Placar + barra de progresso por nível |
| Histórico | Últimas 8 sessões salvas no navegador |
| Chips de filtro | Remove filtros ativos com um clique |

---

## 🏗️ Arquitetura técnica

- **Zero dependências externas** — HTML/CSS/JS puro, funciona offline
- **GitHub Pages ready** — sem build step, sem Node.js, sem bundler
- **Escalável** — adicione questões sem tocar no motor
- **API pública do motor:**
  - `setQuizPool(arr)` — filtra externamente e passa nova pool
  - `getCurrentPool()` — retorna pool atual
  - `quizShuffle()` — embaralha
  - `quizSetLevel(level)` — filtra por nível
  - `quizRestart()` / `quizReset()` — reinicia
  - Evento `quizPoolUpdated` — disparado após mudança de pool

---

## 📚 Certificações cobertas

`AZ-900` → `Google IT Support` → `Network+` → `CCNA` → `LPIC-1` → `Linux+` → `MD-102` → `Fortinet NSE 1/2/3` → `AZ-104` → `Google Cybersecurity` → `SC-900` → `Security+`

---

*Feito com 🧡 para Laina Santos Almeida*
