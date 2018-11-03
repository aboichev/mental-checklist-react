import evaluateBoard from './evaluateBoard'

let positionCount = 0;

const minimax = (depth, game, alpha, beta, isMaximisingPlayer) => {
    // if (depth === 0) {
    //     const isBlack = game.turn() === 'b';
    //     const absValue = evaluateBoard(game.board());
    //     const sideAdjustedValue = isBlack ? -absValue : absValue;
    //     return sideAdjustedValue;
    // }
    positionCount++;
    if (depth === 0) {
        return -evaluateBoard(game.board());
    }


    const newGameMoves = game.ugly_moves();

    if (isMaximisingPlayer) {
        let bestMove = -9999;
        for (let i = 0; i < newGameMoves.length; i++) {
            game.ugly_move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
    else {
        let bestMove = 9999;
        for (let i = 0; i < newGameMoves.length; i++) {
            game.ugly_move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
};

const getBestMove = (depth, game) => {

    const newGameMoves = game.ugly_moves();
    let bestMove = -9999;
    let bestMoveFound;

    positionCount = 0;

    for(let i = 0; i < newGameMoves.length; i++) {
        const newGameMove = newGameMoves[i];
        game.ugly_move(newGameMove);
        const value = minimax(depth - 1, game, -10000, 10000, false);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }            
    }
    console.log('positions:', positionCount);
    bestMoveFound = game.make_pretty(bestMoveFound)
    return bestMoveFound;
};

export default getBestMove;