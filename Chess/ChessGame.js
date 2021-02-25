const config = {
    type: Phaser.AUTO,
    width: 720,
    height: 720,
    backgroundColor: 0x3399ff,
    scene: [GameScene, winScreen]
}

const game = new Phaser.Game(config);