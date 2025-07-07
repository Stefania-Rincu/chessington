import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';


export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        const position: Square = board.findPiece(this);

        // Define possible movements (directions)
        const directions: number[][] = [[-1, 0], [1, 0], [0, 1], [0, -1], [-1, 1], [1, -1], [1, 1], [-1, -1]];

        // Define list to store movements
        const availableMoves: Square[] = [];

        // Construct the list of possible movement positions
        for (const dir of directions)
            if (this.isNotOutside(position.row + dir[0]) && this.isNotOutside(position.col + dir[1]))
                availableMoves.push(new Square(position.row + dir[0], position.col + dir[1]));

        return availableMoves;
    }
}
