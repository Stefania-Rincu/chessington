import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from './king';
import {isNotOutside, isSquareEmpty} from "../movePieces";

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);
        const availableMoves: Square[] = [];

        let mapMoves = new Map<Player, number[][]>([
            [Player.WHITE, [[1, 0], [2, 0], [1, -1], [1, 1]]],
            [Player.BLACK, [[-1, 0], [-2, 0], [-1, -1], [-1, 1]]]
        ]);

        const moves = mapMoves.get(this.player);

        if (moves != undefined) {
            if (isNotOutside(new Square(position.row + moves[0][0], position.col)) && isSquareEmpty(board, new Square(position.row + moves[0][0], position.col))) {
                availableMoves.push(new Square(position.row + moves[0][0], position.col));

                if (((position.row === 1 && this.player === Player.WHITE) || (position.row === 6 && this.player === Player.BLACK))
                    && isNotOutside(new Square(position.row + moves[1][0], position.col)) && isSquareEmpty(board, new Square(position.row + moves[1][0], position.col)))
                    availableMoves.push(new Square(position.row + moves[1][0], position.col));
            }

            // Can move diagonally only if a piece is there
            for (let i: number = 2; i < moves.length; i++) {
                if (isNotOutside(new Square(position.row + moves[i][0], position.col + moves[i][1])) && !isSquareEmpty(board, new Square(position.row + moves[i][0], position.col + moves[i][1]))) {
                    const otherPiece = board.getPiece(new Square(position.row + moves[i][0], position.col + moves[i][1]));

                    if (otherPiece?.player != this.player && !(otherPiece instanceof King))
                        availableMoves.push(new Square(position.row + moves[i][0], position.col + moves[i][1]));
                }
            }
        }
        return availableMoves;
    }
}
