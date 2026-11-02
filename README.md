# Aniversário do David

Projeto da aventura interativa de aniversário. O protótipo principal está em `Prototipos/Prototipo3_Exploracao_David/`; a homenagem final está em `Mensagem_homenagem/`.

## Como abrir

Abra `index.html` pela raiz do projeto em um servidor local, como Laragon. O protótipo salva o progresso apenas durante a sessão da aba; ao fechar e reabrir, a aventura começa do zero. A edição da galeria da homenagem é salva separadamente no navegador.

## Organização

- `Cenas/`: 15 telas PNG novas, com cenários e espaços limpos para aplicar os personagens, itens e ícones SVG; os JPGs antigos são referências de versões anteriores.
- `imagens/Icones/`: ícones SVG usados nos espaços do inventário. A ficha usa `moeda.svg`, pois ainda não há um desenho SVG específico de ficha.
- `imagens/Locais/`: imagens individuais dos locais e `mapa_estatico.svg`, usado como mapa ilustrativo.
- `imagens/Personagens/recortes/`: recortes SVG aplicados como personagens clicáveis por cima das cenas PNG.
- `Jogos_importados/`: minigames incorporados à aventura.
- `Musica/`: trilhas do jogo principal e dos desafios, reproduzidas em loop com transição em fade-out.
- `Prototipos/Prototipo3_Exploracao_David/`: fluxo principal, regras, cenas e minigames.
- `Mensagem_homenagem/`: página aberta pelo tablet no final.
- `Cenas.pdf`: storyboard anotado; as telas PNG mais novas da pasta `Cenas/` definem a composição visual atual.

## Regras atuais da história

O mapa é ilustrativo e não clicável. A navegação acontece pelas placas das cenas. As novas telas PNG da pasta `Cenas/` são a base; personagens, objetos clicáveis e ícones do inventário são posicionados por cima usando SVG. A sequência completa, dependências, recompensas e condições dos minigames está em [README do protótipo](Prototipos/Prototipo3_Exploracao_David/README.md). As decisões e mudanças registradas estão em [Histórico do jogo](HISTORICO_DO_JOGO.md).

## Formato e integração dos assets

- Os caminhos ativos dos ícones do inventário agora usam SVG: `cracha.svg`, `moeda.svg`, `lanterna.svg`, `remo.svg`, `baqueta.svg`, `chave.svg`, `recado_hospital.svg` e `cartao_aniversario.svg`.
- O mapa ilustrativo carregado pelo jogo é `imagens/Locais/mapa_estatico.svg`; ele não é clicável. As placas nas cenas fazem a navegação.
- As cenas ativas são as 15 imagens PNG novas de `Cenas/`. Os JPGs `Slide1.JPG` a `Slide44.JPG` são versões antigas e não entram no fluxo atual. Os SVGs individuais de `imagens/Locais/` não substituem essas cenas compostas.
- Na primeira cena, o mapa do chão só aparece enquanto ainda não foi coletado; ao iniciar a aventura ele deixa o chão e passa para o inventário/consulta de mapa. A nova versão do estado descarta estados de sessão incompatíveis com essa regra.
- Vários SVGs são contêineres com imagens PNG/JPG embutidas, não desenhos vetoriais puros. Para melhorar a escala, vale redesenhar em vetor os assets que precisam aumentar bastante; para cenas rasterizadas, mantenha as telas JPG de `Cenas/`.

## Preparação para colocar online

O projeto é estático: HTML, CSS, JavaScript, imagens, áudio e minigames; não precisa de servidor de aplicação ou banco de dados. Antes de publicar:

1. Criar uma pasta de distribuição limpa com `index.html` e somente os arquivos usados em tempo de execução. Não enviar arquivos temporários, documentos de storyboard ou cópias antigas das imagens.
2. Conferir todas as referências com a mesma capitalização dos nomes reais. Hospedagem Linux diferencia maiúsculas e minúsculas; a pasta de áudio se chama `Musica/`.
3. Registrar e conferir a licença/crédito de cada faixa, imagem e minigame externo. Manter as atribuições necessárias junto ao material distribuído.
4. Abrir a pasta de distribuição por um servidor local e percorrer a aventura inteira em celular e computador, inclusive áudio, minigames, retorno de cena, links da homenagem e reinício.
5. Publicar por integração com Git para facilitar versões e atualizações. Cloudflare Pages aceita HTML estático sem etapa de build: usar `exit 0` como comando e a pasta de distribuição como diretório de saída. A página principal precisa estar na raiz dessa pasta.
6. Conferir a versão publicada no domínio HTTPS, testar novamente os fluxos e compartilhar o link somente depois dessa checagem.

Não publicar a pasta de trabalho inteira diretamente: ela contém referências, arquivos de edição e jogos importados que podem não ser usados. A lista final de arquivos deve vir da checagem das referências do jogo antes da criação do pacote.
