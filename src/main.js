//Mods made:
//UI timer +15
//speed increase after half time passed +10
//time added for hitting ships +25
//move rocket after firing +10
//music added to play scene +10

//Credits
//Music by: Sirius Beat - The Cosmos (Link: http://youtu.be/Bkg08NvtvBU)
//Planet sprites by: FaKtory Games (Link: https://faktory.itch.io/pixel-planets)

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