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

        if (this.player === Player.WHITE)
            return [new Square(Math.min(8, position.row + 1), position.col)];
        else
            return [new Square(Math.max(0, position.row - 1), position.col)];
    }
}
