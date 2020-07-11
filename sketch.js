var trex, trexRun, trexCollide, ground, groundIMG, invisibleGround, gameState,END,PLAY, cloudIMG,cloud;
var cloudsGroup,obstaclesGroup,ob1,ob2,ob3,ob4,ob5,ob6,
    score;
function preload () {
  trexRun = loadAnimation("trex1.png","trex3.png","trex4.png");
  trexCollide = loadImage("trex_collided.png");
  groundIMG = loadImage("ground2.png");
  cloudIMG = loadImage("cloud.png");
  ob1 = loadImage("obstacle1.png");
  ob2 = loadImage("obstacle2.png");
  ob3 = loadImage("obstacle3.png");
  ob4 = loadImage("obstacle4.png");
  ob5 = loadImage("obstacle5.png");
  ob6 = loadImage("obstacle6.png");
}
function setup() {
  createCanvas(600, 200);
  trex=createSprite(50,180,20,30);
  trex.addAnimation("trex1",trexRun);
  trex.addAnimation("trexCollided",trexCollide)
  trex.scale = 0.5;
  ground= createSprite(width/2,height-20,width,20);
  ground.addImage(groundIMG);
  invisibleGround = createSprite(width/2,height-15,width,5);
  invisibleGround.visible = false;
  cloudsGroup= createGroup();
  obstaclesGroup = createGroup();
  PLAY = 1; 
  END = 0; 
  gameState = PLAY;
  score = 0;
}

function draw() {
  background(245);
  textFont("impact");
  textSize(18);
  text("Score: " + score,450,50);
  if(gameState === PLAY){
  if((keyDown("space")||keyDown(UP_ARROW))&&            trex.y>159){
     trex.velocityY = -10;
     }
     trex.velocityY += 0.8;
     ground.velocityX = -6;
     if(ground.x<0){
      ground.x=ground.width/2;
     }
  score = score + Math.round(getFrameRate()/60);
  spawnClouds();
  spawnObstacles(); 
    if(obstaclesGroup.isTouching(trex)){
       gameState = END; 
       }
  }
  else if (gameState === END){
    ground.velocityX = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    trex.changeAnimation("trexCollided");
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    trex.velocityY = 0;
  }
  drawSprites ();
  trex.collide(invisibleGround); 
}
function spawnClouds() {
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10); 
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudIMG);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.lifetime = 134;
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    cloudsGroup.add(cloud);
  }
  
}
function spawnObstacles(){
  if(frameCount % 80 === 0) {
    var obstacle = createSprite(600,160,10,40);
    obstacle.velocityX = -6; 
    var x = Math.round(random(1,6));
    switch(x){
      case 1: obstacle.addImage(ob1);break;
      case 2: obstacle.addImage(ob2);break;
      case 3: obstacle.addImage(ob3);break;
      case 4: obstacle.addImage(ob4);break;
      case 5: obstacle.addImage(ob5);break;
      case 6: obstacle.addImage(ob6);break;
      default: break;
    }
    obstacle.scale = 0.5; 
    obstacle.lifetime = 110;
    obstaclesGroup.add(obstacle);
}
}