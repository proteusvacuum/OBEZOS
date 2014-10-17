Quintus.GameSprites = function(Q){
	
	Q.Sprite.extend("Player",{
		init: function(p) {
			this._super(p, {
				sprite: "postman",
				sheet: "postman",
				type: Q.SPRITE_DUDE,
				collisionMask: Q.SPRITE_DEFAULT | Q.SPRITE_DRONE,
				x: 500,
				y: 500
			});

			this.add('2d, platformerControls');
			
			this.add("tween");

			this.add("animation");

			this.add("pistol");

			Q.input.on("fire",this,"firePistol");
			
			Q.input.on("goUp", this, "changeDirection");

			this.on("hit.sprite",function(collision) {
				if(collision.obj.isA("Box")) {
					if (collision.obj.p.self_destruct){
						
						Q.addText("Ouch!"); 
						Q.state.dec("health", 5);
						Q.audio.play("ouch.mp3");

						if (collision.normalX < 1){
							this.animate({x: this.p.x-30}, 0.1);
						}
						else{
							this.animate({x: this.p.x+30}, 0.1);
						}
					}
					else{
						var contents = collision.obj.p.contents;
						
						if (contents === "ammo"){
							this.pistol.addAmmo(30);
							Q.addText("30 Ammo!!");
							Q.audio.play("coin.mp3");
						}
						else if (contents === "nothing"){
							Q.addText("Empty Box!", 500);
							// Q.audio.play("coin.mp3");
						}
						else if (contents === "health"){
							Q.state.set("health", Math.min(Q.state.get("health") + 30, 100));
							Q.addText("Health!");
							Q.audio.play("coin.mp3");
						}
						
						collision.obj.destroy();
					}
				}
			});
		},
		changeDirection:function(e){
			this.p.direction = 'up';
		},
		firePistol: function(){
			this.trigger("fire", this.p.ammo);
			this.pistol.fire();	
		},
		step: function(dt) {
			if(this.p.vx > 0) {
				this.p.flip = "x";
				this.play("run");
			} else if(this.p.vx < 0) {
				this.p.flip = "";
				this.play("run");
			} else {
				if(this.p.direction === "up"){
					this.play("stand_up");
				}
				else{
					this.play("stand");
				}
			}
		}
	});

	Q.animations("postman", {
		run: {frames:[1,2,3], rate: 1/5, next: "stand"},
		stand: {frames: [0]},
		stand_up: {frames: [4]}
	});

	Q.Sprite.extend("OBEZOS", {
		init: function(p){
			this._super(p, {
				sheet: 'obezos',
				type: Q.SPRITE_OBEZOS,
				x:875,
				y:150,
				l33tness: 1
			});
			Q.state.on("change.score", this, "l33t");
		},
		l33t:function(score){
			if(score % 150 === 0){
				this.p.l33tness += 1;
				Q.addText("OBEZOS IS GETTING L33TER!", 3000);
				Q.audio.play("laugh.mp3");
			}
		},
		step: function (dt) {
			var p = this.p;
			if(Math.random() < p.l33tness / 100) {
				var drone = Q.stage(0).insert(new Q.Drone({ x: 800, y: 150 }));
			}
		}
	});

	Q.Sprite.extend("Drone", {
		init: function(p) {
			this._super(p, {
				sheet: 'drone',
				sprite: 'drone',
				vx:130,
				gravity: 0.02,
				landed: false,
				type: Q.SPRITE_DRONE,
				collisionMask: Q.SPRITE_DUDE | Q.SPRITE_DRONE | Q.SPRITE_BULLET,
				zigzagPct: 10,
				full: true
			});
			this.add('2d, aiBounce, animation, tween');
			
			this.on("landed", function(){
				Q.audio.play("laugh.mp3");
				//fly away
				this.p.gravity = 0;
				this.p.type = Q.SPRITE_NONE;
				this.p.collisionMask = Q.SPRITE_NONE;
				
				this.animate({ x: 500, y: -200}, {
					callback: function(){
						this.destroy();
					}
				});
				//drop package
				Q.addBox({x: this.p.x, y: this.p.y+10, self_destruct: true});
			});
			
			this.on("hit",function(collision) {
					if(collision.obj.isA("TileLayer")){
						if (!this.p.landed){
							Q.state.inc("drone_delivered", 1);
							Q.addText("OBEZOS delivered a package!", 1200);
						}
						this.p.landed = true;
						this.trigger("landed");
					}
			});
		},
		step: function(dt) {
			var p = this.p;

			if (p.full){
				this.play("full");
			}
			else{
				this.play("empty");
			}

			if(Math.random() < p.zigzagPct / 100) {
				var sig = Math.random() > 0.5 ? 1 : -1;
				p.vx = sig * Math.random() * 200;
			}
			if (p.landed){
				p.vx = 0;
			}
		}
	});

	Q.animations("drone", {
		full: {frames:[0]},
		empty: {frames: [1]}
	});

	Q.Sprite.extend("Box", {
		init: function(p) {
			this._super(p, {
				sheet: 'box',
				sprite: 'box',
				contents: "coin",
				type: Q.SPRITE_BOX,
				collisionMask: Q.SPRITE_DUDE | Q.SPRITE_DRONE | Q.SPRITE_BULLET,
				self_destruct: false
			});
			this.add('2d, aiBounce, animation');

		},
		step: function(dt){
			if (this.p.self_destruct){
				this.play("fire");
			}
		}
	});
	
	Q.animations("box", {
		fire: {frames:[1,2], rate: 1/5}
	});
	
	Q.Sprite.extend("Bullet", {
		init: function(p) {
			this._super(p, { 
				sheet: 'bullet',
				collisionMask: Q.SPRITE_DRONE | Q.SPRITE_DEFAULT,
				type: Q.SPRITE_BULLET,
				gravity: 0.1
			});

			this.add('2d');

			this.on("bump.left,bump.right,bump.bottom, bump.top",function(collision) {
				
				if(!collision.obj.isA("Player")){
					this.destroy();
				}
				
				if(collision.obj.isA("Box")) {
					collision.obj.p.self_destruct = true;
					Q.selfDestruct(collision.obj);
				}

				if(collision.obj.isA("Drone")) {
					var position = {x: collision.obj.p.x, y:  collision.obj.p.y};					
					
					Q.state.inc("score", 10);
					
					collision.obj.destroy();
					
					Q.addBox({x: position.x, y: position.y, gravity: 1});

					Q.addText("Score!");

					Q.audio.play("explode.mp3");
				}
			});
		}
	});
};