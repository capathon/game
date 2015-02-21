var EndModal = function(game, parent) {
  Phaser.Group.call(this, game, parent);
// Add the modal
//  this.endmodal = this.create(this.game.width / 2, -400, 'endmodal');
  this.endmodal = this.create(0, 0, 'endmodal');
  this.endmodal.anchor.setTo(0.5, 0.5);


  this.endModalGroup = this.game.add.group();
  this.endModalGroup.width = 0;
  this.endModalGroup.height = 0;
  this.endModalGroup.x = 0;
  this.endModalGroup.x = (this.game.width-this.endModalGroup.width)/2;
  this.endModalGroup.y = 0;
  this.endModalGroup.y = (this.game.height-this.endModalGroup.height-200)/2;

  var text = "Congratulation!";
  var congratulationTextStyle = { font: "32px Arial", fill: "#ffb62a", align: "center" };

  this.congratulationText = this.game.add.text(-120, -130, text, congratulationTextStyle);
  this.congratulationText.wordWrap = true;
  this.congratulationText.wordWrapWidth = 300;
  this.congratulationText.align = 'center';

  var totaltext = "Your score: 999";
  var totaltextStyle = { font: "24px Arial", fill: "#000", align: "center" };

  this.totalScoreText = this.game.add.text(-120, -80, totaltext, totaltextStyle);
  this.totalScoreText.wordWrap = true;
  this.totalScoreText.wordWrapWidth = 300;
  this.totalScoreText.align = 'center';

  //this.add(this.congratulationText);
  //this.y = this.game.height;
  //this.x = 0;


  this.endModalGroup.add(this.endmodal);
  this.endModalGroup.add(this.congratulationText);
  this.endModalGroup.add(this.totalScoreText);
};
EndModal.prototype = Object.create(Phaser.Group.prototype);
EndModal.prototype.constructor = EndModal;
EndModal.prototype.update = function() {
// write your prefab's specific update code here
};

