import 'phaser';

import background from './assets/background.png';
import heron from './assets/heron.png';
import ground from './assets/ground.png';


export default class FlappyHeron extends Phaser.Scene
{
    constructor ()
    {
        super('FlappyHeron');
    }



    preload ()
    {
        this.load.image('background', background);
        this.load.image('heron', heron);
        this.load.image('ground', ground);
    }


    create ()
    {
        this.add.image(384, 448, 'background');
  
        let platforms = this.physics.add.staticGroup();

        let starfield = this.add.tileSprite(384, 960, 768, 128, 'ground');
    }
}

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 768,
    height: 1024,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 }
        }
    },
    scene: FlappyHeron
};

const game = new Phaser.Game(config);