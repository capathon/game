
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
        this.load.image('logo_large', 'app/assets/img/logo_large.png');
		this.load.image('title', 'app/assets/img/title.png');
		this.load.image('explanation', 'app/assets/img/CatchAndAvoid.png');
        this.load.image('ledge', 'app/assets/img/platform.png');

        this.load.spritesheet('player', 'app/assets/img/ride_anim.png', 76,60,3);
        this.load.image('condom', 'app/assets/img/condom.png');
        this.load.image('cup', 'app/assets/img/cup.png');
        this.load.spritesheet('virus', 'app/assets/img/virus.png', 43,43,1);
        this.load.spritesheet('truthometer', 'app/assets/img/truth-o-meter.png', 100,228,1);
        this.load.image('startButton', 'app/assets/img/start-button.png');
        this.load.spritesheet('buttonTrue', 'app/assets/img/buttonTrue.png', 95, 46, 3);
        this.load.spritesheet('buttonFalse', 'app/assets/img/buttonFalse.png', 95, 46, 3);
        this.load.spritesheet('buttonOk', 'app/assets/img/buttonOk.png', 95, 46, 3);

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
        this.load.audio('correct', 'app/assets/sounds/correct.wav');
        this.load.audio('wrong', 'app/assets/sounds/wrong.wav');
        this.load.audio('music', 'app/assets/sounds/wasted-8bit-universe.mp3');
        this.load.audio('danceMusic', 'app/assets/sounds/shut-up-and-dance.mp3');

        this.load.bitmapFont('jumppyfont', 'app/assets/fonts/jumppyfont/jumppyfont.png', 'app/assets/fonts/jumppyfont/jumppyfont.fnt');

        this.load.text('someData', 'app/assets/doc/questions.json');
    },

    create: function () {

        this.asset.cropEnabled = false;

    },

    update: function () {
        if(!!this.ready) {
            this.game.state.start('MainMenu');
            
            this.music = this.game.add.audio('music', 1, true);
            this.music.play('', 0, 1, true);
        }

    },
    onLoadComplete: function() {
        this.ready = true;
    }
};
