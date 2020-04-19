//Credits
//Music by: Sirius Beat - The Cosmos (Link: http://youtu.be/Bkg08NvtvBU)
//

class Play extends Phaser.Scene{
    constructor(){
        super("playScene");
    }

    preload() {
        //load images/tile sprite
        this.load.image("rocket","./assets/rocket.png");
        this.load.image("spaceship","./assets/spaceship.png");
        this.load.image("starfield","./assets/starfield.png");
        this.load.spritesheet("explosion", "./assets/explosion.png", {frameWidth: 64, frameHeight: 32, startFrame: 0, endFrame: 9});
    }

    create(){

        //timer variables
        this.tempDate = new Date();
        this.startTime = this.tempDate.getTime();
        this.curTime = this.tempDate.getTime();
        this.remTime = (game.settings.gameTimer - (this.curTime - this.startTime))/1000;
        this.remtime = Math.ceil(this.remTime);

        

        //Place tile sprite
        this.starfield = this.add.tileSprite(0, 0, 640, 480, 'starfield').setOrigin(0,0);

        //white rectangle borders
        this.add.rectangle(5, 5 , 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 443 , 630, 32, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(5, 5 , 32, 455, 0xFFFFFF).setOrigin(0,0);
        this.add.rectangle(603, 5 , 32, 455, 0xFFFFFF).setOrigin(0,0);

        //green UI background
        this.add.rectangle(37, 42, 566, 64, 0x00FF00).setOrigin(0, 0);
        

        //add rocket (p1)
        this.p1Rocket = new Rocket(this, game.config.width/2, 431, 
        "rocket").setScale(0.5, 0.5).setOrigin(0,0);

        //add 3x spaceship
        this.ship1 = new Spaceship(this, game.config.width + 192, 132, 'spaceship', 0, 30).setOrigin(0,0);
        this.ship2 = new Spaceship(this, game.config.width + 96, 196, 'spaceship', 0, 20).setOrigin(0,0);
        this.ship3 = new Spaceship(this, game.config.width, 260, 'spaceship', 0, 10).setOrigin(0,0);


        //define keyboard keys
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    
        // explosion animation config
        this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 9, first: 0}),
        frameRate: 30
        });

        //score variable
        this.p1Score = 0;

        // score display
        this.scoreConfig = {
            fontFamily: 'Courier',
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 100
        }
        //score display
        this.scoreLeft = this.add.text(69, 54, this.p1Score, this.scoreConfig);

        //timer display
        this.remTimeDisp = this.add.text(config.width/2, 54, this.remTime, this.scoreConfig);
        
    
        // game over flag
        this.gameOver = false;
        /*
        // 60-second play clock
        scoreConfig.fixedWidth = 0;
        this.clock = this.time.delayedCall(game.settings.gameTimer, () => {
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <-f for Menu', scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            game.settings.spaceshipSpeed - game.settings.spaceshipSpeed/2;
        }, null, this);
*/
        //timer to double speed after half of original time has passed
        this.timer = this.time.delayedCall(game.settings.gameTimer/2, () => {
            game.settings.spaceshipSpeed =  game.settings.spaceshipSpeed * 2; 
            console.log("speed changed");
        }, null, this);
    }

    update(){
        // check key input for restart
        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyF)) {
            this.scene.restart(this.p1Score);
            this.tempDate = new Date();
            this.startTime = this.tempDate.getTime();
        }

        if (this.gameOver && Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.scene.start("menuScene");
        }

        //scroll starfield
        this.starfield.tilePositionX -= 3;
        
        if(!this.gameOver){
            //update rocket
            this.p1Rocket.update();

            //update spaceship
            this.ship1.update();
            this.ship2.update();
            this.ship3.update();
        }

        //collision checks
        if(this.checkCollision(this.p1Rocket, this.ship3)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship3);
        }
        if (this.checkCollision(this.p1Rocket, this.ship2)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship2);
        }
        if (this.checkCollision(this.p1Rocket, this.ship1)) {
            this.p1Rocket.reset()
            this.shipExplode(this.ship1);
        }


        //update timer variables
        this.tempDate = new Date();
        this.curTime = this.tempDate.getTime();
        this.remTime = (game.settings.gameTimer - (this.curTime - this.startTime))/1000;
        this.remTime = Math.ceil(this.remTime);
        this.remTimeDisp.text = this.remTime;


        //ends game if there is no remaining time
        if(this.remTime < 0){
            this.add.text(game.config.width/2, game.config.height/2, 'GAME OVER', this.scoreConfig).setOrigin(0.5);
            this.add.text(game.config.width/2, game.config.height/2 + 64, '(F)ire to Restart or <-f for Menu', this.scoreConfig).setOrigin(0.5);
            this.gameOver = true;
            game.settings.spaceshipSpeed - game.settings.spaceshipSpeed/2;
        }
    }

    checkCollision(rocket, ship){
        // check if rocket and ship intersect 
        // true if there is an intersection
        if (rocket.x < ship.x + ship.width && 
            rocket.x + rocket.width > ship.x && 
            rocket.y < ship.y + ship.height && 
            rocket.height + rocket.y > ship. y) {
             return true;
        } else {
            return false;
        }
    }


    shipExplode(ship) {
        //sets ship alpha to 0 making ship transparent
        // temporarily hide ship
        ship.alpha = 0;                         
        // create explosion sprite at ship's position
        let boom = this.add.sprite(ship.x, ship.y, 'explosion').setOrigin(0, 0);
        boom.anims.play('explode');             // play explode animation
        boom.on('animationcomplete', () => {    // callback after animation completes
            ship.reset();                       // reset ship position
            ship.alpha = 1;                     // make ship visible again
            boom.destroy();                     // remove explosion sprite
        }); 
        // increase score and repaint
        this.p1Score += ship.points;
        this.scoreLeft.text = this.p1Score;

        //add time to timer depending on points
        game.settings.gameTimer += Math.ceil(ship.points/10) * 1000;
        console.log("adding time" + game.settings.gameTimer);
        
        this.sound.play('sfx_explosion');
    }
}