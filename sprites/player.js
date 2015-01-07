OBEZOS.sprites.player = {
  
  init: function(p) {
    this._super(p, this.getDefaults());

    this.add('2d, platformerControls');
    this.add("tween");
    this.add("animation");
    this.add("pistol");

    Q.input.on("fire",this,"firePistol");
    Q.input.on("goUp", this, "lookUp");

    this.on("hit.sprite", this.collide);
  },

  getDefaults: function(){
    return {
      sprite: "postman",
      sheet: "postman",
      type: Q.SPRITE_DUDE,
      collisionMask: Q.SPRITE_DEFAULT | Q.SPRITE_DRONE,
      x: 500,
      y: 500
    };
  },
  
  firePistol: function(){
    this.trigger("fire", this.p.ammo);
    this.pistol.fire();
  },
  
  lookUp:function(e){
    this.p.direction = 'up';
  },

  collide: function(collision) {
    if(collision.obj.isA("Box")) {
      this.collideWithBox(collision);
    }
  },

  collideWithBox: function(collision){
    if (collision.obj.p.self_destruct){
      this.collideWithFlamingBox(collision);
    }
    else{
      var contents = collision.obj.p.contents;
      if (contents === "ammo"){
        this.collectAmmo();
      }
      else if (contents === "nothing"){
        this.collectNothing();
      }
      else if (contents === "health"){
        this.increaseHealth(30);
      }
      collision.obj.destroy();
    }
  },

  collideWithFlamingBox: function(collision){
    this.decreaseHealth(5);
    if (collision.normalX < 1){
      this.rebound(this.p.x-30);
    }
    else{
      this.rebound(this.p.x+30);
    }
  },

  decreaseHealth: function(amount){
    Q.addText("Ouch!");
    Q.audio.play("ouch.mp3");
    Q.state.dec("health", amount);
  },

  rebound: function(x){
    this.animate({x: x}, 0.1);
  },

  collectAmmo: function(){
    this.pistol.addAmmo(30);
    Q.addText("30 Ammo!!");
    Q.audio.play("coin.mp3");
  },

  collectNothing: function(){
    Q.addText("Empty Box!", 500);
  },

  increaseHealth: function(amount){
    var old_health = Q.state.get("health"),
        new_health = Math.min(old_health + amount, 100);
    Q.state.set("health", new_health);
    Q.addText("Health!");
    Q.audio.play("coin.mp3");
  },

  step: function(dt) {
    if(this.p.vx > 0) {
      this.p.flip = "x";
      this.play("run");
    }
    else if(this.p.vx < 0) {
      this.p.flip = "";
      this.play("run");
    }
    else {
      if(this.p.direction === "up"){
        this.play("stand_up");
      }
      else{
        this.play("stand");
      }
    }
  },

  animations: {
    run: {frames:[1,2,3], rate: 1/5, next: "stand"},
    stand: {frames: [0]},
    stand_up: {frames: [4]}
  }
  
};