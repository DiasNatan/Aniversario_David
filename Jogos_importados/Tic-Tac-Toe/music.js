(() => {
  const music = new Audio('../../Musica/lnplusmusic%20-%20tic%20tac%20toe.mp3');
  music.loop = true;
  music.preload = 'auto';
  music.volume = 0.3;
  let unlocked = false;
  let playing = false;
  let finished = false;
  let fading = false;
  let fadeToken = 0;

  function start() {
    unlocked = true;
    if (finished) return;
    if (playing && !music.paused) {
      if (fading) {
        fading = false;
        const token = ++fadeToken;
        const from = music.volume;
        const began = performance.now();
        const fadeIn = now => {
          if (token !== fadeToken) return;
          const progress = Math.min(1, (now - began) / 300);
          music.volume = from + (0.3 - from) * progress;
          if (progress < 1) requestAnimationFrame(fadeIn);
        };
        requestAnimationFrame(fadeIn);
      }
      return;
    }
    music.volume = 0.3;
    music.play().then(() => { playing = true; }).catch(() => {});
  }

  function stop(done = () => {}, endChallenge = false) {
    if (endChallenge) finished = true;
    if (music.paused) { done(); return; }
    fading = true;
    const token = ++fadeToken;
    const from = music.volume;
    const began = performance.now();
    const fadeOut = now => {
      if (token !== fadeToken) return;
      const progress = Math.min(1, (now - began) / 400);
      music.volume = from * (1 - progress);
      if (progress < 1) requestAnimationFrame(fadeOut);
      else {
        music.pause();
        music.currentTime = 0;
        music.volume = 0.3;
        playing = false;
        fading = false;
        done();
      }
    };
    requestAnimationFrame(fadeOut);
  }

  document.addEventListener('pointerdown', start, { once: true, capture: true });
  document.addEventListener('keydown', start, { once: true, capture: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) stop();
    else if (unlocked) start();
  });
  window.addEventListener('message', event => {
    if (event.data?.type === 'challengeStopMusic') stop(() => {}, true);
  });

  window.TicTacToeMusic = {
    finish(type) {
      stop(() => window.parent.postMessage({ type }, '*'), true);
    }
  };
})();
