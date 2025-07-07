import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';


export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);

        // Define possible movements (directions)
        const directions: number[][] = [[-1, -1], [1, 1], [-1, 1], [1, -1]];
        const availableMoves: Square[] = [];

        // For each direction compute the movements
        for (const dir of directions) {
            let row: number = position.row;
            let col: number = position.col;

            while (this.isNotOutside(row + dir[0]) && this.isNotOutside(col + dir[1]) && this.isSquareEmpty(board, row + dir[0], col + dir[1])) {
                row += dir[0];
                col += dir[1];

                availableMoves.push(new Square(row, col));
            }
        }
        return availableMoves;
    }
}
