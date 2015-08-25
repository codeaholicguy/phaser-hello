(function () {
    'use strict';

    function Game() {
        this.platforms = 'undefined';
        this.player = 'undefined';
        this.cursors = 'undefined';
    }

    Game.prototype = {
        create: function () {
            this.input.onDown.add(this.onInputDown, this);

            //  We're going to be using physics, so enable the Arcade Physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            //  A simple background for our game
            this.game.add.sprite(0, 0, 'sky');

            //  The platforms group contains the ground and the 2 ledges we can jump on
            this.platforms = this.game.add.group();

            //  We will enable physics for any object that is created in this group
            this.platforms.enableBody = true;

            // Here we create the ground.
            var ground = this.platforms.create(0, this.game.world.height - 64, 'ground');

            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            ground.scale.setTo(2, 2);

            //  This stops it from falling away when you jump on it
            ground.body.immovable = true;

            //  Now let's create two ledges
            var ledge = this.platforms.create(400, 300, 'ground');

            ledge.body.immovable = true;

            ledge = this.platforms.create(-150, 200, 'ground');

            ledge.body.immovable = true;

            // The player and its settings
            this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

            //  We need to enable physics on the player
            this.game.physics.arcade.enable(this.player);

            //  Player physics properties. Give the little guy a slight bounce.
            this.player.body.bounce.y = 0.2;
            this.player.body.gravity.y = 300;
            this.player.body.collideWorldBounds = true;

            //  Our two animations, walking left and right.
            this.player.animations.add('left', [0, 1, 2, 3], 10, true);
            this.player.animations.add('right', [5, 6, 7, 8], 10, true);

            //  Our controls.
            this.cursors = this.game.input.keyboard.createCursorKeys();
        },

        update: function () {
            //  Collide the player and the stars with the platforms
            this.game.physics.arcade.collide(this.player, this.platforms);

            //  Reset the players velocity (movement)
            this.player.body.velocity.x = 0;

            if (this.cursors.left.isDown)
            {
                //  Move to the left
                this.player.body.velocity.x = -150;

                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown)
            {
                //  Move to the right
                this.player.body.velocity.x = 150;

                this.player.animations.play('right');
            }
            else
            {
                //  Stand still
                this.player.animations.stop();

                this.player.frame = 4;
            }

            //  Allow the player to jump if they are touching the ground.
            if (this.cursors.up.isDown && this.player.body.touching.down)
            {
                this.player.body.velocity.y = -350;
            }
        },

        onInputDown: function () {
            this.game.state.start('menu');
        }
    };

    window['phaser-hello'] = window['phaser-hello'] || {};
    window['phaser-hello'].Game = Game;
}());
