import 'phaser';

import background from './assets/background.png';
import heron from './assets/heron.png';
import ground from './assets/ground.png';

export default class FlappyHeron extends Phaser.Scene {

    // bird: Phaser.Physics.Arcade.Sprite;
    bird;
    birdTween;
    // birdTween: Phaser.Tweens.Tween;
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
        // Size is 768 but mutliplied by 4 for animation    
        let ground = this.add.tileSprite(384, 960, 3072, 128, 'ground');

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
            key: 'turn',
            frames: [{ key: 'heron', frame: 1 }],
            frameRate: 20
        });

        // Bird mouvement
        this.birdTween = this.tweens.add({
            targets: this.bird,
            y: '+=20',
            repeat: -1,
            yoyo: true,
            ease: 'Sine.easeInOut',
            duration: 400
        });
        
        // Ground movement
        this.tweens.add({
            targets: ground,
            x: '-=1152',
            repeat: -1,
            ease: 'Linear',
            duration: 3500
        });
    }

    update() {
        // Inputs
        let cursors = this.input.keyboard.createCursorKeys();
        let mouse = this.input.activePointer;

        var _this = this;
        let pushAction = function() {
            if(_this.birdTween.isPlaying()) {
                _this.birdTween.stop();
                _this.tweens.remove(_this.birdTween);
                _this.bird.setVelocityY(500);
                _this.bird.setAngle(-23);
                _this.bird.anims.play('fly', true);
            }

            _this.tweens.add({
                targets: _this.bird,
                y: '-=175',
                ease: 'Linear',
                duration: 150
            });
        }
        // Space and mouse click handler
        cursors.space.onUp = pushAction;
        // TODO mouse

       
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