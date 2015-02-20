
BasicGame.Preloader = function (game) {

  this.background = null;
  this.preloadBar = null;

  this.ready = false;

};

BasicGame.Preloader.prototype = {

    preload: function () {
        this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
        this.asset.anchor.setTo(0.5, 0.5);

        this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
        this.load.setPreloadSprite(this.asset);
        this.load.image('background', 'app/assets/img/background.png');
        this.load.image('ground', 'app/assets/img/ground.png');
        this.load.image('logo', 'app/assets/img/logo.png');
		this.load.image('title', 'app/assets/img/title.png');
		this.load.image('explanation', 'app/assets/img/CatchAndAvoid.png');
        this.load.image('ledge', 'app/assets/img/platform.png');

        this.load.spritesheet('player', 'app/assets/img/ride_anim.png', 76,60,3);
        this.load.spritesheet('condom', 'app/assets/img/condom.png', 50,63,1);
        this.load.spritesheet('virus', 'app/assets/img/virus.png', 43,43,1);
        this.load.spritesheet('truthometer', 'app/assets/img/truth-o-meter.png', 40,132,1);
        this.load.image('startButton', 'app/assets/img/start-button.png');
        this.load.image('buttonTrue', 'app/assets/img/buttonTrue.png');
        this.load.image('buttonFalse', 'app/assets/img/buttonFalse.png');
        this.load.image('buttonOk', 'app/assets/img/buttonOk.png');

        this.load.image('instructions', 'app/assets/img/instructions.png');
        this.load.image('getReady', 'app/assets/img/get-ready.png');

        this.load.image('questionmodal', 'app/assets/img/questionmodal.png');
        this.load.image('gameover', 'app/assets/img/gameover.png');
        this.load.image('particle', 'app/assets/img/particle.png');

        this.load.audio('jump', 'app/assets/sounds/jump.wav');
        this.load.audio('condomHit', 'app/assets/sounds/condom-hit.wav');
        this.load.audio('groundHit', 'app/assets/sounds/ground-hit.wav');
        this.load.audio('score', 'app/assets/sounds/score.wav');
        this.load.audio('ouch', 'app/assets/sounds/ouch.wav');

        this.load.bitmapFont('jumppyfont', 'app/assets/fonts/jumppyfont/jumppyfont.png', 'app/assets/fonts/jumppyfont/jumppyfont.fnt');

        this.load.text('someData', 'app/assets/doc/questions.json');
    },

    create: function () {

        this.asset.cropEnabled = false;

    },

    update: function () {
        if(!!this.ready) {
            this.game.state.start('MainMenu');
        }

    },
    onLoadComplete: function() {
        this.ready = true;
    }
};
