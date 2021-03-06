OBEZOS = {
  components: {},
  scenes:     {},
  sprites:    {}
};

OBEZOS.gameLoader = {
  
  loadGame: function(){
    this.loadQuintus();
    this.setSpriteMasks();
    this.setCustomInputKeys();
    this.loadSprites();
    this.loadAudio();
  },

  loadQuintus: function(){
    var Q = window.Q = Quintus()
      .include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, Audio")
      .include("GameComponents, GameSprites, GameScenes, GameFunctions")
      .setup({ width: 1024, height: 700 })
      .controls()
      .touch()
      .enableSound();
  },

  setSpriteMasks: function(){
   Q.SPRITE_DUDE = 2;
   Q.SPRITE_BULLET = 3;
   Q.SPRITE_DRONE = 4;
   Q.SPRITE_OBEZOS = 5;
   Q.SPRITE_BOX = 6;
  },

  setCustomInputKeys: function(){
    Q.input.keyboardControls({ UP: "goUp" });
  },

  loadSprites: function(){
    var sprite_assets = "drone.png, bullet.png, box.png, box.json, postman_sprite.png, OBEZOS.png, sprites.json, level.json, tiles.png";
    Q.load(sprite_assets, function() {
      Q.sheet("drone", "drone.png", { tilew: 74, tileh: 30, cols: 2 });
      Q.sheet("obezos", "OBEZOS.png", { tilew: 164, tileh: 224 });
      Q.sheet("bullet","bullet.png", { tilew: 8, tileh: 4 });
      Q.sheet("tiles","tiles.png", { tilew: 32, tileh: 32 });
      Q.compileSheets("box.png", "box.json");
      Q.compileSheets("postman_sprite.png","sprites.json");
      Q.state.reset({ drone_delivered: 0, health: 100, score: 0});
      Q.stageScene("start");
    });
  },

  loadAudio: function(){
    var audio_assets = "music.mp3, fire.mp3, laugh.mp3, explode.mp3, coin.mp3, ouch.mp3";
    Q.load(audio_assets);
  }

};

window.addEventListener("load", function() {
  OBEZOS.gameLoader.loadGame();
});
