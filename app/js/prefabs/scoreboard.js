var Scoreboard = function(game, parent) {

    Phaser.Group.call(this, game, parent);

    this.scoreboardGroup = this.game.add.group();
    this.scoreboardGroup.z = 1000;

    this.totalScoreGroup = this.game.add.group();
    this.condomScoreGroup = this.game.add.group();
    this.virusScoreGroup = this.game.add.group();

    // Define the scoreboard text styling
    var style = { font: "18px Arial", fill: "#fff", align: "right" };

    // Total score
    this.totalScore = "1000";
    this.totalScoreText = this.game.add.text(this.game.width-100, 10, this.totalScore, style);
    //this.totalSCoreImg
    this.totalScoreGroup.add(this.totalScoreText);
    //this.totalScoreGroup.add(this.totalSCoreImg);

    // Condom score
    this.condomScore = "1000";
    this.condomScoreText = this.game.add.text(this.game.width-100, 50, this.condomScore, style);
    this.condomScoreImg = new Condom(this.game, this.game.width-30, 60, 1);
    this.condomScoreImg.width = this.condomScoreImg.width - 30;
    this.condomScoreImg.height = this.condomScoreImg.height - 30;
    this.condomScoreGroup.add(this.condomScoreText);
    this.condomScoreGroup.add(this.condomScoreImg);

    // Virus score
    this.virusScore = "1000";
    this.virusScoreText = this.game.add.text(this.game.width-100, 90, this.virusScore, style)
    this.virusScoreImg = new Virus(this.game, this.game.width-30, 100, 1);
    this.virusScoreImg.width = this.virusScoreImg.width - 10;
    this.virusScoreImg.height = this.virusScoreImg.height - 10;
    this.virusScoreGroup.add(this.virusScoreText);
    this.virusScoreGroup.add(this.virusScoreImg);

    // Add all scores to the scoreboard
    this.scoreboardGroup.add(this.totalScoreGroup);
    this.scoreboardGroup.add(this.condomScoreGroup);
    this.scoreboardGroup.add(this.virusScoreGroup);

    //var gameover;

    //Phaser.Group.call(this, game);
    //gameover = this.create(this.game.width / 2, 100, 'gameover');
    //gameover.anchor.setTo(0.5, 0.5);

    //this.scoreboard = this.create(this.game.width / 2, 200, 'scoreboard');
    //this.scoreboard.anchor.setTo(0.5, 0.5);

    //this.scoreText = this.game.add.bitmapText(this.scoreboard.width, 180, 'jumppyfont', '', 18);
    //this.scoreText = this.game.add.bitmapText(this.scoreboard.width, 180, 'jumppyfont', '', 18);
    //var style = { font: "18px Arial", fill: "#fff", align: "center" };
    //this.scoreText = this.game.add.text(-75, -95, 'score', style);
    //this.add(this.scoreText);

    //this.bestText = this.game.add.bitmapText(this.scoreboard.width, 230, 'jumppyfont', '', 18);
    //this.add(this.bestText);

    // add our start button with a callback
    //this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
    //this.startButton.anchor.setTo(0.5,0.5);

    //this.add(this.startButton);

    //this.y = this.game.height;
    //this.x = 0;

};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.show = function(score) {
    //this.scoreText.setText(score.toString());
};

Scoreboard.prototype.update = function() {
    // write your prefab's specific update code here
};
