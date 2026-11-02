# Histórico de decisões da aventura

Este arquivo consolida as decisões de narrativa e de minigames tomadas durante a criação do jogo. Em caso de diferença entre um protótipo antigo e a sequência atual, vale o fluxo mais recente descrito aqui e no `Cenas.pdf`.

## Conceito

A aventura de aniversário de David é uma sequência de locais, conversas, itens e desafios curtos. Cada minigame tem uma condição de vitória clara e, ao ser concluído, entrega um item, uma pista ou acesso à próxima etapa. O jogo não depende de placares persistentes, recordes online ou cadastro de jogador. O progresso da aventura vale somente enquanto a aba está aberta; uma nova sessão começa do zero.

## Evolução das decisões

1. **Minigames prontos como base:** foram avaliados jogos HTML já disponíveis para acelerar o desenvolvimento. A adaptação deve integrá-los à história com metas breves e encerramento ao vencer.
2. **Seleção dos desafios:** a Memória foi mantida para a Praça; Road Rush para a Locadora; Tic-Tac-Toe para a Initus; River Rush para a travessia entre a Orla e o Rio; Simon para a Igreja; Mine para a máquina do Parque; Sete erros permanece no Apartamento no Bessa. O Simon foi preferido ao jogo de ritmo; Mine substituiu os dardos; Tic-Tac-Toe substituiu o jokenpô.
3. **Desafio da máquina:** a máquina de arcade fica no Parque Solon de Lucena/Lagoa e pede a ficha ganha na Locadora. A vitória na fase fácil de Mine entrega uma mensagem.
4. **Itens de exploração:** no Apartamento escuro, a lanterna ajuda a encontrar o remo e as baquetas. A garrafa e a chave são encontradas no Rio. A chave é necessária para o cofre, não para entrar no Apartamento no Bessa.
5. **Desafio do hospital:** a recepção pede ajuda com uma bandeja. A meta já definida é recolher cinco itens da festa antes da terceira queda, sem limite de tempo. A vitória libera o Consultório; tentativas podem ser repetidas.
6. **Final da história:** no Consultório, David conversa com o médico e encontra o cartão da esposa. Ao voltar para casa, a esposa anuncia a comemoração. O cofre precisa da chave e das seis pistas; o tablet abre a homenagem.
7. **Navegação e visual:** o mapa é uma imagem estática para consulta. A navegação é feita pelas placas clicáveis nos cenários. As cenas sequenciadas pelo usuário definem o desenho, a escala e a posição de placas, personagens e elementos. Não usar o modelo anterior de placas sobreposto às composições.
8. **Referência visual atual:** `Cenas.pdf` e as imagens sequenciadas em `Cenas/` registram o storyboard mais recente: mapa recebido no início, objetos e falas acionados por clique, estados antes/depois de recompensas e final no cofre.
9. **Integração visual no protótipo:** as 44 telas do storyboard são usadas diretamente como cenas 16:9. Placas, personagens e elementos da composição ficam preservados; as áreas clicáveis são posicionadas por cima da arte. O inventário acompanha os itens conquistados, as falas usam os estados correspondentes e o mapa abre `mapa_estatico.jpg` como uma imagem sem pontos de navegação.
10. **Memória da Praça:** o desafio passou a ser renderizado dentro do jogo principal, sem iframe. Ele reutiliza as seis imagens de cartas de `Jogos_importados/Memory-Card-Game/images/`; ao encontrar os seis pares, entrega o crachá diretamente ao estado da aventura.

## Rota consolidada

Frente da casa → Praça do Altiplano → Locadora → Initus → Parque Solon de Lucena/Lagoa → Apartamento no Centro → Igreja Batista → Orla de Tambaú → Rio no Conde → Apartamento no Bessa → Recepção do hospital → Consultório médico → Interior da casa → Cofre → Homenagem.

David pode revisitar cenas. Placas fazem a navegação; requisitos são verificados quando ele tenta interagir com o personagem, item, minigame ou passagem. Quando faltar algo, a fala deve dizer qual item ou etapa falta. O mapa pode ter rótulos em revisão, mas não controla as transições.

## Pistas e senha do cofre

| Ordem | Local | Dígito |
|---:|---|---:|
| 1 | Terminal da Initus — quadrado | 4 |
| 2 | Mine no Parque — aranha | 8 |
| 3 | Igreja — tesoura | 2 |
| 4 | Garrafa no Rio — semana | 7 |
| 5 | Apartamento no Bessa — triângulo | 3 |
| 6 | Consultório — noite clara | 1 |

Senha planejada: **482731**. O número da sala do consultório é uma informação de destino, não um dígito adicional da combinação.

## Itens visuais pendentes de substituição

Substituir os arquivos com marca d’água por versões limpas, mantendo exatamente os nomes:

- `imagens/Icones/anotacoes_3D.png`
- `imagens/Icones/baqueta_bateria.png`
- `imagens/Icones/garrafa.webp`
- `imagens/Icones/remo_apto.png`
- `imagens/Locais/mapa_estatico.jpg`

O arquivo `imagens/Icones/ficha_maquina.jpg` representa uma moeda com estrela. Pode ser mantido ou substituído por uma ficha de arcade com o mesmo nome, conforme a aparência desejada. O mapa pode receber correção dos nomes dos locais; a arte será usada como ilustração estática.

## Documentos de referência

- `Cenas.pdf`: storyboard anotado atual.
- `Cenas/Slide1.JPG` a `Cenas/Slide44.JPG`: estados visuais em sequência.
- `Prototipos/Prototipo3_Exploracao_David/README.md`: progressão detalhada, metas e dependências da versão atual.
- `Observações.pdf`: observações de uma etapa anterior; aplicar apenas as decisões que continuam compatíveis com este histórico e com o storyboard mais recente.

## Ajuste dos minigames em tela cheia — 1 de novembro de 2026

- Criada a página temporária `Prototipos/Prototipo3_Exploracao_David/minigame.html` para carregar os minigames importados em tela cheia, com botão de retorno e encaminhamento dos eventos de conclusão ao jogo principal.
- Road Rush, Tic-Tac-Toe, Mine, Simon e River Rush passam pelo carregador. Memória, Sete erros e o desafio do hospital usam a camada de tela cheia do próprio jogo.
- O carregador informa quando a aventura foi aberta como `file://`; para os módulos do Road Rush funcionarem, abrir pelo servidor local do Laragon.

## Ajustes após nova rodada de teste — 1 de novembro de 2026

- O mapa reposiciona o botão de retorno no alto, longe das ações de anotações e reinício.
- A navegação da Lagoa foi alinhada às placas da arte. As áreas de toque dos personagens e dos objetos foram reduzidas; remo e baquetas usam posições separadas.
- No Rio, removida a fala automática do agente e o hotspot genérico que bloqueava a garrafa e a chave. Cada coleta desativa seu próprio hotspot; os ícones do inventário usam oito espaços fixos com estados booleanos.
- Balões e mensagens podem ser dispensados clicando fora. As cenas entram sem diálogo automático; personagens e itens respondem após clique.
- O jogo dos Sete erros agora mantém os alvos invisíveis até o hover/acerto e usa fundo e texto de alto contraste.
- A bandeja foi removida. Como não havia outro minigame importado sem uso no projeto, foi substituída pelo desafio curto “Kit do consultório”: selecionar cinco itens médicos com até um erro para liberar o Consultório.
- A pista do dígito 1 é coletada ao clicar no médico. O cartão permanece como item separado no inventário.
- O estado salvo de versões antigas é reiniciado para garantir um teste limpo com as flags booleanas novas.
# Integração dos assets SVG — 1 de novembro de 2026

- O mapa foi ligado ao arquivo `imagens/Locais/mapa_estatico.svg`.
- Os oito espaços do inventário agora usam SVGs existentes: crachá, moeda como ficha, lanterna, remo, baqueta, chave, recado e cartão.
- Mantivemos `Cenas/Slide1.JPG` a `Slide44.JPG` como fonte visual das cenas. Cada slide já reúne fundo, personagens, placas e controles; substituir por uma arte individual de `imagens/Locais/` quebraria essa composição.
- Removidas do código as referências antigas a PNGs/JPGs de personagens que não eram usadas pelo protótipo. Os recortes SVG continuam disponíveis, mas não são sobrepostos aos personagens já presentes nas cenas.
- Vários arquivos com extensão SVG são imagens PNG/JPG embutidas. Eles carregam no navegador como SVG, mas não ganham qualidade vetorial ao ampliar.

## Novas cenas e sprites interativos — 1 de novembro de 2026

- As 15 cenas PNG recentes de `Cenas/` substituíram os slides JPG antigos como fundo ativo. Os slides anteriores permanecem apenas como referência.
- Personagens recortados foram adicionados por cima das cenas: David na abertura e no final; moradores/colegas na Praça, Locadora, Initus, Lagoa, Igreja, Orla e Apartamento no Bessa; a esposa no consultório e em casa. Recepcionista e médico já fazem parte das próprias imagens.
- O mapa, caderneta e oito itens do inventário agora exibem os SVGs nas áreas vazias da arte. Mapa, crachá, remo, baquetas, garrafa, chave e cartão aparecem como objetos clicáveis nos locais; a máquina da Lagoa e o leitor da Initus também foram adicionados.
- Ao coletar um objeto, ele some da cena e seu ícone ocupa o espaço fixo do inventário. Após vitória, a cena completa com o personagem aparece sob a mensagem; um toque em qualquer ponto fecha a mensagem. Interações concluídas deixam de abrir falas ou minigames.
- River Rush é jogado em cada travessia da Orla para o Rio. O kit médico volta a ser jogado em cada passagem da Recepção para o Consultório.
- O progresso salvo pela versão anterior foi invalidado com a versão 5 do estado para iniciar o novo fluxo sem flags incompatíveis.

## Correção de cliques e mapa inicial — 1 de novembro de 2026

- A imagem de fundo da cena não recebe mais eventos de ponteiro; sprites, placas e controles declaram explicitamente sua camada interativa.
- O botão de dispensar falas permanece ativo enquanto a mensagem está aberta; após fechá-la, os controles subjacentes voltam a receber cliques normalmente.
- O mapa não aparece no chão se a flag do inventário disser que já foi coletado. Estados salvos incompatíveis com a nova cena inicial são redefinidos (versão 5).

## Foco da lanterna no Apartamento no Centro — 1 de novembro de 2026

- A cena recebe uma camada escura preta com opacidade de 99%; a placa e o nome do local permanecem claros.
- Com a lanterna, um foco circular pequeno acompanha o ponteiro ou o toque: no centro, a camada escura fica com 40% de opacidade (60% de transparência); a borda volta gradualmente a 99%.
- A camada tem `pointer-events:none`, então itens, personagens e placas continuam clicáveis.

## Ícones distintos para o recado e o cartão — 1 de novembro de 2026

- O recado do hospital conquistado nos Sete erros usa `recado_hospital.svg`; `Carta_tablet.svg` fica reservado à carta da homenagem dentro do cofre.
- O cartão de aniversário do Consultório permanece como item separado, usando o envelope com selo de coração (`cartao_aniversario.svg`).

## Carta no cofre aberto — 1 de novembro de 2026

- David foi removido da cena do cofre aberto.
- `Carta_tablet.svg` foi centralizado na tela branca do tablet e tornou-se o alvo clicável para abrir a homenagem.

## Ajustes de dificuldade dos minigames — 1 de novembro de 2026

- O desafio da Locadora agora exige sobreviver por 50 segundos no Road Rush. O contador, as instruções e a mensagem de vitória usam a mesma duração; as três vidas continuam valendo.
- O Tic-Tac-Toe na Initus virou uma série: David precisa vencer três partidas antes do colega. Partidas empatadas não somam ponto e são reiniciadas automaticamente. Se o colega alcançar três vitórias primeiro, a série termina e pode ser iniciada novamente.
## Visibilidade da placa no Apartamento no Centro e posição na Initus — 1 de novembro de 2026

- O Apartamento no Centro ficou com 99% de opacidade escura. A placa e o nome do local ficam em uma área sem a camada escura; o foco da lanterna preserva 60% de transparência no centro.
- Na Initus, o personagem foi reposicionado mais abaixo para ficar no nível da calçada após o retorno do Tic-Tac-Toe.
## Aplicação das observações visuais e músicas — 1 de novembro de 2026

- Initus: colega reposicionado na calçada, em posição estável ao entrar e depois do Tic-Tac-Toe; leitor permanece sobre o portão.
- Lagoa: fliperama ampliado e colocado à esquerda do arco, conforme a imagem anotada; atleta ampliado e rebaixado para a grama. A renderização recria ambos no mesmo ponto após a partida.
- Igreja: amigo ampliado e colocado na calçada. Orla: canoa adicionada na faixa de areia. Rio: garrafa ampliada e chave transferida para cima da balsa.
- Consultório: cartão de aniversário reposicionado no chão e diálogo atualizado para identificar sua origem, deixado pela esposa. Dentro de casa: área clicável do cofre concentrada sobre o cofre pequeno do móvel.
- Incluído `music.js` com reprodução em loop, fade-out de 550 ms entre faixas e fade ao ocultar a aba. A faixa principal toca nas cenas gerais; faixas específicas tocam na Memória, Road Rush, Tic-Tac-Toe, Apartamento escuro e desafio do hospital. A reprodução começa após a primeira interação, respeitando a política de áudio dos navegadores.

## Correções finais do protótipo e preparação para publicação — 1 de novembro de 2026

- Road Rush: a trilha da corrida toca em paralelo aos efeitos originais. Ao vencer, sair pelo menu, pressionar Escape/Home ou voltar pelo cabeçalho do minigame, a trilha faz fade e a aventura retoma a música da cena.
- Tic-Tac-Toe: a trilha própria toca durante toda a série, inclusive entre empates e rodadas; ao concluir ou voltar, ela faz fade e a música da aventura volta na cena reaberta.
- Apartamento no Centro: a música ambiente depende da cena ativa e volta a ser solicitada ao entrar novamente, inclusive depois de minigames.
- Igreja: amigo reposicionado para a linha da calçada. Consultório: cartão ajustado para o piso perto da esposa e da maca; a zona de retorno à recepção foi elevada para coincidir com a placa. Rio: tamanho visual da chave restaurado para 2% × 4,5%, mantendo a área de toque maior (4% × 8%).
- Antes da publicação, preparar uma cópia de distribuição apenas com os arquivos servidos pelo jogo, conferir créditos/licenças de imagens, músicas e minigames, testar a cópia hospedada em celular e computador e então publicar em hospedagem estática com HTTPS.
- Corrigida a capitalização dos caminhos das trilhas para `Musica/`, que corresponde ao nome real da pasta e evita falhas em hospedagens Linux sensíveis a maiúsculas/minúsculas.

## Áudio do River Rush e marcações dos Sete erros — 2 de novembro de 2026

- A música da aventura é suspensa enquanto o River Rush estiver aberto. O jogo mantém apenas sua trilha original e seus efeitos; ao sair, a cena retoma a música da aventura.
- Os sete alvos do jogo das diferenças foram alinhados com os X enviados: quadro, TV, conjunto de luminárias (um alvo só), travesseiro, assento/objeto, planta na mesa lateral e objeto na mesa de centro. O alvo duplicado das luminárias foi trocado pelo travesseiro, que já é uma diferença visível nas imagens.

## Limpeza da pasta de áudio — 2 de novembro de 2026

- Conferidas as referências do HTML e JavaScript do jogo principal e dos minigames. Permaneceram em `Musica/` somente as seis faixas usadas: música principal, memória, corrida, Tic-Tac-Toe, ambiente do Apartamento no Centro e hospital.
- Removidas oito faixas sem referências no projeto: `0 mirostar-gaming-game-video-game-music-560338.mp3`, `brutaldesign-pixel-art-481480.mp3`, `hitslab-gaming-game-minecraft-background-music-278382.mp3`, `jesuschristisgod-final-answer-christian-game-show-music-4jesus-312721.mp3`, `mirostar-game-gaming-video-game-music-560319.mp3`, `nunusev-video-game-battle-music-535133.mp3`, `retro-bgm-chan-server-room-523662.mp3` e `viacheslavstarostin-game-gaming-minecraft-background-music-370830.mp3`.
- Validação: os seis arquivos referenciados existem; `node --check` passou nos quatro JavaScript principais relacionados à música e ao fluxo do jogo. Não foi feita uma rodada manual no navegador.

## Minigames em retrato — 2 de novembro de 2026

- Road Rush, River Rush, Simon e Mine agora usam molduras retrato centralizadas na tela dos minigames, aproveitando a altura disponível sem ampliar o conteúdo além das laterais.
- Road Rush reorganiza o HUD em telas estreitas; River Rush preserva o canvas vertical nativo 3:4; Simon amplia o tabuleiro até o limite da largura disponível e oculta o link interno duplicado de voltar; Mine mantém o tabuleiro da fase fácil encaixado na largura.
- Verificação visual no navegador em molduras de 320 × 640, 390 × 844 e na janela padrão do desktop. Os quatro minigames permaneceram dentro da largura disponível; não houve corte lateral observado.
