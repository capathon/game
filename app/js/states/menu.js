
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

		// Add the logo of dance4life
        this.logo = this.add.sprite(160,20,'logo');		
		
		
        /** STEP 2 **/
        // create the title sprite
        // and add it to the group
        this.title = this.add.sprite(0,0,'title');
        this.titleGroup.add(this.title);

        /** STEP 3 **/
        // create the player sprite
        // and add it to the title group
	    this.player = this.add.sprite(185,10,'player');
        this.titleGroup.add(this.player);

        /** STEP 4 **/
        // add an animation to the player
        // and begin the animation
        this.player.animations.add('jump');
        this.player.animations.play('jump', 12, true);

        /** STEP 5 **/
        // Set the originating location of the group
        this.titleGroup.x = 120;
        this.titleGroup.y = 80;

        /** STEP 6 **/
        //  create an oscillating animation tween for the group
        this.game.add.tween(this.titleGroup).to({y:110}, 800, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

		// Adding the explanation that you need to catch the condoms, avoid the viruses. 
		this.explanation = this.add.sprite(160,190,'explanation');		
		
		
		
        // add our start button with a callback
        this.startButton = this.game.add.button(this.game.width/2, 360, 'startButton', this.startClick, this);
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
