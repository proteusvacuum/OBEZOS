Quintus.GameScenes = function(Q){
  
  var starting_stage  = new OBEZOS.scenes.start(),
      level1          = new OBEZOS.scenes.level(),
      HUD             = new OBEZOS.scenes.HUD(),
      endGame         = new OBEZOS.scenes.endGame();

  Q.scene("start", starting_stage.setStage);
  Q.scene("level1", level1.setStage);
  Q.scene("HUD", HUD.setStage);
  Q.scene('endGame', endGame.setStage);
  
};