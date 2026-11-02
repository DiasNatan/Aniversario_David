const ROOT = '../../imagens/';
const SCENES = '../../Cenas/';
const sceneImages = {
  front:'01.Frente_casa.png', altiplano:'02.Praca_altiplano.png', rental:'03.Locadora.png',
  initus:'04.Initus.png', park:'05.Parque Solon de Lucena Lagoa.png', dark:'06. Apartamento_centro.png',
  church:'07.Igreja.png', coast:'08.Orla_tambau.png', river:'09.Rio_Conde.png',
  apt2:'10.Apartamento_Bessa.png', hospital:'11.Recepcao_Hospital.png', office:'12.Consultorio_medico.png',
  safe:'13.Casa_dentro.png', safeClosed:'14.Cofre_fechado.png', safeOpen:'15.Cofre_aberto.png'
};
const sprites = {
  david:ROOT+'Personagens/recortes/david.svg', plaza:ROOT+'Personagens/recortes/cliente_parque.svg',
  rental:ROOT+'Personagens/recortes/colega_locadora.svg', initus:ROOT+'Personagens/recortes/colega_jovem.svg',
  park:ROOT+'Personagens/recortes/atleta_lagoa.svg', church:ROOT+'Personagens/recortes/amigo_igreja.svg',
  coast:ROOT+'Personagens/recortes/agente_turismo.svg', apt2:ROOT+'Personagens/recortes/pintor.svg',
  wife:ROOT+'Personagens/recortes/esposa.svg'
};
const assets = {
  map: ROOT + 'Locais/mapa_estatico.svg',
  before: ROOT + 'Minigames/Sete erros/Sete_Erros_Imagem_A.jpg',
  after: ROOT + 'Minigames/Sete erros/Sete_Erros_Imagem_B.jpg'
};

const items = {
  mapa:['🗺️','Mapa'], cracha:['🪪','Crachá'], ficha:['🎟️','Ficha'], lanterna:['🔦','Lanterna'],
  remo:['🛶','Remo'], baquetas:['🥁','Baquetas'], chave:['🔑','Chave'], recado:['📝','Recado do hospital'],cartao:['💌','Cartão de aniversário']
};
const collectedIds=['mapa','cracha','ficha','lanterna','remo','baquetas','chave','recado','cartao','terminal','park','church','bottle','apt2','office'];
const clueOrder=['terminal','park','church','bottle','apt2','office'];
const locations = [
  {id:'front',name:'Frente da casa'}, {id:'altiplano',name:'Praça do Altiplano'},
  {id:'rental',name:'Locadora'}, {id:'initus',name:'Initus'},
  {id:'park',name:'Parque Solon de Lucena - Lagoa'}, {id:'dark',name:'Apartamento no Centro'},
  {id:'church',name:'Igreja Batista'}, {id:'coast',name:'Orla de Tambaú'},
  {id:'river',name:'Rio no Conde'}, {id:'apt2',name:'Apartamento no Bessa'},
  {id:'hospital',name:'Recepção do hospital'}, {id:'office',name:'Consultório médico'},
  {id:'safe',name:'Dentro de casa'}
];
const routes = {
  front:['altiplano','rental','safe'], altiplano:['front','rental','initus'],
  rental:['altiplano','initus','park'], initus:['rental','dark','park'],
  park:['dark','initus','church'], dark:['park','church'],
  church:['park','coast','apt2'], coast:['river','church','apt2'],
  river:['coast','church','apt2'], apt2:['hospital','coast'],
  hospital:['front','coast','office'], office:['hospital','coast'], safe:['front']
};

const blank = () => ({version:5,started:false,scene:'front',items:[],collected:Object.fromEntries(collectedIds.map(id=>[id,false])),visited:['front'],notes:[],done:[],flags:{},musicBest:0});
let state;
try { const saved=JSON.parse(sessionStorage.getItem('tesouroDavidV1')||'null');state=saved?.version===5&&saved.collected?Object.assign(blank(),saved):blank(); }
catch { state = blank(); }
state.collected=Object.assign(blank().collected,state.collected||{});
// Never show the starting map on the ground if its inventory flag is already set.
if(!state.started&&state.collected.mapa){state.collected.mapa=false;state.items=state.items.filter(id=>id!=='mapa');}
try { localStorage.removeItem('tesouroDavidV1'); } catch {}
if(state.items.includes('dardos')&&!state.items.includes('ficha')) state.items=state.items.map(id=>id==='dardos'?'ficha':id);
if(state.done.includes('darts')&&!state.done.includes('mine')) state.done=state.done.filter(id=>id!=='darts');
if(state.done.includes('jokenpo')&&!state.done.includes('tictactoe')) state.done.push('tictactoe');
if(state.done.includes('rhythm')&&!state.done.includes('simon')) state.done.push('simon');
if(state.done.includes('canoe')&&!state.done.includes('river-crossing')) state.done.push('river-crossing');
const $ = s => document.querySelector(s);
const stage = $('#stage');
const has = id => Object.hasOwn(state.collected,id)?state.collected[id]===true:state.items.includes(id);
const hasNote = id => state.notes.some(note => note.id === id);
const save = () => { try { sessionStorage.setItem('tesouroDavidV1', JSON.stringify(state)); } catch {} };
const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

function setScene(id){
  if(!state.started&&id!=='front'){
    say('David','A carta pede que eu comece a busca primeiro.');
    return;
  }
  if(state.scene==='safe'&&id!=='safe'&&!state.flags.homeTalk)state.flags.homeTimerStarted=false;
  if(!state.visited.includes(id)) state.visited.push(id);
  state.scene=id; save(); draw();
}

function toast(message){
  const old=$('.toast-message'); if(old) old.remove();
  const el=document.createElement('div'); el.className='toast-message toast'; el.textContent=message;
  stage.appendChild(el); setTimeout(()=>el.remove(),3500);
}

function showDialog(speaker, message){
  const scene=stage.querySelector('.scene'); if(!scene)return;
  scene.querySelector('.speech-bubble')?.remove();scene.querySelector('.dialog-dismiss')?.remove();
  const dismiss=document.createElement('button');dismiss.type='button';dismiss.className='dialog-dismiss';dismiss.setAttribute('aria-label','Fechar mensagem e voltar à cena');
  const el=document.createElement('div'); el.className='speech-bubble'; el.setAttribute('role','status');
  el.innerHTML='<b>'+esc(speaker)+'</b><p>'+esc(message)+'</p><small>Toque em qualquer lugar para continuar</small>';
  dismiss.onclick=()=>{dismiss.remove();el.remove();};scene.append(dismiss,el);
}

const directionZones={
  front:[['altiplano',88,40],['safe',83,50],['rental',89,60]],
  altiplano:[['front',88,40],['initus',83,50],['rental',89,60]],
  rental:[['altiplano',88,45],['initus',83,56],['park',89,67]],
  initus:[['rental',18,29],['dark',13,40],['park',18,51]],
  park:[['dark',18,29],['initus',13,40],['church',19,50]],
  dark:[['park',13,17],['church',31,17]],
  church:[['park',17,52],['coast',12,63],['apt2',18,74]],
  coast:[['river',86,48],['church',81,58],['apt2',87,68]],
  river:[['coast',13,47],['church',12,58],['apt2',15,68]],
  apt2:[['hospital',90,45],['coast',90,56]],
  hospital:[['front',13,40],['coast',52,63],['office',72,63]],
  office:[['hospital',14,33]],
  safe:[['front',89,20]]
};
function addSignpost(scene,id){
  (directionZones[id]||[]).forEach(([dest,x,y])=>{
    const loc=locations.find(item=>item.id===dest);if(!loc)return;
    const hit=document.createElement('button');hit.type='button';hit.className='hotspot sign-hit';hit.style.left=x+'%';hit.style.top=y+'%';hit.style.setProperty('--hit-w',id==='park'?'19%':'18%');hit.style.setProperty('--hit-h',id==='park'?'8%':'9%');hit.setAttribute('aria-label','Placa: '+loc.name);hit.title=loc.name;hit.onclick=()=>{
      if(id==='coast'&&dest==='river')return startRiverCrossing();
      if(id==='hospital'&&dest==='office'){
        if(!has('recado'))return requireItem('o recado do Apartamento no Bessa','David, primeiro encontre os sete erros para receber o recado do hospital.');
        if(state.flags.clinicPass){state.flags.clinicPass=false;save();setScene('office');return;}
        if(!state.flags.hospitalTalk){state.flags.hospitalTalk=true;save();return say('Recepcionista','Ajude a separar os cinco itens médicos para chegar ao consultório.');}
        return clinicKitGame();
      }
      setScene(dest);
    };scene.appendChild(hit);
  });
}
function addArtControls(scene){
  const ui=document.createElement('div');ui.className='art-ui';
  ui.innerHTML=(state.started?'<button class="art-map" aria-label="Abrir mapa estático"><img src="'+ROOT+'Icones/mapa.svg" alt=""></button>':'')+'<div class="art-inventory" aria-label="Itens recolhidos"></div><button class="art-notes" aria-label="Abrir caderneta"><img src="'+ROOT+'Icones/anotacoes.svg" alt=""></button><button class="art-reset" aria-label="Recomeçar"></button>';
  const mapButton=ui.querySelector('.art-map');if(mapButton)mapButton.onclick=renderMap;
  ui.querySelector('.art-notes').onclick=showNotes;
  ui.querySelector('.art-reset').onclick=resetGame;
  scene.appendChild(ui);drawInventory();
}
function sceneBase(id,title,imageOverride){
  const sceneName=$('#sceneName');if(sceneName)sceneName.textContent=title;
  window.GameMusic?.playScene(id);
  const image=imageOverride||sceneImages[id]||sceneImages.front;
  stage.innerHTML='<div class="scene scene-'+id+'"><img class="scene-art" src="'+SCENES+image+'" alt="Cena: '+esc(title)+'"></div>';
  const scene=stage.querySelector('.scene');
  const routeId=id==='home'?'safe':id;
  if(state.started&&routes[routeId]&&!(id==='safe'&&(state.flags.safeVisited||state.flags.ending)))addSignpost(scene,routeId);
  if(id==='dark'){
    const darkness=document.createElement('div');darkness.className='darkness-overlay';darkness.setAttribute('aria-hidden','true');scene.appendChild(darkness);
    const setFlashlight=(event)=>{
      const rect=scene.getBoundingClientRect();
      const x=Math.max(0,Math.min(100,(event.clientX-rect.left)/rect.width*100));
      const y=Math.max(0,Math.min(100,(event.clientY-rect.top)/rect.height*100));
      scene.style.setProperty('--flash-x',x+'%');scene.style.setProperty('--flash-y',y+'%');
    };
    scene.addEventListener('pointermove',setFlashlight,{passive:true});
    scene.addEventListener('pointerdown',setFlashlight,{passive:true});
    scene.style.setProperty('--flash-x','50%');scene.style.setProperty('--flash-y','72%');
  }
  addArtControls(scene);
  return scene;
}

function addSprite(scene,src,label,x,y,w,h,onClick=null,kind='item'){
  const el=document.createElement(onClick?'button':'img');
  if(onClick){el.type='button';el.className='scene-sprite scene-'+kind+'-button';el.setAttribute('aria-label',label);el.title=label;el.onclick=onClick;}
  else {el.className='scene-sprite scene-'+kind;el.alt=label;}
  el.style.left=x+'%';el.style.top=y+'%';el.style.width=w+'%';el.style.height=h+'%';
  if(onClick){const img=document.createElement('img');img.src=src;img.alt='';el.appendChild(img);}else el.src=src;
  scene.appendChild(el);return el;
}
function actor(scene,id,label,x,y,w=10,h=38,onClick=null){return addSprite(scene,sprites[id],label,x,y,w,h,onClick,'actor');}
function sceneItem(scene,id,label,x,y,w=5,h=9,onClick=null,hitW=w,hitH=h){
  const target=addSprite(scene,ROOT+'Icones/'+id,label,x,y,hitW,hitH,onClick,'item');
  if(onClick&&(hitW!==w||hitH!==h)){const img=target.querySelector('img');img.style.width=(w/hitW*100)+'%';img.style.height=(h/hitH*100)+'%';}
  return target;
}
function clickArea(scene,label,x,y,w,h,onClick){
  const hit=document.createElement('button');hit.type='button';hit.className='hotspot scene-action-hit';hit.style.left=x+'%';hit.style.top=y+'%';hit.style.setProperty('--hit-w',w+'%');hit.style.setProperty('--hit-h',h+'%');hit.setAttribute('aria-label',label);hit.title=label;hit.onclick=onClick;scene.appendChild(hit);return hit;
}

function say(speaker,message){showDialog(speaker,message);}
function sceneSpeaker(){return ({front:'David',altiplano:'Morador da praça',rental:'Colega da locadora',initus:'Colega da Initus',park:'Atleta do parque',dark:'David',church:'Amigo da igreja',coast:'Agente de turismo',river:'David',apt2:'Pintor',hospital:'Recepcionista',office:'Médico',safe:'Esposa'})[state.scene]||'David';}
function requireItem(item,message){
  say(sceneSpeaker(),message||'David, você precisa pegar '+item+' antes de continuar.');
  return false;
}

function modal(html){
  const ov=document.createElement('div');ov.className='overlay';ov.innerHTML='<section class="card">'+html+'</section>';stage.appendChild(ov);return ov;
}
function minigameModal(key,title,description){
  if(key==='road'||key==='tictactoe'||key==='river')window.GameMusic?.suspend();
  else window.GameMusic?.play('main');
  const query=new URLSearchParams({game:key,title,goal:description});
  const ov=modal('<iframe class="minigame-host" title="'+esc(title)+'" src="minigame.html?'+query.toString()+'"></iframe>');
  ov.classList.add('fullscreen-minigame');
  return ov;
}
function gameModal(html,music='main'){window.GameMusic?.play(music);const ov=modal(html);ov.classList.add('fullscreen-minigame','native-minigame');return ov;}
function closeModal(ov){if(ov)ov.remove();}

function draw(){
  drawInventory();
  $('#status').textContent=state.started ? (state.done.length+' desafios · '+state.notes.length+' pistas') : '';
  if(state.scene==='map'){renderMap();return;}
  if(state.scene==='front') return renderFront();
  if(state.scene==='altiplano') return renderAltiplano();
  if(state.scene==='rental') return renderRental();
  if(state.scene==='initus') return renderInitus();
  if(state.scene==='park') return renderPark();
  if(state.scene==='dark') return renderDark();
  if(state.scene==='church') return renderChurch();
  if(state.scene==='coast') return renderCoast();
  if(state.scene==='river') return renderRiver();
  if(state.scene==='apt2') return renderApt2();
  if(state.scene==='hospital') return renderHospital();
  if(state.scene==='office') return renderOffice();
  if(state.scene==='safe') return renderSafe();
}

function drawInventory(){
  const old=$('#inventory');if(old)old.innerHTML='';
  const row=stage.querySelector('.art-inventory');if(!row)return;
  const icons={cracha:'cracha.svg',ficha:'moeda.svg',lanterna:'lanterna.svg',remo:'remo.svg',baquetas:'baqueta.svg',chave:'chave.svg',recado:'recado_hospital.svg',cartao:'cartao_aniversario.svg'};
  const slots=['cracha','ficha','lanterna','remo','baquetas','chave','recado','cartao'];
  row.innerHTML=slots.map(id=>has(id)?'<div class="art-item filled" title="'+items[id][1]+'"><img src="'+ROOT+'Icones/'+icons[id]+'" alt="'+items[id][1]+'"></div>':'<div class="art-item empty" aria-hidden="true"></div>').join('');
}

function give(id){state.collected[id]=true;if(!state.items.includes(id))state.items.push(id);save();drawInventory();}
function collectNote(id,title,text){
  state.collected[id]=true;
  if(state.notes.some(n=>n.id===id))return;
  state.notes.push({id,title,text});save();drawInventory();
  draw();
  const speaker=({terminal:'Leitor da Initus',park:'Máquina de arcade',church:'Amigo da igreja',bottle:'David',apt2:'Pintor',office:'Médico'})[id]||'David';
  say(speaker,'Você conseguiu! '+title+': '+text+' A pista foi guardada na caderneta.');
}
function markDone(id){if(!state.done.includes(id))state.done.push(id);save();}

function renderFront(){
  const sc=sceneBase('front','Frente da casa');
  const davidClick=!state.started&&!state.flags.intro?()=>{state.flags.intro=true;save();draw();say('David','Vamos começar a busca pelo presente. Pegue o mapa para conhecer os caminhos.')}:null;
  actor(sc,'david','David',37,84,9.5,37,davidClick);
  if(!state.started&&!has('mapa'))sceneItem(sc,'mapa.svg','Mapa da aventura',53,82,6.5,8,()=>{
    if(!state.flags.intro)return say('David','Fale comigo primeiro para começarmos a busca.');
    state.started=true;give('mapa');state.scene='front';save();draw();say('David','Mapa guardado. Agora podemos seguir as placas.');
  });
}

function renderMap(){
  if(!state.started)return showDialog('David','Primeiro pegue o mapa que está no chão.');
  const previous=state.scene==='map'?(state.mapReturn||'front'):state.scene;
  state.mapReturn=previous;state.scene='map';save();$('#sceneName').textContent='Mapa da aventura';
  stage.innerHTML='<div class="map-reference"><h2 class="map-title">Mapa da aventura</h2><img class="map-art" src="'+assets.map+'" alt="Mapa estático da aventura"><p class="map-note">Use as placas nos cenários para escolher o próximo local.</p><button class="map-back" type="button">Voltar</button><div class="art-ui"><button class="art-notes" aria-label="Abrir caderneta"><img src="'+ROOT+'Icones/anotacoes.svg" alt=""></button><button class="art-reset" aria-label="Recomeçar"></button></div></div>';
  stage.querySelector('.map-back').onclick=()=>setScene(previous);stage.querySelector('.art-notes').onclick=showNotes;stage.querySelector('.art-reset').onclick=resetGame;
}

function renderAltiplano(){
  const sc=sceneBase('altiplano','Praça do Altiplano');
  const talk=()=>{if(has('cracha'))return;if(!state.flags.plazaTalk){state.flags.plazaTalk=true;save();return say('Morador da praça','Encontre os seis pares para ganhar o crachá.')};memoryGame();};
  actor(sc,'plaza','Morador da praça',69,84,9,35,has('cracha')?null:talk);
  if(!has('cracha'))sceneItem(sc,'cracha.svg','Crachá',43,78,4.5,7,talk);
}
function memoryGame(){
  if(has('cracha')){toast('Você já conquistou o crachá.');return;}
  const deck=[...Array(6)].flatMap((_,i)=>[i+1,i+1]).sort(()=>Math.random()-.5);
  const ov=gameModal('<h2>Memória do Altiplano</h2><p>Encontre os seis pares para conquistar o crachá.</p><p class="memory-progress" aria-live="polite">Pares encontrados: <b>0</b> / 6</p><div class="anniversary-memory" role="group" aria-label="Doze cartas da memória"></div><div class="card-actions"><button type="button" class="primary memory-close">Voltar à praça</button></div>','memory');
  const board=ov.querySelector('.anniversary-memory'),progress=ov.querySelector('.memory-progress b');
  let first=null,locked=false,matches=0;
  deck.forEach((pair,index)=>{
    const tile=document.createElement('button');tile.type='button';tile.className='memory-tile';tile.dataset.pair=String(pair);tile.setAttribute('aria-label','Carta '+(index+1)+', virada para baixo');
    const back=document.createElement('span');back.textContent='?';const face=document.createElement('img');face.src='../../Jogos_importados/Memory-Card-Game/images/img-'+pair+'.png';face.alt='Figura '+pair;tile.append(back,face);
    tile.addEventListener('click',()=>{
      if(locked||tile.classList.contains('flipped')||tile.classList.contains('matched'))return;
      tile.classList.add('flipped');tile.setAttribute('aria-label','Carta '+(index+1)+', figura revelada');
      if(!first){first=tile;return;}
      const previous=first;first=null;locked=true;
      if(previous.dataset.pair===tile.dataset.pair){
        previous.classList.add('matched');tile.classList.add('matched');previous.disabled=true;tile.disabled=true;matches++;progress.textContent=matches;locked=false;
        if(matches===6){progress.textContent='6';ov.querySelector('.memory-progress').innerHTML='<b>Memória concluída! Crachá conquistado.</b>';setTimeout(()=>{give('cracha');state.flags.plazaWin=true;markDone('memory');save();ov.remove();draw();say('Morador da praça','Você venceu! O crachá foi para o inventário.');},650);}
      }else setTimeout(()=>{previous.classList.remove('flipped');tile.classList.remove('flipped');previous.setAttribute('aria-label','Carta virada para baixo');tile.setAttribute('aria-label','Carta virada para baixo');locked=false;},750);
    });
    board.appendChild(tile);
  });
  ov.querySelector('.memory-close').onclick=()=>{ov.remove();window.GameMusic?.playScene(state.scene);};
}

function renderRental(){
  const sc=sceneBase('rental','Locadora');
  const challenge=()=>{if(!has('cracha'))return requireItem('o crachá','David, para alugar um carro, primeiro pegue o crachá na Praça do Altiplano.');if(!state.flags.rentalTalk){state.flags.rentalTalk=true;save();draw();return say('Colega da locadora','Vamos testar sua habilidade na pista. Sobreviva por 50 segundos para ganhar uma ficha.');}carGame();};
  actor(sc,'rental','Colega da locadora',35,84,9.5,38,has('ficha')?null:challenge);
}
function carGame(){
  if(!has('cracha'))return requireItem('o crachá','David, para retirar um carro, você precisa pegar o crachá na Praça do Altiplano.');
  if(has('ficha')||state.done.includes('car')){toast('Você já conquistou a ficha para a máquina do parque.');return;}
  const ov=minigameModal('road','Road Rush','Conduza por 50 segundos para ganhar uma ficha.');
  const frame=ov.querySelector('iframe');
  const receive=e=>{
    if(e.source!==frame.contentWindow)return;
    if(e.data?.type==='roadChallengeComplete'){
      window.removeEventListener('message',receive);
      give('ficha');state.flags.rentalWin=true;markDone('car');save();ov.remove();draw();say('Colega da locadora','Você venceu! A ficha já está no inventário.');
    }else if(e.data?.type==='roadChallengeReturn'){
      window.removeEventListener('message',receive);ov.remove();draw();
    }
  };
  window.addEventListener('message',receive);
}

function renderInitus(){
  const sc=sceneBase('initus','Initus');
  const challenge=()=>{if(!has('cracha'))return requireItem('o crachá','David, use o crachá da Praça no leitor da porta.');if(!state.flags.terminal)return requireItem('a mensagem do leitor','David, passe o crachá no leitor antes de jogar.');if(!state.flags.initusTalk){state.flags.initusTalk=true;save();draw();return say('Colega da Initus','Vamos jogar uma série. Faça três vitórias antes do colega para conquistar a lanterna. Empates não contam para ninguém.');}ticTacToeGame();};
  actor(sc,'initus','Colega da Initus',66,90,9.5,38,has('lanterna')?null:challenge);
  addSprite(sc,ROOT+'Icones/leitor_initus.svg','Leitor do portão',80,64,5.5,14,hasNote('terminal')?null:terminal,'item');
}
function terminal(){if(hasNote('terminal'))return;if(!has('cracha'))return requireItem('o crachá','David, o leitor só funciona com o crachá que você ganha na Praça do Altiplano.');state.flags.terminal=true;save();collectNote('terminal','Mensagem da Initus','“David, bons caminhos começam com boas companhias. A senha tem seis algarismos. Leia os recados na ordem dos locais indicados no mapa. Para começar: quantos cantos tem um quadrado?”');}
function ticTacToeGame(){
  if(has('lanterna')){toast('Você já ganhou a lanterna.');return;}
  if(!has('cracha'))return requireItem('o crachá','David, você precisa pegar o crachá na Praça do Altiplano.');
  if(!state.flags.terminal)return requireItem('a mensagem do leitor','David, passe o crachá no leitor antes de começar a partida.');
  const ov=minigameModal('tictactoe','Tic-Tac-Toe','Faça três vitórias antes do colega para ganhar a lanterna. Empates não pontuam.');
  const frame=ov.querySelector('iframe');
  const receive=e=>{
    if(e.source!==frame.contentWindow)return;
    if(e.data?.type==='ticTacToeChallengeComplete'){
      give('lanterna');state.flags.initusWin=true;markDone('tictactoe');save();window.removeEventListener('message',receive);ov.remove();draw();say('Colega da Initus','Você venceu! A lanterna está no inventário.');
    }else if(e.data?.type==='ticTacToeChallengeFailed'){
      window.removeEventListener('message',receive);ov.remove();draw();say('Colega da Initus','Ganhei três partidas primeiro! Quando quiser, me desafie para outra série.');
    }else if(e.data?.type==='tictactoeChallengeReturn'){
      window.removeEventListener('message',receive);ov.remove();draw();
    }
  };
  window.addEventListener('message',receive);
}

function renderPark(){
  const sc=sceneBase('park','Parque Solon de Lucena - Lagoa');
  const challenge=()=>{if(hasNote('park'))return;if(!has('ficha'))return requireItem('uma ficha','David, a máquina precisa de uma ficha. Você pode ganhar uma na Locadora.');if(!state.flags.parkTalk){state.flags.parkTalk=true;save();return say('Visitante do parque','Use a ficha na máquina para vencer uma fase fácil de Mine e encontrar a pista.');}mineGame();};
  actor(sc,'park','Atleta do parque',86,75,9.5,38,hasNote('park')?null:challenge);
  addSprite(sc,ROOT+'Icones/Fliperama.svg','Máquina de arcade',27,78,11,38,hasNote('park')?null:challenge,'item');
}
function mineGame(){
  if(state.notes.some(n=>n.id==='park')){toast('A máquina já revelou a pista do cofre.');return;}
  if(!has('ficha'))return requireItem('uma ficha','David, a máquina precisa de uma ficha. Você pode ganhar uma na Locadora.');
  const ov=minigameModal('mine','Mine','Revele todas as casas seguras na fase fácil.');
  const frame=ov.querySelector('iframe');
  const onMessage=e=>{
    if(e.source!==frame.contentWindow)return;
    if(e.data?.type==='mineChallengeReturn'){window.removeEventListener('message',onMessage);ov.remove();return;}
    if(e.data?.type!=='mineChallengeComplete')return;
    window.removeEventListener('message',onMessage);
    state.flags.parkWin=true;state.collected.ficha=false;state.items=state.items.filter(id=>id!=='ficha');save();markDone('mine');
    ov.remove();draw();
    collectNote('park','Recado na máquina do parque','“Uma aranha tem oito pernas. Guarde esse número para a combinação.”');
  };
  window.addEventListener('message',onMessage);
}

function renderDark(){
  const sc=sceneBase('dark','Apartamento no Centro');if(has('lanterna'))sc.classList.add('lit');
  if(!has('lanterna')){
    clickArea(sc,'Procurar remo no escuro',57,78,7,11,()=>requireItem('a lanterna','David, está muito escuro. Pegue a lanterna na Initus para encontrar o remo e as baquetas.'));
    clickArea(sc,'Procurar baquetas no escuro',34,78,5,8,()=>requireItem('a lanterna','David, está muito escuro. Pegue a lanterna na Initus para encontrar os objetos.'));
    return;
  }
  if(!has('remo'))sceneItem(sc,'remo.svg','Remo',57,78,7,11,()=>{give('remo');draw();say('David','Você encontrou o remo. Ele já está no inventário.');});
  if(!has('baquetas'))sceneItem(sc,'baqueta.svg','Baquetas',34,78,4.5,7,()=>{give('baquetas');draw();say('David','Você encontrou as baquetas. Elas já estão no inventário.');});
}

function renderChurch(){
  const sc=sceneBase('church','Igreja Batista');
  const challenge=()=>{if(hasNote('church'))return;if(!has('baquetas'))return requireItem('as baquetas','David, procure as baquetas no Apartamento no Centro.');if(!state.flags.churchTalk){state.flags.churchTalk=true;save();return say('Amigo da igreja','Repita dez passos do Simon para encontrar a próxima pista.');}simonGame();};
  actor(sc,'church','Amigo da igreja',72,99,11,44,hasNote('church')?null:challenge);
}
function simonGame(){
  if(state.notes.some(n=>n.id==='church')){toast('A pista da igreja já está no bloco.');return;}
  if(!has('baquetas'))return requireItem('as baquetas','David, você precisa pegar as baquetas no Apartamento sem luz antes do Simon.');
  const ov=minigameModal('simon','Simon','Repita corretamente a sequência de dez sons para receber a pista.');
  const frame=ov.querySelector('iframe');
  const receive=e=>{
    if(e.source!==frame.contentWindow)return;
    if(e.data?.type==='simonChallengeComplete'){
      state.flags.churchWin=true;markDone('simon');window.removeEventListener('message',receive);ov.remove();collectNote('church','Recado da igreja','“Uma tesoura tem duas lâminas. Guarde esse número para a combinação.”');
    }else if(e.data?.type==='simonChallengeReturn'){
      window.removeEventListener('message',receive);ov.remove();draw();
    }
  };
  window.addEventListener('message',receive);
}

function startRiverCrossing(){
  if(!has('remo'))return requireItem('o remo','David, para atravessar o rio, pegue o remo no Apartamento no Centro.');
  if(!hasNote('church'))return requireItem('a pista da igreja','David, primeiro conclua o desafio da Igreja Batista.');
  riverRushGame();
}
function renderCoast(){
  const sc=sceneBase('coast','Orla de Tambaú');
  const agentClick=()=>{if(state.flags.coastTalk)return;if(!has('remo'))return requireItem('o remo','David, pegue o remo no Apartamento no Centro antes de atravessar.');if(!hasNote('church'))return requireItem('a pista da igreja','David, primeiro conclua o desafio da Igreja Batista.');state.flags.coastTalk=true;save();say('Agente de turismo','Use o remo e siga a placa do Rio para fazer a travessia.');};
  addSprite(sc,ROOT+'Icones/canoa.svg','Canoa na areia',51,69,10,15,null,'item');
  actor(sc,'coast','Agente de turismo',34,84,8.5,39,state.flags.coastTalk?null:agentClick);
}
function riverRushGame(){
  if(!has('remo'))return requireItem('o remo','David, você precisa pegar o remo no Apartamento sem luz.');
  if(!hasNote('church'))return requireItem('a pista da igreja','David, primeiro pegue a pista na Igreja.');
  const ov=minigameModal('river','River Rush','Desvie dos troncos e passe por 10 obstáculos para alcançar a outra margem.');
  const frame=ov.querySelector('iframe');
  const receive=e=>{
    if(e.source!==frame.contentWindow)return;
    if(e.data?.type==='riverChallengeComplete'){
      state.flags.riverOpen=true;markDone('river-crossing');save();window.removeEventListener('message',receive);ov.remove();setScene('river');say('David','Você venceu a travessia e chegou ao Rio no Conde!');
    }else if(e.data?.type==='riverChallengeReturn'){
      window.removeEventListener('message',receive);ov.remove();draw();
    }
  };
  window.addEventListener('message',receive);
}

function renderRiver(){
  const sc=sceneBase('river','Rio no Conde');
  if(!state.collected.bottle&&!hasNote('bottle'))sceneItem(sc,'garrafa.svg','Garrafa com mensagem',44,73,8,14,()=>{if(!state.flags.riverOpen)return requireItem('a travessia do rio','David, primeiro vença a travessia River Rush na Orla.');state.flags.bottle=true;state.collected.bottle=true;save();collectNote('bottle','Mensagem na garrafa','“A próxima parada é o hospital. Uma semana tem sete dias; guarde esse número para a combinação. A pessoa que procura está no consultório indicado por outro recado.”');});
  if(!has('chave'))sceneItem(sc,'chave.svg','Chave na balsa',85,80,2,4.5,()=>{if(!state.flags.riverOpen)return requireItem('a travessia do rio','David, primeiro vença a travessia River Rush na Orla.');give('chave');markDone('key');draw();say('David','Você encontrou a chave da balsa. Ela já está no inventário.');},4,8);
}

function renderApt2(){
  const sc=sceneBase('apt2','Apartamento no Bessa');
  const challenge=()=>{if(has('recado'))return;if(!state.flags.riverOpen)return requireItem('a travessia do rio','David, chegue aqui atravessando o rio pela Orla.');if(!state.flags.apt2Talk){state.flags.apt2Talk=true;save();return say('Pintor','Encontre as sete diferenças para receber o recado do hospital.');}sevenErrors();};
  actor(sc,'apt2','Pintor',69,84,8.5,38,has('recado')?null:challenge);
}
function sevenErrors(){
  if(has('recado')){toast('Você já tem o recado com o número do consultório.');return;}
  if(!state.flags.riverOpen)return requireItem('a travessia do rio','David, chegue aqui atravessando o rio pela Orla.');
  const spots=[[18,47],[53,47],[80,41],[9,78],[23,90],[41,70],[53,79]];let found=[];
  const ov=gameModal('<h2>Sete erros: projeto e pintura</h2><p>Toque nas diferenças. Encontre todas as sete para receber o recado do hospital.</p><div class="scoreline"><span>Diferenças: <b id="diffCount">0</b> / 7</span><span>Erros: <b id="diffMiss">0</b></span></div><div class="compare"><figure><img src="'+assets.before+'" alt="Projeto original"></figure><figure id="afterFigure"><img src="'+assets.after+'" alt="Pintura final"></figure></div>','main');
  const fig=ov.querySelector('#afterFigure');spots.forEach((xy,i)=>{const b=document.createElement('button');b.className='diff-hit';b.style.left=xy[0]+'%';b.style.top=xy[1]+'%';b.setAttribute('aria-label','Encontrar diferença '+(i+1));b.onclick=()=>{if(found.includes(i))return;found.push(i);b.classList.add('found');ov.querySelector('#diffCount').textContent=found.length;if(found.length===7){give('recado');state.flags.apt2Win=true;markDone('seven');save();draw();collectNote('apt2','Recado do hospital','“O consultório é o número 12. Um triângulo tem três pontas; guarde esse número para a combinação. A recepção vai indicar o caminho.”');}};fig.appendChild(b);});
  fig.onclick=e=>{if(e.target.classList.contains('diff-hit'))return;const n=ov.querySelector('#diffMiss');n.textContent=+n.textContent+1;};
}

function renderHospital(){
  const sc=sceneBase('hospital','Recepção do hospital');
  if(!state.flags.officeOpen&&!state.flags.hospitalTalk)clickArea(sc,'Recepcionista',62,46,8,24,()=>{
    if(!has('recado'))return requireItem('o recado do Apartamento no Bessa','David, primeiro encontre os sete erros para receber o recado do hospital.');
    state.flags.hospitalTalk=true;save();say('Recepcionista','Separe os itens médicos para conseguir chegar ao consultório.');
  });
}
function clinicKitGame(){
  if(!has('recado'))return requireItem('o recado do Apartamento no Bessa','David, mostre o recado que recebeu ao encontrar os sete erros.');
  const choices=[['🩺',true],['🩹',true],['🌡️',true],['💊',true],['🧤',true],['🎂',false],['🎈',false],['🎁',false],['🧸',false]].sort(()=>Math.random()-.5);
  const ov=gameModal('<h2>Kit do consultório</h2><p>Selecione os cinco itens médicos para completar o kit. Você pode errar duas vezes.</p><p class="clinic-status" aria-live="polite">Itens corretos: <b>0</b> / 5 · Erros: <b>0</b> / 2</p><div class="clinic-grid"></div>','hospital');
  const grid=ov.querySelector('.clinic-grid'),status=ov.querySelector('.clinic-status');let found=0,errors=0,ended=false;
  const finish=()=>{if(ended)return;ended=true;state.flags.officeOpen=true;state.flags.clinicPass=true;state.flags.hospitalTalk=true;markDone('clinic-kit');save();ov.remove();draw();say('Recepcionista','Você venceu! A recepção está liberada. Toque em qualquer lugar para fechar e depois na placa do Consultório.');};
  const retry=()=>{ov.remove();clinicKitGame();};
  const fail=()=>{ended=true;grid.innerHTML='<p class="clinic-result">O kit ficou incompleto. Tente novamente.</p><button type="button" class="primary clinic-retry">Tentar novamente</button>';ov.querySelector('.clinic-retry').onclick=retry;};
  choices.forEach(([icon,medical])=>{const tile=document.createElement('button');tile.type='button';tile.className='clinic-choice';tile.textContent=icon;tile.setAttribute('aria-label',medical?'Item médico':'Item de festa');tile.onclick=()=>{if(ended||tile.disabled)return;tile.disabled=true;if(medical){tile.classList.add('correct');found++;}else{tile.classList.add('wrong');errors++;}status.innerHTML='Itens corretos: <b>'+found+'</b> / 5 · Erros: <b>'+errors+'</b> / 2';if(found===5)finish();else if(errors>=2)fail();};grid.appendChild(tile);});
}

function renderOffice(){
  const sc=sceneBase('office','Consultório médico');
  actor(sc,'wife','Esposa',30,84,12.5,48,!state.flags.cardTalk?()=>{state.flags.cardTalk=true;save();draw();say('Esposa','David, pegue o cartão de aniversário que deixei no chão do consultório.')}:null);
  if(!hasNote('office'))clickArea(sc,'Médico',49,52,9,32,()=>collectNote('office','Pista do consultório','Em uma noite clara, aparece uma lua. Guarde o número 1 para o cofre.'));
  if(!has('cartao'))sceneItem(sc,'cartao_aniversario.svg','Cartão de aniversário',38,82,5.5,10,()=>{state.flags.cardCollected=true;give('cartao');markDone('office-card');save();draw();say('David','Você guardou o cartão de aniversário no inventário.');});
  clickArea(sc,'Porta para voltar à casa',89,68,9,28,()=>setScene('safe'));
}

const CODE='482731';
function renderSafe(){
  const image=state.flags.ending?sceneImages.safeOpen:(state.flags.safeVisited?sceneImages.safeClosed:sceneImages.safe);
  const sc=sceneBase('safe','Dentro de casa',image);
  if(state.flags.ending){sceneItem(sc,'Carta_tablet.svg','Abrir carta da homenagem',50,62.5,8,12,openTribute,12,18);return;}
  if(!state.flags.safeVisited){actor(sc,'wife','Esposa',54,84,12.5,48,has('cartao')&&!state.flags.homeTalk?()=>{state.flags.homeTalk=true;save();draw();say('Esposa','Feliz aniversário! Vamos sair para comemorar. Antes, há uma mensagem no cofre para você.');}:null);}
  if(state.flags.safeVisited){
    const back=document.createElement('button');back.className='safe-return';back.type='button';back.textContent='↩';back.setAttribute('aria-label','Voltar para a sala');back.onclick=()=>{state.flags.safeVisited=false;save();draw();};sc.appendChild(back);
  }
  clickArea(sc,'Cofre',state.flags.safeVisited?51:73,state.flags.safeVisited?54:69,state.flags.safeVisited?29:11,state.flags.safeVisited?45:17,()=>{
    if(!state.flags.homeTalk&&has('cartao')){
      state.flags.homeTalk=true;save();draw();
      return say('Esposa','Feliz aniversário! Vamos sair para comemorar. Antes, há uma mensagem no cofre para você.');
    }
    if(!state.flags.safeVisited){state.flags.safeVisited=true;save();draw();return;}
    if(!has('chave')){
      state.flags.missingKeyTalk=true;state.flags.safeVisited=false;save();draw();
      return say('Esposa','David, o cofre está trancado com chave. Ela deve ter caído pelo caminho, acho que quando você foi ao rio.');
    }
    const missing=clueOrder.filter(id=>!hasNote(id));
    if(missing.length){
      state.flags.safeVisited=false;save();draw();
      return say('David','Eu já tenho a chave, mas preciso da combinação de seis dígitos. Ainda faltam pistas na caderneta para conseguir a senha.');
    }
    openSafe();
  });
}
function openSafe(){
  if(!has('chave')){
    state.flags.missingKeyTalk=true;save();draw();
    return say('Esposa','David, o cofre está trancado com chave. Ela deve ter caído pelo caminho, acho que quando você foi ao rio.');
  }
  const missing=clueOrder.filter(id=>!hasNote(id));
  if(missing.length){
    return say('David','Eu já tenho a chave, mas preciso da combinação de seis dígitos. Ainda faltam pistas na caderneta para conseguir a senha.');
  }
  const ov=modal('<h2>🔐 Cofre</h2><p>Digite a senha numérica de seis dígitos.</p><div class="safe-digits">'+Array.from({length:6},(_,i)=>'<input inputmode="numeric" maxlength="1" aria-label="Dígito '+(i+1)+'">').join('')+'</div><p id="safeMsg" class="small">As pistas coletadas aparecem no bloco de anotações.</p><div class="card-actions"><button class="primary" id="unlock">Tentar abrir</button><button onclick="this.closest(\'.overlay\').remove()">Cancelar</button></div>');
  const inputs=[...ov.querySelectorAll('input')];inputs.forEach((el,i)=>el.oninput=()=>{el.value=el.value.replace(/\D/g,'').slice(0,1);if(el.value&&inputs[i+1])inputs[i+1].focus();});ov.querySelector('#unlock').onclick=()=>{const val=inputs.map(i=>i.value).join('');if(val===CODE){state.flags.ending=true;save();ov.remove();draw();say('David','Você venceu! O cofre se abriu e o tablet está pronto para revelar a homenagem.');}else ov.querySelector('#safeMsg').textContent='Combinação incorreta. Releia o bloco e tente novamente.';};
}
function openTribute(){
  const tribute=window.open('../../Mensagem_homenagem/index.html','_blank');
  if(!tribute)toast('O tesouro foi encontrado! Permita abrir a página de homenagem para ver a galeria.');
}

function showNotes(){
  const ordered=[...state.notes].sort((a,b)=>{const ai=clueOrder.indexOf(a.id),bi=clueOrder.indexOf(b.id);return (ai<0?99:ai)-(bi<0?99:bi);});
  const entries=ordered.length?ordered.map(n=>'<article class="note-entry"><b>'+esc(n.title)+'</b><br>'+esc(n.text)+'</article>').join(''):'<p>Nenhum recado encontrado ainda. Explore os locais e procure pistas.</p>';
  modal('<section class="journal"><header class="journal-heading"><svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 7h25v34H13a5 5 0 0 1-5-5V12a5 5 0 0 1 5-5Zm0 0v34m8-26h11m-11 7h11m-11 7h8"/></svg><div><h2>Caderneta de David</h2><p>Recados e pistas reunidos pelo caminho</p></div></header><div class="note-list">'+entries+'</div><div class="card-actions"><button class="primary" onclick="this.closest(\'.overlay\').remove()">Fechar caderneta</button></div></section>');
}

function resetGame(){if(confirm('Apagar o progresso e recomeçar a aventura?')){state=blank();save();draw();}}
$('#mapButton').onclick=renderMap;
$('#notesButton').onclick=showNotes;
$('#resetButton').onclick=resetGame;
window.renderMap=renderMap;window.setScene=setScene;window.draw=draw;window.memoryGame=memoryGame;window.carGame=carGame;window.terminal=terminal;window.ticTacToeGame=ticTacToeGame;window.mineGame=mineGame;window.simonGame=simonGame;window.riverRushGame=riverRushGame;window.sevenErrors=sevenErrors;window.clinicKitGame=clinicKitGame;
draw();
