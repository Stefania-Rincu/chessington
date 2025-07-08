import Square from "./square";
import Board from "./board";
import Player from "./player";
import King from "./pieces/king";
import GameSettings from './gameSettings';

export function isNotOutside(cell: Square): boolean {
    return (cell.row >= 0 && cell.col >= 0 && cell.row < GameSettings.BOARD_SIZE && cell.col < GameSettings.BOARD_SIZE);
}

export function isSquareEmpty(board: Board, cell: Square): boolean {
    return (board.getPiece(cell) === undefined);
}

// Function to define iterative moves (bishop, rook, queen)
export function findAvailableMovesIterative(board: Board, directions: number[][], position: Square, player: Player) {
    const availableMoves: Square[] = [];

    for (const dir of directions) {
        let row: number = position.row;
        let col: number = position.col;

        while (isNotOutside(new Square(row + dir[0], col + dir[1])) && isSquareEmpty(board, new Square(row + dir[0], col + dir[1]))) {
            row += dir[0];
            col += dir[1];

            availableMoves.push(new Square(row, col));
        }

        if (isNotOutside(new Square(row + dir[0], col + dir[1])) && ! isSquareEmpty(board, new Square(row + dir[0], col + dir[1]))) {
            const otherPiece = board.getPiece(new Square(row + dir[0], col + dir[1]));

            if (otherPiece?.player != player && ! (otherPiece instanceof King))
                availableMoves.push(new Square(row + dir[0], col + dir[1]));
        }
    }
    return availableMoves;
}

export function findAvailableMovesNotIterative(board: Board, directions: number[][], position: Square, player: Player) {
    const availableMoves: Square[] = [];

    for (const dir of directions) {
        let row: number = position.row;
        let col: number = position.col;

        if (isNotOutside(new Square(row + dir[0], col + dir[1])) && isSquareEmpty(board, new Square(row + dir[0], col + dir[1])))
            availableMoves.push(new Square(row + dir[0], col + dir[1]));

        if (isNotOutside(new Square(row + dir[0], col + dir[1])) && ! isSquareEmpty(board, new Square(row + dir[0], col + dir[1]))) {
            const otherPiece = board.getPiece(new Square(row + dir[0], col + dir[1]));

            if (otherPiece?.player != player && ! (otherPiece instanceof King))
                availableMoves.push(new Square(row + dir[0], col + dir[1]));
        }
    }
    return availableMoves;
}