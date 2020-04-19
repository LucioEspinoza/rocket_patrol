class planet extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, texture, frame, movespeed){
        super(scene, x, y, texture, frame);

        this.speed = movespeed;

        //add object to existing scene, displayList, updateList
        scene.add.existing(this);
    }

    update(){
        this.x += this.speed;



        if (this.x > game.config.width){
            this.x = 0;
        }
    }
}