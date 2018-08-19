import Chess from 'chess.js'

const init = () => {
  const game = new Chess();
  return game;
};

export { init };