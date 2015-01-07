OBEZOS.sprites.drone = {

    init: function(p) {
      this._super(p, this.getDefaults());
      this.add('2d, aiBounce, animation, tween');
      this.on("hit", this.collide);
      Q.stage(0).insert(this);
    },
    
    getDefaults: function(){
      return {
        sheet: 'drone',
        sprite: 'drone',
        vx:130,
        gravity: 0.02,
        landed: false,
        type: Q.SPRITE_DRONE,
        collisionMask: Q.SPRITE_DUDE | Q.SPRITE_DRONE | Q.SPRITE_BULLET,
        zigzagPct: 10,
        full: true
      };
    },
    
    collide: function(collision) {
      if(collision.obj.isA("TileLayer")){
        if (!this.p.landed){
          Q.state.inc("drone_delivered", 1);
          Q.addText("OBEZOS delivered a package!", 1200);
        }
        this.land();
      }
    },

    land: function(){
      this.p.landed = true;
      Q.audio.play("laugh.mp3");
      this.flyAway();
      this.depositPackage();
    },
    
    flyAway: function(){
      this.p.gravity = 0;
      this.makeUnHittable();
      this.animate({ x: 500, y: -200}, {
        callback: function(){ this.destroy(); }
      });
    },

    makeUnHittable: function(){
      this.p.type = Q.SPRITE_NONE;
      this.p.collisionMask = Q.SPRITE_NONE;
    },

    depositPackage: function(){
      new Q.Box({x: this.p.x, y: this.p.y+10, self_destruct: true});
      this.p.full = false;
    },

    dropPackage: function(){
      new Q.Box({x: this.p.x, y: this.p.y, gravity: 1});
      this.p.full = false;
    },

    step: function(dt) {
      var should_zigzag = Math.random() < this.p.zigzagPct / 100;
      this.p.full ? this.play("full") : this.play("empty");
      
      if(should_zigzag){ this.zigZag(); }
      
      if(this.p.landed){ this.p.vx = 0; }
    },

    zigZag: function(){
      var direction = Math.random() > 0.5 ? 1 : -1;
      this.p.vx = direction * Math.random() * 200;
    },

    animations: {
      full: {frames:[0]},
      empty: {frames: [1]}
    }
};