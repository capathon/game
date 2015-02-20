var Player = function(game, x, y, frame) {
    Phaser.Sprite.call(this, game, x, y, 'player', frame);
    this.anchor.setTo(0.5, 0.5);
    this.animations.add('jump');
    this.animations.play('jump', 12, true);

    this.jumpSound = this.game.add.audio('jump');

    this.name = 'player';
    this.alive = false;
    this.onGround = false;
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
            this.body.velocity.y = -500;
            // rotate the player to -40 degrees
            this.game.add.tween(this).to({angle: -40}, 100).start();
        }

        this.numberOfJumps++;
    }
};

Player.prototype.revived = function() {
};

Player.prototype.onKilled = function() {
    this.exists = true;
    this.visible = true;
    this.animations.stop();
    var duration = 90 / this.y * 300;
    this.game.add.tween(this).to({angle: 90}, duration).start();
    console.log('killed');
    console.log('alive:', this.alive);
};