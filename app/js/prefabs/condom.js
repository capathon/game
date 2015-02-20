'use strict';

var Condom = function(game, x, y, frame) {
	Phaser.Sprite.call(this, game, x, y, 'condom', frame);
	this.anchor.setTo(0.5, 0.5);
	this.game.physics.arcade.enableBody(this);

	this.body.allowGravity = false;
	this.body.immovable = false;

};

Condom.prototype = Object.create(Phaser.Sprite.prototype);
Condom.prototype.constructor = Condom;

Condom.prototype.update = function() {
	// write your prefab's specific update code here
};