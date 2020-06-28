import 'phaser';

import background from './assets/background.png';
import heron from './assets/heron.png';
import ground from './assets/ground.png';

export default class FlappyHeron extends Phaser.Scene {

    // bird: Phaser.Physics.Arcade.Sprite;
    bird;
    grounds;
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
        this.grounds = this.physics.add.staticGroup();

        // Ground repeatable
        let ground = this.add.tileSprite(384, 960, 768, 128, 'ground');

        this.grounds.add(ground);

        // Player
        this.bird = this.physics.add.sprite(320, 500, 'heron').setFrame(1);

        // Ne rebound with collision
        this.bird.setBounce(0);
        this.bird.setCollideWorldBounds(true);
        // No gravity
        this.bird.body.setAllowGravity(false);

        // Colision with grounds
        this.physics.add.collider(this.bird, this.grounds);

        // Animations
        this.anims.create({
            key: 'fly',
            frames: this.anims.generateFrameNumbers('heron', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

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
            frameRate: 15,
            repeat: -1
        });

        this.tweens.add({
            targets: this.bird,
            y: '+=20',
            repeat: -1,
            yoyo: true,
            ease: 'Sine.easeInOut',
            duration: 400
        });

        //this.bird.play('fly');
    }

    update() {
        // Inputs
        let cursors = this.input.keyboard.createCursorKeys();

        // Left
        if (cursors.left.isDown) {
            this.bird.setVelocityX(-160);
            this.bird.anims.play('left', true);
        }

        // Right
        else if (cursors.right.isDown) {
            this.bird.setVelocityX(160);
            this.bird.anims.play('right', true);
        }

        // Inactive
        else {
            this.bird.setVelocityX(0);
            this.bird.anims.play('turn');
        }

        // Up
        if (cursors.up.isDown && this.bird.body.touching.down) {
            this.bird.setVelocityY(-330);
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