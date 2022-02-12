var PLAY=1;
var END=0;
var gameState=1;

var birdie, worms ,eagles,wormsGroup,eaglesGroup,forest, score, position;
var birdieImage , wormsImage, eaglesImage, gameOverImage;
var gameOverSound;

function preload(){
  
  birdieImage = loadImage("birdie.png");
  eaglesImage = loadImage("eagle.png")
  wormsImage = loadImage("worm.png");
  gameOverImage = loadImage("gameover.png")
  forestIMG = loadImage("forest.png")
  gameOverSound = loadSound("gameover.mp3")
  
}



function setup() {
  createCanvas(700, 600);
  
  forest= createSprite(200,180,400,20);
  forest.addImage("green",forestIMG);
  forest.x = forest.width/2;
  forest.velocityX = -4;
  forest.scale = 1.5  
  invisibleGround = createSprite(200,600,600,15);
  invisibleGround.visible = false;
  birdie=createSprite(40,200,20,20);
  birdie.addImage(birdieImage);
  birdie.scale=0.32



  
  
  
  //set collider for sword
  birdie.setCollider("rectangle",0,0,40,40);

  // Score variables and Groups
  score=0;
  wormsGroup=createGroup();
  eaglesGroup=createGroup();
  
}

function draw() {
  background("blue");
  background.velocityX = 2
  if(gameState===PLAY){
    
    
    Worms();
    Eagles();
    
    
    if (forest.x < 10)
    {
      forest.x = forest.width/2;
    }
       
    if(keyDown("left_arrow")) 
    {

      birdie.x = birdie.x -3.5;


    }
   
    if(keyDown("right_arrow")) 
    {

      birdie.x = birdie.x +3.5;


    }
    if(keyDown("space")) 
    {

      birdie.velocityY = -7;


    }
    birdie.velocityY = birdie.velocityY +0.7;
	

    if(wormsGroup.isTouching(birdie))
    {
      wormsGroup.destroyEach();
      score=score+2;

    }
    else
    {
    
      if(eaglesGroup.isTouching(birdie)|| invisibleGround.isTouching(birdie)){
        gameState=END;
        gameOverSound.play()
        forest.velocityX = 0
        birdie.velocityX   = 0 
        birdie.velocityY = 0
        wormsGroup.destroyEach();
        eaglesGroup.destroyEach();
        wormsGroup.setVelocityXEach(0);
        eaglesGroup.setVelocityXEach(0);
        
        // Change the animation of sword to gameover and reset its position
        birdie.addImage(gameOverImage);
        birdie.scale=0.2;
        birdie.x=350;
        birdie.y=300;
      }
    }
  }
  
  drawSprites();
  
  textSize(25);
  fill("black")
  text("Score : "+ score,250,50);
  
}


function Eagles(){
  if(World.frameCount% 110===0){
    eagles=createSprite(400,200,20,20);
    eagles.addImage(eaglesImage);
    eagles.scale = 0.075
    eagles.y=Math.round(random(100,550));
    eagles.velocityX=-(8+(score/10));
    eagles.setLifetime=200;
    
    eaglesGroup.add(eagles);
  }
}

function Worms(){
  if(World.frameCount % 70===0)
  {
    worms = createSprite(400,200,20,20);
    worms.x = 0    
    worms.addImage(wormsImage);
    worms.velocityX= (7+(score/4));
      
    worms.scale=0.15;
    //worms.debug=true;
     
    
    worms.y=Math.round(random(50,550));
   
    
    worms.setLifetime=200;
    
    wormsGroup.add(worms);
  }
}