'use strict';


var LedgeGroup = function(game, parent) {
    Phaser.Group.call(this, game, parent);

    this.ledge = new Ledge(this.game, 0, 12, this.game.rnd.integerInRange(50,215), 35);
    this.add(this.ledge);

    this.setAll('body.velocity.x', -150);
};

LedgeGroup.prototype = Object.create(Phaser.Group.prototype);
LedgeGroup.prototype.constructor = LedgeGroup;

LedgeGroup.prototype.update = function() {
    // this.checkWorldBounds();
};

LedgeGroup.prototype.checkWorldBounds = function() {
    if(!this.ledge.inWorld) {
        this.exists = false;
    }
};


LedgeGroup.prototype.reset = function(x, y) {
    this.ledge.reset(0,440);
    this.x = x;
    this.y = y;
    this.setAll('body.velocity.x', -150);
    this.exists = true;
};


LedgeGroup.prototype.stop = function() {
    this.setAll('body.velocity.x', 0);
};