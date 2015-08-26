(function () {
    'use strict';

    function Game() {
    }

    Game.prototype = {
        create: function () {
            this.input.onDown.add(this.onInputDown, this);

            this.createWorld();
            this.createScore();

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

        },

        createWorld: function () {
            //  We're going to be using physics, so enable the Arcade Physics system
            this.game.physics.startSystem(Phaser.Physics.ARCADE);

            //  A simple background for our game
            //  Detect day or night
            var hour = (new Date()).getHours();
            if (hour >= 18) {
                this.game.add.sprite(0, 0, 'sky-night');
            } else {
                this.game.add.sprite(0, 0, 'sky-day');
            }

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

            //  This stops it from falling away when you jump on it
            ground.body.immovable = true;
        },

        createLedges: function () {
            //  Now let's create ledges
            var ledges = Configuration.LEDGES;
            var ledge;
            var x;
            var y;
            var width;
            var height;
            for (var index = 0; index < ledges.length; index++) {
                x = ledges[index].x;
                y = ledges[index].y;
                width = ledges[index].width;
                height = ledges[index].height;
                ledge = this.platforms.create(x, y, 'ground');
                ledge.scale.set(width / Configuration.GAME.WIDTH, 1);
                ledge.body.immovable = ledges[index].immovable;
            }
        },

        createStars: function () {
            if (typeof this.stars === 'undefined') {
                this.stars = this.game.add.group();
                this.stars.enableBody = true;
                this.stars.count = 0;
            }

            //  Here we'll create 12 of them evenly spaced apart
            var star;
            var starNumber = Configuration.STAR.NUMBER;
            var width = Configuration.GAME.WIDTH - 20;
            var groundHeight = Configuration.WORLD.GROUND.HEIGHT + 50;
            var height = Configuration.GAME.HEIGHT - groundHeight;
            var x;
            var y;
            if (this.stars.count === 0) {
                while (this.stars.count < starNumber) {
                    this.stars.count++;
                    x = Math.round(Math.random() * (width - (width / starNumber))) + (width / starNumber);
                    y = Math.round(Math.random() * height);

                    //  Create a star inside of the 'stars' group
                    star = this.stars.create(x, y, 'star');

                    //  Let gravity do its thing
                    star.body.gravity.y = Configuration.STAR.WEIGHT * Configuration.WORLD.GRAVITY;

                    //  This just gives each star a slightly random bounce value
                    star.body.bounce.y = Configuration.STAR.BOUNCE + Math.random() * 0.2;
                }
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
            this.player.animations.add('left', [0, 1], 10, true);
            this.player.animations.add('right', [2, 3], 10, true);
        },

        createScore: function () {
            //  The score
            this.scoreDisplay = this.game.add.bitmapText(20, 20, 'flappyfont', 'Score: 0', 24);
            this.scoreDisplay.anchor.setTo(0, 0.5);

            this.menuButton = this.game.add.button(this.game.width - 40, 20, 'start-button', this.menuClick, this);
            this.menuButton.anchor.setTo(0.5, 0.5);
            this.menuButton.scale.set(0.5, 0.5);

            this.shareButton = this.game.add.button(this.game.width - 100, 20, 'fb-button', this.shareClick, this);
            this.shareButton.anchor.setTo(0.5, 0.5);
            this.shareButton.scale.set(0.5, 0.5);
        },

        updateScore: function () {
            //  Add and update the score
            if (typeof this.score === 'undefined') {
                this.score = 0;
            }

            this.score++;
            this.scoreDisplay.text = 'Score: ' + this.score;
        },

        collectStar: function (player, star) {
            // Removes the star from the screen
            star.kill();

            this.updateScore();

            this.stars.count--;
            this.createStars();
        },

        menuClick: function () {
            this.reset();
            this.game.state.start('menu');
        },

        shareClick: function () {
            if (typeof this.score === 'undefined') {
                this.score = 0;
            }

            this.share('fb', this.score);
        },

        reset: function () {
            this.stars = undefined;
        },

        share: function (type, score) {
            switch (type) {
                case 'fb':
                    var url = 'https://www.facebook.com/dialog/feed?' +
                        'app_id=515415415302174' +
                        '&display=popup' +
                        '&caption=Wow, I achieve ' + score + ' diamonds on Halla. Try with me!' +
                        '&link=http://codeaholicguy.github.io/halla/' +
                        '&redirect_uri=https://facebook.com/';
                    window.open(url, '_blank');
                    break;
                case 'tw':
                    break;
            }
        }
    };

    window['halla'] = window['halla'] || {};
    window['halla'].Game = Game;
}());
