import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import {findAvailableMovesNotIterative} from "../movePieces";


export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);

        // Define possible movements (directions)
        const directions: number[][] = [[-1, 0], [1, 0], [0, 1], [0, -1], [-1, 1], [1, -1], [1, 1], [-1, -1]];
        return findAvailableMovesNotIterative(board, directions, position, this.player);
    }
}
