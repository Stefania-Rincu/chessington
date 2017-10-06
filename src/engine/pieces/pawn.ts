import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

function isValid(cell: number, step: number): boolean {
    return (cell + step < 8 && cell + step >= 0);
}

function isEmpty(row: number, col: number, board: Board): boolean {
    return (!(board.getPiece(new Square(row, col)) instanceof Piece));
}

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);
        const availableMoves: Square[] = [];

        if (this.player === Player.WHITE) {
            // Make white pawn move one square up
            if (isValid(position.row, 1) && isEmpty(position.row + 1, position.col, board)) {
                availableMoves.push(new Square(position.row + 1, position.col));

                // If first move, make white pawn move two squares up
                if (position.row === 1 && isValid(position.row, 2) && isEmpty(position.row + 2, position.col, board))
                    availableMoves.push(new Square(position.row + 2, position.col));
            }
        } else {
            // Make black pawn move one square down
            if (isValid(position.row, -1)  && isEmpty(position.row - 1, position.col, board)) {
                availableMoves.push(new Square(position.row - 1, position.col));

                // If first move, make black pawn move two squares down
                if (position.row === 6 && isValid(position.row, -2)  && isEmpty(position.row - 2, position.col, board))
                    availableMoves.push(new Square(position.row - 2, position.col));
            }
        }

        return availableMoves;
    }
}
