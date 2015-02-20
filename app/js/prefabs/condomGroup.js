'use strict';


var CondomGroup = function(game, parent) {
    Phaser.Group.call(this, game, parent);

    this.condom = new Condom(this.game, 0, 440, 1);
    this.add(this.condom);

    this.setAll('body.velocity.x', -200);
};

CondomGroup.prototype = Object.create(Phaser.Group.prototype);
CondomGroup.prototype.constructor = CondomGroup;

CondomGroup.prototype.update = function() {
    this.checkWorldBounds();
};

CondomGroup.prototype.checkWorldBounds = function() {
    if(!this.condom.inWorld) {
        this.exists = false;
    }
};


CondomGroup.prototype.reset = function(x, y) {
    this.condom.reset(0,440);
    this.x = x;
    this.y = y;
    this.setAll('body.velocity.x', -200);
    this.exists = true;
};


CondomGroup.prototype.stop = function() {
    this.setAll('body.velocity.x', 0);
};