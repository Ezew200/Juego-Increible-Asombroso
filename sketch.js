//Variables

let playerSprite
let floor;
let jumpSwitch = false;
let backgroundImg;
let plataformas;
let gravity = 500;
let key;
let key2;
let uWin;
let winSwitch = false;
let obstacles;
let obstaclesSwitch = false;
let heart;
let lives = 3;
let gameOver;
let gameOverSwitch = false;


//FunciónPreload

function preload(){
backgroundImg = loadImage("assets/background.jpg")
uWin = loadImage("assets/uWin.jpg");
heart = loadImage("assets/heart.png");
gameOver = loadImage("assets/game over.jpg");
}


//FunciónSetup

function setup() {
    new Canvas(windowWidth, windowHeight);
    playerSprite = new Sprite();
    playerSprite.addAni('standing', 'assets/parado.png');
    playerSprite.addAni('left','assets/izquierda.png','assets/izquierda2.png');
    playerSprite.addAni('dead', 'assets/Gravestone.png');
    playerSprite.addAni('trofeo', 'assets/trofeo.png');
    playerSprite.addAni('right','assets/derecha.png','assets/derecha2.png')
    playerSprite.addAni('jumping', 'assets/parado.png');
    playerSprite.width = 60;
    playerSprite.debug = false;
    playerSprite.scale = 4;
    playerSprite.x = 900;
    playerSprite.mass = 1;
    floor = new Sprite(width/2,windowHeight+10,windowWidth,50,STATIC);
    floor.opacity = 0;
    world.gravity.y = gravity;
    key = new Sprite();
    key2 = new Sprite();
    key.addAni('key','assets/key.png');
    key2.addAni('key2','assets/key2.png');
    key.x = 365;
    key.y = 100;
    key2.x = 100;
    key2.y = 600;
    key2.static = true;
    key.static = true;
    key.scale = 1;
    key2.scale = 1;


    //Plataformas

    plataformas = new Group();
    while (plataformas.length < 3) {
        let plataforma = new plataformas.Sprite();
        plataforma.x = plataformas.length * 370;
        plataforma.y = plataformas.length * 100+150;
        plataforma.addAni('plataforma','assets/plataforma.webp');
        plataforma.scale = 0.7;
        plataforma.debug = false;
        plataforma.width = 100;
        plataforma.static = true;
    }


    //Obstaculos

    obstacles = new Group();
    while (obstacles.length < 3){

        let obstacle = new obstacles.Sprite();
        obstacle.x = obstacles.length * 250;
        obstacle.y = -800 * obstacles.length;
        obstacle.scale = 0.2;
        obstacle.addAni('obstaculo','assets/roca.png');
        obstacle.static = true;
        obstacle.gravityScale = 0.1;
    }

    obstacles[0].x = 470;
    obstacles[1].x = 320;
    obstacles[2].x = 110;
    print(obstacles[0]);
}


//FunciónUpdate

function update() {
   image(backgroundImg,0,0,windowWidth,windowHeight);
      playerSprite.rotation = 0;


//SistemaVidas

   if(lives == 3){
       image(heart,width-100,50,50,50);
       image(heart,width-150,50,50,50);
       image(heart,width-200,50,50,50);
   }
   if(lives == 2){
       image(heart,width-150,50,50,50);
       image(heart,width-200,50,50,50);
   }
   if(lives == 1){
       image(heart,width-200,50,50,50);
   }

   if(playerSprite.collides(obstacles)){
       lives -= 1;
   }

   if(lives == 0){
       gameOverSwitch = true;
   }


//SistemaColisiones

    if (playerSprite.collides(floor)||playerSprite.collides(plataformas)) {
        jumpSwitch = true;
    }

    if(playerSprite.collides(plataformas[2])){
        plataformas[2].position.x += random(-5,5);
   
    }
    if(playerSprite.collides(plataformas[1])){
        plataformas[1].position.x += random(-5,5);
       
    }
    if(playerSprite.collides(plataformas[0])){
        plataformas[0].position.x += random(-5,5);
       
    }

    if(playerSprite.collides(plataformas)){
        obstaclesSwitch = true;
    }else{
        obstaclesSwitch = false;
    }

    if(obstaclesSwitch == true){
        obstacles[0].static = false;
        obstacles[1].static = false;
        obstacles[2].static = false;
    }

    for(var i = 0; i<obstacles.length;i++){
        if(obstacles.collides(floor)){
            obstacles[i].y = -800;
        }
    }


    //InteracciónLlave

    if(playerSprite.collides(key)){
        winSwitch = true;
    }


    //Ganar
    
    if(winSwitch){
        image(uWin,0,0,width,height);
        for(var i = 0;i<3;i++){
            plataformas[i].position.x = -500;
            obstacles[i].position.x = -1000;
        }
        key.position.x = -500;
        playerSprite.scale = 0.8;
        playerSprite.static = true;
        playerSprite.changeAni('trofeo');
        key2.position.x = -1000;
        playerSprite.position.x = 770;
        playerSprite.position.y = 600;
    }


    //InteracciónLlave2

    if(playerSprite.collides(key2)){
        gameOverSwitch = true;
    }


    //Movimiento

    if (kb.released('d')) {
        playerSprite.changeAni('standing');
    }
    if (kb.released('a')) {
        playerSprite.changeAni('standing');
    }
    if (kb.released('w')) {
        playerSprite.changeAni('standing');
    }

    if (kb.pressing('w')&&jumpSwitch==true) {
        playerSprite.velocity.y = -40;
        playerSprite.changeAni('jumping');
        jumpSwitch = false;
       
    }  else if (kb.pressing('a')) {
        playerSprite.velocity.x = -10;
        playerSprite.changeAni('left');
    } else if (kb.pressing('d')) {
        playerSprite.velocity.x = 10;
        playerSprite.changeAni('right');
    } else {
      playerSprite.speed = 0;
    }


//Perder

    if(gameOverSwitch){
       image(gameOver,0,0,width,height);
       plataformas[0].x = -1000;
       plataformas[1].x = -1000;
       plataformas[2].x = -1000;
       key.x = -1000;
       obstacles[0].x = -1000;
       obstacles[1].x = -1000;
       obstacles[2].x = -1000;
       key2.x = -1000;
       playerSprite.static = true;
       playerSprite.scale = 0.7;
       playerSprite.changeAni('dead');
       playerSprite.position.x = 770;
       playerSprite.position.y = 600;
   }
}
