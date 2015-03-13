var ui = {
    
    
    create: function (game) {
        uiColl = game.add.group();
        uiColl.enableBody = true;
        uiColl.physicsBodyType = Phaser.Physics.P2JS;
        horiBar = game.add.sprite(79, 520, 'horiBar');
        game.physics.arcade.enable(horiBar);
        horiBar.body.immovable = true;
        uiColl.add(horiBar);

        vertBar = game.add.sprite(-2, -1, 'vertBar');
        game.physics.arcade.enable(vertBar);
        vertBar.body.immovable = true;
        uiColl.add(vertBar);
        
        vertBar2 = game.add.sprite(716, 0, 'vertBar2');
        game.physics.arcade.enable(vertBar2);
        vertBar2.body.immovable = true;
        uiColl.add(vertBar2);
        
        world = game.add.sprite(0, 0, 'world');
        world.x = game.width - world.width-4;
        world.y = game.height - world.height-4;
        
        meteor = game.add.sprite(0, game.height / 2, 'meteor');
        meteor.animations.add('attack');
        meteor.animations.play('attack',10,true);
        meteor.anchor.setTo(0.5, 0.5);
        meteor.x = game.width - vertBar.width / 2;
        meteor.y = meteor.height - meteor.height / 2;
        game.physics.arcade.enable(meteor);
        meteor.body.immovable = true;
        uiColl.add(meteor);
        
        healthBar = game.add.sprite(4, 5, 'healthBar');
        healthBar.cropEnabled = true;
        game.physics.arcade.enable(healthBar);
        healthBar.body.immovable = true;
        uiColl.add(healthBar);
        
        greenBar = game.add.sprite(0, game.height / 2, 'greenBar');
        greenBar.x = 24;
        greenBar.y = healthBar.y+65;
        greenBar.cropEnabled = true;
        greenBar.maxHeight = greenBar.height;

        evolutionBar = game.add.sprite(0 , game.height, 'evolution');
        evolutionBar.anchor.setTo(.5,.5);
        evolutionBar.x = game.width /2;
        evolutionBar.y = game.height - evolutionBar.height/2 - 5;
        
        bar1 = game.add.sprite(10,game.height,'bar1');
        bar1.anchor.setTo(.5,.5);
        bar1.x = 178;
        bar1.y = game.height - (evolutionBar.height/2);
        bar1.maxWidth = bar1.width;
        bar1.width = 0;        

        bar2 = game.add.sprite(20,game.height,'bar2');
        bar2.anchor.setTo(.5,.5);
        bar2.x = bar1.x + 140;
        bar2.y = game.height - (evolutionBar.height/2);
        bar2.maxWidth = bar2.width;
        bar2.width = 0;
        
        bar3 = game.add.sprite(30,game.height,'bar3');
        bar3.anchor.setTo(.5,.5);
        bar3.x = bar2.x + 140;
        bar3.y = game.height - (evolutionBar.height/2);
        bar3.maxWidth = bar3.width;
        bar3.width = 0;
        
        bar4 = game.add.sprite(40,game.height,'bar4');
        bar4.anchor.setTo(.5,.5);
        bar4.x = bar3.x + 140;
        bar4.y = game.height - (evolutionBar.height/2);
        bar4.maxWidth = bar4.width;
        bar4.width = 0;
        
        playerPic = game.add.sprite(7,7,'happyPic');
        playerPic.animations.add('getRekt');

        
    },
    
    update: function (game, health, maxHealth, timeLeft, maxGameTime,player) { // Pass in health to this function, builds the health bar.
        var newHeight = greenBar.maxHeight * (health/maxHealth);
        var sad = false;
        var currBar = {value: bar1};
        function setBar(obj,newBar){
            obj.value = newBar;
        }
        if (playerLevel === 1){
            setBar( currBar,bar1);
        }
        if (playerLevel === 2){
            setBar( currBar,bar2);
        }
        if (playerLevel === 3){
            setBar( currBar,bar3);
        }
        if (playerLevel === 4){
            setBar( currBar,bar4);
        }
        newExpWidth = currBar.value.maxWidth*(playerXP/levelingXP);
        expWidth = currBar.value.maxWidth;
        if (health/maxHealth < .5){
            playerPic.loadTexture('sadPic',0);
            playerPic.animations.add('getShrekt');
            sad = true;
        }
        if (health/maxHealth > .5){
            playerPic.loadTexture('happyPic',0);
            playerPic.animations.add('getRekt');
            sad = false;
        }
        if (newHeight !== greenBar.height){
            greenBar.height = newHeight;
        }
        if (newExpWidth > currBar.value.width){
            console.log(currBar.value);
            currBar.value.width = newExpWidth;
        }
        if (meteor.y < game.height - meteor.height / 2) {
            meteor.y = (game.height - meteor.height / 2) - game.height * (timeLeft / maxGameTime);
        }
        game.physics.arcade.collide(player, uiColl);
    }
};
