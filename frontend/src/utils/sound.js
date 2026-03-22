let hoverSound = new Audio("/sound.mp3");
hoverSound.volume = 0.15; // subtle

export const playHover = () => {
  hoverSound.currentTime = 0;
  hoverSound.play();
};