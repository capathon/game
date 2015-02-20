
BasicGame.MainMenu = function (game) {

    this.music = null;
    this.playButton = null;

};

BasicGame.MainMenu.prototype = {

    create: function () {
        // add the background sprite, also as a tile
        this.background = this.game.add.tileSprite(0,0,this.game.width,this.game.height,'background');
        this.background.autoScroll(-20,0);

        // add the ground sprite as a tile
        // and start scrolling in the negative x direction
        var groundHeight = this.game.height/20;
        this.ground = new Ground(this.game, 0, this.game.height-groundHeight, this.game.width, groundHeight);
        this.game.add.existing(this.ground);


        // create group to hold menu items so they can be positioned according the screen size
        this.menuGroup = this.game.add.group();
        this.menuGroup.width = this.game.width*0.8;
        this.menuGroup.height = this.game.height*0.85;
        this.menuGroup.x = this.game.width*0.1;
        this.menuGroup.y = this.game.height*0.05;

        /** STEP 1 **/
        // create a group to put the title assets in
        // so they can be manipulated as a whole
        this.titleGroup = this.game.add.group()

		// Add the logo of dance4life
        this.logo = this.add.sprite((this.menuGroup.width-160)/2,this.game.height*0.025,'logo');
		
		
        /** STEP 2 **/
        // create the title sprite
        // and add it to the group
        this.title = this.add.sprite(0,0,'title');
        this.titleGroup.add(this.title);

        /** STEP 3 **/
        // create the player sprite
        // and add it to the title group
	    this.player = this.add.sprite(185, 5,'player');
        this.titleGroup.add(this.player);

        /** STEP 4 **/
        // add an animation to the player
        // and begin the animation
        this.player.animations.add('jump');
        this.player.animations.play('jump', 12, true);

        /** STEP 5 **/
        // Set the originating location of the group
        this.titleGroup.x = this.game.width*0.25;
        this.titleGroup.y = this.game.height*0.15;

        /** STEP 6 **/
        //  create an oscillating animation tween for the group
        this.game.add.tween(this.titleGroup).to({y:120}, 800, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

		// Adding the explanation that you need to catch the condoms, avoid the viruses. 
		this.explanation = this.add.sprite((this.menuGroup.width-160)/2,this.game.height*0.4,'explanation');
		
        // add our start button with a callback
        this.startButton = this.game.add.button(this.menuGroup.width/2, this.game.height*0.75, 'startButton', this.startClick, this);
        this.startButton.anchor.setTo(0.5,0.5);

        this.menuGroup.add(this.logo);
        this.menuGroup.add(this.titleGroup);
        this.menuGroup.add(this.explanation);
        this.menuGroup.add(this.startButton);
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
