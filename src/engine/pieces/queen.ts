import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from "../square";

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);

        // Define lists for horizontal and vertical movements
        const availableMovesH: Square[] = [];
        const availableMovesV: Square[] = [];

        // Define list of forward and backward moves
        const forwardMoves: Square[] = [];
        const backwardMoves: Square[] = [];

        // Complete moves literally and diagonally excluding just the square where the queen is placed
        for (let i: number = 0; i < 8; i ++) {
            // Horizontal and vertical moves
            if (i != position.col)
                availableMovesH.push(new Square(position.row, i));
            if (i != position.row)
                availableMovesV.push(new Square(i, position.col));

            // Diagonal moves
            const j: number = Math.abs(position.row - position.col) + i;
            const k: number = position.col + position.row - i;

            // Check indices to not access invalid positions
            if (i != position.row && j != position.col && j < 8 && j >= 0)
                forwardMoves.push(new Square(i, j));
            if (i != position.row && k != position.col && k < 8 && k >= 0)
                backwardMoves.push(new Square(i, k));
        }

        return availableMovesH.concat(availableMovesV).concat(forwardMoves).concat(backwardMoves);
    }
}
