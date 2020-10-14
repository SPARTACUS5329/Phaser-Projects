const config = {
    type:Phaser.AUTO,
    width:620,
    height:620,
    backgroundColor:0xFFFF80,
    scene:[TicTacToe,winScreen]
}

const game = new Phaser.Game(config);