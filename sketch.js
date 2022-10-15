var path,boy,cash,diamonds,coin,bomb, Replay;
var pathImg,boyImg,cashImg,diamondsImg,coinImg,bombImg,ReplayButton;
var score = 0;
var cashG,diamondsG,coinG,bombGroup;
var collectSound, gameOverSound;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  coinImg = loadImage("coin.png");
  bombImg = loadImage("bomb.png");
  endImg =loadImage("gameOver.png");
  collectSound= loadSound("collect.mp3");
  gameOverSound= loadSound("fail.mp3");
  ReplayButton= loadImage("replay.png");
}

function setup(){
  
  createCanvas(400,600);
// Moving background
path=createSprite(200,200);
path.addImage(pathImg);


//creating boy running
boy = createSprite(70,500,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.addAnimation("GameOver", endImg);
boy.scale=0.08;

Replay = createSprite(200,400,20,50);
Replay.addImage(ReplayButton);
Replay.scale= 0.5;
Replay.visible= false;

gameOver = createSprite(200,300,20,50);
gameOver.addImage(endImg);
gameOver.scale= 0.8;
gameOver.visible=false;
  
cashG=new Group();
diamondsG=new Group();
coinG=new Group();
bombGroup=new Group();

}

function draw() {

  if(gameState===PLAY){
  background(0);
  boy.x = World.mouseX;


  path.velocityY= 4;
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > 900 ){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createcoin();
    createbomb();

    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      score=score+50;
      collectSound.play();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      score=score+100;
      collectSound.play();
    }
    else if(coinG.isTouching(boy)) {
      coinG.destroyEach();
      score= score + 150;
      collectSound.play();
    }
  
    if(bombGroup.isTouching(boy)) {
        gameState=END;
        gameOverSound.play();
    }
  }

  if (gameState==END) {

        path.velocityY=0;
     
        boy.visible=false;

        Replay.visible= true;

        gameOver.visible=true;

        cashG.destroyEach();
        diamondsG.destroyEach();
        coinG.destroyEach();
        bombGroup.destroyEach();

        
        cashG.setVelocityYEach(0);
        diamondsG.setVelocityYEach(0);
        coinG.setVelocityYEach(0);
        bombGroup.setVelocityYEach(0);
  }

  if(mousePressedOver (Replay)){
    playAgain();
  }

  
  drawSprites();
  textSize(20);
  fill("orange");
  textFont("Courier New");
  textSize(20);
  text("TREASURE COLLECTED:"+ score,70,580);
  }

  function playAgain() {
    gameState=PLAY;
    Replay.visible=false;
    gameOver.visible=false;

    boy.visible=true;

    score=0;

  }

function createCash() {
  if (World.frameCount % 150 == 0) {
  var cash = createSprite(Math.round(random(50, 350),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 4;
  cash.lifetime = 200;
  cashG.add(cash);
  }
}

function createDiamonds() {
  if (World.frameCount % 200 == 0) {
  var diamonds = createSprite(Math.round(random(50, 350),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.01;
  diamonds.velocityY = 4;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createcoin() {
  if (World.frameCount % 290 == 0) {
  var coin = createSprite(Math.round(random(50, 350),40, 10, 10));
  coin.addImage(coinImg);
  coin.scale=0.02;
  coin.velocityY = 4;
  coin.lifetime = 200;
  coinG.add(coin);
  }
}

function createbomb(){
  if (World.frameCount % 410 == 0) {
  var bomb = createSprite(Math.round(random(50, 350),40, 10, 10));
  bomb.addImage(bombImg);
  bomb.scale=0.07;
  bomb.velocityY = 4;
  bomb.lifetime = 200;
  bombGroup.add(bomb);


  }
}

