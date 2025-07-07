import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from './king';


export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);

        // Define possible movements (directions)
        const directions: number[][] = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]];
        const availableMoves: Square[] = [];

        // For each possible direction generate movements
        for (const dir of directions) {
            let row: number = position.row;
            let col: number = position.col;

            // Add constraints to respect rules
            if (this.isNotOutside(row + dir[0]) && this.isNotOutside(col + dir[1]) && this.isSquareEmpty(board, row + dir[0], col + dir[1]))
                availableMoves.push(new Square(row + dir[0], col + dir[1]));

            // If the cell is not empty, but it's inside the board
            if (this.isNotOutside(row + dir[0]) && this.isNotOutside(col + dir[1]) && !this.isSquareEmpty(board, row + dir[0], col + dir[1])) {
                // Get the piece on the square
                const otherPiece = board.getPiece(new Square(row + dir[0], col + dir[1]));

                // If from other player and not king, take it
                if (otherPiece?.player != this.player && !(otherPiece instanceof King))
                    availableMoves.push(new Square(row + dir[0], col + dir[1]));
            }
        }

        return availableMoves;
    }
}
