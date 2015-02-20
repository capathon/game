var QuestionModal = function(game, parent) {

    Phaser.Group.call(this, game, parent);

    // Add the modal
    //this.questionmodal = this.create(this.game.width/2, -this.game.height/2, 'questionmodal');
    this.questionmodal = this.create(0, 0, 'questionmodal');
    this.questionmodal.anchor.setTo(0.5, 0.5);

    this.questionmodalGroup = this.game.add.group();
    this.questionmodalGroup.width = 0;
    this.questionmodalGroup.height = 0;
    this.questionmodalGroup.x = 0;
    this.questionmodalGroup.x = (this.game.width-this.questionmodalGroup.width)/2;
    this.questionmodalGroup.y = 0;
    this.questionmodalGroup.y = (this.game.height-this.questionmodalGroup.height-200)/2;

    // Add the question
    this.questions = game.state.states.Game.questions.questions;
    this.question = this.questions[Math.floor(Math.random()*this.questions.length)];
    var style = { font: "25px Arial", fill: "#fff", align: "center" };

    this.questionText = this.game.add.text(-125, -150, this.question.statement, style);
    this.questionText.wordWrap = true;
    this.questionText.wordWrapWidth = 300;
    this.questionText.align = 'center';

    // add our True button with a callback
    this.answerButton1 = this.game.add.button(-195, 0, 'buttonTrue', this.answerButtonClick1, this);
    this.answerButton1.width = 95;
    this.answerButton1.inputEnabled = true;

    // add our False button with a callback
    this.answerButton2 = this.game.add.button(15, 0, 'buttonFalse', this.answerButtonClick2, this);
    this.answerButton2.width = 95;
    this.answerButton2.inputEnabled = true;

    this.questionmodalGroup.add(this.questionmodal);
    this.questionmodalGroup.add(this.questionText);
    this.questionmodalGroup.add(this.answerButton1);
    this.questionmodalGroup.add(this.answerButton2);
};

QuestionModal.prototype = Object.create(Phaser.Group.prototype);
QuestionModal.prototype.constructor = QuestionModal;


QuestionModal.prototype.update = function() {
    // write your prefab's specific update code here
};

QuestionModal.prototype.answerButtonClick1 = function() {
    // Answered True
    var correctAnswer = false;
    if (this.question.answer === true){
        correctAnswer = true;
    }
    this.showAnswer(this.question.motivations.true, correctAnswer);
};

QuestionModal.prototype.answerButtonClick2 = function() {
    // Answered False
    var correctAnswer = false;
    if (this.question.answer === false){
        correctAnswer = true;
    }
    this.showAnswer(this.question.motivations.false, correctAnswer);
};

QuestionModal.prototype.okButtonClick = function() {
    this.game.state.states.Game.resGame();
    this.destroy();
    this.questionmodalGroup.destroy();
};

QuestionModal.prototype.showAnswer = function(text, correctAnswer) {
    if(correctAnswer){
        game.state.states.Game.score = game.state.states.Game.score + 30;
        game.state.states.Game.truthometer.updateHealthbar(game.state.states.Game.score);
    }else{
        game.state.states.Game.score = 0;
        game.state.states.Game.truthometer.updateHealthbar(game.state.states.Game.score);
    }
    this.questionText.destroy();
    this.answerButton1.destroy();
    this.answerButton2.destroy();

    var style = { font: "25px Arial", fill: "#fff", align: "center" };
    this.answerText = this.game.add.text(-125, -150, text, style);
    this.answerText.wordWrap = true;
    this.answerText.wordWrapWidth = 300;
    this.answerText.align = 'center';

    this.okButton = this.game.add.button(-75, 0, 'buttonOk', this.okButtonClick, this);
    this.okButton.inputEnabled = true;
    this.okButton.width = 75;

    this.questionmodalGroup.add(this.okButton);
    this.questionmodalGroup.add(this.answerText);
};
