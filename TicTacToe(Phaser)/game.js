const config = {
    type: Phaser.AUTO,
    width: 620,
    height: 620,
    backgroundColor: 0x3399ff,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 800 },
            enableBody: true,

        }
    },
    scene: [Intro, vsComputer, TicTacToe, winScreen]
}

const game = new Phaser.Game(config);