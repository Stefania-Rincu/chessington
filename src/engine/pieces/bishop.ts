import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

// Function to check that a piece is not placed outside the board
function isValid(cell: number, step: number): boolean {
    return (cell + step < 8 && cell + step >= 0);
}

// Function that checks if a square is empty
function isEmpty(row: number, col: number, board: Board): boolean {
    return (!(board.getPiece(new Square(row, col)) instanceof Piece));
}

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);

        const moves: number[][] = [[-1, -1], [1, 1], [-1, 1], [1, -1]];
        const availableMoves: Square[] = [];

        for (const move of moves) {
            let row: number = position.row;
            let col: number = position.col;

            while (isValid(row, move[0]) && isValid(col, move[1]) && isEmpty(row + move[0], col + move[1], board)) {
                row += move[0];
                col += move[1];

                availableMoves.push(new Square(row, col));
            }
        }
        return availableMoves;
    }
}
