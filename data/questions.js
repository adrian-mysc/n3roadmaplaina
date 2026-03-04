/* ═══════════════════════════════════════════════════════════
   data/questions.js
   Banco de questões — escalável para 1000+
   Adicione novos objetos ao array QUESTIONS_DB.
   Campos: level, topic, cert, q, opts (array 4), answer (index 0-3), exp
═══════════════════════════════════════════════════════════ */

/* ─── HELPER: registro de questões ─────────────────────────
   Use addQuestions([...]) para injetar questões de arquivos
   extras (ex: data/questions-ccna.js) sem alterar este arquivo.
─────────────────────────────────────────────────────────── */
var QUESTIONS_DB = [

    /* ───── INICIANTE ───── */
    { level:'beginner', topic:'Redes',
      q:'Qual é a função principal de um roteador?',
      opts:['Conectar dispositivos na mesma rede local','Encaminhar pacotes entre redes diferentes','Converter sinais analógicos em digitais','Atribuir endereços IP automaticamente'],
      answer:1, exp:'Roteadores operam na Camada 3 (Rede) e encaminham pacotes entre redes distintas usando tabelas de roteamento. Switches conectam dispositivos na mesma rede (Camada 2).' },

    { level:'beginner', topic:'Redes',
      q:'O que significa a sigla "DNS"?',
      opts:['Dynamic Network System','Domain Name System','Data Network Service','Distributed Node Server'],
      answer:1, exp:'DNS (Domain Name System) traduz nomes de domínio legíveis (ex: google.com) para endereços IP numéricos. Sem DNS você precisaria memorizar IPs para acessar sites.' },

    { level:'beginner', topic:'Redes',
      q:'Qual protocolo entrega e-mails para um servidor de destino?',
      opts:['IMAP','POP3','SMTP','FTP'],
      answer:2, exp:'SMTP (Simple Mail Transfer Protocol) é usado para enviar e entregar e-mails entre servidores. IMAP e POP3 são usados pelo cliente para receber/ler os e-mails.' },

    { level:'beginner', topic:'Hardware',
      q:'O que é RAM em um computador?',
      opts:['Memória de longa duração que guarda dados mesmo sem energia','Memória volátil de acesso rápido usada durante a execução de programas','Tipo de processador de alto desempenho','Unidade de armazenamento permanente de dados'],
      answer:1, exp:'RAM (Random Access Memory) é memória volátil: armazena dados temporariamente enquanto o computador está ligado. Ao desligar, os dados são perdidos. É muito mais rápida que o disco.' },

    { level:'beginner', topic:'Linux',
      q:'Qual comando lista arquivos e pastas no terminal Linux?',
      opts:['cd','ls','pwd','mkdir'],
      answer:1, exp:'"ls" lista o conteúdo do diretório atual. "cd" muda de diretório, "pwd" mostra o caminho atual e "mkdir" cria um novo diretório.' },

    { level:'beginner', topic:'Linux',
      q:'No Linux, o que faz o comando "chmod 755 arquivo.sh"?',
      opts:['Apaga o arquivo','Copia o arquivo para outro diretório','Define permissões: dono lê/escreve/executa; grupo e outros leem/executam','Cria um link simbólico para o arquivo'],
      answer:2, exp:'chmod 755 = dono (7=rwx), grupo (5=r-x), outros (5=r-x). O dono pode ler, escrever e executar. Grupo e outros podem ler e executar.' },

    { level:'beginner', topic:'Windows',
      q:'Qual ferramenta do Windows exibe logs de eventos do sistema?',
      opts:['Task Manager','Event Viewer','Registry Editor','Device Manager'],
      answer:1, exp:'Event Viewer (Visualizador de Eventos) registra logs de sistema, segurança e aplicação. É a primeira ferramenta a consultar ao investigar falhas no Windows.' },

    { level:'beginner', topic:'Segurança',
      q:'O que é autenticação multifator (MFA)?',
      opts:['Login com usuário e senha muito longa','Uso de dois ou mais fatores de verificação para autenticar um usuário','Criptografia de todos os arquivos do sistema','Bloqueio automático após 3 tentativas de login'],
      answer:1, exp:'MFA combina algo que você sabe (senha), algo que você tem (token/celular) e/ou algo que você é (biometria). Mesmo com a senha roubada, o atacante não consegue acessar sem o segundo fator.' },

    { level:'beginner', topic:'Redes',
      q:'Qual é o endereço IP reservado para loopback (teste local) em IPv4?',
      opts:['192.168.0.1','10.0.0.1','127.0.0.1','172.16.0.1'],
      answer:2, exp:'127.0.0.1 é o endereço de loopback — pacotes enviados a ele voltam ao próprio host sem sair pela rede. Usado para testar a pilha TCP/IP local (ping 127.0.0.1).' },

    { level:'beginner', topic:'Cloud',
      q:'O que é IaaS (Infrastructure as a Service)?',
      opts:['Software disponível via navegador sem instalação','Infraestrutura de TI (servidores, storage, rede) alugada pela internet','Plataforma para desenvolver aplicações na nuvem','Serviço de backup automatizado na nuvem'],
      answer:1, exp:'IaaS fornece recursos de infraestrutura virtualizados (VMs, discos, redes) sob demanda. O cliente gerencia o SO e aplicações. Exemplos: Azure VMs, AWS EC2, Google Compute Engine.' },

    /* ───── INTERMEDIÁRIO ───── */
    { level:'intermediate', topic:'Redes',
      q:'Você tem 192.168.1.0/24 e precisa criar 6 sub-redes com pelo menos 25 hosts cada. Qual máscara usar?',
      opts:['/25 (126 hosts)','/26 (62 hosts)','/27 (30 hosts)','/28 (14 hosts)'],
      answer:2, exp:'/27 = blocos de 32, com 30 hosts utilizáveis (32−2). Cria 8 sub-redes em um /24, atendendo aos 6 necessários com 30+ hosts cada. /28 teria apenas 14 hosts — insuficiente.' },

    { level:'intermediate', topic:'Redes',
      q:'Qual protocolo de roteamento usa o algoritmo de Dijkstra (shortest path first)?',
      opts:['RIP','BGP','OSPF','EIGRP'],
      answer:2, exp:'OSPF (Open Shortest Path First) usa o algoritmo SPF de Dijkstra para calcular o menor caminho. É um protocolo de estado de enlace (link-state), ao contrário do RIP que é vetor de distância.' },

    { level:'intermediate', topic:'Linux',
      q:'Qual comando exibe as conexões TCP ativas e as portas em escuta no Linux?',
      opts:['ifconfig -a','ss -tuln','route -n','ip addr show'],
      answer:1, exp:'"ss -tuln" mostra sockets TCP/UDP em escuta (listening) sem resolver nomes. É o substituto moderno do netstat. "-t" TCP, "-u" UDP, "-l" listening, "-n" numérico.' },

    { level:'intermediate', topic:'Linux',
      q:'Um processo Linux está consumindo 100% de CPU. Como identificar e encerrar corretamente?',
      opts:['Reiniciar o servidor imediatamente','Usar "top" para identificar o PID, depois "kill -15 PID" para encerramento gracioso','Executar "rm -rf /proc/PID"','Usar "service stop all"'],
      answer:1, exp:'"kill -15" (SIGTERM) pede ao processo que encerre graciosamente, salvando dados. Só use "kill -9" (SIGKILL) se o processo não responder ao SIGTERM. Nunca delete arquivos em /proc.' },

    { level:'intermediate', topic:'Windows',
      q:'Qual é a diferença entre "permissions" NTFS e "share permissions" no Windows?',
      opts:['São idênticas; o Windows aplica apenas uma','NTFS aplica-se a acesso local e remoto; Share aplica-se apenas ao acesso via rede','Share aplica-se a acesso local; NTFS apenas ao acesso remoto','NTFS é usada apenas para arquivos; Share apenas para pastas'],
      answer:1, exp:'Permissões NTFS valem para qualquer acesso (local ou remoto). Share Permissions valem apenas para conexões de rede via SMB. Quando ambas existem, aplica-se a mais restritiva.' },

    { level:'intermediate', topic:'Active Directory',
      q:'Um usuário não consegue fazer login. O gpresult /r indica que uma GPO bloqueando o login foi aplicada. Como resolver?',
      opts:['Reinstalar o Windows do usuário','Identificar a GPO no GPMC, verificar a vinculação e filtros de segurança, depois remover ou ajustar','Deletar o perfil do usuário no servidor','Formatar e reingressar a máquina no domínio'],
      answer:1, exp:'gpresult /r mostra as GPOs aplicadas. No GPMC (Group Policy Management Console) localize a GPO, verifique onde está vinculada e quem ela afeta via Security Filtering. Ajuste sem deletar outras configurações.' },

    { level:'intermediate', topic:'Cloud',
      q:'No Azure, qual serviço gerencia identidade e controla quem pode acessar recursos?',
      opts:['Azure Monitor','Microsoft Entra ID (Azure AD)','Azure Key Vault','Azure Policy'],
      answer:1, exp:'Microsoft Entra ID (anteriormente Azure Active Directory) é o serviço de identidade do Azure. Gerencia usuários, grupos, MFA, Conditional Access e SSO. Key Vault armazena segredos e certificados.' },

    { level:'intermediate', topic:'Segurança',
      q:'O que é um ataque de "Man-in-the-Middle" (MitM)?',
      opts:['Ataque que sobrecarrega um servidor com requisições','Interceptação secreta da comunicação entre dois sistemas sem o conhecimento deles','Tentativa de adivinhar senhas por força bruta','Injeção de código malicioso em um banco de dados'],
      answer:1, exp:'Em MitM o atacante se posiciona entre cliente e servidor, podendo interceptar, ler e modificar o tráfego. TLS/HTTPS, certificados válidos e VPNs são proteções contra este tipo de ataque.' },

    { level:'intermediate', topic:'Automação',
      q:'Qual é a saída do comando Bash: echo $((2**8))?',
      opts:['16','128','256','512'],
      answer:2, exp:'$(( )) é expansão aritmética no Bash. 2**8 = 2 elevado à 8ª potência = 256. Muito útil para cálculos de subnetting: 2^8 = 256 endereços em um /24.' },

    { level:'intermediate', topic:'Redes',
      q:'Qual porta TCP é usada pelo protocolo HTTPS?',
      opts:['80','443','8080','22'],
      answer:1, exp:'HTTPS usa a porta 443/TCP por padrão. HTTP usa 80/TCP. SSH usa 22/TCP. A porta 8080 é usada como alternativa HTTP em ambientes de desenvolvimento ou proxies.' },

    /* ───── AVANÇADO ───── */
    { level:'advanced', topic:'Redes',
      q:'Um roteador OSPF está com vizinhança presa em estado "EXSTART/EXCHANGE". Qual é a causa mais provável?',
      opts:['MTU incompatível entre as interfaces dos dois roteadores','Senha OSPF incorreta','AS number diferente entre os roteadores','Endereço IP duplicado na rede'],
      answer:0, exp:'MTU incompatível é a causa clássica de OSPF travado em EXSTART/EXCHANGE. Os DBD packets são fragmentados e descartados. Solução: alinhar o MTU nas interfaces ou usar "ip ospf mtu-ignore". Senha incorreta manteria o estado em INIT/2WAY.' },

    { level:'advanced', topic:'Linux',
      q:'Você precisa depurar chamadas de sistema de um processo em execução sem reiniciá-lo. Qual ferramenta usar?',
      opts:['journalctl','strace -p PID','lsof -p PID','dmesg | grep PID'],
      answer:1, exp:'"strace -p PID" anexa ao processo em execução e exibe todas as syscalls em tempo real. "lsof -p PID" lista arquivos abertos (útil, mas não mostra syscalls). "dmesg" mostra mensagens do kernel, não de processos.' },

    { level:'advanced', topic:'Active Directory',
      q:'Qual ataque explora o protocolo Kerberos para obter hashes de senhas de contas de serviço no Active Directory?',
      opts:['Pass-the-Hash','Kerberoasting','Golden Ticket','DCSync'],
      answer:1, exp:'Kerberoasting solicita tickets de serviço (TGS) para SPNs registrados no AD e tenta quebrar o hash offline. Mitigação: usar senhas longas e aleatórias em contas de serviço, Group Managed Service Accounts (gMSA) e AES em vez de RC4.' },

    { level:'advanced', topic:'Cloud',
      q:'No Azure, você precisa garantir que nenhum recurso em uma subscription possa ser deletado acidentalmente. Qual mecanismo usar?',
      opts:['Azure Policy com efeito "deny"','Resource Lock do tipo "CanNotDelete"','RBAC com role "Reader" para todos','Azure Blueprint com modo locked'],
      answer:1, exp:'"CanNotDelete" Lock impede deleção mesmo para Owners e Admins (exceto quem remove o lock). Azure Policy controla criação/configuração mas não impede deleção de recursos existentes. RBAC Reader remove permissão de deleção mas pode ser sobrescrito.' },

    { level:'advanced', topic:'Segurança',
      q:'Qual técnica de persistência envolve modificar um Golden Ticket no Active Directory?',
      opts:['Criar um usuário local oculto','Forjar um TGT usando o hash KRBTGT para acesso irrestrito ao domínio','Instalar um rootkit no MBR','Criar uma scheduled task no Domain Controller'],
      answer:1, exp:'Golden Ticket forja um TGT (Ticket Granting Ticket) usando o hash NTLM da conta KRBTGT. O atacante obtém acesso a qualquer recurso do domínio por até 10 anos. Mitigação: resetar o KRBTGT duas vezes e monitorar eventos 4769/4771.' },

    { level:'advanced', topic:'Automação',
      q:'Você tem 500 servidores Linux e precisa aplicar uma configuração em todos de forma idempotente. Qual abordagem é mais adequada?',
      opts:['Script Bash com SSH em loop for','Ansible playbook com módulos idempotentes','Copiar o arquivo manualmente em cada servidor','Criar uma GPO no Active Directory'],
      answer:1, exp:'Ansible é idempotente por design: executar o playbook múltiplas vezes produz o mesmo estado final sem efeitos colaterais. Bash em loop não garante idempotência. GPO é específico para ambientes Windows.' },

    { level:'advanced', topic:'Redes',
      q:'Qual é o propósito do BGP "route reflector" em grandes redes?',
      opts:['Criptografar rotas BGP entre ASes','Eliminar a necessidade de full-mesh iBGP entre todos os roteadores internos','Converter rotas eBGP para iBGP automaticamente','Balancear carga entre múltiplos ISPs'],
      answer:1, exp:'Em iBGP todos os roteadores precisariam de sessão com todos (full-mesh: n*(n-1)/2 sessões). O Route Reflector recebe rotas e reflete aos clientes, eliminando o full-mesh. Fundamental em redes de grande porte e em provedores.' },

    { level:'advanced', topic:'Linux',
      q:'O que é um "zombie process" no Linux e como limpá-lo?',
      opts:['Processo que consome 100% de CPU; encerrado com kill -9','Processo que terminou mas o pai não coletou seu exit status; limpo quando o processo pai termina ou é encerrado','Processo rodando em background sem terminal; encerrado com bg/fg','Processo com privilégios de root escondido; removido com rkhunter'],
      answer:1, exp:'Zombie (estado Z) ocorre quando um processo filho termina mas o pai não fez wait() para coletar o exit code. O processo já não consome CPU/memória, apenas uma entrada na tabela de processos. Encerrar o pai (ou enviar SIGCHLD) limpa os zombies.' },

    { level:'advanced', topic:'Cloud',
      q:'Qual é a diferença entre Azure NSG (Network Security Group) e Azure Firewall?',
      opts:['NSG opera na Camada 7; Azure Firewall na Camada 3/4','NSG é filtragem de pacotes L3/L4 por recurso; Azure Firewall é um serviço gerenciado com inspeção L7, FQDN e threat intelligence','Ambos são idênticos; diferem apenas no preço','Azure Firewall protege apenas VMs; NSG protege sub-redes'],
      answer:1, exp:'NSG filtra tráfego por IP/porta/protocolo (L3/L4) e é aplicado a NICs ou subnets. Azure Firewall é um serviço centralizado com inspeção L7, regras baseadas em FQDN, TLS inspection e integração com Microsoft Threat Intelligence.' },

    { level:'advanced', topic:'Segurança',
      q:'Em um ambiente de resposta a incidentes, o que é a fase de "containment" (contenção)?',
      opts:['Restaurar os sistemas afetados ao estado original','Isolar sistemas comprometidos para impedir propagação, preservando evidências forenses','Identificar a causa raiz do incidente','Notificar usuários e stakeholders sobre a brecha'],
      answer:1, exp:'Containment isola o sistema afetado (desconectar da rede, bloquear contas) sem destruir evidências. Vem após a identificação e antes da erradicação. Desligar/formatar antes de conter pode destruir evidências cruciais para o RCA.' },

    { level:'advanced', topic:'Automação',
      q:'Em Terraform, qual é a diferença entre "terraform plan" e "terraform apply"?',
      opts:['São idênticos; "plan" é um alias para "apply"','"plan" mostra as mudanças que serão feitas sem executá-las; "apply" executa as mudanças no ambiente real','plan" cria recursos; "apply" os destrói','Nenhuma diferença prática em ambientes de produção'],
      answer:1, exp:'"terraform plan" é uma dry-run: analisa o estado atual vs. desejado e exibe o diff sem alterar nada. "terraform apply" executa as mudanças. Sempre revise o plan antes de aplicar em produção — especialmente ações de destroy.' };

/* Adicione pacotes de questões extras:
   addQuestions(QUESTIONS_CCNA);     // data/questions-ccna.js
   addQuestions(QUESTIONS_LINUX);    // data/questions-linux.js
   addQuestions(QUESTIONS_AZURE);    // data/questions-azure.js
*/
function addQuestions(arr) {
  QUESTIONS_DB = QUESTIONS_DB.concat(arr);
}

/* ─── FILTROS ───────────────────────────────────────────── */
var QBank = {
  all: function() { return QUESTIONS_DB; },
  topics:  function() { return ['all'].concat([...new Set(QUESTIONS_DB.map(function(q){return q.topic}))].sort()); },
  levels:  function() { return ['all','beginner','intermediate','advanced']; },
  certs:   function() {
    var c = [];
    QUESTIONS_DB.forEach(function(q){ if(q.cert) c = c.concat(q.cert); });
    return ['all'].concat([...new Set(c)].sort());
  },
  filter: function(opts) {
    opts = opts || {};
    return QUESTIONS_DB.filter(function(q) {
      if (opts.level  && opts.level  !== 'all' && q.level  !== opts.level)  return false;
      if (opts.topic  && opts.topic  !== 'all' && q.topic  !== opts.topic)  return false;
      if (opts.cert   && opts.cert   !== 'all' && !(q.cert||[]).includes(opts.cert)) return false;
      if (opts.search) {
        var s = opts.search.toLowerCase();
        if (!q.q.toLowerCase().includes(s) &&
            !q.topic.toLowerCase().includes(s) &&
            !(q.exp||'').toLowerCase().includes(s)) return false;
      }
      return true;
    });
  }
};
