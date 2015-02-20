var QuestionModal = function(game) {

    Phaser.Group.call(this, game);

    this.questionmodal = this.create(250, -250, 'questionmodal');
    this.questionmodal.anchor.setTo(0.5, 0.5);

    this.scoreText = this.game.add.bitmapText(this.questionmodal.width, 180, 'jumppyfont', '', 18);
    this.add(this.scoreText);

    var text = "Dit gaat je vraag\nworden.\nWat denk je?";
    var style = { font: "35px Arial", fill: "#fff", align: "center" };

    var t = this.game.add.text(135, 125, text, style);



    // var button1 = game.add.button(135, 400, 'button', actionOnClick1, this, 2, 1, 0);



    // this.bestText = this.game.add.bitmapText(150, -350, 'jumppyfont', 'Dit wordt je vraag!', 18);
    // this.add(this.bestText);

    // add our start button with a callback
    this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', null, this);
    this.startButton.anchor.setTo(0.5,0.5);

    this.add(this.startButton);

    this.y = this.game.height;
    this.x = 0;

};

QuestionModal.prototype = Object.create(Phaser.Group.prototype);
QuestionModal.prototype.constructor = QuestionModal;

QuestionModal.prototype.show = function(score) {
    var coin, bestScore;
    this.scoreText.setText(score.toString());
    if(!!localStorage) {
        bestScore = localStorage.getItem('bestScore');
        if(!bestScore || bestScore < score) {
            bestScore = score;
            localStorage.setItem('bestScore', bestScore);
        }
    } else {
        bestScore = 'N/A';
    }

    this.bestText.setText(bestScore.toString());

    if(score >= 10 && score < 20)
    {
        coin = this.game.add.sprite(-65 , 7, 'medals', 1);
    } else if(score >= 20) {
        coin = this.game.add.sprite(-65 , 7, 'medals', 0);
    }

    this.game.add.tween(this).to({y: 0}, 1000, Phaser.Easing.Bounce.Out, true);

    if (coin) {

        coin.anchor.setTo(0.5, 0.5);
        this.scoreboard.addChild(coin);

         // Emitters have a center point and a width/height, which extends from their center point to the left/right and up/down
        var emitter = this.game.add.emitter(coin.x, coin.y, 400);
        this.scoreboard.addChild(emitter);
        emitter.width = coin.width;
        emitter.height = coin.height;


        //    This emitter will have a width of 800px, so a particle can emit from anywhere in the range emitter.x += emitter.width / 2
        // emitter.width = 800;

        emitter.makeParticles('particle');

        // emitter.minParticleSpeed.set(0, 300);
        // emitter.maxParticleSpeed.set(0, 600);

        emitter.setRotation(-100, 100);
        emitter.setXSpeed(0,0);
        emitter.setYSpeed(0,0);
        emitter.minParticleScale = 0.25;
        emitter.maxParticleScale = 0.5;
        emitter.setAll('body.allowGravity', false);

        emitter.start(false, 1000, 1000);

    }
};
QuestionModal.prototype.update = function() {
    // write your prefab's specific update code here
};

// QuestionModal.prototype.actionOnClick1 = function () {

//     background.visible =! background.visible;

// }