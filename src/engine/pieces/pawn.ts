import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);
        const availableMoves: Square[] = [];

        if (this.player === Player.WHITE) {
            // Make white pawn move one square up
            if (this.isNotOutside(position.row + 1) && this.isSquareEmpty(board, position.row + 1, position.col)) {
                availableMoves.push(new Square(position.row + 1, position.col));

                // If first move, make white pawn move two squares up
                if (position.row === 1 && this.isNotOutside(position.row + 2) && this.isSquareEmpty(board, position.row + 2, position.col))
                    availableMoves.push(new Square(position.row + 2, position.col));
            }
        } else {
            // Make black pawn move one square down
            if (this.isNotOutside(position.row - 1) && this.isSquareEmpty(board, position.row - 1, position.col)) {
                availableMoves.push(new Square(position.row - 1, position.col));

                // If first move, make black pawn move two squares down
                if (position.row === 6 && this.isNotOutside(position.row - 2) && this.isSquareEmpty(board, position.row -2, position.col))
                    availableMoves.push(new Square(position.row - 2, position.col));
            }
        }

        return availableMoves;
    }
}
