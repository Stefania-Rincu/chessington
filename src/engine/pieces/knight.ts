import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import {findAvailableMovesNotIterative} from "../movePieces";


export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);
        const directions: number[][] = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [-1, 2], [1, -2], [-1, -2]];
        return findAvailableMovesNotIterative(board, directions, position, this.player);
    }
}
