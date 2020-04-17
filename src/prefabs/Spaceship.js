//Spaceship prefab
class Spaceship extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, pointValue){
        super(scene, x, y, texture, frame);

        //add object to existing scene, displayList, updateList
        scene.add.existing(this);
        this.points = pointValue;
    }

    create(){

        
    }
    
    update(){

        

        //console.log(game.settings.spaceshipSpeed);

        //move spaceship
        this.x -= game.settings.spaceshipSpeed;

        //wraparound screen bounds
        if(this.x <= 0 - this.width){
            this.reset();
        }

    }

    reset(){
        this.x = game.config.width;
    }
}