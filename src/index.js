import "./styles.css";
import images from "../assets/*.png";

let game;
let numflowers = 0;

const gameOptions = {
  manGravity: 0,
  manSpeed: 150,
  blocksize: 60,
  numMen: 3,
  numBlueFlowers: 5,
  numRedFlowers: 5,
  numBlocks: 50,
  xblocks: 12,
  yblocks: 12,
  butterflySpeed: 120,
  waspSpeed: 120,
  enemyInterval: 4000,
  butterflyRateOfEnemies: 0.8
}


window.onload = function() {
  let gameConfig = {
    type: Phaser.AUTO,
    backgroundColor: 0x22b14c,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: gameOptions.blocksize * gameOptions.xblocks,
        height: gameOptions.blocksize * gameOptions.yblocks,
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            }
        }
    },
    scene: PlayGame
  };
  
  game = new Phaser.Game(gameConfig);
  window.focus();
}


class PlayGame extends Phaser.Scene {

  constructor() {
      super("PlayGame")
      this.score = 0;
  }

  preload() {
    this.load.image("block", require("../assets/block_grey.png"));
    this.load.image("flowerBlue", require("../assets/flower_blue.png"));
    this.load.image("flowerRed", require("../assets/flower_red.png"));
    this.load.spritesheet("man", require("../assets/man.png"), { frameWidth: 46, frameHeight: 46 });
    this.load.spritesheet("butterfly", require("../assets/Butterfly.png"), { frameWidth: 75, frameHeight: 75 });
    this.load.spritesheet("wasp", require("../assets/wasp.png"), { frameWidth: 75, frameHeight: 75 });
    this.load.audio("sting", [require("../assets/bzzz.mp3")]);
    this.load.audio("suck", [require("../assets/suck.mp3")]);
  }

  create() {
    let flowers = [];
    this.scoreText = this.add.text(game.config.width - gameOptions.blocksize, 0, this.score, {fontSize: "34px", fill: "#000000"})

    this.blockGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false
    })
    this.blueFlowerGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false
    })
    this.redFlowerGroup = this.physics.add.group({
      immovable: true,
      allowGravity: false
    })
    let x, y;
    for(let i = 0; i < gameOptions.numBlueFlowers; i++) {
      x = Phaser.Math.Between(1, gameOptions.xblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
      y = Phaser.Math.Between(1, gameOptions.yblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
//        console.log("blue: ", i, x, y);
      this.blueFlowerGroup.create(x, y, "flowerBlue");
      flowers[i] = {x: x, y: y};
      numflowers ++;
    }
    for(let i = 0; i < gameOptions.numRedFlowers; i++) {
      x = Phaser.Math.Between(1, gameOptions.xblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
      y = Phaser.Math.Between(1, gameOptions.yblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
//        console.log("red: ",i, x, y);
      this.redFlowerGroup.create(x, y, "flowerRed");
      flowers[5 + i] = {x: x, y: y};
      numflowers ++;
    }
    for(let i = 0; i < gameOptions. numBlocks; i++) {
      x = Phaser.Math.Between(1, gameOptions.xblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
      y = Phaser.Math.Between(1, gameOptions.yblocks-2) * gameOptions.blocksize + gameOptions.blocksize/2;
//        console.log("block: ",i);
      let allowed = true;
      for (let j = 0; j < gameOptions.numBlueFlowers+gameOptions.numRedFlowers; j++) {
        if (x == flowers[j].x && y == flowers[j].y){
          allowed = false;
          console.log("ei käy");
        }
      }
      if (allowed == true){
        this.blockGroup.create(x, y, "block");
//        console.log(x, y);
      }
    }
    this.man = this.physics.add.sprite(gameOptions.blocksize/2, gameOptions.blocksize/2, "man");
    this.physics.add.collider(this.man, this.blockGroup);
    this.physics.add.overlap(this.man, this.blueFlowerGroup, this.collectBlueFlower, null, this);
    this.physics.add.overlap(this.man, this.redFlowerGroup, this.collectRedFlower, null, this);

    this.butterflyGroup = this.physics.add.group({});
    this.waspGroup = this.physics.add.group({});

//      this.gameText = this.add.text(game.config.width/2, 0, `Level ${level}`, {fontSize: "40px", fill: "#000000"})
    this.stingSound = this.sound.add("sting", {loop: false});
    this.suckingSound = this.sound.add("suck", {loop: false});

// perhosen lento:
    this.anims.create({
      key: "bfleft",
      frames: this.anims.generateFrameNumbers("butterfly", {start: 2, end: 3}),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: "bfright",
      frames: this.anims.generateFrameNumbers("butterfly", {start: 0, end: 1}),
      frameRate: 5,
      repeat: -1
    });


// ampiaisen lento:
    this.anims.create({
      key: "waspleft",
      frames: this.anims.generateFrameNumbers("wasp", {frames: [0]}),
      repeat: 0
    });
    this.anims.create({
      key: "waspright",
      frames: this.anims.generateFrameNumbers("wasp", {frames: [1]}),
      repeat: 0
    });

    this.triggerTimer = this.time.addEvent({
      callback: this.addEnemies,
      callbackScope: this,
      delay: gameOptions.enemyInterval,
      loop: true
    });
 
    this.physics.add.overlap(this.butterflyGroup, this.blueFlowerGroup, this.butterflySucksFlower, null, this);
    this.physics.add.overlap(this.butterflyGroup, this.redFlowerGroup, this.butterflySucksFlower, null, this);
    this.physics.add.overlap(this.man, this.waspGroup, this.waspStings, null, this);
    
    this.cursors = this.input.keyboard.createCursorKeys();
  }

  collectBlueFlower(man, flowerBlue) {
    flowerBlue.disableBody(true, true)
    this.score += 10
    this.scoreText.setText(this.score)
    numflowers --;
    if(numflowers == 0) { 
      this.time.addEvent({
        delay: 2000,
        callback: ()=>{
          this.scene.start("PlayGame");
          this.score = 0;
          numflowers = 0;
          this.flowers = [];
        },
        loop: true
      })
    }
  }
  collectRedFlower(man, flowerRed) {
    flowerRed.disableBody(true, true)
    this.score += 20
    this.scoreText.setText(this.score)
    numflowers --;
    if(numflowers == 0) { 
      this.time.addEvent({
        delay: 2000,
        callback: ()=>{
          this.scene.start("PlayGame");
          this.score = 0;
          numflowers = 0;
          this.flowers = [];
        },
        loop: true
      })
    }
  }

  butterflySucksFlower(butterfly, flower) {
    this.suckingSound.play();
    flower.disableBody(true, true);
    this.score -= 20;
    this.scoreText.setText(this.score);
    numflowers --;
    if(numflowers == 0) {
      this.butterflyGroup.setVelocityX = 0;
      this.butterflyGroup.setVelocityY = 0;
      this.waspGroup.setVelocityX = 0;
      this.waspGroup.setVelocityY = 0;
      if (level == gameOptions.maxlevel) { 
        this.gameText.setText(`Level ${level} completed, game finished`);
        this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            numflowers = 0;
            this.score = 0;
            this.flowers = [];
            level = 1;
            this.scene.start("PlayGame");
          },
          loop: true
        });
      }
      else if(numflowers == 0) { 
        this.gameText.setText(`Level ${level} completed`);
        this.time.addEvent({
          delay: 2000,
          callback: ()=>{
            level ++;
            numflowers = 0;
            this.flowers = [];
        // seuraava level:
            this.scene.start("PlayGame");
          },
          loop: true
        })
      }
    }
  }

  waspStings(man, wasp) {
    this.stingSound.play();
    man.disableBody(true, true)
    gameOptions.numMen--;
    this.score -= 50
    this.scoreText.setText(this.score)
    if(gameOptions.numMen == 0) { 
      this.gameText.setText(`Game over`);
      this.butterflyGroup.setVelocityX = 0;
      this.butterflyGroup.setVelocityY = 0;
      this.waspGroup.setVelocityX = 0;
      this.waspGroup.setVelocityY = 0;
      this.time.addEvent({
        delay: 2000,
        callback: ()=>{
          numflowers = 0;
          this.score = 0;
          this.flowers = [];
          level = 1;
          this.scene.start("PlayGame");
        },
        loop: true
      })
    }
  }

  addEnemies() {
    console.log("Adding enemies, ",gameOptions.butterflySpeed, gameOptions.waspSpeed)
    let num = Phaser.Math.FloatBetween(0, 1);
    console.log(num);
    if(num >= gameOptions..butterflyRateOfEnemies) {
      console.log("bf");
      let bf = this.butterflyGroup.create(Phaser.Math.Between(0, game.config.width), game.config.height, "butterfly");
      bf.setVelocityY(-gameOptions.butterflySpeed);
      if (bf.body.position.x < game.config.width/2) {
        bf.setVelocityX(gameOptions.butterflySpeed/2);
        bf.anims.play("bfright", true);
      }
      else {
        bf.setVelocityX(-gameOptions.butterflySpeed/2);
        bf.anims.play("bfleft", true);
      }
    }
    else {
      console.log("wasp");
      let w = this.waspGroup.create(Phaser.Math.Between(0, game.config.width), game.config.height, "wasp");
      w.setVelocityY(-gameOptions.waspSpeed);
      if (w.body.position.x < game.config.width/2){
        w.setVelocityX(gameOptions.waspSpeed/2);
        w.anims.play("waspright", true);
      }
      else {
        w.setVelocityX(-gameOptions.waspSpeed/2);
        w.anims.play("waspleft", true);
      }
    }
  }

  update() {
    if(this.cursors.left.isDown) {
      this.man.body.velocity.x = -gameOptions.manSpeed
    }
    else if(this.cursors.right.isDown) {
      this.man.body.velocity.x = gameOptions.manSpeed
    }
    else if(this.cursors.up.isDown) {
      this.man.body.velocity.y = -gameOptions.manSpeed
    }
    else if(this.cursors.down.isDown) {
      this.man.body.velocity.y = gameOptions.manSpeed
    }
    else{
      this.man.body.velocity.x = 0;
      this.man.body.velocity.y = 0;
    }
  }
}
