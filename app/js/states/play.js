
BasicGame.Game = function (game) {

    //  When a State is added to Phaser it automatically has the following properties set on it, even if they already exist:

    this.game;      //  a reference to the currently running game (Phaser.Game)
    this.add;       //  used to add sprites, text, groups, etc (Phaser.GameObjectFactory)
    this.camera;    //  a reference to the game camera (Phaser.Camera)
    this.cache;     //  the game cache (Phaser.Cache)
    this.input;     //  the global input manager. You can access this.input.keyboard, this.input.mouse, as well from it. (Phaser.Input)
    this.load;      //  for preloading assets (Phaser.Loader)
    this.math;      //  lots of useful common math operations (Phaser.Math)
    this.sound;     //  the sound manager - add a sound, play one, set-up markers, etc (Phaser.SoundManager)
    this.stage;     //  the game stage (Phaser.Stage)
    this.time;      //  the clock (Phaser.Time)
    this.tweens;    //  the tween manager (Phaser.TweenManager)
    this.state;     //  the state manager (Phaser.StateManager)
    this.world;     //  the game world (Phaser.World)
    this.particles; //  the particle manager (Phaser.Particles)
    this.physics;   //  the physics manager (Phaser.Physics)
    this.rnd;       //  the repeatable random number generator (Phaser.RandomDataGenerator)

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    create: function () {
        // start the phaser arcade physics engine
        this.game.physics.startSystem(Phaser.Physics.ARCADE);


        // give our world an initial gravity of 1200
        this.game.physics.arcade.gravity.y = 1200;

        // add the background sprite
        this.background = this.game.add.tileSprite(0,0,505,505,'background');
        this.background.autoScroll(-20,0);
		
        // create and add a group to hold our pipeGroup prefabs
        this.pipes = this.game.add.group();

        // create and add a new Player object
        this.player = new Player(this.game, this.game.width/2, this.game.height/2);
        this.game.add.existing(this.player);



        // create and add a new Ground object
        this.ground = new Ground(this.game, 0, 442, 505, 63);
        this.game.add.existing(this.ground);


        // add keyboard controls
        this.jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpKey.onDown.addOnce(this.startGame, this);
        this.jumpKey.onDown.add(this.player.jump, this.player);


        // add mouse/touch controls
        this.game.input.onDown.addOnce(this.startGame, this);
        this.game.input.onDown.add(this.player.jump, this.player);


        // keep the spacebar from propogating up to the browser
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);



        this.score = 0;
        this.scoreText = this.game.add.bitmapText(this.game.width/2, 10, 'jumppyfont',this.score.toString(), 24);

        this.instructionGroup = this.game.add.group();
        this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 100,'getReady'));
        this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 325,'instructions'));
        this.instructionGroup.setAll('anchor.x', 0.5);
        this.instructionGroup.setAll('anchor.y', 0.5);

        this.pipeGenerator = null;

        this.gameover = false;

        this.pipeHitSound = this.game.add.audio('pipeHit');
        this.groundHitSound = this.game.add.audio('groundHit');
        this.scoreSound = this.game.add.audio('score');

    },

    update: function () {
        // enable collisions between the player and the ground
        this.game.physics.arcade.collide(this.player, this.ground, this.touchedGround, null, this);

        this.player.x = this.game.width/2;

        if(!this.gameover) {
            // enable collisions between the player and each group in the pipes group
            this.pipes.forEach(function(pipeGroup) {
                this.game.physics.arcade.collide(this.player, pipeGroup, this.pickUpObject, null, this);
            }, this);
        }
    },
    shutdown: function() {
        this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        this.player.destroy();
        this.pipes.destroy();
        this.scoreboard.destroy();
    },
    startGame: function() {
        if(!this.player.alive && !this.gameover) {
            this.player.body.allowGravity = true;
            this.player.alive = true;
            // add a timer
            this.pipeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generatePipes, this);
            this.pipeGenerator.timer.start();

            this.instructionGroup.destroy();
        }
    },
    checkScore: function() {
        this.score++;
        this.scoreText.setText(this.score.toString());
        // this.scoreSound.play();
    },
    deathHandler: function(player, enemy) {
        if(enemy instanceof Ground && !this.player.onGround) {
            this.groundHitSound.play();
            this.scoreboard = new Scoreboard(this.game);
            this.game.add.existing(this.scoreboard);
            this.scoreboard.show(this.score);
            this.player.onGround = true;
        } else if (enemy instanceof Pipe){
            this.pipeHitSound.play();
        }

        if(!this.gameover) {
            this.gameover = true;
            this.player.kill();
            this.pipes.callAll('stop');
            this.pipeGenerator.timer.stop();
            this.ground.stopScroll();
        }

    },
    pickUpObject : function(player, enemy) {
        this.checkScore();
        enemy.kill();
    },
    touchedGround : function(player, ground) {
        this.player.numberOfJumps = 0;
    },
    generatePipes: function() {
        var pipeY = this.game.rnd.integerInRange(-250, -25);
        var pipeGroup = this.pipes.getFirstExists(false);
        if(!pipeGroup) {
            pipeGroup = new PipeGroup(this.game, this.pipes);
        }
        pipeGroup.reset(this.game.width, pipeY);
    }

};
