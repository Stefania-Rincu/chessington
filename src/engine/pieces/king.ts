import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

// Function to check that a piece is not placed outside the board
function isValid(cell: number, step: number) {
    return (cell + step < 8 && cell + step >= 0);
}

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);

        // Define possible movements
        const moves: number[][] = [[-1, 0], [1, 0], [0, 1], [0, -1], [-1, 1], [1, -1], [1, 1], [-1, -1]];

        // Define list to store movements
        const availableMoves: Square[] = [];

        // Construct the list of possible movement positions
        for (const move of moves)
            if (isValid(position.row, move[0]) && isValid(position.col, move[1]))
                availableMoves.push(new Square(position.row + move[0], position.col + move[1]));

        return availableMoves;
    }
}
