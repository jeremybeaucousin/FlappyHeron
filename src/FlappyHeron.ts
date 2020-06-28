
import 'phaser';

import background from './assets/background.png';


export default class FlappyHeron extends Phaser.Scene
{
    constructor ()
    {
        super('FlappyHeron');
    }

    preload ()
    {
        this.load.image('background', background);
    }

    create ()
    {
        this.add.image(150, 300, 'background');
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