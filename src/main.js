//Mods made:
//UI timer +15
//speed increase after half time passed +10
//time added for hitting ships +25
//move rocket after firing + 10

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play],
}

let game = new Phaser.Game(config);

// define game settings
game.settings = {
    spaceshipSpeed: 3,
    gameTimer: 60000    
}

//reserved keyboard var
let keyF, keyLEFT, keyRIGHT;