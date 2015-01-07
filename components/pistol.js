OBEZOS.components.pistol = {
  
  added: function() {
    this.entity.p.ammo = 30;
  },

  fire: function() {
    if( this.hasAmmo() ) {
      this.shootBullet();
      this.removeAmmo(1);
      Q.audio.play("fire.mp3");
    }
  },

  shootBullet: function(){
    new Q.Bullet({
      x : this.entity.p.x,
      y : this.entity.p.y - 33,
      direction : this.entity.p.direction
    });
  },
  
  hasAmmo: function(){
    return (this.getAmmo() > 0);
  },
  
  getAmmo: function(){
    return this.entity.p.ammo;
  },

  refillAmmo: function() {
    this.entity.p.ammo = 60;
  },

  removeAmmo: function(amount){
    if(this.getAmmo() >= amount)
      this.entity.p.ammo -= amount;
  },

  addAmmo: function(amount){
    this.entity.p.ammo = (Math.min(this.entity.p.ammo + amount, 60));
  }

};