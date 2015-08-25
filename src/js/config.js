/**
 * Created by hoangnn on 25/08/2015.
 */

var Configuration = {
    WORLD: {
        GRAVITY: 10,
    },
    STAR: {
        NUMBER: 22,
        WEIGHT: 2,
        BOUNCE: 0.7
    },
    PLAYER: {
        WEIGHT: 30,
        BOUNCE: 0.2
    },
    LEDGES: [
        {
            x: 400,
            y: 300,
            immovable: true
        },
        {
            x: -150,
            y: 200,
            immovable: true
        }
    ]
}