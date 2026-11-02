(() => {
  const base = '../../Musica/';
  const tracks = {
    main: 'maksymmalko-game-principal.mp3',
    memory: 'hitslab - jogo da memoria.mp3',
    racing: 'dmassaiii - Minigame corrida.mp3',
    tictactoe: 'lnplusmusic - tic tac toe.mp3',
    dark: 'liecio-dark-ambient - Apartamento no Centro sem luz.mp3',
    hospital: 'Game do hospital.mp3'
  };
  const audio = document.createElement('audio');
  audio.preload = 'auto';
  audio.loop = true;
  audio.volume = 0;
  audio.setAttribute('aria-hidden', 'true');
  document.body.appendChild(audio);

  let desiredTrack = null;
  let currentTrack = '';
  let unlocked = false;
  let fadingOut = false;
  let fadeToken = 0;

  function fadeTo(target, duration, token, done) {
    const startVolume = audio.volume;
    const startedAt = performance.now();
    const tick = now => {
      if (token !== fadeToken) return;
      const progress = Math.min(1, (now - startedAt) / duration);
      audio.volume = startVolume + (target - startVolume) * progress;
      if (progress < 1) requestAnimationFrame(tick);
      else if (done) done();
    };
    requestAnimationFrame(tick);
  }

  function play(track) {
    desiredTrack = tracks[track] ? track : 'main';
    if (!unlocked) return;
    if (currentTrack === desiredTrack && !audio.paused) {
      if (fadingOut) {
        fadingOut = false;
        const token = ++fadeToken;
        fadeTo(0.34, 500, token);
      }
      return;
    }

    const token = ++fadeToken;
    const nextTrack = desiredTrack;
    const startNewTrack = () => {
      if (token !== fadeToken) return;
      audio.pause();
      fadingOut = false;
      currentTrack = nextTrack;
      audio.src = base + encodeURIComponent(tracks[nextTrack]);
      audio.load();
      audio.currentTime = 0;
      audio.volume = 0;
      audio.play().then(() => {
        if (token === fadeToken) fadeTo(0.34, 650, token);
      }).catch(() => {
        if (token === fadeToken) currentTrack = '';
      });
    };

    if (!audio.paused && audio.currentTime > 0) fadeTo(0, 550, token, startNewTrack);
    else startNewTrack();
  }

  function unlock() {
    if (unlocked) return;
    unlocked = true;
    play(desiredTrack);
  }

  function playScene(scene) {
    play(scene === 'dark' ? 'dark' : 'main');
  }

  function suspend() {
    desiredTrack = null;
    fadeOut();
  }

  function fadeOut() {
    if (audio.paused) return;
    fadingOut = true;
    const token = ++fadeToken;
    fadeTo(0, 450, token, () => {
      audio.pause();
      currentTrack = '';
      fadingOut = false;
    });
  }

  document.addEventListener('pointerdown', unlock, { once: true, capture: true });
  document.addEventListener('keydown', unlock, { once: true, capture: true });
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) fadeOut();
    else if (unlocked && desiredTrack) play(desiredTrack);
  });
  window.addEventListener('pagehide', fadeOut, { once: true });

  window.GameMusic = { play, playScene, fadeOut, suspend };
})();
