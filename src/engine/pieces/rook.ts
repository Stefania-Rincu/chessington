import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);

        // Define lists for horizontal and vertical movements
        const availableMovesH: Square[] = [];
        const availableMovesV: Square[] = [];

        // Complete movements excluding just the square where the rook is placed
        for (let i: number = 0; i < 8; i++) {
            if (i != position.col)
                availableMovesH.push(new Square(position.row, i));
            if (i != position.row)
                availableMovesV.push(new Square(i, position.col));
        }

        return availableMovesH.concat(availableMovesV);
    }
}
