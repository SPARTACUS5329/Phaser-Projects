const config = {
  type: Phaser.AUTO,
  width: 620,
  height: 620,
  backgroundColor: 0x3399ff,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1500 },
      enableBody: true,
      debug: true
    },
  },
  scene: [PiCalculator],
};

const game = new Phaser.Game(config);
