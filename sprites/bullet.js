OBEZOS.sprites.bullet = {

    init: function(p) {
      this._super(p, this.getDefaults());
      this.add('2d');
      
      this.setDirection();

      this.on("bump.left,bump.right,bump.bottom, bump.top",
        this.collide);

      Q.stage(0).insert(this);
    },

    getDefaults: function(){
      return {
        sheet: 'bullet',
        collisionMask: Q.SPRITE_DRONE | Q.SPRITE_DEFAULT,
        type: Q.SPRITE_BULLET,
        gravity: 0.1
      };
    },

    setDirection: function(){
      if (this.p.direction === 'right'){
        this.faceRight();
      }
      else if (this.p.direction === 'up'){
        this.faceUp();
      }
      else{
        this.faceLeft();
      }
    },
    
    collide: function(collision) {
      if(!collision.obj.isA("Player")){ this.destroy(); }

      if(collision.obj.isA("Box")) {
        this.shootBox(collision.obj);
      }
      else if(collision.obj.isA("Drone")) {
        this.shootDrone(collision.obj);
      }
    },
    
    shootBox: function(box){
      box.selfDestruct();
    },

    shootDrone: function(drone){
      drone.dropPackage();
      drone.destroy();
      Q.addScore(10);
      Q.audio.play("explode.mp3");
    },

    faceRight: function(){
      this.p.vx = 400;
      this.p.vy = -200;
      this.p.angle = -45;
    },

    faceLeft: function(){
      this.p.vx = -400;
      this.p.vy = -200;
      this.p.angle = -135;
    },

    faceUp: function(){
      this.p.vx = 0;
      this.p.vy = -400;
      this.p.angle = 90;
      this.p.gravity = 0;
    }
};