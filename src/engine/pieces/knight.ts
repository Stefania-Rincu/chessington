import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);
        // Knight -> L movement -> two squares (row / col), then another one (col / row)
        const moves1: number[] = [-2, 2];
        const moves2: number[] = [-1, 1];

        // Define available movements
        const availableMoves: Square[] = [];

        // Simulate the L movement -> moves two squares on row / col and another one on col / row
        for (let i: number = 0; i < moves1.length; i++) {
            for (let j: number = 0; j < moves2.length; j++) {
                if (this.isNotOutside(position.row + moves1[i]) && this.isNotOutside(position.col + moves2[j]))
                    availableMoves.push(new Square(position.row + moves1[i], position.col + moves2[j]));

                if (this.isNotOutside(position.col + moves1[i]) && this.isNotOutside(position.row + moves2[j]))
                    availableMoves.push(new Square(position.row + moves2[j], position.col + moves1[i]));
            }
        }

        return availableMoves;
    }
}
