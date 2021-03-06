
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var dino;
var attack;
var upFront = false;
var downFront = false;
var leftFront = false;
var rightFront = false;
var isAttacking = false;
var swipe;
var playerXP = 0;
var playerHealth = 20;
var maxPlayerHealth = 20;
var levelingXP = 20;
var victoryXP = levelingXP * 2.25*2.25*2.25;
var playerSpeed = 200;
var aSound;
var endValue;
var fromDir = 'S';
var plantsEatenAtLevel = 0;
var animalsEatenAtLevel = 0;
var playerLevel = 1;
var playerDamage = 1;
//directional flags
var moveUp = false;
var moveDown = true;
var moveLeft = true;
var moveRight = false;
function player(game, image, aImage, attackSound)
{
    var upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    var downKey = game.input.keyboard.addKey(Phaser.Keyboard.S);
    var leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    var rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    aSound = game.add.audio(attackSound);
    //aSound.addMarker('testAttack', 1, 1.0);
    
    var x = fromDir == 'W' ? 150 : fromDir == 'E' ? 630 : 380;
    var y = fromDir == 'N' ?  80 : fromDir == 'S' ? 440 : 260;
    
    dino = game.add.sprite(x, y, image);
    
    swipe = game.add.sprite(250, 250, aImage);
    swipe.animations.add('attackSwipe');
    //set up movement animations
    dino.animations.add('upLeft',[2]);
    dino.animations.add('upRight',[1]);
    dino.animations.add('downRight',[3]);
    dino.animations.add('downLeft',[0]);
    
    game.physics.p2.enable(dino, false);
    game.physics.p2.enable(swipe, false); // 'true' to show debug box for attack
    game.physics.enable(dino, Phaser.Physics.ARCADE);
    game.physics.enable(dino);
    dino.body.collideWorldBounds = true;
    dino.body.fixedRotation = true;
    swipe.body.kinematic = true;
    swipe.kill();
    //pausing the game
       pauseKey = game.input.keyboard.addKey(Phaser.Keyboard.P);
       restartKey = game.input.keyboard.addKey(Phaser.Keyboard.R);
       quitKey = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
    
    // Dino Leveling Statistics


    //swipe.revive();
    //swipe.body.fixedRotation = true;
     this.update = function (map, bg_layer)
    {   
        var transition = false; // set to true to jump to a new map.
        
         //check for overlap w/ shrubs:
        var currentTile = map.getTile(Math.floor(dino.x/40),
            Math.floor(dino.y/40), bg_layer, true);
        if (currentTile.index == 7 || currentTile.index == 9){
            //console.log("colliding w/ shrub index #" + currentTile.index);
            map.replace(7, 1, currentTile.x, currentTile.y, 1, 1);
            map.replace(9, 1, currentTile.x, currentTile.y, 1, 1);
            this.addXP(1);
            plantsEatenAtLevel = plantsEatenAtLevel + 1;
        }
        else if (currentTile.index == 8) { // warp tile
            if (currentTile.x == 2){ 
                console.log('go west');
                fromDir = 'E';
            }
            if (currentTile.x == map.width-1) {
                console.log('go east');    
                fromDir = 'W';
            }
            if (currentTile.y == 0) {
                console.log('go north');
                fromDir = 'S';
            }
            if (currentTile.y == map.height-1) {
                console.log('go south');
                fromDir = 'N';
            }
            transition = true;
        }
        //control the pause, restart, and quit actions
        if(pauseKey.isDown){
            level_0.managePause();
        }
        if(restartKey.isDown){
            //resets aspects of player as well
            console.log("HEY RESTART");
            playerXP = 0;
            playerHealth = 20;
            maxPlayerHealth = 20;
            levelingXP = 20;
            victoryXP = levelingXP * 2.25*2.25*2.25;
            playerSpeed = 200;
            plantsEatenAtLevel = 0;
            animalsEatenAtLevel = 0;
            playerLevel = 1;
            playerDamage = 1;
            enemyCircle = 100;
            console.log(levelingXP);
            console.log(playerXP);
            game.state.start('level_0');
        }
        if(quitKey.isDown){
            game.state.start('mainMenu');
        }
        
        dino.body.setZeroVelocity();
        if (isAttacking == false) {
            if (leftKey.isDown)
            {
                //move to the leftarino
                leftFront = true;
                upFront = false;
                downFront = false;
                rightFront = false;
                //set directional flags for when moving up and down
                moveLeft = true;
                moveRight = false;
                //so player faces right direction
                if(moveDown)dino.animations.play('downLeft');
                else dino.animations.play('upLeft');
                //dino.body.angle = -90;
                //dino.angle = -90;
                dino.body.moveLeft(playerSpeed);
            }
            else if (rightKey.isDown)
            {
                //move to the rightarino
                leftFront = false;
                upFront = false;
                downFront = false;
                rightFront = true;
                //set directional flags for when moving up and down
                moveRight = true;
                moveLeft = false;
                //so player faces right direction
                if(moveDown)dino.animations.play('downRight');
                else dino.animations.play('upRight');
                //dino.body.angle = 90;
                //dino.angle = 90;
                dino.body.moveRight(playerSpeed);
            }
            if (upKey.isDown)
            {
                //to the sky!
                leftFront = false;
                upFront = true;
                downFront = false;
                rightFront = false;
                //set directional flags for when moving left and right
                moveUp = true;
                moveDown = false;
                //so player faces right direction
                if(moveRight)dino.animations.play('upRight');
                else dino.animations.play('upLeft');
                //dino.body.angle = 0;
                //dino.angle = 0;
                dino.body.moveUp(playerSpeed);
            }
            else if (downKey.isDown)
            {
                //STRAIGHT TO HELL
                leftFront = false;
                upFront = false;
                downFront = true;
                rightFront = false;
                //set directional flags for when moving left and right
                moveDown = true;
                moveUp = false;
                //so player faces right direction
                if(moveRight)dino.animations.play('downRight');
                else dino.animations.play('downLeft');
                //dino.body.angle = 180;
                //dino.angle = 180;
                dino.body.moveDown(playerSpeed);
            }
            if (spaceKey.isDown && isAttacking == false)
            {
                if (leftKey.isDown)
                {
                    swipe.revive();
                    swipe.body.x = dino.x - 80;
                    swipe.body.y = dino.y;
                    swipe.angle = -90;
                    swipe.body.angle = -90;
                    //testing end screens(false to lose, true to win)
                    console.log('false');

                }
                else if (rightKey.isDown)
                {
                    swipe.revive();
                    swipe.body.x = dino.x + 75;
                    swipe.body.y = dino.y;
                    swipe.angle = 90;
                    swipe.body.angle = 90;

                }
                else if (upKey.isDown)
                {
                    swipe.revive();
                    swipe.body.x = dino.x;
                    swipe.body.y = dino.y - 85;
                    swipe.angle = 0;
                    swipe.body.angle = 0;
                }
                else if (downKey.isDown)
                {
                    swipe.revive();
                    swipe.body.x = dino.x;
                    swipe.body.y = dino.y + 75;
                    swipe.angle = -180;
                    swipe.body.angle = -180;
                }
                else
                {
                    if (leftFront == true)
                    {
                        swipe.revive();
                        swipe.body.x = dino.x - 80;
                        swipe.body.y = dino.y;
                        swipe.angle = -90;
                        swipe.body.angle = -90;
                    }
                    else if (rightFront == true)
                    {
                        swipe.revive();
                        swipe.body.x = dino.x + 75;
                        swipe.body.y = dino.y;
                        swipe.angle = 90;
                        swipe.body.angle = 90;
                    }
                    else if (upFront == true)
                    {
                        swipe.revive();
                        swipe.body.x = dino.x;
                        swipe.body.y = dino.y - 85;
                        swipe.angle = 0;
                        swipe.body.angle = 0;
                    }
                    else
                    {
                        swipe.revive();
                        swipe.body.x = dino.x;
                        swipe.body.y = dino.y + 75;
                        swipe.angle = -180;
                        swipe.body.angle = -180;
                    }
                }
                swipe.animations.stop(true);
                swipe.animations.play('attackSwipe', 10, false);
                aSound.play();
                isAttacking = true;
                game.time.events.add(600, attackAgain, this);
                game.time.events.add(300, swipe.kill, swipe);
            }
            if(leftKey.isUp && rightKey.isUp && upKey.isUp && downKey.isUp)
            {
                dino.animations.stop();
            }
                
        }
        if (playerXP > levelingXP){ // Leveling up the dinosaur
            playerLevel = playerLevel + 1;
            levelingXP = Math.floor(levelingXP*2.5);
            console.log("Level up! Need " + levelingXP + " for next level.");
            //dino.width = Math.floor(dino.width * .9);
            //dino.height = Math.floor(dino.height * .9);
            dinoPlayer.setSpeed(dinoPlayer.getSpeed()+25);
            dinoPlayer.setMaxHealth(dinoPlayer.getMaxHealth()*.8);
            dinoPlayer.setHealth(dinoPlayer.getMaxHealth());
            if (playerLevel === 2){
                console.log("Level2")
                level2 = true;
                if (plantsEatenAtLevel < animalsEatenAtLevel){
                    playerDamage = playerDamage+1;
                } else {
                    enemyCircle = enemyCircle - 20;
                }
            }
            if (playerLevel === 3){
                console.log("Level3")
                level3 = true;
                if (plantsEatenAtLevel < animalsEatenAtLevel){
                    playerDamage = playerDamage+1;
                } else {
                    enemyCircle = enemyCircle - 20;
                }                
            }
            if (playerLevel === 4){
                console.log("Level4")
                level4 = true;
                if (plantsEatenAtLevel < animalsEatenAtLevel){
                    playerDamage = playerDamage+1;
                } else {
                    enemyCircle = enemyCircle - 20;    
                }                
            }
            plantsEatenAtLevel = 0;
            animalsEatenAtLevel = 0;
        }

        return transition;
    };
    function attackAgain()
    {
        isAttacking = false;
    }
    this.killAttack = function ()
    {
        attack.destroy;
    };
    this.getX = function ()
    {
        return dino.x;
    };
    this.getY = function ()
    {
        return dino.y;
    };
    this.getSprite = function ()
    {
        return dino;
    };
    this.getAttack = function ()
    {
        return swipe;
    };

    this.addXP = function (xp) {
        playerXP += xp;
        console.log("player's XP:" + playerXP );
    };
    
    this.getXP = function () {
        return playerXP;
    };
    this.getSpeed = function () {
        return playerSpeed;
    };
    this.setSpeed = function(speed) {
        playerSpeed = speed;
    };
    this.getHealth = function () {
        return playerHealth;
    };
    this.setHealth = function (health) {
        playerHealth = health;
    };
    this.getMaxHealth = function () {
        return maxPlayerHealth;
    };
    this.setMaxHealth = function (health) {
        maxPlayerHealth = health;
    };
    this.findNewPos = function(){
        dino.body.x = game.world.randomX;
        dino.body.y = game.world.randomY;
    }
    this.allowAttack = function(){
        isAttacking = false;
    }
    this.getPlantsEatenAtLevel = function (){
        return plantsEatenAtLevel;
    };
    this.setPlantsEatenAtLevel = function (num){
        plantsEatenAtLevel = num;
    };
    this.getAnimalsEatenAtLevel = function (){
        return animalsEatenAtLevel;
    };
    this.setAnimalsEatenAtLevel = function (num){
        animalsEatenAtLevel = num;
    };
    this.getAttackDamage = function(){
        return playerDamage;
    };
    this.setAttackDamage = function(num){
        playerDamage = num;
    };
}
