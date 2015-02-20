'use strict';

var Ledge = function(game, x, y, width, height) {
    Phaser.TileSprite.call(this, game, x, y, width, height, 'ledge');
    // enable physics on the ledge sprite
    // this is needed for collision detection

    this.game.physics.arcade.enableBody(this);

    // we don't want the ledge's body
    // to be affected by gravity or external forces
    this.body.allowGravity = false;
    this.body.immovable = true;


};

Ledge.prototype = Object.create(Phaser.TileSprite.prototype);
Ledge.prototype.constructor = Ledge;

Ledge.prototype.update = function() {

    // write your prefab's specific update code here

};