(function () {
    'use strict';

    function Menu() {
    }

    Menu.prototype = {
        create: function () {
            //  A simple background for our game
            this.game.add.sprite(0, 0, 'sky-night');

            // add our start button with a callback
            this.titleDisplay = this.game.add.bitmapText(this.game.width / 2, 250, 'flappyfont', 'PLAY', 30);
            this.titleDisplay.anchor.setTo(0.5, 0.5);

            this.startButton = this.game.add.button(this.game.width / 2, 300, 'start-button', this.startClick, this);
            this.startButton.anchor.setTo(0.5, 0.5);

            this.shareButton = this.game.add.button(this.game.width / 2 - 100, 300, 'fb-button', this.shareClick, this);
            this.shareButton.anchor.setTo(0.5, 0.5);
        },

        update: function () {

        },

        onDown: function () {

        },

        startClick: function () {
            // start button click handler
            this.game.state.start('game');
        },

        shareClick: function () {
            if (typeof this.score === 'undefined') {
                this.score = 0;
            }

            this.share('fb', this.score);
        },

        share: function (type) {
            switch (type) {
                case 'fb':
                    break;
                case 'tw':
                    break;
            }
        }
    };

    window['halla'] = window['halla'] || {};
    window['halla'].Menu = Menu;
}());
