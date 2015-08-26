(function () {
    'use strict';

    function Preloader() {
        this.asset = null;
        this.ready = false;
    }

    Preloader.prototype = {
        preload: function () {
            this.asset = this.add.sprite(this.game.width * 0.5 - 110, this.game.height * 0.5 - 10, 'preloader');
            this.load.setPreloadSprite(this.asset);

            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            this.loadResources();

            this.ready = true;
        },

        loadResources: function () {
            // load your assets here
            this.game.load.image('sky-day', 'assets/sky-day.jpg');
            this.game.load.image('sky-night', 'assets/sky-night.jpg');
            this.game.load.image('ground', 'assets/ground.png');
            this.game.load.image('star', 'assets/diamond.png');
            this.game.load.image('start-button', 'assets/start-button.png');
            this.game.load.image('fb-button', 'assets/fb-button.png');
            this.game.load.spritesheet('dude', 'assets/baddie.png', 32, 32);

            this.game.load.bitmapFont('flappyfont', 'assets/fonts/flappyfont.png', 'assets/fonts/flappyfont.fnt');
        },

        create: function () {

        },

        update: function () {
            if (!!this.ready) {
                this.game.state.start('menu');
            }
        },

        onLoadComplete: function () {
            this.ready = true;
        }
    };

    window['halla'] = window['halla'] || {};
    window['halla'].Preloader = Preloader;
}());
