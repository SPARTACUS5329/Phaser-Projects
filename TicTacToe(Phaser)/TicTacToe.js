class Progress extends Phaser.Scene {
    constructor(key) {
        super({ key })
        this.sceneKey = key;
        this.nextScene = {
            'Intro': 'TicTacToe',
            'TicTacToe': 'winScreen',
            'Computer': 'winScreen'
        }
    }

    preload() {
        this.load.image('X', './Assets/cross.png')
        this.load.image('O', './Assets/O.png')
    }

    create() {

    }

    selectSquareHuman(pointer) {
        const x = pointer.x;
        const y = pointer.y;

        //Changing the turn from X to O or O to X
        if (gameState.turn === 0) {
            gameState.piece = 'X'
            gameState.turn = 1
        }
        else {
            gameState.piece = 'O'
            gameState.turn = 0
        }

        //row 1 check
        if (x > 10 && x < 210 && y > 10 && y < 210 && gameState.board[0][0] === '') {
            gameState.board[0][0] = gameState.piece
            gameState.img_x = 110;
            gameState.img_y = 110;
            gameState.computerMoves.splice(gameState.computerMoves.indexOf(1), 1)
        }
        else if (x > 210 && x < 410 && y > 0 && y < 210 && gameState.board[0][1] === '') {
            gameState.board[0][1] = gameState.piece
            gameState.img_x = 310;
            gameState.img_y = 110;
            gameState.computerMoves.splice(gameState.computerMoves.indexOf(2), 1)
        }
        else if (x > 410 && x < 610 && y > 0 && y < 210 && gameState.board[0][2] === '') {
            gameState.board[0][2] = gameState.piece
            gameState.img_x = 510;
            gameState.img_y = 110;
            gameState.computerMoves.splice(gameState.computerMoves.indexOf(3), 1)
        }
        //row 2 check
        else if (x > 10 && x < 210 && y > 210 && y < 410 && gameState.board[1][0] === '') {
            gameState.board[1][0] = gameState.piece
            gameState.img_x = 110;
            gameState.img_y = 310;
            gameState.computerMoves.splice(gameState.computerMoves.indexOf(4), 1)
        }
        else if (x > 210 && x < 410 && y > 210 && y < 410 && gameState.board[1][1] === '') {
            gameState.board[1][1] = gameState.piece
            gameState.img_x = 310;
            gameState.img_y = 310;
            gameState.computerMoves.splice(gameState.computerMoves.indexOf(5), 1)
        }
        else if (x > 410 && x < 610 && y > 210 && y < 410 && gameState.board[1][2] === '') {
            gameState.board[1][2] = gameState.piece
            gameState.img_x = 510;
            gameState.img_y = 310;
            gameState.computerMoves.splice(gameState.computerMoves.indexOf(6), 1)
        }
        //row 3 check
        else if (x > 10 && x < 210 && y > 410 && y < 610 && gameState.board[2][0] === '') {
            gameState.board[2][0] = gameState.piece
            gameState.img_x = 110;
            gameState.img_y = 510;
            gameState.computerMoves.splice(gameState.computerMoves.indexOf(7), 1)
        }
        else if (x > 210 && x < 410 && y > 410 && y < 610 && gameState.board[2][1] === '') {
            gameState.board[2][1] = gameState.piece
            gameState.img_x = 310;
            gameState.img_y = 510;
            gameState.computerMoves.splice(gameState.computerMoves.indexOf(8), 1)
        }
        else if (x > 410 && x < 610 && y > 410 && y < 610 && gameState.board[2][2] === '') {
            gameState.board[2][2] = gameState.piece
            gameState.img_x = 510;
            gameState.img_y = 510;
            gameState.computerMoves.splice(gameState.computerMoves.indexOf(9), 1)
        }

        else {
            if (gameState.turn === 0) {
                gameState.piece = 'X'
                gameState.turn = 1
            }
            else {
                gameState.piece = 'O'
                gameState.turn = 0
            }

            return false
        }


        gameState.cycle++;

        this.add.image(gameState.img_x, gameState.img_y, gameState.piece)
        this.checkWin();
        if (gameState.gamePlayed === 'Computer') {
            this.selectSquareComputerIntelligent()
            this.checkWin();
        }


    }

    checkWin() {
        gameState.paused = false
        //Row check
        if (gameState.board[0][0] != '' && gameState.board[0][0] === gameState.board[0][1] && gameState.board[0][1] === gameState.board[0][2]) {
            gameState.win = true;
            gameState.winPiece = gameState.board[0][0];
        }

        else if (gameState.board[1][0] != '' && gameState.board[1][0] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[1][2]) {
            gameState.win = true;
            gameState.winPiece = gameState.board[1][0];
        }

        else if (gameState.board[2][0] != '' && gameState.board[2][0] === gameState.board[2][1] && gameState.board[2][1] === gameState.board[2][2]) {
            gameState.win = true;
            gameState.winPiece = gameState.board[2][0];
        }

        //Column check
        else if (gameState.board[0][0] != '' && gameState.board[0][0] === gameState.board[1][0] && gameState.board[1][0] === gameState.board[2][0]) {
            gameState.win = true;
            gameState.winPiece = gameState.board[2][0];
        }

        else if (gameState.board[0][1] != '' && gameState.board[0][1] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][1]) {
            gameState.win = true;
            gameState.winPiece = gameState.board[0][1];
        }

        else if (gameState.board[0][2] != '' && gameState.board[0][2] === gameState.board[1][2] && gameState.board[1][2] === gameState.board[2][2]) {
            gameState.win = true;
            gameState.winPiece = gameState.board[0][2];
        }

        //Diagonal check

        else if (gameState.board[0][0] != '' && gameState.board[0][0] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][2]) {
            gameState.win = true;
            gameState.winPiece = gameState.board[0][0]
        }

        else if (gameState.board[0][2] != '' && gameState.board[0][2] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][0]) {
            gameState.win = true;
            gameState.winPiece = gameState.board[0][2]
        }

        //Draw check
        else {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (gameState.board[i][j] == '') {
                        return false
                    }
                    if (i === 2 && j === 2) {
                        gameState.win = true;
                        gameState.winPiece = 'DRAW';
                    }
                }
            }
        }
        if (gameState.win) {
            //disabling the user's actions when the game has ended
            gameState.paused = true;
            //Starting the scene after 1500 ms i.e 2.5s
            this.time.addEvent({
                delay: 1500,
                loop: false,
                callback: () => {
                    this.scene.stop(this.sceneKey)
                    this.scene.start(this.nextScene[this.sceneKey])
                }
            }, this)
            
        }

    }

    selectSquareComputer(x, y) {
        if (gameState.board[x][y] === '') {
            switch (`${x}${y}`) {
                case '00':
                    gameState.board[0][0] = 'O'
                    gameState.img_x = 110;
                    gameState.img_y = 110;
                    gameState.computerMoves.splice(gameState.computerMoves.indexOf(1), 1)
                    break;
                case '01':
                    gameState.board[0][1] = 'O'
                    gameState.img_x = 310;
                    gameState.img_y = 110;
                    gameState.computerMoves.splice(gameState.computerMoves.indexOf(2), 1)
                    break;
                case '02':
                    gameState.board[0][2] = 'O'
                    gameState.img_x = 510;
                    gameState.img_y = 110;
                    gameState.computerMoves.splice(gameState.computerMoves.indexOf(3), 1)
                    break;
                case '10':
                    gameState.board[1][0] = 'O'
                    gameState.img_x = 110;
                    gameState.img_y = 310;
                    gameState.computerMoves.splice(gameState.computerMoves.indexOf(4), 1)
                    break;
                case '11':
                    gameState.board[1][1] = 'O'
                    gameState.img_x = 310;
                    gameState.img_y = 310;
                    gameState.computerMoves.splice(gameState.computerMoves.indexOf(5), 1)
                    break;
                case '12':
                    gameState.board[1][2] = 'O'
                    gameState.img_x = 510;
                    gameState.img_y = 310;
                    gameState.computerMoves.splice(gameState.computerMoves.indexOf(6), 1)
                    break;
                case '20':
                    gameState.board[2][0] = 'O'
                    gameState.img_x = 110;
                    gameState.img_y = 510;
                    gameState.computerMoves.splice(gameState.computerMoves.indexOf(7), 1)
                    break;
                case '21':
                    gameState.board[2][1] = 'O'
                    gameState.img_x = 310;
                    gameState.img_y = 510;
                    gameState.computerMoves.splice(gameState.computerMoves.indexOf(8), 1)
                    break;
                case '22':
                    gameState.board[2][2] = 'O'
                    gameState.img_x = 510;
                    gameState.img_y = 510;
                    gameState.computerMoves.splice(gameState.computerMoves.indexOf(9), 1)
                    break;
                default:
                    console.log('What is happening?')

            }
            this.add.image(gameState.img_x, gameState.img_y, gameState.piece)

            return true
        }

        else {
            return false
        }
    }

    selectSquareComputerIntelligent() {

        //Changing the turn from X to O or O to X
        if (gameState.turn === 0) {
            gameState.piece = 'X'
            gameState.turn = 1
        }
        else {
            gameState.piece = 'O'
            gameState.turn = 0
        }



        if (gameState.cycle === 1) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (gameState.board[i][j] === 'X') {
                        var x = i;
                        var y = j;
                        break
                    }
                }
            }
            var corner;
            var center;
            if ((x + y) % 2 === 0 && x != 1) {
                corner = true;
            }
            else if (x === 1 && y === 1) {
                center = true;
                corner = false;
            }

            if (corner) {
                this.selectSquareComputer(1, 1)
                gameState.variation = {
                    type: 'Standard',
                    coords: [x, y]
                };

            }

            else if (center) {
                this.selectSquareComputer(0, 0)
                gameState.variation = {
                    type: 'Center',
                    coords: [1, 1]
                }
            }

            else {
                this.selectSquareComputer(1, 1)
                gameState.variation = {
                    type: 'Different',
                    coords: [x, y]
                }
            }

        }

        else {
            this.BlockWin();
        }

        gameState.cycle++;
    }

    BlockWin() {
        Xcoords = []
        Ocoords = []


        //Generating lists of coordinates of Xs and Os
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameState.board[i][j] === 'X') {
                    Xcoords.push([i, j])
                }

                else if (gameState.board[i][j] === 'O') {
                    Ocoords.push([i, j])
                }
            }
        }

        //Taking the win if there are 2 consecutive Os
        for (let i = 0; i < Ocoords.length; i++) {
            for (let j = i + 1; j < Ocoords.length; j++) {
                //TAKE THE WIN if 2 Os share the same column
                if (Ocoords[i][1] === Ocoords[j][1]) {
                    arr = [0, 1, 2]
                    arr.splice(arr.indexOf(Ocoords[i][0]), 1)
                    arr.splice(arr.indexOf(Ocoords[j][0]), 1)
                    if (this.selectSquareComputer(arr[0], Ocoords[i][1])) {
                        return true
                    }

                }

                //TAKE THE WIN if 2 Os share the same row
                else if (Ocoords[i][0] === Ocoords[j][0]) {
                    arr = [0, 1, 2]
                    arr.splice(arr.indexOf(Ocoords[i][1]), 1)
                    arr.splice(arr.indexOf(Ocoords[j][1]), 1)
                    if (this.selectSquareComputer(Ocoords[i][0], arr[0])) {
                        return true
                    }

                }
            }
        }

        //If a win is not possible then block a win for X or start creating a win for O
        //Iterating through every element and comparing it with every other element
        for (let i = 0; i < Xcoords.length; i++) {
            for (let j = i + 1; j < Xcoords.length; j++) {

                //Calculating the mid point of two Xs to check if there is a tile between them
                var midX = (Xcoords[i][0] + Xcoords[j][0]) / 2;
                var midY = (Xcoords[i][1] + Xcoords[j][1]) / 2;

                //Executed if there is a tile between two Xs
                if (Number.isInteger(midX) && Number.isInteger(midY)) {

                    //Executed if the space is empty i.e it is not an O => making it an O
                    if (gameState.board[midX][midY] === '') {
                        if (this.selectSquareComputer(midX, midY)) {
                            return true
                        }
                    }
                    //If it is an O to turn the game into winning for O
                    else {
                        if (midX === 1 && midY === 1) {
                            gameState.winConditionPossible = true;
                        }


                    }
                }


                //If 2 Xs share the same column
                else if (Xcoords[i][0] === Xcoords[j][0]) {
                    arr = [0, 1, 2]
                    arr.splice(arr.indexOf(Xcoords[i][1]), 1)
                    arr.splice(arr.indexOf(Xcoords[j][1]), 1)
                    if (this.selectSquareComputer(Xcoords[i][0], arr[0])) {
                        return true
                    }

                }

                //If 2 Xs share the same row
                else if (Xcoords[i][1] === Xcoords[j][1]) {
                    arr = [0, 1, 2]
                    arr.splice(arr.indexOf(Xcoords[i][0]), 1)
                    arr.splice(arr.indexOf(Xcoords[j][0]), 1)
                    if (this.selectSquareComputer(arr[0], Xcoords[i][1])) {
                        return true
                    }

                }

            }



        }

        //If no block conditions are met, the game is turned into winning for O
        try {
            gameState.edges = [[0, 1], [1, 0], [1, 2], [2, 1]];
            gameState.edgeCase = 0;
            while (gameState.board[gameState.edges[gameState.edgeCase][0]][gameState.edges[gameState.edgeCase][1]] != '') {
                gameState.edgeCase++;
            }
            this.selectSquareComputer(gameState.edges[gameState.edgeCase][0], gameState.edges[gameState.edgeCase][1]);
        }
        //If absolutely no condition is met, the first open spot is chosen by the computer. 
        catch (error) {
            console.log(error)
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (gameState.board[i][j] === '') {
                        return this.selectSquareComputer(i, j)
                    }
                }
            }
        }

    }

    createBoard() {
        gameState.graphics = this.add.graphics();
        gameState.graphics.lineStyle(2, 0x000000, 1);
        gameState.graphics.strokeRoundedRect(10, 10, 200, 200, 32)
        gameState.graphics.strokeRoundedRect(210, 10, 200, 200, 32)
        gameState.graphics.strokeRoundedRect(410, 10, 200, 200, 32)
        gameState.graphics.strokeRoundedRect(10, 210, 200, 200, 32)
        gameState.graphics.strokeRoundedRect(210, 210, 200, 200, 32)
        gameState.graphics.strokeRoundedRect(410, 210, 200, 200, 32)
        gameState.graphics.strokeRoundedRect(10, 410, 200, 200, 32)
        gameState.graphics.strokeRoundedRect(210, 410, 200, 200, 32)
        gameState.graphics.strokeRoundedRect(410, 410, 200, 200, 32)
    }
}

class TicTacToe extends Progress {
    constructor() {
        super('TicTacToe')
    }

    create() {
        this.createBoard();
        gameState.board = [['', '', ''], ['', '', ''], ['', '', '']]
        this.input.on('pointerup', function (pointer) {
            gameState.gamePlayed = '2Player';
            if (!gameState.paused) { this.selectSquareHuman(pointer); }
        }, this)
    }
}

class vsComputer extends Progress {
    constructor() {
        super('Computer')
    }

    create() {
        this.createBoard();
        gameState.board = [['', '', ''], ['', '', ''], ['', '', '']]
        this.input.on('pointerup', function (pointer) {
            gameState.gamePlayed = 'Computer';
            if (!gameState.paused) { this.selectSquareHuman(pointer); }

        }, this)
    }
}

class Intro extends Progress {
    constructor() {
        super('Intro')
    }

    create() {
        gameState.startButton2Player = this.add.rectangle(300, 200, 200, 150, 0x000000);
        this.add.text(220, 190, '2 PLAYER', { font: '30px', fill: '#FFFFFF' })
        gameState.startButton2Player.setInteractive();
        gameState.startButton2Player.on('pointerup', function () {
            this.scene.stop('Intro');
            this.scene.start(this.nextScene[this.sceneKey])
        }, this)
        gameState.startButtonComp = this.add.rectangle(300, 500, 200, 150, 0x000000);
        this.add.text(220, 490, 'COMPUTER', { font: '30px', fill: '#FFFFFF' })
        gameState.startButtonComp.setInteractive();
        gameState.startButtonComp.on('pointerup', function () {
            this.scene.stop('Intro');
            this.scene.start('Computer')
        }, this)
    }
}

class winScreen extends Progress {
    constructor() {
        super('winScreen')
    }

    create() {
        if (gameState.winPiece != 'DRAW') {
            for (let i = 0; i < 15; i++) {
                gameState.winText.push(this.add.text(600 * Math.random(), 600 * Math.random(), gameState.winPiece + ' IS THE WINNER', { font: '60px Copperplate', fill: '#000000' }))
            }
        }
        else {
            for (let i = 0; i < 15; i++) {
                gameState.winText.push(this.add.text(600 * Math.random(), 600 * Math.random(), "IT IS A DRAW", { font: '60px Copperplate', fill: '#000000' }))
            }
        }

        this.tweens.add({
            targets: gameState.winText,
            x: 70,
            y: 150,
            duration: 5000,
            ease: 'Linear',
            easeParams: [1.5, 0.5],
            delay: 0
        }, this)
    }
}

const gameState = {
    turn: 0,
    piece: 'X',
    win: false,
    winText: [],
    computerMoves: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    relations: { 1: [0, 0], 2: [0, 1], 3: [0, 2], 4: [1, 0], 5: [1, 1], 6: [1, 2], 7: [2, 0], 8: [2, 1], 9: [2, 2] },
    cycle: 0,
    paused: false
};

var arr;
var Xcoords;
var Ocoords;