import './nouvPartie.html';
import { Meteor } from 'meteor/meteor';
import { Template } from 'meteor/templating'
import { FlowRouter } from 'meteor/ostrio:flow-router-extra';
import kaboom from "kaboom/dist/kaboom.mjs";
import { Session } from 'meteor/session'


Template.nouvPartie.events({
    "click .goBack"(){
        /* let scorePong1 = Session.get("ScorePong")
        Meteor.call("ajouterScorePong", scorePong1) */
        FlowRouter.go("/pong");
        location.reload();
     }
 })

// window.onhashchange = function() {
//    location.reload()
//   }

Template.nouvPartie.onRendered(function () {
    

    function startCountdown(seconds) {
        let counter = seconds;  
        const interval = setInterval(() => {
            
           
            if (counter==4){
            add([
                text(3, {
                    size: 72,
                    width: width(),
                    font: "breakout"
                }),
                pos(width()/3, height()/4),
                area(),
            ]);
        }
        else if (counter==3){
            add([
                text(2, {
                    size: 72,
                    width: width(),
                    font: "breakout"
                }),
                pos(width()/2, height()/4),
                area(),
            ]);
        }
        else if (counter==2){
            add([
                text(1, {
                    size: 72,
                    width: width(),
                    font: "breakout"
                }),
                pos(width()*(2/3), height()/4),
                area(),
            ]);
        }
        else if (counter==1){
            add([
                text("START !", {
                    size: 72,
                    width: width(),
                    font: "breakout"
                    
                }),
                pos(width()/3, height()/2),
                area(),
            ]);
        }
        
          
          counter--;
            
          if (counter < 0 ) {
            clearInterval(interval);
            console.log('Start !');
            // play music
            const music = play("ArcadeOddities");
            music.loop();
            start();
            
          }
        }, 1000);
      }
      startCountdown(4);

// initialize context
kaboom({
    width: 768,
    height: 360,
    background: [0,0,0],
    root: document.getElementById('kaboomParent'),
});


let b = (Math.ceil(Math.random()*40))+80;
let randomDir = Math.ceil(Math.random()*2);
if (randomDir == 2) {
    b = -b
}
/* console.log(randomDir) */

const LEVELOPT = {
    width: 32,
    height: 16,
    "a": () => [ // block
        sprite("blocka"),
        area(),
        "block",
        "bouncy",
        {
            points: 1
        }
    ],
    "b": () => [ // block
        sprite("blockb"),
        area(),
        "block",
        "bouncy",
        {
            points: 2
        }
    ],
    "c": () => [ // block
        sprite("blockc"),
        area(),
        "block",
        "bouncy",
        {
            points: 4
        }
    ],
    "d": () => [ // block
        sprite("blockd"),
        area(),
        "block",
        "bouncy",
        {
            points: 8
        }
    ],
    "@": () => [ // paddle
        sprite("paddle"),
        area(),
        origin("center"),
        "paddle",
        "bouncy",
        {
            speed: 400
        }
    ],
    ".": () => [ // ball
        sprite("ball"),
        color(WHITE),
        area(),
        origin("center"),
        "ball",
        {
            hspeed: b,
            vspeed: Math.sqrt((180*180)-(b*b)),
        }
    ]
}

scene("game", ({levelIndex, score, lives}) => {

    addLevel(LEVELS[levelIndex], LEVELOPT);
  // player's paddle
const paddle = get("paddle")[0];
  // keyboard controls
/*   onKeyDown("a", () => {
  if (paddle.x > 0 && paddle.x < width() && paddle.y > 0 && paddle.y < height()) {
    if (paddle.x < paddle.worldArea().p1.x) { // left
        paddle.move(-paddle.speed, 0);
    }
}
}); */

// Keyboard controls
/* onKeyDown("a", () => {
    paddle.move(-paddle.speed, 0);
})
onKeyDown("d", () => {
    paddle.move(paddle.speed, 0);
})
onKeyDown("left", () => {
    paddle.move(-paddle.speed, 0);
})
onKeyDown("right", () => {
    paddle.move(paddle.speed, 0);
}) */
// mouse controls
onUpdate(() => {
    if (mousePos().x > 0 && mousePos().x < width() && mousePos().y > 0 && mousePos().y < height()) {
        if (mousePos().x < paddle.worldArea().p1.x) { // left
            paddle.move(-paddle.speed, 0);
        }
        else if (mousePos().x > paddle.worldArea().p2.x) { // right
            paddle.move(paddle.speed, 0);
        }
    }
});

  // ball movement
onUpdate("ball", (ball) => {
    // bounce off screen edges
    if (ball.worldArea().p1.x < 0 || ball.worldArea().p2.x > width()) {
        ball.hspeed = -ball.hspeed;
    }

    if (ball.worldArea().p1.y < 0) {
        ball.vspeed = -ball.vspeed;
    }

// fall off screen
  if (ball.pos.y > height()) {
    lives -= 1;
    if (lives <= 0) {
      play("looser");  
      go("lose", { score: score });
    }
    else {
      ball.pos.x = width()/2;
      ball.pos.y = height()/2;
      let b = (Math.ceil(Math.random()*40))+80;
      let randomDir = Math.ceil(Math.random()*2);
      if (randomDir == 2) {
      b = -b
}
/* console.log(randomDir) */
      ball.hspeed = b;
      ball.vspeed = Math.sqrt((180*180)-(b*b));
    }
  }
ball.move(ball.hspeed, ball.vspeed)
// move

});
  
// collisions
onCollide("ball", "bouncy", (ball, bouncy) => {
    ball.vspeed = -ball.vspeed;

    if (bouncy.is("paddle")) { // play sound
        play("paddlehit");
        ball.vspeed -=20;
        ball.hspeed -=20;
    }
});

// collisions
onCollide("ball", "block", (ball, block) => {
    block.destroy();
    score += block.points;
    play("blockbreak");

    // level end
    if (get("block").length === 0) { // next level
        if (levelIndex < LEVELS.length) {
            go("game", {
                levelIndex: levelIndex+1,
                score: score,
                lives: lives
                });
        }
        else { // win
            play("winner");
            go("win", { score: score });
        }
    }

    // powerups
    if (chance(0.05)) { // extra life
        add([
            sprite("heart"),
            pos(block.pos),
            area(),
            origin("center"),
            cleanup(),
            "powerup",
            {
                speed: 80,
                effect() { lives++; }
            }
        ]);
    }
});
  // powerups
onUpdate("powerup", (powerup) => {
    powerup.move(0, powerup.speed);
});

paddle.onCollide("powerup", (powerup) => {
    powerup.effect();
    powerup.destroy();
    play("powerup");
});

    // ui
onDraw(() => {
    drawText({
        text: `SCORE: ${score}`,
        size: 16,
        pos: vec2(8,8),
        font: "breakout",
        color: WHITE
    });
    drawText({
        text: `LIVES: ${lives}`,
        size: 16,
        pos: vec2(width()*13/16, 8),
        font: "breakout",
        color: WHITE
    });
});
});

// gameover screens
scene("lose", ({ score }) => {

    add([
        text(`GAME OVER\n\nTON SCORE FINALE EST ${score}`, {
            size: 32,
            width: width(),
            font: "breakout"
        }),
        pos(12),
    ]);

    add([
        text(`APPUIE SUR ESPACE POUR RELANCER`, {
            size: 16,
            width: width(),
            font: "breakout"
        }),
        pos(width()/2, height()*(3/4)),
    ]);
    Session.set("ScorePong", score);
    let scorePong1 = Session.get("ScorePong")
    Meteor.call("ajouterScorePong", scorePong1)
    console.log(scorePong1);
    onKeyPress("space", start);
});

scene("win", ({ score }) => {

    add([
        text(`FELICITATION, TU AS GAGNE!\n\nTON SCORE FINAL EST ${score}`, {
            size: 32,
            width: width(),
            font: "breakout",
        }),
        pos(width()/2, height()/2),
    ]);

    add([
        text(`APPUIE SUR ESPACE POUR RELANCER`, {
            size: 16,
            width: width(),
            font: "breakout"
        }),
        pos(width()/2, height()*(3/4)),
    ]);
    Session.set("ScorePong", score);
    let scorePong1 = Session.get("ScorePong")
    Meteor.call("ajouterScorePong", scorePong1)
    console.log(scorePong1);
    onKeyPress("space", start);
});



// start game on first level
function start() {
    go("game", {
        levelIndex: 0,
        score: 0,
        lives: 3,
    });
}


loadFont("breakout", "pong/sprites/breakout_font.png", 6, 8,  { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ  0123456789:!'" });
// sounds
loadSound("blockbreak", "pong/sounds/Explosion5.ogg");
loadSound("paddlehit", "pong/sounds/Powerup20.ogg");
loadSound("powerup", "pong/sounds/Powerup2.ogg");
loadSound("ArcadeOddities", "pong/sounds/Arcade-Oddities.mp3");
loadSound("winner", "pong/sounds/win.mp3");
loadSound("looser", "pong/sounds/loser.wav");

loadSpriteAtlas("pong/sprites/breakout_pieces.png", {
    "blocka": {
        x: 8,
        y: 8,
        width: 32,
        height: 16,
    },
    "blockb": {
        x: 8,
        y: 28,
        width: 32,
        height: 16,
    },
    "blockc": {
        x: 8,
        y: 48,
        width: 32,
        height: 16,
    },
    "blockd": {
        x: 8,
        y: 68,
        width: 32,
        height: 16,
    },
    "paddle": {
        x: 8,
        y: 152,
        width: 64,
        height: 16,
    },
    "ball": {
        x: 48,
        y: 136,
        width: 8,
        height: 8,
    },
    "heart": {
        x: 120,
        y: 136,
        width: 8,
        height: 8,
    }
});


// levels
const LEVELS = [
    [
        "                        ",
        "                        ",
        "dddddddddddddddddddddddd",
        "cccccccccccccccccccccccc",
        "bbbbbbbbbbbbbbbbbbbbbbbb",
        "aaaaaaaaaaaaaaaaaaaaaaaa",
        "                        ",
        "                        ",
        "                        ",
        "            .           ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "            @           ",
    ],
    [
        " aaaaaaaaaaaaaaaaaaaaaa ",
        " a                    a ",
        " a  bbbbbbbbbbbbbbbbb a ",
        " a  b               b a ",
        " a  b    ccccccc    b a ",
        " a  b  ccdddddddcc  b a ",
        " a  b    ccccccc    b a ",
        " a  b               b a ",
        " a  bbbbbbbbbbbbbbbbb a ",
        " a                    a ",
        " aaaaaaaaaaaaaaaaaaaaaa ",
        "                        ",
        "            .           ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "            @           ",
    ],
]      
/* // initialize context
kaboom({
    width: 768,
    height: 360,
    background: [0,0,0]
});
//loadSprite("paddle", "pong/sprites/paddle.png");
//loadSprite("paddle2", "pong/sprites/paddle2.png");
//loadSprite("ball", "pong/sprites/ball.png");

const LEVELOPT = {
    width: 32,
    height: 16,
    "@": () => [ // paddle
        sprite("paddle"),
        area(),
        origin("center"),
        "paddle",
        "bouncy",
        {
            name: "paddle",
            speed: 400,
        }
    ],
    "#": () => [ // paddle2
        sprite("paddle2"),
        area(),
        origin("center"),
        "paddle2",
        "bouncy",
        {
            speed: 400,
            name: "paddle2",
        }
    ],
    ".": () => [ // ball
        sprite("ball"),
        color(WHITE),
        area(),
        origin("center"),
        "ball",
        {
            hspeed: 100,
            vspeed: 50,
        }
    ]
};

scene("game", ({levelIndex, player2, lives}) => {
addLevel(LEVELS[levelIndex], LEVELOPT);
// player's paddle
const paddle = get("paddle")[0];
const paddle2 = get("paddle2")[0];
// keyboard controls
onKeyDown("a", () => {
    paddle.move(-paddle.speed, 0);
})
onKeyDown("d", () => {
    paddle.move(paddle.speed, 0);
})
onKeyDown("left", () => {
    paddle2.move(-paddle2.speed, 0);
})
onKeyDown("right", () => {
    paddle2.move(paddle2.speed, 0);
})
//onUpdate("paddle",() => {
//    if (mousePos().x > 0 && mousePos().x < width() && mousePos().y > 0 && mousePos().y < height()) {
//        if (mousePos().x < paddle.worldArea().p1.x) { // left
//            paddle.move(-paddle.speed, 0);
//        }
//        else if (mousePos().x > paddle.worldArea().p2.x) { // right
//            paddle.move(paddle.speed, 0);
//        }
//    }
//});
//onUpdate("paddle2",() => {
//    if (mousePos().x > 0 && mousePos().x < width() && mousePos().y > 0 && mousePos().y < height()) {
//        if (mousePos().x < paddle2.worldArea().p1.x) { // left
//            paddle2.move(-paddle2.speed, 0);
//        }
//        else if (mousePos().x > paddle2.worldArea().p2.x) { // right
//            paddle2.move(paddle2.speed, 0);
//        }
//    }
//});

// ball movement
onUpdate("ball", (ball) => {
    // bounce off screen edges
    if (ball.worldArea().p1.x < 0 || ball.worldArea().p2.x > width()) {
        ball.hspeed = -ball.hspeed;
    }

//  if (ball.worldArea().p1.y < 0 || ball.worldArea().p2.y > height()) {
//        ball.vspeed = -ball.vspeed;
//    } 
// fall off screen down
if (ball.pos.y > height()) {
    lives -= 1;
    if (lives <= 0) {
    go("lose", { score: lives });
    }
    else {
    ball.pos.x = width()/2;
    ball.pos.y = height()/2;
    ball.hspeed = 100;
    ball.vspeed = 50;
    }
}

if (ball.pos.y < 0) {
    player2 -= 1;
    if (player2 <= 0) {
    go("loseplayer2", { player2: player2 });
    }
    else {
    ball.pos.x = width()/2;
    ball.pos.y = height()/2;
    ball.hspeed = 100;
    ball.vspeed = 50;
    }
}

    // move
    ball.move(ball.hspeed, ball.vspeed);
});

// collisions
onCollide("ball", "bouncy", (ball, bouncy) => {
    ball.vspeed = -ball.vspeed;  
    
    

    if (bouncy.is("paddle")) { // play sound
        //play("paddlehit");
    ball.vspeed -=100;
    ball.hspeed -=50;
    }
else if (bouncy.is("paddle2")) { // play sound
        //play("paddlehit");
    ball.vspeed +=100;
    ball.hspeed +=50;
    }
});


// ui
onDraw(() => {
    drawText({
        text: `PLAYER 2: ${player2}`,
        size: 16,
        pos: vec2(8,8),
        font: "breakout",
        color: WHITE
    });
    drawText({
        text: `PLAYER 1: ${lives}`,
        size: 16,
        pos: vec2(width()*13/16, 8),
        font: "breakout",
        color: WHITE
    });
});


});

// gameover screens
scene("lose", ({ score }) => {

    add([
        text(`PLAYER 2 WIN\n\nREVENGE ? `, {
            size: 32,
            width: width(),
            font: "breakout"
        }),
        pos(12),
    ]);

    add([
        text(`PRESS SPACE KEY TO RESTART`, {
            size: 16,
            width: width(),
            font: "breakout"
        }),
        pos(width()/2, height()*(3/4)),
        area(),
    ]);
    onKeyPress("space", start);
    // onKeyPress(start);
    //onMousePress(start); 
});

scene("loseplayer2", ({ player2 }) => {

    add([
        text(`PLAYER 1 WIN\n\nREVENGE`, {
            size: 32,
            width: width(),
            font: "breakout"
        }),
        pos(12),
    ]);

    add([
        text(`PRESS ANY KEY TO RESTART`, {
            size: 16,
            width: width(),
            font: "breakout"
        }),
        pos(width()/2, height()*(3/4)),
    ]);

    onKeyPress(start);
    onMousePress(start);
});

// scene("win", ({ score }) => {
//
//    add([
//        text(`CONGRATULATIONS, YOU WIN!\n\nYOUR FINAL SCORE WAS ${score}`, {
//            size: 32,
//            width: width(),
//            font: "breakout"
//        }),
//        pos(width()/2, height()/2),
//    ]);

//    add([
//        text(`PRESS ANY KEY TO RESTART`, {
//            size: 16,
//            width: width(),
//            font: "breakout"
//        }),
//        pos(width()/2, height()*(3/4)),
//    ]);

//    onKeyPress(start);
//    onMousePress(start);
//});

// start game



function start() {
    go("game", {
        levelIndex: 0,
        player2: 3,
        lives: 3,
    });
}

// start();

loadSpriteAtlas("pong/sprites/breakout_pieces.png", {
    "paddle": {
        x: 8,
        y: 152,
        width: 64,
        height: 16,
    },
    "paddle2": {
        x: 8,
        y: 152,
        width: 64,
        height: 50,
    },
    "ball": {
        x: 48,
        y: 136,
        width: 8,
        height: 8,
    },
    "heart": {
        x: 120,
        y: 136,
        width: 8,
        height: 8,
    }
});
loadFont("breakout", "pong/sprites/breakout_font.png", 6, 8,  { chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZ  0123456789:!'" });

// levels
const LEVELS = [
    [
        "            #           ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "            .           ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "                        ",
        "            @           ",
    ],
]; */
});


