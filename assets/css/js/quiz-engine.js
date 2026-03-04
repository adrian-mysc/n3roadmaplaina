/* ═══════════════════════════════════════════════════════════
   assets/js/quiz-engine.js
   Motor do quiz: estado, render, navegação, dots, resultado
   Depende de: data/questions.js  (QUESTIONS_DB, QBank)
   Escalonável: adicione questões via data/questions-TEMA.js
═══════════════════════════════════════════════════════════ */

(function () {

  /* ── ALL QUESTIONS (from data/questions.js) ─── */
  var ALL = typeof QUESTIONS_DB !== 'undefined' ? QUESTIONS_DB : [];

  /* ── STATE ──────────────────────────────────── */
  var current  = 0;
  var answered = {};
  var score    = 0;
  var activeLevel = 'all';
  var pool     = [];

  /* ── DOM refs ───────────────────────────────── */
  var bodyEl    = document.getElementById('quizBody');
  var metaEl    = document.getElementById('quizMeta');
  var fillEl    = document.getElementById('quizProgressFill');
  var dotsRowEl = document.getElementById('quizDotsRow');

  /* ── POOL MANAGEMENT ────────────────────────── */
  function buildPool() {
    pool = ALL.filter(function(q) {
      return activeLevel === 'all' || q.level === activeLevel;
    });
    answered = {};
    current  = 0;
    score    = 0;
    dispatchPoolUpdate();
  }

  function dispatchPoolUpdate() {
    window.dispatchEvent(new Event('quizPoolUpdated'));
    var subEl = document.getElementById('quizBoxSub');
    if (subEl) subEl.textContent = '// ' + pool.length + ' questões · ' + activeLevel;
  }

  /* Public: called by page controller filters */
  window.setQuizPool = function(filteredArr) {
    ALL      = filteredArr;
    answered = {};
    current  = 0;
    score    = 0;
    pool     = filteredArr.slice();
    dispatchPoolUpdate();
    render();
  };

  window.getCurrentPool = function() { return pool; };

  /* ── SHUFFLE ────────────────────────────────── */
  function shuffle(arr) {
    var a = arr.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  }

  /* ── HELPERS ────────────────────────────────── */
  function levelColor(l) {
    return l === 'beginner' ? 'var(--c1)' : l === 'intermediate' ? 'var(--c2)' : 'var(--c5)';
  }
  function levelLabel(l) {
    return l === 'beginner' ? 'Iniciante' : l === 'intermediate' ? 'Intermediário' : l === 'advanced' ? 'Avançado' : 'Todas';
  }
  function countCorrect() {
    var c = 0;
    Object.keys(answered).forEach(function(k) {
      if (answered[k] === pool[k].answer) c++;
    });
    return c;
  }
  function countAnswered() { return Object.keys(answered).length; }

  /* ── DOTS ROW ───────────────────────────────── */
  function renderDots() {
    if (!dotsRowEl) return;
    dotsRowEl.innerHTML = '';
    pool.forEach(function(q, i) {
      var btn = document.createElement('button');
      btn.className = 'qnav-dot';
      btn.textContent = i + 1;
      btn.title = q.topic + ' · ' + levelLabel(q.level);
      if (i === current) btn.classList.add('current');
      if (answered[i] !== undefined) {
        btn.classList.add(answered[i] === q.answer ? 'answered-ok' : 'answered-bad');
      }
      btn.addEventListener('click', (function(n){ return function(){ current = n; render(); }; })(i));
      dotsRowEl.appendChild(btn);
    });
  }

  /* ── RENDER QUESTION ────────────────────────── */
  function render() {
    renderDots();
    if (!bodyEl) return;
    if (!pool.length) { renderEmpty(); return; }
    if (current >= pool.length) { renderResult(); return; }

    var q          = pool[current];
    var wasAnswered = answered[current] !== undefined;
    var chosen     = answered[current];
    var total      = pool.length;
    var col        = levelColor(q.level);
    var isLast     = current === pool.length - 1;

    var optsHtml = q.opts.map(function(opt, i) {
      var cls = 'quiz-opt';
      if (wasAnswered) {
        if (i === q.answer)                      cls += ' correct';
        else if (i === chosen && i !== q.answer) cls += ' wrong';
        cls += ' revealed';
      }
      return '<button class="' + cls + '" onclick="quizAnswer(' + i + ')">' +
        '<span class="quiz-opt-key">' + ['A','B','C','D'][i] + '</span>' +
        '<span>' + opt + '</span>' +
      '</button>';
    }).join('');

    var feedbackHtml = '';
    if (wasAnswered) {
      var ok = chosen === q.answer;
      feedbackHtml = '<div class="quiz-feedback show ' + (ok ? 'ok' : 'bad') + '">' +
        (ok ? '✓ Correto! ' : '✗ Incorreto. ') + q.exp + '</div>';
    }

    bodyEl.innerHTML =
      '<div style="display:flex;align-items:center;gap:10px;margin-bottom:6px;">' +
        '<span class="quiz-diff-badge" style="color:' + col + ';border-color:' + col + '">' +
          '<span style="width:5px;height:5px;border-radius:50%;background:' + col + ';display:inline-block"></span>' +
          levelLabel(q.level) +
        '</span>' +
        '<span class="quiz-topic">// ' + q.topic + (q.cert ? ' · ' + (q.cert[0]||'') : '') + '</span>' +
      '</div>' +
      '<span class="quiz-q-num">QUESTÃO ' + (current + 1) + ' DE ' + total + '</span>' +
      '<div class="quiz-q">' + q.q + '</div>' +
      '<div class="quiz-options">' + optsHtml + '</div>' +
      feedbackHtml +
      '<div class="quiz-nav">' +
        '<button class="quiz-btn" onclick="quizStep(-1)"' + (current === 0 ? ' disabled' : '') + '>' +
          '← Anterior</button>' +
        '<span class="quiz-score">' + countCorrect() + ' / ' + countAnswered() + ' corretas</span>' +
        '<button class="quiz-btn' + (isLast && wasAnswered ? ' primary' : '') + '" onclick="quizStep(1)">' +
          (isLast ? 'Ver resultado →' : 'Próxima →') +
        '</button>' +
      '</div>';

    fillEl.style.width = ((current / total) * 100) + '%';
    metaEl.textContent = countCorrect() + ' / ' + countAnswered() + ' corretas';
  }

  /* ── EMPTY STATE ────────────────────────────── */
  function renderEmpty() {
    bodyEl.innerHTML =
      '<div style="text-align:center;padding:48px 20px;color:var(--muted)">' +
        '<div style="font-size:2.5rem;margin-bottom:14px">🔍</div>' +
        '<div style="font-family:'DM Mono',monospace;font-size:.8rem;margin-bottom:8px">Nenhuma questão encontrada</div>' +
        '<div style="font-size:.75rem">Tente remover alguns filtros</div>' +
      '</div>';
    fillEl.style.width = '0%';
    metaEl.textContent = '0 / 0 corretas';
  }

  /* ── RESULT SCREEN ──────────────────────────── */
  function renderResult() {
    var total   = pool.length;
    var correct = countCorrect();
    var pct     = Math.round((correct / total) * 100);
    var emoji   = pct >= 80 ? '🎉' : pct >= 60 ? '💪' : '📚';
    var msg     = pct >= 80 ? 'Excelente! Você está pronta para avançar.'
                : pct >= 60 ? 'Bom progresso! Revise os tópicos que errou.'
                : 'Continue estudando — cada erro é um aprendizado!';

    var levels = ['beginner','intermediate','advanced'];
    var breakdown = levels.map(function(l) {
      var idxs = [];
      pool.forEach(function(q,i){ if(q.level===l) idxs.push(i); });
      if (!idxs.length) return '';
      var cor  = idxs.filter(function(i){ return answered[i]===pool[i].answer; }).length;
      var col  = levelColor(l);
      var pctL = Math.round((cor / idxs.length) * 100);
      return '<div style="display:flex;align-items:center;gap:10px;margin-bottom:8px">' +
        '<span style="font-family:'DM Mono',monospace;font-size:.62rem;color:' + col + ';width:92px;flex-shrink:0">' + levelLabel(l) + '</span>' +
        '<div style="flex:1;height:4px;background:var(--border);border-radius:2px;overflow:hidden">' +
          '<div style="height:4px;background:' + col + ';width:' + pctL + '%"></div>' +
        '</div>' +
        '<span style="font-family:'DM Mono',monospace;font-size:.6rem;color:var(--muted);width:42px;text-align:right">' + cor + '/' + idxs.length + '</span>' +
      '</div>';
    }).join('');

    bodyEl.innerHTML =
      '<div style="text-align:center;padding:32px 20px 24px">' +
        '<div style="font-size:2.8rem;margin-bottom:12px">' + emoji + '</div>' +
        '<div style="font-size:1.6rem;font-weight:800;margin-bottom:6px">' + correct + ' / ' + total + ' corretas</div>' +
        '<div style="font-family:'DM Mono',monospace;font-size:.72rem;color:var(--muted);margin-bottom:28px">' + msg + '</div>' +
      '</div>' +
      '<div style="padding:0 20px 20px">' +
        '<div style="font-family:'DM Mono',monospace;font-size:.6rem;text-transform:uppercase;letter-spacing:2px;color:var(--muted);margin-bottom:12px">// resultado por nível</div>' +
        breakdown +
      '</div>' +
      '<div style="padding:0 20px 28px;display:flex;gap:10px;flex-wrap:wrap">' +
        '<button class="quiz-btn primary" onclick="quizRestart()">↺ Refazer</button>' +
        '<button class="quiz-btn" onclick="quizSetLevel('beginner')">Só iniciante</button>' +
        '<button class="quiz-btn" onclick="quizSetLevel('intermediate')">Só intermediário</button>' +
        '<button class="quiz-btn" onclick="quizSetLevel('advanced')">Só avançado</button>' +
      '</div>';

    fillEl.style.width = '100%';
    metaEl.textContent = correct + ' / ' + total + ' corretas';
    renderDots();

    /* save to history */
    if (typeof recordResult === 'function') {
      recordResult(correct, total, activeLevel);
    }
  }

  /* ── PUBLIC API ─────────────────────────────── */
  window.quizAnswer = function(i) {
    if (answered[current] !== undefined) return;
    answered[current] = i;
    render();
  };

  window.quizStep = function(dir) {
    var next = current + dir;
    if (next < 0) return;
    if (next > pool.length) return;
    current = next;
    render();
  };

  window.quizRestart = function() {
    buildPool();
    render();
  };

  window.quizReset = window.quizRestart;

  window.quizSetLevel = function(level) {
    activeLevel = level;
    document.querySelectorAll('.qtab').forEach(function(t) {
      t.classList.toggle('qtab-active', t.dataset.level === level);
    });
    buildPool();
    render();
  };

  window.quizShuffle = function() {
    pool     = shuffle(ALL);
    answered = {};
    current  = 0;
    score    = 0;
    dispatchPoolUpdate();
    render();
  };

  /* ── INIT ───────────────────────────────────── */
  buildPool();
  render();

})();
