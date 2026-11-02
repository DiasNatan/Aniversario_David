# Aventura de aniversário do David — fluxo atual

Este documento registra a versão atual da história e das regras da aventura. O storyboard sequenciado em `Cenas/` e anotado em `Cenas.pdf` orienta a apresentação das cenas. O protótipo está em `index.html`, `game.js` e `music.js`.

## Como abrir

Abra o `index.html` pela raiz do projeto em um servidor local (por exemplo, Laragon), para que as páginas, imagens e minigames carreguem pelos caminhos relativos. Não abra como arquivo `file://`: o Road Rush usa módulos JavaScript que o navegador bloqueia nesse modo. A interface foi pensada para celular na horizontal. O progresso do jogo dura somente enquanto a aba permanece aberta; ao fechar e abrir novamente, começa do zero.

## Princípios de navegação e apresentação

- O `mapa_estatico.svg` é uma ilustração única e estática para consulta. Não há pontos clicáveis no mapa.
- A passagem entre locais acontece pelas placas clicáveis que aparecem nos cenários.
- As 15 novas imagens PNG em `Cenas/` são as cenas completas atuais, com espaços vazios para ícones e recortes. O jogo posiciona sobre elas personagens e objetos SVG interativos.
- David pode ver um cenário antes de cumprir seus requisitos. Ao clicar em um item, personagem, mecanismo ou passagem bloqueada, recebe uma fala que identifica o item ou a ação que falta.
- Itens e minigames avançam quando acionados pelo jogador. As falas aparecem após a interação e fecham ao tocar em qualquer parte da tela.
- Ao ganhar um item, a cena é redesenhada sem o objeto e com o SVG no inventário; o personagem continua visível, mas sua ação fica desativada. River Rush e o kit médico se repetem ao atravessar suas passagens.
- No Apartamento no Centro, uma camada preta cobre o cenário com 99% de opacidade. A placa e o nome do local ficam fora da área escurecida. Com a lanterna, um foco de raio aproximado de 5vw acompanha o ponteiro ou o toque e deixa o centro 60% transparente; essa camada não bloqueia os cliques.
- Os minigames têm metas curtas ligadas à história. Não há placar global ou recorde como condição para concluir a aventura.

## Sequência das cenas

| Etapa | Local e acesso | Ação, minigame e meta | Recompensa e próximo passo |
|---:|---|---|---|
| 1 | **Frente da casa** — início. | A carta de David convida à busca. O mapa começa no chão; ao clicar/interagir, o personagem o entrega a David. | O mapa vai para o inventário e pode ser consultado como ilustração estática. As placas iniciam a exploração. |
| 2 | **Praça do Altiplano** — indicada pelas placas. | **Memória:** completar os seis pares de figuras. | A moradora entrega o **crachá**. |
| 3 | **Locadora** — acessível com o crachá. | **Road Rush:** sobreviver por 50 segundos com três vidas. | O colega entrega a **ficha** da máquina no Parque Solon. Derrota permite tentar de novo. |
| 4 | **Initus** — usar o crachá no leitor. | Clicar no terminal para ler a pista; no **Tic-Tac-Toe**, alcançar três vitórias antes do colega. Empates não pontuam. | A pista do terminal dá o dígito **4**. A vitória rende a **lanterna**. Se o colega alcançar três vitórias primeiro, David pode iniciar outra série. |
| 5 | **Parque Solon de Lucena/Lagoa** — procurar a máquina de arcade. | Usar a ficha e vencer a fase fácil de **Mine**. | A máquina entrega a mensagem de sorte, com o dígito **8**. A ficha só é consumida quando a fase é vencida. |
| 6 | **Apartamento no Centro** — cenário escurecido; usar a lanterna. | Procurar os objetos no ambiente. É possível encontrar um, sair e voltar pelo outro. | Recolher **remo** e **baquetas**. O remo ajuda na travessia; as baquetas são necessárias para a igreja. |
| 7 | **Igreja Batista** — usar as baquetas para o desafio. | **Simon:** observar e repetir uma sequência de dez passos. | Receber a mensagem com o dígito **2**. |
| 8 | **Orla de Tambaú** — seguir a placa para o Rio. | **River Rush:** atravessar desviando dos troncos; a meta é passar dez obstáculos. O desafio se repete em toda travessia entre Orla e Rio. | Ao vencer, chegar ao Rio. Uma colisão encerra a tentativa, que pode ser reiniciada. |
| 9 | **Rio no Conde** — após a travessia. | Clicar nos objetos para recolher a garrafa na margem e a chave na balsa. | A garrafa contém a mensagem com o dígito **7**. A chave fica reservada para abrir o cofre no final. Ela não é requisito para o Apartamento no Bessa. |
| 10 | **Apartamento no Bessa** — acessível após a travessia. | **Sete erros:** encontrar as sete diferenças entre o projeto e a pintura. | Receber o recado do hospital, com o número do consultório e a pista do dígito **3**. |
| 11 | **Recepção do hospital** — apresentar o recado do Bessa. | **Kit do consultório:** selecionar cinco itens médicos; dois erros encerram a tentativa. O desafio se repete em cada passagem da Recepção para o Consultório. | O kit completo libera a passagem. É possível tentar novamente. |
| 12 | **Consultório médico** — liberado após a entrega. | Clicar no médico para obter a pista do dígito **1** e no cartão ao lado da esposa para recolhê-lo. | O cartão vai para o inventário. A fala aparece somente após interação; clicar fora do balão a dispensa. |
| 13 | **Interior da casa** — retorno depois do Consultório. | Clicar na esposa para ouvir a mensagem; depois, clicar no cofre. | A esposa anuncia a comemoração e diz que há uma mensagem no cofre. |
| 14 | **Cofre** — no cenário da casa. | Reunir a chave e as seis pistas, inserir a combinação e abrir o cofre. Se faltar a chave, a fala explica que David a deixou no Rio. | O cofre revela o tablet. Clicar no tablet abre a homenagem em `Mensagem_homenagem/index.html`. |

## Pistas e combinação

As mensagens são recolhidas ao longo da história. O bloco de anotações as organiza na ordem abaixo, independentemente da ordem em que David revisite os locais.

| Ordem | Origem | Enigma/pista | Dígito |
|---:|---|---|---:|
| 1 | Terminal da Initus | Cantos de um quadrado | 4 |
| 2 | Máquina do Parque Solon | Pernas de uma aranha | 8 |
| 3 | Igreja Batista | Lâminas de uma tesoura | 2 |
| 4 | Garrafa no Rio | Dias de uma semana | 7 |
| 5 | Apartamento no Bessa | Pontas de um triângulo; também informa o consultório | 3 |
| 6 | Consultório médico | Luas em uma noite clara | 1 |

**Combinação prevista: `482731`.** O número do consultório identifica o destino e não entra na senha. A chave é necessária para abrir o cofre, além das seis pistas.

## Minigames e metas

| Minigame | Cena | Meta para vencer | Resultado |
|---|---|---|---|
| Memória | Praça do Altiplano | Encontrar os seis pares | Crachá |
| Road Rush | Locadora | Sobreviver 50 segundos; três vidas | Ficha da máquina |
| Tic-Tac-Toe | Initus | Alcançar três vitórias antes do colega; empates não pontuam | Lanterna |
| Mine | Máquina no Parque Solon | Vencer uma fase fácil | Mensagem com pista |
| Simon | Igreja Batista | Repetir dez passos | Mensagem com pista |
| River Rush | Orla → Rio | Passar dez obstáculos sem colisão; repetir a cada travessia | Acesso ao Rio |
| Sete erros | Apartamento no Bessa | Encontrar as sete diferenças | Recado para o hospital |
| Kit do consultório | Recepção → Consultório | Selecionar cinco itens médicos com no máximo um erro; repetir a cada travessia | Acesso ao Consultório |

As tentativas perdidas podem ser refeitas. Nenhum placar externo ou registro de recordes é necessário para concluir as fases.

## Itens e dependências

- O **crachá** é ganho na Praça e é usado na Locadora e no leitor da Initus.
- A **ficha** é ganha na Locadora e usada na máquina de Mine.
- A **lanterna** é ganha na Initus e usada para explorar o Apartamento no Centro escuro.
- O **remo** e as **baquetas** são encontrados no Apartamento no Centro; levam, respectivamente, à travessia e ao desafio da igreja.
- A **garrafa** no Rio contém uma pista; a **chave** encontrada na balsa é apenas para o cofre.
- O recado do Apartamento no Bessa permite ajudar na recepção do hospital.
- O minigame do kit médico libera o Consultório; o cartão encontrado lá vai para o inventário.
- O recado recebido no Apartamento no Bessa é diferente do cartão de aniversário encontrado no Consultório e usa o ícone `recado_hospital.svg`. A carta `Carta_tablet.svg` aparece dentro do cofre aberto e abre a homenagem.
- O cofre exige a chave e as seis pistas. O tablet abre a homenagem final.

## Decisões consolidadas e itens visuais

- Permanecem na história: Memória, Road Rush, Tic-Tac-Toe, Mine, Simon, River Rush e Sete erros. Mine substitui os dardos; Simon substitui o jogo de ritmo; Tic-Tac-Toe ocupa o lugar do jokenpô. O jogo dos Sete erros continua.
- O mapa escolhido é `imagens/Locais/mapa_estatico.svg`. Ele é estático; placas nas cenas fazem a navegação. Os nomes exibidos nas placas e cabeçalhos seguem o storyboard, mesmo que algum rótulo do mapa precise ser corrigido.
- Não desenhar outro conjunto de placas sobre as composições de `Cenas/`: a referência do usuário define o estilo e a proporção.
- As imagens de inventário estão em `imagens/Icones/`. Substituições de arquivos devem preservar nome e extensão para manter os caminhos do jogo.
- O histórico das decisões e das alterações de narrativa está em `HISTORICO_DO_JOGO.md`, na raiz do projeto.

## Integração visual atual

- O jogo usa as 15 telas PNG recentes da pasta `Cenas/`. Cada tela inclui cenário, placas, cabeçalho e espaços vazios para personagens, objetos e os oito itens do inventário.
- As placas usam áreas clicáveis alinhadas à arte; personagens e objetos SVG são clicáveis diretamente. O mapa abre `imagens/Locais/mapa_estatico.svg` como ilustração, sem pontos de navegação.
- Recortes de `imagens/Personagens/recortes/` e objetos SVG são posicionados como camadas interativas. Ao coletar um objeto, ele some da cena e aparece no inventário.
- As falas e as transições selecionam a tela correspondente do storyboard; falas condicionais explicam qual item ou etapa ainda falta.
- Na Praça, clicar no morador abre a fala do storyboard e mostra o botão **Jogar memória**. As doze cartas são exibidas diretamente na janela do jogo principal e usam as figuras de `Jogos_importados/Memory-Card-Game/images/`; completar os seis pares entrega o crachá.
- Os minigames abrem em tela cheia, sem a cena atrás deles. `minigame.html` carrega Road Rush, Tic-Tac-Toe, Mine, Simon e River Rush, oferece o botão de retorno e encaminha os eventos de vitória para a aventura. Memória, Sete erros e Kit do consultório também usam a área de tela cheia.
- Itens e recados usam estados booleanos de coleta; cada ícone do inventário ocupa um dos oito espaços fixos. As falas aparecem após interação e podem ser fechadas tocando em qualquer parte da cena.
- Os oito ícones do inventário carregam arquivos SVG de `imagens/Icones/`; a ficha usa `moeda.svg` como representação visual. O mapa usa `imagens/Locais/mapa_estatico.svg`.
- `Slide1.JPG` a `Slide44.JPG` são cenas antigas e não são usadas. Recortes SVG de personagens, itens e controles são sobrepostos às 15 novas cenas PNG.
- A extensão SVG não significa que toda a arte seja vetorial: vários arquivos contêm uma imagem raster embutida. Os ícones reais em vetor podem ser ampliados sem perda; as imagens embutidas continuam limitadas pela resolução original.

## Ajustes visuais e músicas do storyboard

- Na Initus, o colega fica na calçada no mesmo ponto ao entrar e depois da série de Tic-Tac-Toe; o leitor está no portão.
- Na Lagoa, o fliperama fica no lado esquerdo indicado pelo desenho e foi ampliado; o atleta fica maior, mais abaixo, na grama, e mantém a posição depois de Mine.
- Na Igreja, o amigo está maior e na calçada. Na Orla, uma canoa aparece na areia. No Rio, a garrafa foi ampliada e a chave está sobre a balsa.
- O cartão de aniversário é encontrado no chão do Consultório e é deixado pela esposa.
- O alvo inicial do cofre fica sobre o cofre pequeno no móvel da sala.
- As músicas vêm de `Musica/`: principal na aventura, `hitslab - jogo da memoria` na Memória, `dmassaiii - Minigame corrida` no Road Rush, `lnplusmusic - tic tac toe` no Tic-Tac-Toe, `liecio-dark-ambient - Apartamento no Centro sem luz` no Apartamento escuro e `Game do hospital` no desafio da Recepção. As faixas repetem em loop e fazem fade-out na troca ou ao ocultar a aba. O navegador libera o áudio após a primeira interação do jogador.
