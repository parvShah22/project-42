var fruit
var monkey , monkey_running,monkey_collided
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score = 0;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var backGround;


function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  //monkey_collided = loadAnimation("monkey_collided.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 jungle = loadImage("jungle.jpg")
}



function setup() {
    createCanvas(800,500);
monkey = createSprite(70,160,20,50);
  monkey.addAnimation("running", monkey_running);
  monkey.scale = 0.10;
  
  obstacleGroup = new Group ();
    bananaGroup = new Group ();

  
  ground = createSprite(400,450,900,20);
  ground.x=ground.width/2;
  console.log(ground.x)
  
  backGround = createSprite(400,200,900,20);
  backGround.velocityX=-5;
  backGround.addImage(jungle)
  console.log(backGround.x)

}
  

function draw() {
 background("white")
  if (gameState === PLAY) {
  ground.visible=false;

 

if(backGround.x<400){
  backGround.x=backGround.width/2
}

   if(keyDown("space")) {
       monkey.velocityY = -12;
    }

       monkey.velocityY = monkey.velocityY + 1.0
 spawnfruits();
     spawnobstacle();
    if(obstacleGroup.isTouching(monkey)){
      gameState=END
} 
      if (ground.x < 500){
      ground.x = ground.width/2;
    }
      ground.velocityX=-4;

    
   
    if(monkey.isTouching(obstacleGroup)){
    gameState = END;
  }
 
  drawSprites ();
  if (monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    score=score+2;
    monkey.scale+=0.01}
 
  }
   else if (gameState === END) {
   
   monkey.visible = false;
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
     
     obstacleGroup.setVelocityXEach(0);
     bananaGroup.setVelocityXEach(0); 
  
  bananaGroup.destroyEach();
  obstacleGroup.destroyEach();
 
  fill("red")
  textSize(30)
  text(" 𝓖𝓪𝓶𝓮 𝓞𝓿𝓮𝓻  ",400,200 )

  }
 
 monkey.collide(ground)
 fill("white")
  textSize(30)
  textFont(" Comic Sans MS free")
  text(" score : " + score,650,100 )
 
}





function spawnobstacle() {
 //write code here to spawn the fruit
   if (frameCount % 320 === 0) {
     obstacle = createSprite(800,420,40,10);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.2;
    obstacle.velocityX = -3;
      
     //assign lifetime to the variable
    obstacleGroup.lifetime = 134;
    
    
    
    //adding cloud to the group
   obstacleGroup.add(obstacle);
    }
}


  

function spawnfruits() {
  //write code here to spawn the fruit
   if (frameCount % 150 === 0) {
     fruit = createSprite(700,300,40,10);
    fruit.y = Math.round(random(60,150));
    fruit.addImage(bananaImage);
    fruit.scale = 0.1;
    fruit.velocityX = -3;
      
     //assign lifetime to the variable
    fruit.lifetime = 220;
    
    //adjust the depth
    monkey.depth = fruit.depth;
    fruit.depth = fruit.depth + 1;
    
    //adding cloud to the group
   bananaGroup.add(fruit);
    }
}


