# N3 Platform — Plano de Estudos Laina Santos Almeida

> Plataforma de estudos para certificações de TI · 18 meses · 5h/dia · 8 plataformas · 12 certificações

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
