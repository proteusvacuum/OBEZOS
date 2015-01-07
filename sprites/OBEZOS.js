OBEZOS.sprites.OBEZOS = {
  
  init: function(p){
    this._super(p, this.getDefaults());
    Q.state.on("change.score", this, "l33t");
  },

  getDefaults: function(){
    return {
      sheet: 'obezos',
      type: Q.SPRITE_OBEZOS,
      x:875,
      y:150,
      l33tness: 1
    };
  },

  l33t: function(score){
    var is_obezos_getting_l33ter = score % 150 === 0;
    if(is_obezos_getting_l33ter){
      this.increaseL33tness(1);
      Q.addText("OBEZOS IS GETTING L33TER!", 3000);
      Q.audio.play("laugh.mp3");
    }
  },

  increaseL33tness: function(amount){
    this.p.l33tness += amount;
  },

  step: function(dt) {
    var should_spawn_drone = Math.random() < this.p.l33tness / 100;
    if(should_spawn_drone) {
      new Q.Drone({ x: 800, y: 150 });
    }
  }

};