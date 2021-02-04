class Chess extends Phaser.Scene {
        preload() {
                this.load.image('BlackKnight', './Assets/BlackKnight.png')
                this.load.image('BlackRook', './Assets/BlackRook.png')
                this.load.image('BlackBishop', './Assets/BlackBishop.png')
                this.load.image('BlackQueen', './Assets/BlackQueen.png')
                this.load.image('BlackKing', './Assets/BlackKing.png')
                this.load.image('BlackPawn', './Assets/BlackPawn.png')
                this.load.image('WhiteKnight', './Assets/WhiteKnight.png')
                this.load.image('WhiteRook', './Assets/WhiteRook.png')
                this.load.image('WhiteBishop', './Assets/WhiteBishop.png')
                this.load.image('WhiteQueen', './Assets/WhiteQueen.png')
                this.load.image('WhiteKing', './Assets/WhiteKing.png')
                this.load.image('WhitePawn', './Assets/WhitePawn.png')
        }
        create() {
                this.createBoard();
                this.initialiseGame();
        }
        update() {

        }

        initialiseGame() {
                piece = new Rook(0, 0, 'Black', this)
                piece = new Rook(7, 0, 'Black', this)
                piece = new Rook(0, 7, 'White', this)
                piece = new Rook(7, 7, 'White', this)
                piece = new Knight(1, 0, 'Black', this)
                piece = new Knight(6, 0, 'Black', this)
                piece = new Knight(1, 7, 'White', this)
                piece = new Knight(6, 7, 'White', this)
                piece = new Bishop(2, 0, 'Black', this)
                piece = new Bishop(5, 0, 'Black', this)
                piece = new Bishop(2, 7, 'White', this)
                piece = new Bishop(5, 7, 'White', this)
                piece = new Queen(3, 0, 'Black', this)
                piece = new Queen(3, 7, 'White', this)
                piece = new King(4, 0, 'Black', this)
                piece = new King(4, 7, 'White', this)
                for (let i = 0; i < 8; i++) {
                        piece = new Pawn(i, 1, 'Black', this)
                }
                for (let i = 0; i < 8; i++) {
                        piece = new Pawn(i, 6, 'White', this)
                }
        }

        createBoard() {
                for (let i = 0; i < 8; i++) {
                        gameState.board.push([])
                        gameState.tiles.push([])
                        for (let j = 0; j < 8; j++) {
                                if ((i + j) % 2) {
                                        fill = GREEN
                                } else {
                                        fill = LIGHT
                                }
                                rect = this.add.rectangle(i * 90 + 45, j * 90 + 45, 90, 90, fill);
                                rect.setInteractive();
                                rect = this.add.rectangle(i * 90 + 45, j * 90 + 45, 80, 80, fill)
                                rect.setInteractive()
                                gameState.board[i].push(rect)
                                //If the user clicks on the rectangle
                                //Id est a particular square is selected
                                gameState.board[i][j].on('pointerdown', (pointer) => {
                                        gameState.previousPieceChosen = gameState.pieceChosen;
                                        gameState.pieceChosen = gameState.tiles[i][j].piecePresent
                                        if (!gameState.pieceChosen && gameState.board[i][j].fillColor === PURPLE) {
                                                //This is the case where the player moves a piece to an unoccupied tile
                                                gameState.tiles[i][j].updatePiece(gameState.previousPieceChosen)
                                                if (gameState.previousPieceChosen.type === 'Pawn' || gameState.previousPieceChosen.type === 'King'){
                                                        gameState.previousPieceChosen.alreadyMoved = true;
                                                }
                                                this.resetTiles();
                                        }
                                        else if (!gameState.pieceChosen) {
                                                //This is the case when a piece has not been chosen and an unoccupied tile is clicked
                                                this.resetTiles()
                                                return undefined
                                        }
                                        else if (gameState.pieceChosen && gameState.board[i][j].fillColor === RED) {
                                                console.log("Reaching elif statement")
                                                //Write code here for capturing a piece




                                        }
                                        else {
                                                //This is the case where a player selects a piece
                                                console.log("Else statement")
                                                gameState.isPieceChosen = true;
                                                this.resetTiles();
                                                gameState.pieceChosen.possibleMoves();
                                        }
                                });

                                gameState.tiles[i].push(new Tile(i, j, fill));

                        }
                }
        }

        resetTiles() {
                for (let i = 0; i < 8; i++) {
                        for (let j = 0; j < 8; j++) {
                                gameState.board[i][j].fillColor = gameState.tiles[i][j].originalColor
                        }
                }
        }
}



class Tile {
        constructor(row, col, originalColor, piecePresent = undefined, isPiecePresent = false) {
                this.row = row
                this.col = col
                this.originalColor = originalColor
                this.piecePresent = piecePresent
                this.isPiecePresent = isPiecePresent
        }
        setPiece(piece) {
                this.piecePresent = piece
                this.isPiecePresent = true
        }

        makeChosen() {
                if (!this.piecePresent) {
                        this.changeColor(PURPLE)
                } else {
                        this.changeColor(RED)
                }
        }
        changeColor(color) {
                gameState.board[this.row][this.col].fillColor = color;
        }
        updatePiece(piece) {
                gameState.tiles[piece.row][piece.col].isPiecePresent = false
                gameState.tiles[piece.row][piece.col].piecePresent = undefined
                piece.row = this.row
                piece.col = this.col
                piece.image.x = piece.row * 90 + 45
                piece.image.y = piece.col * 90 + 45
                this.isPiecePresent = true
                this.piecePresent = piece

        }
}

class Piece {
        constructor(row, col, type, side, gameObj) {
                this.row = row
                this.col = col
                this.type = type
                this.side = side
                this.name = this.side + this.type
                this.image = undefined
                this.gameObj = gameObj
                this.updateTile();

        }

        updateTile() {
                gameState.tiles[this.row][this.col].setPiece(this)
                this.image = this.gameObj.add.image(this.row * 90 + 45, this.col * 90 + 45, `${this.name}`)

        }

        distance(row, col) {
                return Math.abs(this.row - row) + Math.abs(this.col - col)
        }
}

class Rook extends Piece {
        constructor(row, col, side, gameObj) {
                super(row, col, 'Rook', side, gameObj)
        }
        possibleMoves() {
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen();
                        i++;
                }
                while (i < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (i < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
                i = this.row
                j = this.col

                do {
                        gameState.tiles[i][j].makeChosen();
                        j++;
                }
                while (j < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (j < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen();
                        j--;
                }
                while (j > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (j > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()

                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen();
                        i--;
                }
                while (i > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (i > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
        }
}

class Bishop extends Piece {
        constructor(row, col, side, gameObj) {
                super(row, col, 'Bishop', side, gameObj)
        }
        possibleMoves() {
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen()
                        i++;
                        j++;
                } while (i < 8 && j < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (i < 8 && j < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen()
                        i--;
                        j--;
                } while (i > -1 && j > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (i > -1 && j > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen()
                        i++;
                        j--;
                } while (i < 8 && j > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (i < 8 && j > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen()
                        i--;
                        j++;
                } while (i > -1 && j < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (i > -1 && j < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
        }
}

class Knight extends Piece {
        constructor(row, col, side, gameObj) {
                super(row, col, 'Knight', side, gameObj)
        }
        possibleMoves() {

        }
}

class Pawn extends Piece {
        constructor(row, col, side, gameObj) {
                super(row, col, 'Pawn', side, gameObj)
                this.alreadyMoved = false;
        }
        possibleMoves() {
                if (this.side === 'White' && this.alreadyMoved) {
                        gameState.tiles[this.row][this.col-1].makeChosen()
                }     
                else if (this.side === 'White'){
                        gameState.tiles[this.row][this.col - 1].makeChosen()
                        gameState.tiles[this.row][this.col - 2].makeChosen()
                }
                else if (this.side === 'Black' && this.alreadyMoved) {
                        gameState.tiles[this.row][this.col + 1].makeChosen()
                }
                else {
                        gameState.tiles[this.row][this.col + 1].makeChosen()
                        gameState.tiles[this.row][this.col + 2].makeChosen()
                }
                if (this.side === 'White'){
                        if (gameState.tiles[this.row - 1][this.col - 1].isPiecePresent && gameState.tiles[this.row - 1][this.col - 1].piecePresent.side === 'Black'){
                                gameState.tiles[this.row - 1][this.col - 1].makeChosen()
                        }
                        if (gameState.tiles[this.row + 1][this.col - 1].isPiecePresent && gameState.tiles[this.row + 1][this.col - 1].piecePresent.side === 'Black'){
                                gameState.tiles[this.row + 1][this.col - 1].makeChosen()
                        }
                }
                else {
                        if (gameState.tiles[this.row + 1][this.col + 1].isPiecePresent && gameState.tiles[this.row + 1][this.col + 1].piecePresent.side === 'White') {
                                gameState.tiles[this.row + 1][this.col + 1].makeChosen()
                        }
                        if (gameState.tiles[this.row - 1][this.col + 1].isPiecePresent && gameState.tiles[this.row - 1][this.col - 1].piecePresent.side === 'White') {
                                gameState.tiles[this.row - 1][this.col + 1].makeChosen()
                        }  
                }
        }
}

class Queen extends Piece {
        constructor(row, col, side, gameObj) {
                super(row, col, 'Queen', side, gameObj)
        }
        possibleMoves() {
                //Bishop Moves
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen()
                        i++;
                        j++;
                } while (i < 8 && j < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (i < 8 && j < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen()
                        i--;
                        j--;
                } while (i > -1 && j > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (i > -1 && j > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen()
                        i++;
                        j--;
                } while (i < 8 && j > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (i < 8 && j > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen()
                        i--;
                        j++;
                } while (i > -1 && j < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (i > -1 && j < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
                //Rook Moves
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen();
                        i++;
                }
                while (i < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (i < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
                i = this.row
                j = this.col

                do {
                        gameState.tiles[i][j].makeChosen();
                        j++;
                }
                while (j < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (j < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen();
                        j--;
                }
                while (j > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (j > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen();
                        i--;
                }
                while (i > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (i > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen()
                }
        }

}

class King extends Piece {
        constructor(row, col, side, gameObj) {
                super(row, col, 'King', side, gameObj)
        }
        possibleMoves() {

        }
}

const gameState = {
        board: [],
        isPieceChosen: false,
        tiles: [],
        PieceChosen: undefined,
        pieces: []
}

var fill;
var rect;
var tile;
var piece;
var i;
var j;
const RED = 0xff6600;
const GREEN = 0x00cc66;
const LIGHT = 0xffffcc;
const PURPLE = 0x70008f;