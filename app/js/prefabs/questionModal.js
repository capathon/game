var QuestionModal = function(game, parent) {

    Phaser.Group.call(this, game, parent);


    // Add the modal
    this.questionmodal = this.create(this.game.width / 2, -250, 'questionmodal');
    this.questionmodal.anchor.setTo(0.5, 0.5);

    // Add the question
    this.questions = game.state.states.Game.questions.questions;
    this.question = this.questions[Math.floor(Math.random()*this.questions.length)];
    var style = { font: "25px Arial", fill: "#fff", align: "center" };

    this.questionText = this.game.add.text(135, -385, this.question.statement, style);
    this.questionText.wordWrap = true;
    this.questionText.wordWrapWidth = 300;
    this.questionText.align = 'center';
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
    // Answered True

    this.showAnswer(this.question.motivations.true);
};

QuestionModal.prototype.answerButtonClick2 = function() {
    // Answered False

    this.showAnswer(this.question.motivations.false);
};

QuestionModal.prototype.okButtonClick = function() {
    this.game.state.states.Game.resGame();
    this.destroy();
};

QuestionModal.prototype.showAnswer = function(text) {
    this.questionText.destroy();
    this.answerButton1.destroy();
    this.answerButton2.destroy();

    var style = { font: "25px Arial", fill: "#fff", align: "center" };
    this.answerText = this.game.add.text(135, -385, text, style);
    this.answerText.wordWrap = true;
    this.answerText.wordWrapWidth = 300;
    this.answerText.align = 'center';
    this.add(this.answerText);

    this.okButton = this.game.add.button(200, -230, 'buttonOk', this.okButtonClick, this);
    this.okButton.inputEnabled = true;
    this.add(this.okButton);
};
