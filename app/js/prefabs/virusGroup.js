'use strict';


var VirusGroup = function(game, parent) {

    Phaser.Group.call(this, game, parent);

    this.virus = new Virus(this.game, 0, 440, 1);
    this.add(this.virus);

};

VirusGroup.prototype = Object.create(Phaser.Group.prototype);
VirusGroup.prototype.constructor = VirusGroup;

VirusGroup.prototype.update = function() {
    this.checkWorldBounds();
};

VirusGroup.prototype.checkWorldBounds = function() {
    if(!this.virus.inWorld) {
        this.destroy();
    }
};


VirusGroup.prototype.reset = function(x, y) {
    this.virus.reset(0,440);
    this.x = x;
    this.y = y;
    this.setAll('body.velocity.x', this.game.state.states.Game.levels[this.game.state.states.Game.level].virusVelocity);
};


VirusGroup.prototype.stop = function() {
    this.setAll('body.velocity.x', 0);
};