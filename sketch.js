//creating variables 
var destroyedShipImg, GameLoadImg, LargePointShipImg, playerImg, returnImg, rulesImg, alienImg1,
 alienImg2, alienImg3, laserImg, gameOverImg, bigShipImg, startImg;
var gameState;
var game;
var player;
var gameOver;
var laser1, alien;
var alienGroup;
var laserGroup;
var bigShip;
var start;
var score = 0;
var barrier1, barrier2, barrier3;
var barrier1hp, barrier2hp, barrier3hp;


//preload img
function preload() {
	destroyedShipImg = loadImage("images/Destroyed_Ship.png");
	GameLoadImg = loadImage("images/GameLoad.png");
	LargePointShipImg = loadImage("images/LargePointShip.png");
	playerImg = loadImage("images/Player.png");
	returnImg = loadImage("images/Return.png");
	rulesImg = loadImage("images/Rules.png");
	alienImg1 = loadImage("images/saucer1b.png");
	alienImg2 = loadImage("images/saucer2b.png");
	alienImg3 = loadImage("images/saucer3b.png");
  laserImg = loadImage("images/laser.png");
  gameOverImg = loadImage("images/gameover.png")
  startImg = loadImage("images/Start.png");
}

function setup() {
  //create groups
  alienGroup = new Group();
  laserGroup = new Group();

  //set gamestate
  gameState = 1;

  //create player
  player = createSprite(displayWidth / 2, displayHeight/2 + 230);
  
  //create barriers
  barrier1 = createSprite(300, displayHeight/2 +330, 400, 100);
  barrier2 = createSprite(900, displayHeight/2 +330, 400, 100);
  barrier3 = createSprite(1500, displayHeight/2 +330, 400, 100);

  barrier1hp = 3;
  barrier2hp = 3;
  barrier3hp = 3;

  gameOver = createSprite( displayWidth/2 - 75, displayHeight/2 - 200);
  gameOver.visible = false

  if(gameState === 1){
    this.title = createSprite(displayWidth / 2, displayHeight / 2 - 150);
		this.title.addImage(GameLoadImg);
		this.button = createButton("Play");
    this.button.position(displayWidth / 2, displayHeight / 2 + 100);
    this.title.visible = false;
    this.button.visible = false;
    this.returnStart = createButton("Return");
    this.returnStart.position(displayWidth/2 - 110 , displayHeight/2 + 90);
    this.returnStart.visible = false;
  }
    
    
	
}
 
function draw() {
	createCanvas(displayWidth - 20, displayHeight-150);
  background(0)
  console.log(gameState);
//gamestate 1
if (gameState === 1) {
  this.title.visible = true;
  button.visible = true;
  gameOver.visible = false;
  returnStart.hide();
  this.button.show();
  score = 0;
  player.visible = false

  barrier1.visible = false;
  barrier2.visible = false;
  barrier3.visible = false;

  barrier1hp = 3;
  barrier2hp = 3;
  barrier3hp = 3;
  

  this.button.mousePressed(() => {
    gameState = 2;
  });
}

//gamestate 2
	if (gameState === 2) {
    this.title.visible = false;
		button.hide();
    player.visible = true
    returnStart.hide();
    player.addImage(playerImg);
    textSize(28);
    fill("#39ff14");
    text("Score: " + score, displayWidth - 210, 50);
    
    
		
    //createAliens
    var rand3 = Math.round(random(40, 50));
    var rand2 = Math.round(random(1, 3))
    if (frameCount % rand3 === 0) {
      alien = createSprite(null,null, 40, 40);
      alien.x = Math.round(random(0, 1850));
      alien.setVelocity(0, 6);
      alienGroup.add(alien);
      alien.addImage(alienImg1);
    }
    
    //show barrier
    barrier1.visible = true;
    barrier2.visible = true;
    barrier3.visible = true;

    

    barrier1.shapeColor = "#39ff14";
    barrier2.shapeColor = "#39ff14";
    barrier3.shapeColor = "#39ff14";
    

    //createLaser
    if(keyWentDown("space")) {
      laser1 = createSprite(player.x, player.y, 20, 40);
      laser1.visible = true;
      laser1.x = player.x;
      laser1.y = laser1.y;
      laser1.shapeColor = " #39ff14"
      laser1.setVelocity(0, - 6)
      laserGroup.add(laser1);
    }
    
   //destroy if laser or alien goes off screen
   if(laserGroup.y <= 0){
    laserGroup.destroy();
    }
    if(alienGroup.y >= displayHeight){
      alien.destroy();
    }

    //player movement
		if (keyDown(LEFT_ARROW)) {
			player.x = player.x - 17;
		} else if (keyDown(RIGHT_ARROW)) {
      player.x = player.x + 17;
    }

    
    for(var i = 0; i<alienGroup.length; i++){    
      for(var c = 0; c<laserGroup.length; c++){
      if (laserGroup.isTouching(alienGroup.get(i))) {
        if (laserGroup.get(c).isTouching(alienGroup)) {
          laserGroup.get(c).destroy();
          alienGroup.get(i).destroy();          
          score += 10;
      }
    }
  }    
  } 

  for(var i = 0; i<alienGroup.length; i++){
    if(alienGroup.get(i).isTouching(player)){
      gameState = 3
    }
  }

  for(var i = 0; i<alienGroup.length; i++){
    if(alienGroup.get(i).y>displayHeight){
      alienGroup.get(i).visible = false;
    }
  }
  for(var i = 0; i<alienGroup.length; i++){
    if(alienGroup.get(i).isTouching(barrier1)){
      barrier1hp --;
      alienGroup.get(i).destroy();
    }
  }
  for(var i = 0; i<alienGroup.length; i++){
    if(alienGroup.get(i).isTouching(barrier2)){
      barrier2hp --;
      alienGroup.get(i).destroy();
    }
  }
  for(var i = 0; i<alienGroup.length; i++){
    if(alienGroup.get(i).isTouching(barrier3)){
      barrier3hp --;
      alienGroup.get(i).destroy();
    }
  }
    player.setCollider("rectangle", 0, 0, 30, 30);

  if(keyWentDown("l")){
    gameState = 3;
  }

    if(barrier1hp === 2){
      barrier1.shapeColor = 'yellow';
    }
    if(barrier1hp === 1){
      barrier1.shapeColor = 'red';
    }    
    if(barrier1hp === 0){
      barrier1.visible = false
    }
  
    if(barrier2hp === 2){
      barrier2.shapeColor = 'yellow';
    }
    if(barrier2hp === 1){
      barrier2.shapeColor = 'red';
    }    
    if(barrier2hp === 0){
      barrier2.visible = false
    }
  
    if(barrier3hp === 2){
      barrier3.shapeColor = 'yellow';
    }
    if(barrier3hp === 1){
      barrier3.shapeColor = 'red';
    }    
    if(barrier3hp === 0){
      barrier3.visible = false
    }
    
    if(barrier1hp === 0 && barrier2hp === 0 && barrier3hp === 0){
      gameState = 3;
    }
}
  //gameState 3
	if (gameState === 3) {
    fill("red");
    textSize(32);
    gameOver.visible = true
    gameOver.addImage(gameOverImg);
    gameOver.scale = 0.3
    text("Your Score: " + score, displayWidth/2 - 190 , displayHeight/2 );
    player.visible = false;
    barrier1.visible = false;
    barrier2.visible = false;
    barrier3.visible = false;
    alienGroup.destroyEach();
    laserGroup.destroyEach();
    returnStart.show();
    

    returnStart.mousePressed(() => {
      gameState = 1;
		});
  }
	drawSprites()
}

