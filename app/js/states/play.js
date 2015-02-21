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
    this.levels = [{},
        {
            level: 1,
            backgroundAutoScroll: -20,
            groundAutoScroll: -200,
            condomTimer: 1.25,
            condomVelocity: -200,
            virusTimer: 1.50,
            virusVelocity: -200,
            ledgeTimer: 5.00,
            ledgeVelocity: -150,
            pointsForNextLevel: 10
        }, {
            level: 2,
            backgroundAutoScroll: -220,
            groundAutoScroll: -400,
            condomTimer: 1.25,
            condomVelocity: -200,
            virusTimer: 1.50,
            virusVelocity: -250,
            ledgeTimer: 5.00,
            ledgeVelocity: -150,
            pointsForNextLevel: 20,
            backgroundColor: '#ffff00',
            backgroundAlpha: 0.5
        }, {
            level: 3,
            backgroundAutoScroll: -420,
            groundAutoScroll: -600,
            condomTimer: 1.25,
            condomVelocity: -600,
            virusVelocity: -250,
            virusTimer: 1.50,
            ledgeTimer: 5.00,
            ledgeVelocity: -150,
            pointsForNextLevel: 40,
            backgroundColor: '#cccc00',
            backgroundAlpha: 0.5
        }, {
            level: 4,
            backgroundAutoScroll: -720,
            groundAutoScroll: -900,
            condomTimer: 1.25,
            condomVelocity: -200,
            virusTimer: 3.50,
            virusVelocity: -100,
            ledgeTimer: 5.00,
            ledgeVelocity: -150,
            pointsForNextLevel: 60,
            backgroundColor: '#ff00ff',
            backgroundAlpha: 0.5
        }, {
            level: 5,
            backgroundAutoScroll: -920,
            groundAutoScroll: -1100,
            condomTimer: 1.25,
            condomVelocity: -200,
            virusTimer: 1.50,
            virusVelocity: -400,
            ledgeTimer: 5.00,
            ledgeVelocity: -150,
            pointsForNextLevel: 60,
            backgroundColor: '#cc0000',
            backgroundAlpha: 0.5
        }
    ];
    this.processSpeed = {}; // boost the autoScroll;

    //  You can use any of these from any function within this State.
    //  But do consider them as being 'reserved words', i.e. don't create a property for your own game called "world" or you'll over-write the world reference.

};

BasicGame.Game.prototype = {

    speedUp: function () {
        if (this.processSpeed.background.speed == this.levels[this.level+1].backgroundAutoScroll){
            this.speedbooster.timer.stop();
            return;
        }

        this.processSpeed.background.speed--;
        this.processSpeed.ground.speed--;

        this.background.stopScroll();
        this.background.autoScroll(this.processSpeed.background.speed, 0);
        this.ground.stopScroll();
        this.ground.autoScroll(this.processSpeed.ground.speed, 0);
    },

    create: function () {
        // start the phaser arcade physics engine
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        // give our world an initial gravity of 1200
        this.game.physics.arcade.gravity.y = 1200;

        // we start at level 1
        this.level = 1;

        // add the background sprite, also as a tile
        this.background = this.game.add.tileSprite(0, 0, this.game.width, this.game.height*0.95, 'background');
        this.background.autoScroll(this.levels[this.level].backgroundAutoScroll, 0);
        this.processSpeed['background'] = {
            "speed": this.levels[this.level].backgroundAutoScroll
        };
        this.processSpeed['ground'] = {
            "speed": this.levels[this.level].groundAutoScroll
        };

        // add the ground sprite as a tile
        // and start scrolling in the negative x direction
        var groundHeight = this.game.height*0.05;
        this.ground = new Ground(this.game, 0, this.game.height - groundHeight, this.game.width, groundHeight);
        this.game.add.existing(this.ground);

        // create and add a group to hold our condomGroup prefabs
        this.condoms = this.game.add.group();

        // create and add a group to hold our virusGroup prefabs
        this.virusses = this.game.add.group();

        // create and add a group to hold our virusGroup prefabs
        this.ledges = this.game.add.group();

        // create and add a new Player object
        this.player = new Player(this.game, this.game.width / 2, this.game.height / 2);
        this.game.add.existing(this.player);

        // add keyboard controls
        this.jumpKey = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
        this.jumpKey.onDown.addOnce(this.startGame, this);


        this.jumpKey.onDown.add(this.player.startJump, this.player);
        this.jumpKey.onUp.add(this.player.stopJump, this.player);

        // add mouse/touch controls
        this.game.input.onDown.addOnce(this.startGame, this);
        //this.game.input.onDown.add(this.player.jump, this.player);

        this.game.input.onDown.add(this.player.startJump, this.player);
        this.game.input.onUp.add(this.player.stopJump, this.player);

        // keep the spacebar from propogating up to the browser
        this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);

        this.truthometer = new Truthometer(this.game, this.game.width*0.05, this.game.height*0.05);
        this.truthometer.z = 1000;
        this.score = 0;
        this.truthometer.updateHealthbar(this.score);
        this.game.add.existing(this.truthometer);


        this.instructionGroup = this.game.add.group();
        this.instructionGroup.add(this.game.add.sprite(this.game.width / 2, 100, 'getReady'));
        this.instructionGroup.add(this.game.add.sprite(this.game.width / 2, 325, 'instructions'));
        this.instructionGroup.setAll('anchor.x', 0.5);
        this.instructionGroup.setAll('anchor.y', 0.5);

        this.condomGenerator = null;
        this.virusGenerator = null;
        this.ledgeGenerator = null;

        this.gameover = false;

        this.condomHitSound = this.game.add.audio('condomHit');
        this.virusHitSound = this.game.add.audio('condomHit');
        this.groundHitSound = this.game.add.audio('groundHit');
        this.scoreSound = this.game.add.audio('score');

        this.resGame = this.resumeGame;
        this.evalLevel = this.evaluateLevel;

        this.questions = JSON.parse(game.cache.getText('someData'));


        this.speedbooster = this.game.time.events.loop(Phaser.Timer.SECOND * 0.1, this.speedUp, this);
        this.speedbooster.timer.start();

        this.globalUpdateToCurrentLevel = this.updateToCurrentLevel;

        this.scoreboard = new Scoreboard(this.game);
        //this.scoreboard.show(100);
        //this.scoreboard = this.game.add.group();
        //this.scoreboard.z = 1000;
        //
        //var text = "- phaser -\n with a sprinkle of \n pixi dust.";
        //var style = { font: "65px Arial", fill: "#ff0044", align: "center" };
        //
        //var t = this.game.add.text(game.world.centerX-300, 0, text, style);
        //
        //this.scoreboard.add(t);
    },

    update: function () {
        // enable collisions between the player and the ground
        this.game.physics.arcade.collide(this.player, this.ground, this.touchedGround, null, this);

        this.player.x = this.game.width / 2;

        if (!this.gameover) {
            // enable collisions between the player and each group in the condoms group
            this.condoms.forEach(function (condomGroup) {
                this.game.physics.arcade.collide(this.player, condomGroup, this.pickUpObject, null, this);
            }, this);

            // enable collisions between the player and each group in the virusses group
            this.virusses.forEach(function (virusGroup) {
                this.game.physics.arcade.collide(this.player, virusGroup, this.pickUpVirus, null, this);
            }, this);


            // enable collisions between the player and each group in the ledges group
            this.ledges.forEach(function (ledgeGroup) {
                this.game.physics.arcade.collide(this.player, ledgeGroup, this.touchedGround, null, this);
            }, this);
        }
    },
    shutdown: function () {
        this.game.input.keyboard.removeKey(Phaser.Keyboard.SPACEBAR);
        this.player.destroy();
        this.condoms.destroy();
        this.virusses.destroy();
        this.ledges.destroy();
        // this.questionmodal.destroy();
    },
    startGame: function () {
        if (!this.player.alive && !this.gameover) {
            this.player.body.allowGravity = true;
            this.player.alive = true;
            // add a timer
            this.condomGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levels[this.level].condomTimer, this.generateCondoms, this);
            this.condomGenerator.timer.start();
            this.virusGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levels[this.level].virusTimer, this.generateVirusses, this);
            this.virusGenerator.timer.start();
            this.ledgeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levels[this.level].ledgeTimer, this.generateLedges, this);
            this.ledgeGenerator.timer.start();

            this.instructionGroup.destroy();
        }
    },
    checkScore: function () {
        this.score = this.score + 5;

        //this.evaluateLevel();

        this.truthometer.updateHealthbar(this.score);

        if (this.score = 10 && this.level == 1 ){

          this.condoms.callAll('stop');
          this.condomGenerator.timer.stop();

          this.virusses.callAll('stop');
          this.virusGenerator.timer.stop();

          this.ledges.callAll('stop');
          this.ledgeGenerator.timer.stop();

          this.ground.stopScroll();

          this.player.animations.stop();

          this.endModal = new EndModal(this.game);
          this.game.add.existing(this.endModal);

          $('.social-icons').removeClass('hidden');

        }



        this.evaluateLevel();
        // this.scoreSound.play();
    },
    downScore: function () {
        if (this.score - 10 <= 0) {
            this.score = 0;
        } else {
            this.score = this.score - 10;
        }

        this.evaluateLevel();

        this.truthometer.updateHealthbar(this.score);
        // this.scoreSound.play();
    },
    deathHandler: function(player, enemy) {
        if(enemy instanceof Ground && !this.player.state === "ground") {
            this.groundHitSound.play();

            //this.scoreboard = new Scoreboard(this.game);
            //this.game.add.existing(this.scoreboard);
            //this.scoreboard.show(this.score);
            //this.player.onGround = true;

            this.player.state  = "ground";

        } else if (enemy instanceof Condom){
            this.condomHitSound.play();
        } else if (enemy instanceof Virus) {
            this.condomHitSound.play();
        }

        if (!this.gameover) {
            this.gameover = true;
            this.player.kill();
            this.condoms.callAll('stop');
            this.condomGenerator.timer.stop();
            this.virusses.callAll('stop');
            this.virusGenerator.timer.stop();
            this.ledges.callAll('stop');
            this.ledgeGenerator.timer.stop();
            this.ground.stopScroll();
        }

    },
    pickUpObject: function (player, enemy) {
        enemy.kill();
        console.log("pickupobject");
        this.checkScore();
    },
    pickUpVirus: function (player, enemy) {
        //this.downScore();
        enemy.kill();

        //this.pauseGame();
        //this.questionModal = new QuestionModal(this.doPositive, this.doNegative, this.game);
        //this.game.add.existing(this.questionModal);
    },
    doPositive : function() {

        game.state.states.Game.score+= 30;

        //game.state.states.Game.score = score;
        game.state.states.Game.truthometer.updateHealthbar(game.state.states.Game.score);
    },
    doNegative : function() {
        game.state.states.Game.score = 0;
        game.state.states.Game.truthometer.updateHealthbar(0);
    },
    touchedGround: function (player, ground) {
        this.player.numberOfJumps = 0;
        this.player.status = "ground";
        this.player.stopJump();
    },
    generateCondoms: function () {
        var condomY = this.game.rnd.integerInRange(-(this.game.height*0.95), -(this.game.height*0.40));
        var condomGroup = this.condoms.getFirstExists(false);
        if (!condomGroup) {
            condomGroup = new CondomGroup(this.game, this.condoms);
        }
        condomGroup.reset(this.game.width - 10, condomY);
    },
    generateVirusses: function () {
        var virusY = this.game.rnd.integerInRange(-(this.game.height*0.75), -(this.game.height*0.05));
        var virusGroup = this.virusses.getFirstExists(false);
        if (!virusGroup) {
            virusGroup = new VirusGroup(this.game, this.virusses);
        }
        virusGroup.reset(this.game.width, virusY);
    },
    generateLedges: function () {
        var quarterScreen = this.game.height / 4;
        var ledgeY = this.game.rnd.integerInRange(-(this.game.height*0.50), -(this.game.height*0.10));
        var ledgeGroup = this.ledges.getFirstExists(false);
        if (!ledgeGroup) {
            ledgeGroup = new LedgeGroup(this.game, this.ledges);
        }
        ledgeGroup.reset(this.game.width, ledgeY);
    },
    pauseGame: function () {
        this.condoms.destroy();
        this.virusses.destroy();
        this.ledges.destroy();

        this.condoms.callAll('stop');
        this.condomGenerator.timer.stop();

        this.virusses.callAll('stop');
        this.virusGenerator.timer.stop();

        this.ledges.callAll('stop');
        this.ledgeGenerator.timer.stop();

        this.ground.stopScroll();
        this.background.stopScroll();

        this.player.animations.stop();
    },
    resumeGame: function () {
        this.condoms = this.game.add.group();
        this.virusses = this.game.add.group();
        this.ledges = this.game.add.group();

        this.ground.autoScroll(this.levels[this.level].groundAutoScroll, 0);
        this.background.autoScroll(this.processSpeed.background.speed, 0);

        this.condomGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levels[this.level].condomTimer, this.generateCondoms, this);
        this.condomGenerator.timer.start();
        this.virusGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levels[this.level].virusTimer, this.generateVirusses, this);
        this.virusGenerator.timer.start();
        this.ledgeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levels[this.level].ledgeTimer, this.generateLedges, this);
        this.ledgeGenerator.timer.start();

        this.player.animations.play('jump', 12, true);
    },
    evaluateLevel: function () {
        var pointsForNextLevel = this.levels[this.level].pointsForNextLevel;
        var nextLevel = this.level + 1;
        //debugger;
        console.log(this.score);
        if (this.score >= pointsForNextLevel) {

            if (this.levels[nextLevel] === undefined) {
                this.condoms.callAll('stop');
                this.condomGenerator.timer.stop();

                this.virusses.callAll('stop');
                this.virusGenerator.timer.stop();

                this.ledges.callAll('stop');
                this.ledgeGenerator.timer.stop();

                this.ground.stopScroll();

                this.player.animations.stop();

                this.endModal = new EndModal(this.game);
                this.game.add.existing(this.endModal);

                $('.twitter-icon').removeClass('hidden');

            } else {

                // do some questions first
                this.pauseGame();
                var that = this;
                this.questionModal = new QuestionModal(function(){
                    // on correct answer: count the correct answers, when enough go to next level
                    console.log("going to next level");
                    //this.danceOMeterStart();
                    that.gotoNextLevel();
                }, function() {
                    // do nothing on a wrong answer
                }, this.game);
                this.game.add.existing(this.questionModal);
            }


        }
    },
    gotoNextLevel: function() {

        // TODO fixme, if end of game, do not go to next level
        this.level ++;
        this.updateToCurrentLevel();
        this.score = 0;
        console.log("Set to level: " + this.level);
        this.game.state.states.Game.truthometer.updateHealthbar(this.score);

    },
    danceOMeterStart: function() {
        this.pauseGame();
        this.danceText = this.add.text(
            this.world.centerX,
            this.world.centerY,
            "",
            {
                size: "100px",
                fill: "#FFF",
                align: "center"
            }
        );      
        this.danceText.anchor.setTo(0.5, 0.5);

        this.danceText.setText("Now Dance for Live!");

        this.danceDoneText = this.add.text(
            this.world.centerX,
            this.world.centerY,
            "",
            {
                size: "200px",
                fill: "#FFF",
                align: "center"
            }
        );   
        this.danceDoneText.anchor.setTo(0.5, 0.5);
        this.danceDoneText.alpha = 0;

        this.danceDoneText.setText("You can go to the next level!");


        this.danceometer = new DanceOMeter(this.game, -200, -200);
        this.danceometer.updateDanceLevelBar(0);
        this.game.add.existing(this.danceometer);

        setTimeout(function(){
            game.state.states.Game.danceText.destroy();
        }, 5000);

	   var accElem = document.getElementById('acceleration'),
            accGravityElem = document.getElementById('acceleration-gravity'),
            danceOMeterLevel = 0,
            // Define an event handler function for processing the device’s acceleration values
            handleDeviceMotionEvent = function(e) {
                                
                // Get the current acceleration values in 3 axes and find the greatest of these
                var acc = e.acceleration,
                    maxAcc = Math.max(acc.x, acc.y, acc.z),
         
                    // Get the acceleration values including gravity and find the greatest of these
                    accGravity = e.accelerationIncludingGravity,
                    maxAccGravity = Math.round(Math.max(accGravity.x, accGravity.y, accGravity.z));
                    if(maxAccGravity > 10 || maxAccGravity < 9){
                        danceOMeterLevel++;
                        if (danceOMeterLevel <= game.height){
                           game.state.states.Game.danceometer.globalUpdateDanceLevelBar(danceOMeterLevel);
                        }
                    }
                    if (danceOMeterLevel > game.height){
                        game.state.states.Game.danceDoneText.alpha = 1;


                        setTimeout(function(){
                            window.removeEventListener('devicemotion');
                            game.state.states.Game.danceDoneText.destroy();
                            game.state.states.Game.danceometer.globalRemoveDanceLevelBar();
                            game.state.states.Game.globalUpdateToCurrentLevel();
                        }, 500);
                    }
            };
         
        // Assign the event handler function to execute when the device is moving
        window.addEventListener('devicemotion', handleDeviceMotionEvent, false);
    },
    updateToCurrentLevel: function () {
        // this.condomGenerator.timer.stop();
        // this.condomGenerator = null;
        // this.virusGenerator.timer.stop();
        // this.virusGenerator = null;
        // this.ledgeGenerator.timer.stop();
        // this.ledgeGenerator = null;

        this.background.stopScroll();
        this.background.autoScroll(this.levels[this.level].backgroundAutoScroll, 0);
        game.stage.backgroundColor = this.levels[this.level].backgroundColor;
        this.background.alpha = this.levels[this.level].backgroundAlpha;

        this.ground.stopScroll();
        this.ground.autoScroll(this.levels[this.level].groundAutoScroll, 0);

        this.condomGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levels[this.level].condomTimer, this.generateCondoms, this);
        this.condomGenerator.timer.start();

        this.virusGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levels[this.level].virusTimer, this.generateVirusses, this);
        this.virusGenerator.timer.start();

        this.ledgeGenerator = this.game.time.events.loop(Phaser.Timer.SECOND * this.levels[this.level].ledgeTimer, this.generateLedges, this);
        this.ledgeGenerator.timer.start();



    },

    render: function() {
        if (document.location.hostname == "localhost") {
            this.game.time.advancedTiming = true;
            this.game.debug.text(this.game.time.fps || '--', 2, 14, "#ffffff");
        }
    }
};
