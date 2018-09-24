import evaluateBoard from './evaluateBoard'

var minimax = (depth, game, isMaximisingPlayer) => {
    if (depth === 0) {
        const isBlack = game.turn() === 'b';
        const gameValue = evaluateBoard(game.board());
        const playerValue = isBlack ? -gameValue : gameValue;
        return playerValue;
    }
    const newGameMoves = game.moves();
    if (isMaximisingPlayer) {
        let bestMove = -9999;
        for (let i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, !isMaximisingPlayer));
            game.undo();
        }
        return bestMove;
    }
    else {
        let bestMove = 9999;
        for (let i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, !isMaximisingPlayer));
            game.undo();
        }
        return bestMove;
    }
};

const getBestMove = (depth, game) => {

    const newGameMoves = game.moves();
    let bestMove = -9999;
    let bestMoveFound;

    for(let i = 0; i < newGameMoves.length; i++) {
        const newGameMove = newGameMoves[i];
        game.move(newGameMove);
        const value = minimax(depth - 1, game, false);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }            
    }
    return bestMoveFound;
};

export default getBestMove;