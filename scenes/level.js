OBEZOS.scenes.level = function(){
  
  this.setStage = function(stage) {
    playMusic();
    stage.collisionLayer(tileLayer());
    stage.insert(player());
    stage.insert(bezosHead());
    showHUD();
    setEndGameConditions();
  };

  var playMusic = function(){
    Q.audio.play('music.mp3',{ loop: true });
  },
  
  tileLayer = function(){
    return new Q.TileLayer({
        dataAsset: 'level.json',
        sheet: 'tiles'
    });
  },
  
  player = function(){
    OBEZOS.player = new Q.Player();
    return OBEZOS.player;
  },

  bezosHead = function(){
    return new Q.OBEZOS();
  },

  showHUD = function(){
    Q.stageScene("HUD",1);
  },

  setEndGameConditions = function(){
    Q.state.on("change.health", this, function(){
      if (Q.state.get("health") <= 0){
        Q.stageScene("endGame", {label: "You died!"});
      }
    });

    Q.state.on("change.drone_delivered", this, function(){
      if ( Q.state.get("drone_delivered") >= 10 ){
        Q.stageScene("endGame", {label: "Bend at the knee to the OBEZOS."});
      }
    });
  };

};

