/* ═══════════════════════════════════════════════════════════
   assets/js/quote-engine.js
   Frase motivacional rotativa
═══════════════════════════════════════════════════════════ */

(function () {
  var INTERVAL = 8000; // ms per quote
  var quotes = [
    { text: "A jornada de mil milhas começa com um único passo.", author: "Lao Tzu" },
    { text: "Todo especialista já foi um dia um iniciante.", author: "Helen Hayes" },
    { text: "Não é sobre ter tempo, é sobre fazer tempo.", author: "Desconhecido" },
    { text: "O sucesso é a soma de pequenos esforços repetidos dia após dia.", author: "Robert Collier" },
    { text: "Aprender é a única coisa que a mente nunca se cansa, nunca tem medo e nunca se arrepende.", author: "Leonardo da Vinci" },
    { text: "Cada certificação que você conquista é uma porta que nunca mais pode ser fechada.", author: "Desconhecido" },
    { text: "A tecnologia move o mundo, e você está aprendendo a movê-la.", author: "Para Laina" },
    { text: "Dificuldades preparam pessoas comuns para destinos extraordinários.", author: "C.S. Lewis" },
    { text: "Não espere pela oportunidade perfeita. Pegue a oportunidade e torne-a perfeita.", author: "Desconhecido" },
    { text: "O único jeito de fazer um ótimo trabalho é amar o que você faz.", author: "Steve Jobs" },
    { text: "Sem esforço, sem crescimento. Sem crescimento, sem mudança.", author: "Para Laina" },
    { text: "Cada linha de código que você aprende é um tijolo no seu futuro.", author: "Desconhecido" },
    { text: "A consistência bate o talento quando o talento não é consistente.", author: "Desconhecido" },
    { text: "Você não precisa ser ótima para começar, mas precisa começar para ser ótima.", author: "Zig Ziglar" },
    { text: "O cérebro que aprende todos os dias é o cérebro que conquista.", author: "Para Laina" },
    { text: "Invista em conhecimento. Ele paga os melhores juros.", author: "Benjamin Franklin" },
    { text: "Uma hora de estudo por dia ao longo de anos pode mudar toda uma carreira.", author: "Desconhecido" },
    { text: "ALL SYSTEMS OPERATIONAL — incluindo você.", author: "Para Laina ♥" },
  ];

  var current = 0;
  var timer = null;
  var progressTimer = null;
  var track = document.getElementById('quoteTrack');
  var dotsEl = document.getElementById('quoteDots');
  var progressEl = document.getElementById('quoteProgress');

  // Build slides
  quotes.forEach(function (q, i) {
    var slide = document.createElement('div');
    slide.className = 'quote-slide' + (i === 0 ? ' active' : '');
    slide.id = 'qs-' + i;
    slide.innerHTML =
      '<span class="quote-text">“' + q.text + '”</span>' +
      '<span class="quote-author">— ' + q.author + '</span>';
    track.insertBefore(slide, progressEl);

    // dot
    var dot = document.createElement('button');
    dot.className = 'qdot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Frase ' + (i + 1));
    dot.addEventListener('click', function () { goTo(i); });
    dotsEl.appendChild(dot);
  });

  function goTo(n) {
    var slides = track.querySelectorAll('.quote-slide');
    var dots   = dotsEl.querySelectorAll('.qdot');

    // exit current
    slides[current].classList.remove('active');
    slides[current].classList.add('exit');
    dots[current].classList.remove('active');

    // small delay then remove exit class
    (function(idx){ setTimeout(function(){ slides[idx].classList.remove('exit'); }, 700); })(current);

    current = (n + quotes.length) % quotes.length;

    slides[current].classList.add('active');
    dots[current].classList.add('active');

    // progress bar
    clearTimeout(progressTimer);
    progressEl.style.transition = 'none';
    progressEl.style.width = '0%';
    requestAnimationFrame(function () {
      requestAnimationFrame(function () {
        progressEl.style.transition = 'width ' + INTERVAL + 'ms linear';
        progressEl.style.width = '100%';
      });
    });

    // reset auto-advance
    clearTimeout(timer);
    timer = setTimeout(function () { goTo(current + 1); }, INTERVAL);
  }

  // kick off
  goTo(0);
})();
