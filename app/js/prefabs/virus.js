'use strict';

var Virus = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'virus', frame);
    this.anchor.setTo(0.5, 0.5);
    this.game.physics.arcade.enableBody(this);

    this.body.allowGravity = false;
    this.body.immovable = false;

};

Virus.prototype = Object.create(Phaser.Sprite.prototype);
Virus.prototype.constructor = Virus;

Virus.prototype.update = function() {
    // write your prefab's specific update code here
};