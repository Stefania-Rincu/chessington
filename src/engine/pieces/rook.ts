import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

import {findAvailableMovesIterative} from '../movePieces';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);
        const directions: number[][] = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        return findAvailableMovesIterative(board, directions, position, this.player);
    }
}
