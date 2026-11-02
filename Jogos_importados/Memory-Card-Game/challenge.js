const cardsEl = document.querySelector('#cards');
const progressEl = document.querySelector('#progress');
const deck = [...Array(6)].flatMap((_, i) => [i + 1, i + 1]).sort(() => Math.random() - 0.5);
let first = null;
let locked = false;
let matched = 0;

deck.forEach((pair, index) => {
  const card = document.createElement('li');
  card.className = 'card';
  card.dataset.pair = String(pair);
  card.setAttribute('aria-label', `Carta ${index + 1}`);
  card.innerHTML = '<div class="view front-view"><img src="images/que_icon.svg" alt="Virada para baixo"></div>' +
    `<div class="view back-view"><img src="images/img-${pair}.png" alt="Figura ${pair}"></div>`;
  card.addEventListener('click', () => flip(card));
  cardsEl.appendChild(card);
});

function flip(card) {
  if (locked || card.classList.contains('flip') || card.classList.contains('matched')) return;
  card.classList.add('flip');
  if (!first) { first = card; return; }

  const second = card;
  locked = true;
  if (first.dataset.pair === second.dataset.pair) {
    first.classList.add('matched');
    second.classList.add('matched');
    first = null;
    locked = false;
    matched++;
    progressEl.textContent = `Pares: ${matched} / 6`;
    if (matched === 6) {
      progressEl.textContent = 'Memória concluída! Crachá conquistado.';
      window.parent.postMessage({ type: 'memoryChallengeComplete' }, '*');
    }
    return;
  }

  const previous = first;
  first = null;
  window.setTimeout(() => {
    previous.classList.remove('flip');
    second.classList.remove('flip');
    locked = false;
  }, 800);
}
