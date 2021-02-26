class PiCalculator extends Phaser.Scene {
  preload() {
    this.load.image("wall", "./Assets/wall.png");
    this.load.image("block", "./Assets/block.png");
  }

  create() {
    gameState.mu = gameState.rightMass / gameState.leftMass;

    this.add.text(100, 70, `mass ratio = ${gameState.mu}`, {
      font: "30px",
      fill: "#FFFFFF",
    });
    gameState.leftBlock = this.physics.add
      .sprite(200, 604, "block")
      .setScale(0.1);

    gameState.rightBlock = this.physics.add
      .sprite(400, 604, "block")
      .setScale(0.1);

    gameState.wall = this.physics.add.sprite(20, 500, "wall");

    gameState.rightBlock.body.customSeparateX = true;
    gameState.leftBlock.body.customSeparateX = true;
    gameState.wall.body.customSeparateX = true;

    this.physics.world.setBounds(0, 0, 1000, gameState.height);
    gameState.leftBlock.setCollideWorldBounds(true);
    gameState.rightBlock.setCollideWorldBounds(true);
    gameState.wall.setCollideWorldBounds(true);

    gameState.startButton = this.add.rectangle(500, 100, 100, 100, 0x000000);
    gameState.startButton.setInteractive();
    gameState.startButton.on("pointerup", () => {
      this.startCalculation();
    });

    this.physics.add.collider(
      gameState.leftBlock,
      gameState.rightBlock,
      () => {
        gameState.collisions += 1;
      },
      (leftBlock, rightBlock) => {
        uL = leftBlock.body.velocity.x;
        uR = rightBlock.body.velocity.x;

        vL = (uL + gameState.mu * (2 * uR - uL)) / (1 + gameState.mu);
        vR = (2 * uL - uR + gameState.mu * uR) / (1 + gameState.mu);

        leftBlock.setVelocityX(vL);
        rightBlock.setVelocityX(vR);
      }
    );
    this.physics.add.collider(
      gameState.leftBlock,
      gameState.wall,
      () => {
        gameState.collisions += 1;
      },
      () => {
        uL = gameState.leftBlock.body.velocity.x;
        gameState.leftBlock.setVelocityX(-uL);
        gameState.wall.setVelocityX(0);
      }
    );
  }

  startCalculation() {
    gameState.rightBlock.setVelocityX(-50);
  }
  update() {
    if (
      !gameState.calculationOver &&
      gameState.rightBlock.body.velocity.x > 0 &&
      gameState.leftBlock.body.velocity.x >= 0 &&
      gameState.rightBlock.body.velocity.x > gameState.leftBlock.body.velocity.x
    ) {
      this.add.text(400, 150, `${gameState.collisions} collisions`, {
        font: "30px",
        fill: "#FFFFFF",
      });
      gameState.calculationOver = true;
    }

  }
}

const gameState = {
  width: 1000,
  height: 620,
  leftMass: 1,
  rightMass: 100,
  collisions: 0,
  calculationOver: false,
};

var uL;
var mL;
var vR;
var uR;
var vL;
