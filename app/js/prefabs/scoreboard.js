var Scoreboard = function (game, parent) {

    this.totalScore = 0;
    this.condomCount = 0;
    this.virusCount = 0;

    Phaser.Group.call(this, game, parent);

    this.scoreboardGroup = this.game.add.group();
    this.scoreboardGroup.z = 1000;

    this.totalScoreGroup = this.game.add.group();
    this.condomScoreGroup = this.game.add.group();
    this.virusScoreGroup = this.game.add.group();

    // Define the scoreboard text styling
    var style = {font: "18px Arial", fill: "#fff", align: "left"};

    // Total score
    this.totalScoreText = this.game.add.text(this.game.width - 100, 10, this.totalScore.toString(), style);
    this.totalSCoreImg = this.game.add.sprite(this.game.width - 45, 7, 'cup');
    this.totalSCoreImg.width = this.totalSCoreImg.width - 320;
    this.totalSCoreImg.height = this.totalSCoreImg.height - 230;
    this.totalScoreGroup.add(this.totalScoreText);
    this.totalScoreGroup.add(this.totalSCoreImg);

    // Condom score
    this.condomScoreText = this.game.add.text(this.game.width - 100, 50, this.condomCount.toString(), style);
    this.condomScoreImg = this.game.add.sprite(this.game.width - 50, 45, 'condom');
    this.condomScoreImg.width = this.condomScoreImg.width - 30;
    this.condomScoreImg.height = this.condomScoreImg.height - 30;
    this.condomScoreGroup.add(this.condomScoreText);
    this.condomScoreGroup.add(this.condomScoreImg);

    // Virus score
    this.virusScoreText = this.game.add.text(this.game.width - 100, 90, this.virusCount.toString(), style)
    this.virusScoreImg = this.game.add.sprite(this.game.width - 40, 83, 'virus');
    this.virusScoreImg.width = this.virusScoreImg.width - 10;
    this.virusScoreImg.height = this.virusScoreImg.height - 10;
    this.virusScoreGroup.add(this.virusScoreText);
    this.virusScoreGroup.add(this.virusScoreImg);

    // Add all scores to the scoreboard
    this.scoreboardGroup.add(this.totalScoreGroup);
    this.scoreboardGroup.add(this.condomScoreGroup);
    this.scoreboardGroup.add(this.virusScoreGroup);
};

Scoreboard.prototype = Object.create(Phaser.Group.prototype);
Scoreboard.prototype.constructor = Scoreboard;

Scoreboard.prototype.updateCondomScore = function (score) {
    this.condomCount = this.condomCount + score;
    this.condomScoreText.setText(this.condomCount.toString());
};

Scoreboard.prototype.updateVirusScore = function (score) {
    this.virusCount = this.virusCount + score;
    this.virusScoreText.setText(this.virusCount.toString());
};

Scoreboard.prototype.updateTotalScore = function (score) {
    this.totalScore = this.totalScore + score;
    this.totalScoreText.setText(this.totalScore.toString());
};