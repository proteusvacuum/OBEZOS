OBEZOS.sprites.box = {
  
  init: function(p) {
    this._super(p, this.getDefaults());
    this.generateContents();
    if (this.p.self_destruct){ this.selfDestruct(); }
    this.add('2d, aiBounce, animation');
    Q.stage(0).insert(this);
  },

  getDefaults: function(){
    return {
      sheet: 'box',
      sprite: 'box',
      contents: "coin",
      type: Q.SPRITE_BOX,
      collisionMask: Q.SPRITE_DUDE | Q.SPRITE_DRONE | Q.SPRITE_BULLET,
      self_destruct: false
    };
  },
  
  generateContents: function(){
    var rand = Math.random();
    if (rand > 0 && rand < 0.2){
      this.p.contents = "health";
    }
    else if (rand > 0.2 && rand < 0.4){
      this.p.contents = "ammo";
    }
    else if (rand > 0.4 && rand < 1){
      this.p.contents = "nothing";
    }
  },

  selfDestruct: function(){
    var self = this;
    self.p.self_destruct = true;
    setTimeout(function(){ self.destroy(); }, 5000);
  },

  step: function(dt){
    if (this.p.self_destruct){ this.onFire(); }
  },

  onFire: function(){
    this.play("fire");
  },

  animations: {
    fire: {frames:[1,2], rate: 1/5}
  }

};