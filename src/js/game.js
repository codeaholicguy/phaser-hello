(function () {
    'use strict';

    function Game() {
        this.platforms = 'undefined';
        this.player = 'undefined';
        this.cursors = 'undefined';
        this.stars = 'undefined';
    }

    Game.prototype = {
        create: function () {
            this.input.onDown.add(this.onInputDown, this);

            this.createWorld();

            //  Our controls.
            this.cursors = this.game.input.keyboard.createCursorKeys();
        },

        update: function () {
            //  Collide the player and the stars with the platforms
            this.game.physics.arcade.collide(this.player, this.platforms);
            this.game.physics.arcade.collide(this.stars, this.platforms);

            //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
            this.game.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

            //  Reset the players velocity (movement)
            this.player.body.velocity.x = 0;

            if (this.cursors.left.isDown) {
                //  Move to the left
                this.player.body.velocity.x = -150;

                this.player.animations.play('left');
            }
            else if (this.cursors.right.isDown) {
                //  Move to the right
                this.player.body.velocity.x = 150;

                this.player.animations.play('right');
            }
            else {
                //  Stand still
                this.player.animations.stop();

                this.player.frame = 4;
            }

            //  Allow the player to jump if they are touching the ground.
            if (this.cursors.up.isDown && this.player.body.touching.down) {
                this.player.body.velocity.y = -350;
            }
        },

        onInputDown: function () {
            this.game.state.start('menu');
        },

        createWorld: function () {
            //  We're going to be using physics, so enable the Arcade Physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            //  A simple background for our game
            this.game.add.sprite(0, 0, 'sky');

            //  The platforms group contains the ground and the 2 ledges we can jump on
            this.platforms = this.game.add.group();

            //  We will enable physics for any object that is created in this group
            this.platforms.enableBody = true;

            this.createGround();
            this.createLedges();
            this.createStars();
            this.createPlayer();
        },

        createGround: function () {
            // Here we create the ground.
            var ground = this.platforms.create(0, this.game.world.height - Configuration.WORLD.GROUND.HEIGHT, 'ground');

            //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
            ground.scale.setTo(2, 2);

            //  This stops it from falling away when you jump on it
            ground.body.immovable = true;
        },

        createLedges: function () {
            //  Now let's create ledges
            var ledges = Configuration.LEDGES;
            var ledge;
            for (var index = 0; index < ledges.length; index++) {
                ledge = this.platforms.create(ledges[index].x, ledges[index].y, 'ground');
                ledge.body.immovable = ledges[index].immovable;
            }
        },

        createStars: function () {
            this.stars = this.game.add.group();

            this.stars.enableBody = true;

            //  Here we'll create 12 of them evenly spaced apart
            var star;
            var starNumber = Configuration.STAR.NUMBER;
            var width = Configuration.GAME.WIDTH / starNumber;
            for (var i = 0; i < starNumber; i++) {
                //  Create a star inside of the 'stars' group
                star = this.stars.create(i * width, 0, 'star');

                //  Let gravity do its thing
                star.body.gravity.y = Configuration.STAR.WEIGHT * Configuration.WORLD.GRAVITY;

                //  This just gives each star a slightly random bounce value
                star.body.bounce.y = Configuration.STAR.BOUNCE + Math.random() * 0.2;
            }
        },

        createPlayer: function () {
            // The player and its settings
            this.player = this.game.add.sprite(32, this.game.world.height - 150, 'dude');

            //  We need to enable physics on the player
            this.game.physics.arcade.enable(this.player);

            //  Player physics properties. Give the little guy a slight bounce.
            this.player.body.bounce.y = Configuration.PLAYER.BOUNCE;
            this.player.body.gravity.y = Configuration.PLAYER.WEIGHT * Configuration.WORLD.GRAVITY;
            this.player.body.collideWorldBounds = true;

            //  Our two animations, walking left and right.
            this.player.animations.add('left', [0, 1, 2, 3], 10, true);
            this.player.animations.add('right', [5, 6, 7, 8], 10, true);
        },

        collectStar: function (player, star) {
            // Removes the star from the screen
            star.kill();
        }
    };

    window['phaser-hello'] = window['phaser-hello'] || {};
    window['phaser-hello'].Game = Game;
}());
