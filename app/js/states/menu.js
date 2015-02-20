
BasicGame.MainMenu = function (game) {

    this.music = null;
    this.playButton = null;

};

BasicGame.MainMenu.prototype = {

    create: function () {
        // add the background sprite, also as a tile
        this.background = this.game.add.tileSprite(0,0,505,505,'background');
        this.background.autoScroll(-20,0);


        // add the ground sprite as a tile
        // and start scrolling in the negative x direction
        this.ground = this.game.add.tileSprite(0,442, 505, 63,'ground');
        this.ground.autoScroll(-200,0);

        /** STEP 1 **/
        // create a group to put the title assets in
        // so they can be manipulated as a whole
        this.titleGroup = this.game.add.group()

        /** STEP 2 **/
        // create the title sprite
        // and add it to the group
        this.title = this.add.sprite(0,0,'title');
        this.titleGroup.add(this.title);

        /** STEP 3 **/
        // create the player sprite
        // and add it to the title group
        this.player = this.add.sprite(200,5,'player');
        this.titleGroup.add(this.player);

        /** STEP 4 **/
        // add an animation to the player
        // and begin the animation
        this.player.animations.add('jump');
        this.player.animations.play('jump', 12, true);

        /** STEP 5 **/
        // Set the originating location of the group
        this.titleGroup.x = 120;
        this.titleGroup.y = 100;

        /** STEP 6 **/
        //  create an oscillating animation tween for the group
        this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

        // add our start button with a callback
        this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
        this.startButton.anchor.setTo(0.5,0.5);

    },

    update: function () {

        //  Do some nice funky main menu effect here

    },
    startClick: function() {
        // start button click handler
        // start the 'play' state
        this.game.state.start('Game');
    }

};
