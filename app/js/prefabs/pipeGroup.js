'use strict';


var PipeGroup = function(game, parent) {

    Phaser.Group.call(this, game, parent);

    this.bottomPipe = new Pipe(this.game, 0, 440, 1);
    this.add(this.bottomPipe);

    this.setAll('body.velocity.x', -200);
};

PipeGroup.prototype = Object.create(Phaser.Group.prototype);
PipeGroup.prototype.constructor = PipeGroup;

PipeGroup.prototype.update = function() {
    this.checkWorldBounds();
};

PipeGroup.prototype.checkWorldBounds = function() {
    if(!this.bottomPipe.inWorld) {
        this.exists = false;
    }
};


PipeGroup.prototype.reset = function(x, y) {
    this.bottomPipe.reset(0,440);
    this.x = x;
    this.y = y;
    this.setAll('body.velocity.x', -200);
    this.exists = true;
};


PipeGroup.prototype.stop = function() {
    this.setAll('body.velocity.x', 0);
};