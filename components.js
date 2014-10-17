Quintus.GameComponents = function (Q){
	Q.component("pistol", {
		added: function() {
			this.entity.p.ammo = 30;
		},

		refillAmmo: function() {
			this.entity.p.ammo = 60;
		},

		addAmmo: function(amount){
			this.entity.p.ammo = (Math.min(this.entity.p.ammo + amount, 60));
		},
		
		fire: function() {
			if(this.entity.p.ammo > 0) {
				
				Q.audio.play("fire.mp3");
				
				var bullet = new Q.Bullet({
					x : this.entity.p.x,
					y : this.entity.p.y - 33
				});
				
				var p = bullet.p;
				
				if (this.entity.p.direction === 'right'){
					p.vx = 400;
					p.vy = -200;
					p.angle = -45;
				}
				else if (this.entity.p.direction === 'up'){
					p.vx = 0;
					p.vy = -400;
					p.gravity = 0;
					p.angle = 90;
				}
				else{
					p.vx = -400;
					p.vy = -200;
					p.angle = -135;
				}
				Q.stage(0).insert(bullet);
				this.entity.p.ammo-=1;
			}
		}
	});
};