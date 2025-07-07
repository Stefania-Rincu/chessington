import Square from "./square";
import Board from "./board";
import Player from "./player";
import King from "./pieces/king";

export function isNotOutside(cell: Square): boolean {
    return (cell.row >= 0 && cell.col >= 0 && cell.row < 8 && cell.col < 8);
}

// Function that checks if a square is empty
export function isSquareEmpty(board: Board, cell: Square): boolean {
    return (board.getPiece(cell) === undefined);
}

// Function to define iterative moves (bishop, rook, queen)
export function findAvailableMovesIterative(board: Board, directions: number[][], position: Square, player: Player) {
    const availableMoves: Square[] = [];

    // For each possible direction generate movements
    for (const dir of directions) {
        let row: number = position.row;
        let col: number = position.col;

        // Add constraints to respect rules
        while (isNotOutside(new Square(row + dir[0], col + dir[1])) && isSquareEmpty(board, new Square(row + dir[0], col + dir[1]))) {
            row += dir[0];
            col += dir[1];

            availableMoves.push(new Square(row, col));
        }

        // If the last cell was not empty and still inside the board
        if (isNotOutside(new Square(row + dir[0], col + dir[1])) && ! isSquareEmpty(board, new Square(row + dir[0], col + dir[1]))) {
            // Get the piece on the square
            const otherPiece = board.getPiece(new Square(row + dir[0], col + dir[1]));

            // If from other player and not king, take it
            if (otherPiece?.player != player && ! (otherPiece instanceof King))
                availableMoves.push(new Square(row + dir[0], col + dir[1]));
        }
    }
    return availableMoves;
}

export function findAvailableMovesNotIterative(board: Board, directions: number[][], position: Square, player: Player) {
    const availableMoves: Square[] = [];

    // For each possible direction generate movements
    for (const dir of directions) {
        let row: number = position.row;
        let col: number = position.col;

        // Add constraints to respect rules
        if (isNotOutside(new Square(row + dir[0], col + dir[1])) && isSquareEmpty(board, new Square(row + dir[0], col + dir[1])))
            availableMoves.push(new Square(row + dir[0], col + dir[1]));

        // If the last cell was not empty and still inside the board
        if (isNotOutside(new Square(row + dir[0], col + dir[1])) && ! isSquareEmpty(board, new Square(row + dir[0], col + dir[1]))) {
            // Get the piece on the square
            const otherPiece = board.getPiece(new Square(row + dir[0], col + dir[1]));

            // If from other player and not king, take it
            if (otherPiece?.player != player && ! (otherPiece instanceof King))
                availableMoves.push(new Square(row + dir[0], col + dir[1]));
        }
    }
    return availableMoves;
}