'use strict';


var LedgeGroup = function(game, parent) {
    Phaser.Group.call(this, game, parent);

    this.ledge = new Ledge(this.game, 0, 12, this.game.rnd.integerInRange(50,215), 35);
    this.add(this.ledge);

    this.setAll('body.velocity.x', this.game.state.states.Game.levels[this.game.state.states.Game.level].ledgeVelocity);
};

LedgeGroup.prototype = Object.create(Phaser.Group.prototype);
LedgeGroup.prototype.constructor = LedgeGroup;

LedgeGroup.prototype.update = function() {
    // this.checkWorldBounds();
};

LedgeGroup.prototype.checkWorldBounds = function() {
    if(!this.ledge.inWorld) {
        this.destroy();
    }
};


LedgeGroup.prototype.reset = function(x, y) {
    this.ledge.reset(0,440);
    this.x = x;
    this.y = y;
    this.setAll('body.velocity.x', this.game.state.states.Game.levels[this.game.state.states.Game.level].ledgeVelocity);
};


LedgeGroup.prototype.stop = function() {
    this.setAll('body.velocity.x', 0);
};