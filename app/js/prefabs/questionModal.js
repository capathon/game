var QuestionModal = function(game, parent) {

    Phaser.Group.call(this, game, parent);


    // Add the modal
    this.questionmodal = this.create(this.game.width / 2, -250, 'questionmodal');
    this.questionmodal.anchor.setTo(0.5, 0.5);

    // Add the question
    var text = "Dit gaat je vraag\nworden.\nWat denk je?";
    var style = { font: "35px Arial", fill: "#fff", align: "center" };

    this.questionText = this.game.add.text(135, -385, text, style);
    this.add(this.questionText);


    // add our True button with a callback
    this.answerButton1 = this.game.add.button(75, -230, 'buttonTrue', this.answerButtonClick1, this);
    this.answerButton1.inputEnabled = true;
    this.add(this.answerButton1);

    // add our False button with a callback
    this.answerButton2 = this.game.add.button(254, -230, 'buttonFalse', this.answerButtonClick2, this);
    this.answerButton2.inputEnabled = true;
    this.add(this.answerButton2);


    this.y = this.game.height;
    this.x = 0;

};

QuestionModal.prototype = Object.create(Phaser.Group.prototype);
QuestionModal.prototype.constructor = QuestionModal;


QuestionModal.prototype.update = function() {
    // write your prefab's specific update code here
};

QuestionModal.prototype.answerButtonClick1 = function() {
    // Answer True
    this.game.state.states.Game.resGame();
    this.destroy();
};

QuestionModal.prototype.answerButtonClick2 = function() {
    // Answer False
    this.game.state.states.Game.resGame();
    this.destroy();
};

