class Progress extends Phaser.Scene{
    constructor(key){
        super({key})
        this.sceneKey = key;
        this.nextScene = {
            'TicTacToe':'winScreen'
        }
    }

    preload(){
        this.load.image('X','./Assets/cross.png')
        this.load.image('O','./Assets/O.png')
    }

    create(){
        if (this.sceneKey==='TicTacToe'){
        this.createBoard();
        gameState.board = [['','',''],['','',''],['','','']]
        this.input.on('pointerup',this.selectSquare,this)
        }
        else{
            if (gameState.winPiece!='DRAW'){
                for (let i=0;i<15;i++){
                    gameState.winText.push(this.add.text(600*Math.random(),600*Math.random(),gameState.winPiece + ' IS THE WINNER',{font:'60px Copperplate',fill:'#000000'}))
                }
            }
            else{
                for (let i = 0; i < 15; i++) {
                    gameState.winText.push(this.add.text(600*Math.random(), 600*Math.random(), "IT IS A DRAW", { font: '60px Copperplate', fill: '#000000' }))  
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
    

    selectSquare(pointer) {
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
        }
        else if (x > 210 && x < 410 && y > 0 && y < 210 && gameState.board[0][1] === '') {
            gameState.board[0][1] = gameState.piece
            gameState.img_x = 310;
            gameState.img_y = 110;
        }
        else if (x > 410 && x < 610 && y > 0 && y < 210 && gameState.board[0][2] === '') {
            gameState.board[0][2] = gameState.piece
            gameState.img_x = 510;
            gameState.img_y = 110;
        }
        //row 2 check
        else if (x > 10 && x < 210 && y > 210 && y < 410 && gameState.board[1][0] === '') {
            gameState.board[1][0] = gameState.piece
            gameState.img_x = 110;
            gameState.img_y = 310;
        }
        else if (x > 210 && x < 410 && y > 210 && y < 410 && gameState.board[1][1] === '') {
            gameState.board[1][1] = gameState.piece
            gameState.img_x = 310;
            gameState.img_y = 310;
        }
        else if (x > 410 && x < 610 && y > 210 && y < 410 && gameState.board[1][2] === '') {
            gameState.board[1][2] = gameState.piece
            gameState.img_x = 510;
            gameState.img_y = 310;
        }
        //row 3 check
        else if (x > 10 && x < 210 && y > 410 && y < 610 && gameState.board[2][0] === '') {
            gameState.board[2][0] = gameState.piece
            gameState.img_x = 110;
            gameState.img_y = 510;
        }
        else if (x > 210 && x < 410 && y > 410 && y < 610 && gameState.board[2][1] === '') {
            gameState.board[2][1] = gameState.piece
            gameState.img_x = 310;
            gameState.img_y = 510;
        }
        else if (x > 410 && x < 610 && y > 410 && y < 610 && gameState.board[2][2] === '') {
            gameState.board[2][2] = gameState.piece
            gameState.img_x = 510;
            gameState.img_y = 510;
        }

        else{
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
    }

    checkWin(){
        //Row check
        if (gameState.board[0][0]!='' && gameState.board[0][0] === gameState.board[0][1] && gameState.board[0][1] === gameState.board[0][2]){
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

        else if (gameState.board[0][0] != '' && gameState.board[0][0] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][2]){
            gameState.win = true;
            gameState.winPiece = gameState.board[0][0]
        }

        else if (gameState.board[0][2] != '' && gameState.board[0][2] === gameState.board[1][1] && gameState.board[1][1] === gameState.board[2][0]) {
            gameState.win = true;
            gameState.winPiece = gameState.board[0][2]
        }

        //Draw check
        else {
            for (let i=0;i<3;i++){
                for (let j=0;j<3;j++){
                    if (gameState.board[i][j]==''){
                        break
                    }
                    if (i===2 && j===2){
                        gameState.win=true;
                        gameState.winPiece='DRAW';
                    }
                }
            }
        }
        if (gameState.win){
            this.scene.stop(this.sceneKey)
            this.scene.start(this.nextScene[this.sceneKey])
        }


    }

    createBoard(){
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

class TicTacToe extends Progress{
    constructor(){
        super('TicTacToe')
    }
}
class winScreen extends Progress{
    constructor(){
        super('winScreen')
    }
}
const gameState = {turn:0,piece:'X',win:false,winText:[]};