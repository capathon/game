var Player = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'player', frame);
    this.anchor.setTo(0.5, 0.5);
    this.animations.add('jump');
    this.animations.play('jump', 12, true);

    this.jumpSound = this.game.add.audio('jump');

    this.name = 'player';
    this.alive = false;

    this.state = "ground";
    this.numberOfJumps = 0;

    // enable physics on the player
    // and disable gravity on the player
    // until the game is started
    this.game.physics.arcade.enableBody(this);
    this.body.allowGravity = false;
    this.body.collideWorldBounds = true;

    this.events.onKilled.add(this.onKilled, this);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    // check to see if our angle is less than 90
    // if it is rotate the player towards the ground by 2.5 degrees
    if(this.angle < 0 && this.alive) {
        this.angle += 2.5;
    }

    if(!this.alive) {
        this.body.velocity.x = 0;
    }
};

Player.prototype.jump = function() {
    if(!!this.alive) {
        if (this.numberOfJumps < 2) {
            this.jumpSound.play();
            //cause our player to "jump" upward
            this.body.velocity.y = -(this.game.height * 1.1);
            // rotate the player to -40 degrees
            this.game.add.tween(this).to({angle: -40}, 100).start();
        }
        this.numberOfJumps++;
    }
};

Player.prototype.startJump = function() {
    if (this.numberOfJumps < 2) {
        //state mgmt
        this.state = "jumping";
        this.numberOfJumps++;
        this.jumpSound.play();
        //this.body.velocity.y = -(this.game.height * 1.1);
        this.body.velocity.y = -(500);
        this.body.allowGravity = false;
        //console.log("startjump");
        var player = this;
        setTimeout(function(){
            console.log("jump timeout");
            if (player.state === "jumping") {
                player.stopJump();
            }
        },1000);
    }
}

Player.prototype.stopJump = function() {
    this.body.allowGravity = true;
    //console.log("stopjump");
    this.state = "falling";


}




Player.prototype.revived = function() {
};

Player.prototype.onKilled = function() {
    this.visible = true;
    this.animations.stop();
    var duration = 90 / this.y * 300;
    this.game.add.tween(this).to({angle: 90}, duration).start();
    console.log('killed');
    console.log('alive:', this.alive);
};