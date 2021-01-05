var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey, monkey_running;
var banana, bananaImage, rock, obstacleImage;
var foodGroup, rocksGroup;
var score;
var ground;
var survivalTime = 0;
var score = 0;

function preload() {
  monkey_running = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
}

function setup() {
  createCanvas(600, 400);

  ground = createSprite(400, 350, 900, 10);

  monkey = createSprite(130, 315, 20, 20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;

  rocksGroup = createGroup();
  foodGroup = createGroup();
}


function draw() {
  
  background(360);

  if (rocksGroup.isTouching(monkey)) {
    gameState = END;
  }
  
  
  if (gameState === PLAY) {

  if (keyDown("space") && monkey.y >= 300 ) {
      monkey.velocityY = -15;
    }

    if (foodGroup.isTouching(monkey)) {
      foodGroup.destroyEach();
      survivalTime = survivalTime+1;
    }

    monkey.velocityY = monkey.velocityY + 0.8
    
    food();
    rocks();
  } else if (gameState === END) {
    banana.velocityX = 0;
    rock.velocityX = 0;
    monkey.velocityX = 0;
  }
  
  monkey.collide(ground);

  stroke("white");
  textSize(20);
  fill("white");
  text("Score: " + score, 500, 50);

  stroke("black");
  textSize(20);
  fill("black");
  text("Surival Time: " + survivalTime, 100, 50);


  
  drawSprites();
}

function rocks() {
  if (World.frameCount % 200 === 0) {
    rock = createSprite(550, 318, 20, 20);
    rock.addImage(obstaceImage);
    rock.scale = 0.16;
    rock.velocityX = -7;
    rock.setLifetime = 600;
    rocksGroup.add(rock);
  }
}

function food() {
  if (World.frameCount % 80 === 0) {
    banana = createSprite(500, 215, 20, 20);
    banana.addImage(bananaImage);
    banana.scale = 0.12;
    banana.y = Math.round(random(120, 200));
    banana.velocityX = -5;
    foodGroup.add(banana)
    banana.setLifetime = 600;
  }
}