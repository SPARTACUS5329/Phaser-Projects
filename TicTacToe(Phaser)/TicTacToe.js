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
            gameState.computerMoves.splice(gameState.computerMoves.indexOf(4), 1)
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
        }




        this.add.image(gameState.img_x, gameState.img_y, gameState.piece)
        this.checkWin()
        if (gameState.gamePlayed === 'Computer') {
            this.selectSquareComputer()
            this.checkWin()
        }


    }

    checkWin() {
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
                        break
                    }
                    if (i === 2 && j === 2) {
                        gameState.win = true;
                        gameState.winPiece = 'DRAW';
                    }
                }
            }
        }
        if (gameState.win) {
            this.scene.stop(this.sceneKey)
            this.scene.start(this.nextScene[this.sceneKey])
            console.log(gameState.board)
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

    selectSquareComputer() {
        if (gameState.turn === 0) {
            gameState.piece = 'X'
            gameState.turn = 1
        }
        else {
            gameState.piece = 'O'
            gameState.turn = 0
        }
        var index = getRandomInt(0, gameState.computerMoves.length - 1)

        switch (gameState.computerMoves[index]) {
            case 1:
                gameState.board[0][0] = 'O'
                gameState.img_x = 110;
                gameState.img_y = 110;
                break;
            case 2:
                gameState.board[0][1] = 'O'
                gameState.img_x = 310;
                gameState.img_y = 110;
                break;
            case 3:
                gameState.board[0][2] = 'O'
                gameState.img_x = 510;
                gameState.img_y = 110;
                break;
            case 4:
                gameState.board[1][0] = 'O'
                gameState.img_x = 110;
                gameState.img_y = 310;
                break;
            case 5:
                gameState.board[1][1] = 'O'
                gameState.img_x = 310;
                gameState.img_y = 310;
                break;
            case 6:
                gameState.board[1][2] = 'O'
                gameState.img_x = 510;
                gameState.img_y = 310;
                break;
            case 7:
                gameState.board[2][0] = 'O'
                gameState.img_x = 110;
                gameState.img_y = 510;
                break;
            case 8:
                gameState.board[2][1] = 'O'
                gameState.img_x = 310;
                gameState.img_y = 510;
                break;
            case 9:
                gameState.board[2][2] = 'O'
                gameState.img_x = 510;
                gameState.img_y = 510;
                break;
            default:
                console.log('What is happening?')

        }

        console.log(gameState.computerMoves)
        console.log(gameState.img_x, gameState.img_y)

        gameState.computerMoves.splice(index, 1);
        this.add.image(gameState.img_x, gameState.img_y, gameState.piece)

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
            this.selectSquareHuman(pointer);
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
            this.selectSquareHuman(pointer);
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

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const gameState = {
    turn: 0,
    piece: 'X',
    win: false,
    winText: [],
    computerMoves: [1, 2, 3, 4, 5, 6, 7, 8, 9]
};