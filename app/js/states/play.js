
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

        // add the background sprite, also as a tile
        this.background = this.game.add.tileSprite(0,0,505,505,'background');
        this.background.autoScroll(-20,0);

        // create and add a group to hold our condomGroup prefabs
        this.condoms = this.game.add.group();

        // create and add a group to hold our virusGroup prefabs
        this.virusses = this.game.add.group();


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

        this.truthometer = new Truthometer(this.game, 20, 20);
        this.score = 0;
        this.truthometer.updateHealthbar(this.score);
        this.game.add.existing(this.truthometer);


        this.instructionGroup = this.game.add.group();
        this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 100,'getReady'));
        this.instructionGroup.add(this.game.add.sprite(this.game.width/2, 325,'instructions'));
        this.instructionGroup.setAll('anchor.x', 0.5);
        this.instructionGroup.setAll('anchor.y', 0.5);

        this.condomGenerator = null;

        this.virusGenerator = null;

        this.gameover = false;

        this.condomHitSound = this.game.add.audio('condomHit');
        this.virusHitSound = this.game.add.audio('condomHit');
        this.groundHitSound = this.game.add.audio('groundHit');
        this.scoreSound = this.game.add.audio('score');

        this.resGame = this.resumeGame;


        this.questions = JSON.parse(game.cache.getText('someData'));

    },

    update: function () {
        // enable collisions between the player and the ground
        this.game.physics.arcade.collide(this.player, this.ground, this.touchedGround, null, this);

        this.player.x = this.game.width/2;

        if(!this.gameover) {
            // enable collisions between the player and each group in the condoms group
            this.condoms.forEach(function(condomGroup) {
                this.game.physics.arcade.collide(this.player, condomGroup, this.pickUpObject, null, this);
            }, this);
            
            // enable collisions between the player and each group in the virusses group
            this.virusses.forEach(function(virusGroup) {
                this.game.physics.arcade.collide(this.player, virusGroup, this.pickUpVirus, null, this);
            }, this);
        }
    },
    shutdown: function() {
        this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        this.player.destroy();
        this.condoms.destroy();
        this.virusses.destroy();
        // this.questionmodal.destroy();
    },
    startGame: function() {
        if(!this.player.alive && !this.gameover) {
            this.player.body.allowGravity = true;
            this.player.alive = true;
            // add a timer
            this.condomGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generateCondoms, this);
            this.condomGenerator.timer.start();
            this.virusGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.50, this.generateVirusses, this);
            this.virusGenerator.timer.start();

            this.instructionGroup.destroy();
        }
    },
    checkScore: function() {
        this.score = this.score + 5;
        this.truthometer.updateHealthbar(this.score);
        // this.scoreSound.play();
    },
    downScore: function() {
        this.score = this.score - 100;
        this.truthometer.updateHealthbar(this.score);
        // this.scoreSound.play();
    },
    deathHandler: function(player, enemy) {
        if(enemy instanceof Ground && !this.player.onGround) {
            this.groundHitSound.play();
            this.scoreboard = new Scoreboard(this.game);
            this.game.add.existing(this.scoreboard);
            this.scoreboard.show(this.score);
            this.player.onGround = true;
        } else if (enemy instanceof Condom){
            this.condomHitSound.play();
        }   else if (enemy instanceof Virus){
            this.condomHitSound.play();
        }

        if(!this.gameover) {
            this.gameover = true;
            this.player.kill();
            this.condoms.callAll('stop');
            this.condomGenerator.timer.stop();           
            this.virusses.callAll('stop');
            this.virusGenerator.timer.stop();
            this.ground.stopScroll();
        }

    },
    pickUpObject : function(player, enemy) {
        this.checkScore();
        enemy.kill();
    },
    pickUpVirus : function(player, enemy) {
        this.downScore();
        enemy.kill();
        
        this.pauseGame();

        this.questionModal = new QuestionModal(this.game);
        this.game.add.existing(this.questionModal);

        // debugger;
    },
    touchedGround : function(player, ground) {
        this.player.numberOfJumps = 0;
    },
    generateCondoms: function() {
        var condomY = this.game.rnd.integerInRange(-300, -25);
        var condomGroup = this.condoms.getFirstExists(false);
        if(!condomGroup) {
            condomGroup = new CondomGroup(this.game, this.condoms);
        }
        condomGroup.reset(this.game.width -10, condomY);
    },
    generateVirusses: function() {
        var virusY = this.game.rnd.integerInRange(-300, -25);
        var virusGroup = this.virusses.getFirstExists(false);
        if(!virusGroup) {
            virusGroup = new VirusGroup(this.game, this.virusses);
        }
        virusGroup.reset(this.game.width, virusY);
    },
    pauseGame: function () {
        this.condoms.destroy();
        this.virusses.destroy();

        this.condoms.callAll('stop');
        this.condomGenerator.timer.stop();  

        this.virusses.callAll('stop');
        this.virusGenerator.timer.stop();
        
        this.ground.stopScroll();

        this.player.animations.stop();
    },
    resumeGame: function () {
        this.condoms = this.game.add.group();
        this.virusses = this.game.add.group();

        this.ground.autoScroll(-200,0);

        this.condomGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.25, this.generateCondoms, this);
        this.condomGenerator.timer.start();
        this.virusGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * 1.50, this.generateVirusses, this);
        this.virusGenerator.timer.start();

        this.player.animations.play('jump', 12, true);
    }
};

