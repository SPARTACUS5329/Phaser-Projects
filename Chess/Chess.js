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
                                        //This is the case where the player moves a piece to an unoccupied tile
                                        if (!gameState.pieceChosen && gameState.board[i][j].fillColor === PURPLE) {
                                                gameState.tiles[i][j].updatePiece(gameState.previousPieceChosen)
                                                if (gameState.previousPieceChosen.type === 'Pawn' || gameState.previousPieceChosen.type === 'King') {
                                                        gameState.previousPieceChosen.alreadyMoved = true;
                                                }
                                                this.resetTiles();
                                                this.changeGameTurn();
                                        }
                                        //This is the case when a piece has not been chosen and an unoccupied tile is clicked
                                        else if (!gameState.pieceChosen) {
                                                this.resetTiles()
                                                return undefined
                                        }
                                        //This is the case when a piece is captured
                                        else if (gameState.pieceChosen && gameState.board[i][j].fillColor === RED) {
                                                gameState.tiles[i][j].updatePiece(gameState.previousPieceChosen)
                                                this.resetTiles();
                                                this.changeGameTurn();
                                        }
                                        //This is the case where a player selects a piece
                                        else {  
                                                
                                                if (gameState.turn !== gameState.pieceChosen.side) {
                                                        gameState.pieceChosen = gameState.previousPieceChosen;
                                                        this.resetTiles();
                                                        return undefined
                                                }
                                                gameState.isPieceChosen = true;
                                                this.resetTiles();
                                                gameState.pieceChosen.possibleMoves();
                                        }
                                });

                                gameState.tiles[i].push(new Tile(i, j, fill));

                        }
                }
        }

        changeGameTurn(){
                if (gameState.turn === 'White'){
                        gameState.turn = 'Black'
                } else {
                        gameState.turn = 'White'
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

        makeChosen(piece=undefined) {
                if (!this.piecePresent) {
                        this.changeColor(PURPLE)
                        return true
                } 
                else if(piece && this.piecePresent.side === piece.side){
                        return false
                }
                else {
                        this.changeColor(RED)
                        return true
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
                if (this.isPiecePresent) {
                        this.piecePresent.image.destroy();
                }
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
                        gameState.tiles[i][j].makeChosen(this);
                        i++;
                }
                while (i < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (i < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
                i = this.row
                j = this.col

                do {
                        gameState.tiles[i][j].makeChosen(this);
                        j++;
                }
                while (j < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (j < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen(this);
                        j--;
                }
                while (j > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (j > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)

                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen(this);
                        i--;
                }
                while (i > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (i > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
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
                        gameState.tiles[i][j].makeChosen(this)
                        i++;
                        j++;
                } while (i < 8 && j < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (i < 8 && j < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen(this)
                        i--;
                        j--;
                } while (i > -1 && j > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (i > -1 && j > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen(this)
                        i++;
                        j--;
                } while (i < 8 && j > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (i < 8 && j > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen(this)
                        i--;
                        j++;
                } while (i > -1 && j < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (i > -1 && j < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
        }
}

class Knight extends Piece {
        constructor(row, col, side, gameObj) {
                super(row, col, 'Knight', side, gameObj)
        }
        possibleMoves() {
                if (this.row < 6 && this.row > 1){
                        if (this.col < 6 && this.col > 1){
                                gameState.tiles[this.row+1][this.col+2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row + 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col -2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col - 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 6){
                                gameState.tiles[this.row + 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col - 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 1){
                                gameState.tiles[this.row + 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col - 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col - 1].makeChosen(this);
                        }
                        else if(this.col === 0){
                                gameState.tiles[this.row + 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col + 1].makeChosen(this);
                        }
                        else{
                                gameState.tiles[this.row + 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col - 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col - 1].makeChosen(this);
                        }
                }
                else if (this.row === 6){
                        if (this.col < 6 && this.col > 1) {
                                gameState.tiles[this.row + 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row + 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 6) {
                                gameState.tiles[this.row + 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 1) {
                                gameState.tiles[this.row + 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 0) {
                                gameState.tiles[this.row + 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col + 1].makeChosen(this);
                        }
                        else {
                                gameState.tiles[this.row + 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col - 1].makeChosen(this);
                        }
                }
                else if (this.row === 1){
                        if (this.col < 6 && this.col > 1) {
                                gameState.tiles[this.row + 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row + 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 6) {
                                gameState.tiles[this.row + 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 1) {
                                gameState.tiles[this.row + 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 0) {
                                gameState.tiles[this.row + 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col + 1].makeChosen(this);
                        }
                        else {
                                gameState.tiles[this.row + 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col - 1].makeChosen(this);
                        }
                }
                else if (this.row === 0){
                        if (this.col < 6 && this.col > 1) {
                                gameState.tiles[this.row + 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row + 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 6) {
                                gameState.tiles[this.row + 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 1) {
                                gameState.tiles[this.row + 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 0) {
                                gameState.tiles[this.row + 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col + 1].makeChosen(this);
                        }
                        else {
                                gameState.tiles[this.row + 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row + 2][this.col - 1].makeChosen(this);
                        }
                }
                else {
                        if (this.col < 6 && this.col > 1) {
                                gameState.tiles[this.row - 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row - 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 6) {
                                gameState.tiles[this.row - 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 1) {
                                gameState.tiles[this.row - 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col + 1].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col - 1].makeChosen(this);
                        }
                        else if (this.col === 0) {
                                gameState.tiles[this.row - 1][this.col + 2].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col + 1].makeChosen(this);
                        }
                        else {
                                gameState.tiles[this.row - 1][this.col - 2].makeChosen(this);
                                gameState.tiles[this.row - 2][this.col - 1].makeChosen(this);
                        }
                }
        }
}

class Pawn extends Piece {
        constructor(row, col, side, gameObj) {
                super(row, col, 'Pawn', side, gameObj)
                this.alreadyMoved = false;
        }
        possibleMoves() {
                if (this.side === 'White' && this.alreadyMoved) {
                        if (!gameState.tiles[this.row][this.col - 1].isPiecePresent) {
                                gameState.tiles[this.row][this.col - 1].makeChosen(this)
                        }
                }
                else if (this.side === 'White') {

                        if (!gameState.tiles[this.row][this.col - 1].isPiecePresent) {
                                gameState.tiles[this.row][this.col - 1].makeChosen(this)
                        }
                        if (!gameState.tiles[this.row][this.col - 2].isPiecePresent) {
                                gameState.tiles[this.row][this.col - 2].makeChosen(this)
                        }
                }
                else if (this.side === 'Black' && this.alreadyMoved) {
                        if (!gameState.tiles[this.row][this.col + 1].isPiecePresent) {
                                gameState.tiles[this.row][this.col + 1].makeChosen(this)
                        }
                }
                else {
                        if (!gameState.tiles[this.row][this.col + 1].isPiecePresent) {
                                gameState.tiles[this.row][this.col + 1].makeChosen(this)
                        }
                        if (!gameState.tiles[this.row][this.col + 2].isPiecePresent) {
                                gameState.tiles[this.row][this.col + 2].makeChosen(this)
                        }
                }
                if (this.side === 'White') {
                        if (gameState.tiles[this.row - 1][this.col - 1].isPiecePresent && gameState.tiles[this.row - 1][this.col - 1].piecePresent.side === 'Black') {
                                gameState.tiles[this.row - 1][this.col - 1].makeChosen(this)
                        }
                        if (gameState.tiles[this.row + 1][this.col - 1].isPiecePresent && gameState.tiles[this.row + 1][this.col - 1].piecePresent.side === 'Black') {
                                gameState.tiles[this.row + 1][this.col - 1].makeChosen(this)
                        }
                }
                else {
                        if (gameState.tiles[this.row + 1][this.col + 1].isPiecePresent && gameState.tiles[this.row + 1][this.col + 1].piecePresent.side === 'White') {
                                gameState.tiles[this.row + 1][this.col + 1].makeChosen(this)
                        }
                        if (gameState.tiles[this.row - 1][this.col + 1].isPiecePresent && gameState.tiles[this.row - 1][this.col + 1].piecePresent.side === 'White') {
                                gameState.tiles[this.row - 1][this.col + 1].makeChosen(this)
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
                        gameState.tiles[i][j].makeChosen(this)
                        i++;
                        j++;
                } while (i < 8 && j < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (i < 8 && j < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen(this)
                        i--;
                        j--;
                } while (i > -1 && j > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (i > -1 && j > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen(this)
                        i++;
                        j--;
                } while (i < 8 && j > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (i < 8 && j > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen(this)
                        i--;
                        j++;
                } while (i > -1 && j < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (i > -1 && j < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
                //Rook Moves
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen(this);
                        i++;
                }
                while (i < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (i < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
                i = this.row
                j = this.col

                do {
                        gameState.tiles[i][j].makeChosen(this);
                        j++;
                }
                while (j < 8 && !gameState.tiles[i][j].isPiecePresent)
                if (j < 8 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen(this);
                        j--;
                }
                while (j > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (j > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
                i = this.row
                j = this.col
                do {
                        gameState.tiles[i][j].makeChosen(this);
                        i--;
                }
                while (i > -1 && !gameState.tiles[i][j].isPiecePresent)
                if (i > -1 && gameState.tiles[i][j].isPiecePresent && !(this.side === gameState.tiles[i][j].piecePresent.side)) {
                        gameState.tiles[i][j].makeChosen(this)
                }
        }

}

class King extends Piece {
        constructor(row, col, side, gameObj) {
                super(row, col, 'King', side, gameObj)
                this.alreadyMoved = false;
        }
        possibleMoves() {
                if (this.col !== 7 && this.col !== 0) {
                        if (this.row !== 0 && this.row != 7) {
                                gameState.tiles[this.row + 1][this.col + 1].makeChosen(this)
                                gameState.tiles[this.row - 1][this.col + 1].makeChosen(this)
                                gameState.tiles[this.row - 1][this.col - 1].makeChosen(this)
                                gameState.tiles[this.row + 1][this.col - 1].makeChosen(this)
                                gameState.tiles[this.row][this.col + 1].makeChosen(this)
                                gameState.tiles[this.row][this.col - 1].makeChosen(this)
                                gameState.tiles[this.row + 1][this.col].makeChosen(this)
                                gameState.tiles[this.row - 1][this.col].makeChosen(this)

                        }
                        else if (this.row === 0) {
                                gameState.tiles[this.row + 1][this.col + 1].makeChosen(this)
                                gameState.tiles[this.row + 1][this.col - 1].makeChosen(this)
                                gameState.tiles[this.row][this.col + 1].makeChosen(this)
                                gameState.tiles[this.row][this.col - 1].makeChosen(this)
                        }
                        else if (this.row === 7) {
                                gameState.tiles[this.row - 1][this.col + 1].makeChosen(this)
                                gameState.tiles[this.row - 1][this.col - 1].makeChosen(this)
                                gameState.tiles[this.row][this.col + 1].makeChosen(this)
                                gameState.tiles[this.row][this.col - 1].makeChosen(this)
                        }
                }
                else if(this.col === 0){
                        if (this.row !== 0 && this.row != 7) {
                                gameState.tiles[this.row + 1][this.col + 1].makeChosen(this)
                                gameState.tiles[this.row - 1][this.col + 1].makeChosen(this)
                                gameState.tiles[this.row][this.col + 1].makeChosen(this)
                                gameState.tiles[this.row + 1][this.col].makeChosen(this)
                                gameState.tiles[this.row - 1][this.col].makeChosen(this)

                        }
                        else if (this.row === 0) {
                                gameState.tiles[this.row + 1][this.col + 1].makeChosen(this)
                                gameState.tiles[this.row][this.col + 1].makeChosen(this)
                        }
                        else if (this.row === 7) {
                                gameState.tiles[this.row - 1][this.col + 1].makeChosen(this)
                                gameState.tiles[this.row][this.col + 1].makeChosen(this)
                        }
                }
                else if(this.col === 7){
                        if (this.row !== 0 && this.row != 7) {
                                gameState.tiles[this.row - 1][this.col - 1].makeChosen(this)
                                gameState.tiles[this.row + 1][this.col - 1].makeChosen(this)
                                gameState.tiles[this.row][this.col - 1].makeChosen(this)
                                gameState.tiles[this.row + 1][this.col].makeChosen(this)
                                gameState.tiles[this.row - 1][this.col].makeChosen(this)

                        }
                        else if (this.row === 0) {
                                gameState.tiles[this.row + 1][this.col - 1].makeChosen(this)
                                gameState.tiles[this.row][this.col - 1].makeChosen(this)
                        }
                        else if (this.row === 7) {
                                gameState.tiles[this.row - 1][this.col - 1].makeChosen(this)
                                gameState.tiles[this.row][this.col - 1].makeChosen(this)
                        }
                }
        }
}

const gameState = {
        board: [],
        isPieceChosen: false,
        tiles: [],
        PieceChosen: undefined,
        pieces: [],
        turn: 'White'
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