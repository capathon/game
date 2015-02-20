'use strict';
var DanceOMeter = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'danceometer', frame);
    this.game.physics.arcade.enableBody(this);

    this.body.allowGravity = false;
    this.body.immovable = false;
    this.danceLevelBar = game.add.graphics(0, game.height);
    this.globalUpdateDanceLevelBar = this.updateDanceLevelBar;
};

DanceOMeter.prototype = Object.create(Phaser.Sprite.prototype);
DanceOMeter.prototype.constructor = DanceOMeter;

DanceOMeter.prototype.updateDanceLevelBar = function(danceLevelScore) {
    // add first 1px wide unfilled red circle with a radius of 50 at the center (0, 0) of the graphics object
    if (this.danceLevelBar){
        this.danceLevelBar.destroy();
        this.danceLevelBar = game.add.graphics(0, game.height);
    }
    window.console.log('dancelevel = ' + danceLevelScore);
    this.danceLevelBar.beginFill(0xff0000, 1);
    this.danceLevelBar.drawRect(0, 0, game.width, danceLevelScore * -1);
    this.danceLevelBar.endFill();
};