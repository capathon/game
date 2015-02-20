
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
    this.load.image('title', 'app/assets/img/title.png');
    this.load.spritesheet('player', 'app/assets/img/player.png', 34,24,3);
    this.load.spritesheet('pipe', 'app/assets/img/pipes.png', 54,320,2);
    this.load.image('startButton', 'app/assets/img/start-button.png');

    this.load.image('instructions', 'app/assets/img/instructions.png');
    this.load.image('getReady', 'app/assets/img/get-ready.png');

    this.load.image('scoreboard', 'app/assets/img/scoreboard.png');
    this.load.spritesheet('medals', 'app/assets/img/medals.png',44, 46, 2);
    this.load.image('gameover', 'app/assets/img/gameover.png');
    this.load.image('particle', 'app/assets/img/particle.png');

    this.load.audio('pipeHit', 'app/assets/sounds/pipe-hit.wav');
    this.load.audio('groundHit', 'app/assets/sounds/ground-hit.wav');
    this.load.audio('score', 'app/assets/sounds/score.wav');
    this.load.audio('ouch', 'app/assets/sounds/ouch.wav');

    this.load.bitmapFont('jumppyfont', 'app/assets/fonts/jumppyfont/jumppyfont.png', 'app/assets/fonts/jumppyfont/jumppyfont.fnt');
  },

  create: function () {

    //  Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
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
