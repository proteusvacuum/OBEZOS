OBEZOS.scenes.endGame = function(){
  
  this.setStage = function(stage) {
    var container = stage.insert( endGameContainer() ),
        button = container.insert( playAgainButton() ),
        label = container.insert( endGameLabel(button, stage.options.label) );
    
    container.fit(20);
    playLaugh();
    button.on("click", restartGame);
  };  

  var endGameContainer = function(){
    return new Q.UI.Container({
      x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
    });
  },

  playAgainButton = function(){
    return new Q.UI.Button({
      x: 0,
      y: 0,
      fill: "#CCCCCC",
      label: "Play Again"
    });
  },

  endGameLabel = function(button, label){
    return new Q.UI.Text({
      x:10,
      y: -10 - button.p.h,
      label: label
    });
  },
  
  playLaugh = function(){
    Q.audio.stop();
    Q.audio.play("laugh.mp3");
  },  

  restartGame = function() {
    Q.clearStages();
    Q.state.reset({ drone_delivered: 0, health: 100, score: 0});
    Q.stageScene('level1');
  };

};