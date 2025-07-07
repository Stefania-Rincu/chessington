import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Piece {
    public player: Player;

    public constructor(player: Player) {
        this.player = player;
    }

    // Function to check that a piece is not placed outside the board
    public isNotOutside(cell: number): boolean {
        return cell >= 0 && cell < 8;
    }

    // Function that checks if a square is empty
    public isSquareEmpty(board: Board, row: number, col: number): boolean {
        return (!(board.getPiece(new Square(row, col)) instanceof Piece));
    }

    public getAvailableMoves(board: Board) {
        throw new Error('This method must be implemented, and return a list of available moves');
    }

    public moveTo(board: Board, newSquare: Square) {
        const currentSquare = board.findPiece(this);
        board.movePiece(currentSquare, newSquare);
    }
}
