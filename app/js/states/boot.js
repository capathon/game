var BasicGame = {};

BasicGame.Boot = function (game) {

};

BasicGame.Boot.prototype = {

    init: function () {

        //  Unless you specifically know your game needs to support multi-touch I would recommend setting this to 1
        this.input.maxPointers = 1;

        //  Phaser will automatically pause if the browser tab the game is in loses focus. You can disable that here:
        this.stage.disableVisibilityChange = true;

        this.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;

        this.scale.setMaximum();
        this.scale.setScreenSize(true);

        this.scale.refresh();
    },

    preload: function () {

        //  Here we load the assets required for our preloader (in this case a background and a loading bar)
        this.load.image('preloader', 'app/assets/img/preloader.gif');
    },

    create: function () {
        
        this.game.input.maxPointers = 1;
        this.game.state.start('Preloader');
    }
};