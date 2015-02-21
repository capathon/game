'use strict';
var DanceOMeter = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'danceometer', frame);
    this.game.physics.arcade.enableBody(this);


    this.body.allowGravity = false;
    this.body.immovable = false;
    this.danceLevelBar = game.add.graphics(0, game.height);
    this.globalUpdateDanceLevelBar = this.updateDanceLevelBar;
    this.globalRemoveDanceLevelBar = this.removeDanceLevelBar;

    this.logo = game.add.sprite(this.game.width, this.game.height, 'logo_large', this.game);
    this.logoHeight = this.logo.height;
    this.logo.anchor.setTo(1, 1);
};

DanceOMeter.prototype = Object.create(Phaser.Sprite.prototype);
DanceOMeter.prototype.constructor = DanceOMeter;

DanceOMeter.prototype.updateDanceLevelBar = function(danceLevelScore) {
    // add first 1px wide unfilled red circle with a radius of 50 at the center (0, 0) of the graphics object
    if (this.danceLevelBar){
        this.danceLevelBar.destroy();
        this.danceLevelBar = game.add.graphics(0, game.height);
    }
    this.danceLevelBar.beginFill(0xe20026, 1);
    this.danceLevelBar.drawRect(0, 0, game.width, danceLevelScore * -1);
    this.danceLevelBar.endFill();

    var perc = (danceLevelScore / 450);

    var rect = new Phaser.Rectangle(0, 0, this.logo.width, Math.abs(this.logoHeight * perc));

    this.logo.crop(rect);
    this.logo.bringToTop();

};

DanceOMeter.prototype.removeDanceLevelBar = function(danceLevelScore) {
    this.danceLevelBar.destroy();
    this.logo.destroy();
}