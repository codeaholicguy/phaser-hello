/**
 * Created by hoangnn on 25/08/2015.
 */

var Configuration = {
    GAME: {
        WIDTH: 640,
        HEIGHT: 480
    },
    WORLD: {
        GRAVITY: 10,
        GROUND: {
            HEIGHT: 32
        }
    },
    STAR: {
        NUMBER: 10,
        WEIGHT: 2,
        BOUNCE: 0.7
    },
    PLAYER: {
        WEIGHT: 30,
        BOUNCE: 0.2
    },
    LEDGES: [
        {
            x: 40,
            y: 200,
            width: 120,
            height: 32,
            immovable: true
        },
        {
            x: 300,
            y: 300,
            width: 100,
            height: 32,
            immovable: true
        },
        {
            x: 480,
            y: 80,
            width: 100,
            height: 32,
            immovable: true
        }
    ]
};