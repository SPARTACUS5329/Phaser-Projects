class PiCalculator extends Phaser.Scene {
  preload() {
    this.load.image("wall", "./Assets/wall.png");
    this.load.image("block", "./Assets/block.png");
  }

  create() {
    gameState.mu = gameState.rightMass / gameState.leftMass;
    gameState.leftBlock = this.physics.add
      .sprite(200, 574, "block")
      .setScale(0.3);

    gameState.rightBlock = this.physics.add
      .sprite(600, 544, "block")
      .setScale(0.5);
    gameState.wall = this.physics.add.sprite(50, 500, "wall");

    // gameState.leftBlock.setBounce(0.5);
    // gameState.rightBlock.setBounce(0.5);

    // gameState.leftBlock.setMass(1);
    // gameState.rightBlock.setMass(100);
    // gameState.wall.body.setImmovable(true);

    gameState.rightBlock.body.customSeparateX = true;
    gameState.leftBlock.body.customSeparateX = true;
    gameState.wall.body.customSeparateX = true;

    this.physics.world.setBounds(0, 0, Infinity, gameState.height);
    gameState.leftBlock.setCollideWorldBounds(true);
    gameState.rightBlock.setCollideWorldBounds(true);
    gameState.wall.setCollideWorldBounds(true);

    // this.physics.add.collider(gameState.leftBlock,gameState.rightBlock,()=>{
    //   gameState.collisions += 1;
    // });
    // this.physics.add.collider(gameState.leftBlock, gameState.wall,()=>{
    //   gameState.collisions += 1;
    // });
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

    //gameState.leftBlock.setVelocityX(50);
    gameState.rightBlock.setVelocityX(-50);
  }
  update() {}
}

const gameState = {
  width: 620,
  height: 620,
  leftMass: 1,
  rightMass: 100,
  collisions: 0,
};

var uL;
var mL;
var vR;
var uR;
var vL;
