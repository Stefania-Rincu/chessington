import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from './king';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);
        const availableMoves: Square[] = [];
        let direction: number[][];

        if (this.player === Player.WHITE) {
            // Make white pawn move one square up
            if (this.isNotOutside(position.row + 1) && this.isSquareEmpty(board, position.row + 1, position.col)) {
                availableMoves.push(new Square(position.row + 1, position.col));

                // If first move, make white pawn move two squares up
                if (position.row === 1 && this.isNotOutside(position.row + 2) && this.isSquareEmpty(board, position.row + 2, position.col))
                    availableMoves.push(new Square(position.row + 2, position.col));
            }

            direction = [[1, -1], [1, 1]];
        } else {
            // Make black pawn move one square down
            if (this.isNotOutside(position.row - 1) && this.isSquareEmpty(board, position.row - 1, position.col)) {
                availableMoves.push(new Square(position.row - 1, position.col));

                // If first move, make black pawn move two squares down
                if (position.row === 6 && this.isNotOutside(position.row - 2) && this.isSquareEmpty(board, position.row -2, position.col))
                    availableMoves.push(new Square(position.row - 2, position.col));
            }

            direction = [[-1, -1], [-1, 1]];
        }

        for (const dir of direction)
            // If the last cell was not empty and still inside the board
            if (this.isNotOutside(position.row + dir[0]) && this.isNotOutside(position.col + dir[1]) && ! this.isSquareEmpty(board, position.row + dir[0], position.col + dir[1])) {
                // Get the piece on the square
                const otherPiece = board.getPiece(new Square(position.row + dir[0], position.col + dir[1]));

                // If from other player and not king, take it
                if (otherPiece?.player != this.player && ! (otherPiece instanceof King))
                    availableMoves.push(new Square(position.row + dir[0], position.col + dir[1]));
            }

        return availableMoves;
    }
}
