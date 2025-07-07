import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from "./king";

// Function to check that a piece is not placed outside the board
function isValid(cell: number, step: number): boolean {
    return (cell + step < 8 && cell + step >= 0);
}

// Function that checks if a square is empty
function isEmpty(row: number, col: number, board: Board): boolean {
    return (!(board.getPiece(new Square(row, col)) instanceof Piece));
}

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);

        // Define possible moves (directions)
        const moves: number[][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const availableMoves: Square[] = [];

        // Iterate through directions
        for (const move of moves) {
            let row: number = position.row;
            let col: number = position.col;

            // While the new square is not outside the board and the cell it's empty add new possible movements
            while (isValid(row, move[0]) && isValid(col, move[1]) && isEmpty(row + move[0], col + move[1], board)) {
                row += move[0];
                col += move[1];

                availableMoves.push(new Square(row, col));
            }

            // If the last cell was not empty and still inside the board
            if (isValid(row, move[0]) && isValid(col, move[1]) && ! isEmpty(row + move[0], col + move[1], board)) {
                // Get the piece on the square
                const otherPiece = board.getPiece(new Square(row + move[0], col + move[1]));
                // If from other player and not king, take it
                if (otherPiece?.player != this.player && ! (otherPiece instanceof King)) {
                    row += move[0];
                    col += move[1];
                    availableMoves.push(new Square(row, col));
                }
            }
        }

        return availableMoves;
    }
}
