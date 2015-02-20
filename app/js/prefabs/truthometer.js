'use strict';
var health;
var Truthometer = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'truthometer', frame);
    this.game.physics.arcade.enableBody(this);

    this.body.allowGravity = false;
    this.body.immovable = false;
    health = game.add.graphics(29, 118);
};

Truthometer.prototype = Object.create(Phaser.Sprite.prototype);
Truthometer.prototype.constructor = Truthometer;

Truthometer.prototype.updateHealthbar = function(score) {
     // create healthbar
    if( score <= 0){
        score = 0;
    }

    // add first 1px wide unfilled red circle with a radius of 50 at the center (0, 0) of the graphics object
    health.beginFill(0xff0000, 1);
    health.drawRect(0, 0, 22, score * -1);
};