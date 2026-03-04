/* ═══════════════════════════════════════════════════════════
   data/questions-extra.js
   Pacote de questões extra — exemplo de escalonamento
   
   COMO USAR:
   1. Crie um arquivo como este com mais questões
   2. Adicione <script src="data/questions-extra.js"></script>
      no quiz.html, ANTES de quiz-engine.js
   3. O motor carrega tudo automaticamente via QUESTIONS_DB
   
   ESTRUTURA DE CADA QUESTÃO:
   {
     level:  'beginner' | 'intermediate' | 'advanced',
     topic:  'string (tópico livre)',
     cert:   ['CCNA', 'Network+', ...],   // array de strings
     source: 'string (fonte/categoria)',   // opcional
     q:      'Texto da pergunta?',
     opts:   ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
     answer: 0,  // índice da opção correta (0-3)
     exp:    'Explicação detalhada da resposta correta.'
   }
═══════════════════════════════════════════════════════════ */

/* Descomente e adicione ao quiz.html para ativar este pacote:
   <script src="data/questions-extra.js"></script>
*/

/*
var QUESTIONS_EXTRA = [
  {
    level: 'beginner', topic: 'Redes', cert: ['Network+'],
    q: 'Qual dispositivo opera na Camada 2 do modelo OSI?',
    opts: ['Roteador', 'Switch', 'Hub', 'Firewall'],
    answer: 1,
    exp: 'Switches operam na Camada 2 (Enlace) usando endereços MAC para encaminhar quadros dentro de uma rede local. Roteadores operam na Camada 3. Hubs são dispositivos Camada 1 (física) — apenas repetem sinais.'
  },
  {
    level: 'intermediate', topic: 'Linux', cert: ['Linux+', 'LPIC-1'],
    q: 'Como agendar um comando para rodar todo dia às 3h via cron?',
    opts: ['* 3 * * * comando', '0 3 * * * comando', '3 * * * * comando', '0 0 3 * * comando'],
    answer: 1,
    exp: 'Formato cron: minuto hora dia-do-mês mês dia-da-semana. "0 3 * * *" = minuto 0, hora 3, todo dia. Lembre: "* 3 * * *" rodaria a cada minuto durante toda a hora 3 (60 execuções).'
  },
  {
    level: 'advanced', topic: 'Cloud / Azure', cert: ['AZ-104', 'AZ-500'],
    q: 'O que é um Service Principal no Azure?',
    opts: [
      'Conta de usuário com privilégios de administrador global',
      'Identidade de aplicação usada para autenticação não-interativa com recursos Azure',
      'Tipo especial de grupo no Microsoft Entra ID',
      'Certificado SSL emitido pelo Azure para serviços internos'
    ],
    answer: 1,
    exp: 'Service Principal é uma identidade de aplicação no Entra ID — análogo a uma "conta de serviço" para apps. Usado para CI/CD, automação e integrações sem login humano. Assign RBAC roles ao Service Principal em vez de usar credenciais de usuário.'
  },
];

addQuestions(QUESTIONS_EXTRA);
*/
