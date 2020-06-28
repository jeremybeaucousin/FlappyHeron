import 'phaser';

import background from './assets/background.png';
import heron from './assets/heron.png';
import ground from './assets/ground.png';

export default class FlappyHeron extends Phaser.Scene {
    
    player;
    constructor() {
        super('FlappyHeron');
    }

    preload() {
        this.load.image('background', background);
        this.load.image('ground', ground);

        this.load.spritesheet('heron', heron, { frameWidth: 83, frameHeight: 64 });
    }


    create() {
        // Background image
        this.add.image(384, 448, 'background');

        // Group of ground
        let grounds = this.physics.add.staticGroup();

        // Ground repeatable
        let ground = this.add.tileSprite(384, 960, 768, 128, 'ground');

        grounds.add(ground);

        // Player
        this.player = this.physics.add.sprite(384, 400, 'heron');

        this.player.setBounce(0.2);
        this.player.setCollideWorldBounds(true);

        // Colision with grounds
        this.physics.add.collider(this.player, grounds);

        // Animations
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('heron', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [{ key: 'heron', frame: 1 }],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('heron', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });
    
    }

    update() {
        // Inputs
        let cursors = this.input.keyboard.createCursorKeys();

        // Left
        if (cursors.left.isDown) {
            this.player.setVelocityX(-160);
            this.player.anims.play('left', true);
        }

        // Right
        else if (cursors.right.isDown) {
            this.player.setVelocityX(160);
            this.player.anims.play('right', true);
        }

        // Inactive
        else {
            this.player.setVelocityX(0);
            this.player.anims.play('turn');
        }

        // Up
        if (cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-330);
        }
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