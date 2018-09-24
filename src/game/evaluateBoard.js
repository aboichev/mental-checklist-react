const getAbsValue = (piece) => {
    if (piece.type === 'p') {
        return 1;
    } else if (piece.type === 'n') {
        return 3;
    } else if (piece.type === 'b') {
        return 3;
    } else if (piece.type === 'r') {
        return 5 ;
    } else if (piece.type === 'q') {
        return 9;
    } else if (piece.type === 'k') {
        return 10000;
    }
    throw new Error("Unknown piece type: " + piece.type);
};

const getPieceValue = (piece) => {
    if (piece === null) {
        return 0;
    }
    var absValue = getAbsValue(piece);
    return piece.color === 'w' ? absValue : -absValue;
};
  
export default (board) => {
    var totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j]);
        }
    }
    return totalEvaluation;
};