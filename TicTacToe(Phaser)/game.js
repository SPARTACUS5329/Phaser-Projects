const config = {
    type: Phaser.AUTO,
    width: 620,
    height: 620,
    backgroundColor: 0x3399ff,
    scene: [Intro, vsComputer, twoPlayer, winScreen]
}

const game = new Phaser.Game(config);