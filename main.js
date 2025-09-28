kaplay({});

loadSprite("snowny_setting", "assets/sprites/snowny_setting.png");
loadSprite("mark", "sprites/mark.png");


let score = 0;
const bg = add([
    sprite("snowny_setting"),
    area(),


]);
const scoreLabel = add([text(score), pos(400, 100), color(255, 255, 255)]);
add([text("sacrifice what you think gain to reach victory!"), pos(20, 50), color(255, 255, 255),]);

const player = add([
    sprite("mark"),
    pos(80, 40),
    area(),
    body(),
]);

// add([
//     sprite("snowny setting"),
//     pos(0, 0), // Position at the top-left corner
//     layer("background"), // Set to background layer
//     scale(width() / 512, height() / 384), // Scale to fit the screen size (adjust based on original sprite size)
// ]);


onKeyPress("space", () => {
    if (player.isGrounded()) {
        player.jump();
    }
});

add([
    rect(width(), 48),
    pos(0, height() - 38),
    outline(4),
    area(),
    body({ isStatic: true }),
    color(127, 200, 225),
]);

setGravity(1600);



loop(1.75, () => {
    score += 1;
    scoreLabel.text = score;
    add([
        rect(48, 64),
        area(),
        outline(4),
        pos(width(), height() - 28),
        anchor("botleft"),
        color(255, 180, 255),
        move(LEFT, 240),
        "tree",
    ]);
})


player.onCollide("tree", () => {
    addKaboom(player.pos);
    shake();
});

function spawnTree() {
    add([
        rect(48, rand(24, 64))
    ]);
    wait(rand(0.5, 1.5), () => {
        spawnTree();
    });
}

spawnTree();

scene("lose", () => {
    if (score == 10) {
        add([text("You win!"), pos(center()), anchor("center")]);
    }
    else {
        add([text("Game Over"), pos(center()), anchor("center")]);
    }

});

player.onCollide("tree", () => {
    addKaboom(player.pos);
    shake();
    go("lose");
});


