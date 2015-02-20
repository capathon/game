'use strict';
var Truthometer = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'truthometer', frame);
    this.game.physics.arcade.enableBody(this);

    this.maxHeight = 98;
    this.body.allowGravity = false;
    this.body.immovable = false;
    this.health = game.add.graphics(29, 118);
    this.globalUpdateHealthbar = this.updateHealthbar;
};

Truthometer.prototype = Object.create(Phaser.Sprite.prototype);
Truthometer.prototype.constructor = Truthometer;

Truthometer.prototype.updateHealthbar = function(score) {
    // add first 1px wide unfilled red circle with a radius of 50 at the center (0, 0) of the graphics object
    if (this.health){
        this.health.destroy();
        this.health = game.add.graphics(29, 118);
    }

    var pointsToNextLevel = this.game.state.states.Game.levels[this.game.state.states.Game.level + 1].pointsForNextLevel,
        percentage = Math.abs((score / pointsToNextLevel) * 100);

    this.health.beginFill(0xff0000, 1);
    this.health.drawRect(0, 0, 22, percentage * -1);
    this.health.endFill();
};