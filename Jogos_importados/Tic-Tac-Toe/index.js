const boxes = [...document.querySelectorAll('.box')];
const statusEl = document.querySelector('.status');
const restartBtn = document.querySelector('.restartBtn');
const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
let board = Array(9).fill('');
let running = true;
let waitingForColleague = false;
let davidWins = 0;
let colleagueWins = 0;

function updateStatus(message = 'Sua vez (X) · Colega joga com O') {
  statusEl.textContent = `Placar — David ${davidWins} × ${colleagueWins} Colega · ${message}`;
}

function winningLine(mark) {
  return wins.find(line => line.every(index => board[index] === mark));
}

function finishRound(line, message, seriesResult = '') {
  running = false;
  waitingForColleague = false;
  updateStatus(message);
  if (line) line.forEach(index => boxes[index].classList.add('win'));

  if (seriesResult === 'won') {
    window.TicTacToeMusic?.finish('ticTacToeChallengeComplete');
  } else if (seriesResult === 'lost') {
    window.TicTacToeMusic?.finish('ticTacToeChallengeFailed');
  } else {
    window.setTimeout(startRound, 1100);
  }
}

function checkOutcome(mark) {
  const line = winningLine(mark);
  if (line) {
    if (mark === 'X') davidWins += 1;
    else colleagueWins += 1;

    if (davidWins === 3) {
      finishRound(line, 'Você venceu a série e conquistou a lanterna!', 'won');
    } else if (colleagueWins === 3) {
      finishRound(line, 'O colega venceu a série. Tente outra vez!', 'lost');
    } else {
      const victor = mark === 'X' ? 'Você venceu esta partida.' : 'O colega venceu esta partida.';
      finishRound(line, `${victor} Próxima partida em instantes.`);
    }
    return true;
  }

  if (!board.includes('')) {
    finishRound(null, 'Deu velha! Ninguém pontua. Próxima partida em instantes.');
    return true;
  }
  return false;
}

function boxClick(event) {
  const index = Number(event.currentTarget.dataset.index);
  if (!running || waitingForColleague || board[index]) return;
  board[index] = 'X';
  event.currentTarget.innerHTML = "<img src='X-Player.png' alt='X'>";
  if (checkOutcome('X')) return;

  running = false;
  waitingForColleague = true;
  updateStatus('Vez do colega…');
  window.setTimeout(() => {
    const available = board.map((mark, i) => mark ? -1 : i).filter(i => i >= 0);
    if (!available.length) { checkOutcome('O'); return; }
    const index = available[Math.floor(Math.random() * available.length)];
    board[index] = 'O';
    boxes[index].innerHTML = "<img src='O-Player.png' alt='O'>";
    if (checkOutcome('O')) return;
    waitingForColleague = false;
    running = true;
    updateStatus();
  }, 450);
}

function startRound() {
  board = Array(9).fill('');
  running = true;
  waitingForColleague = false;
  boxes.forEach(box => { box.innerHTML = ''; box.classList.remove('win'); });
  updateStatus();
}

function restartSeries() {
  davidWins = 0;
  colleagueWins = 0;
  startRound();
}

boxes.forEach(box => box.addEventListener('click', boxClick));
restartBtn.textContent = 'Recomeçar série';
restartBtn.addEventListener('click', restartSeries);
startRound();
