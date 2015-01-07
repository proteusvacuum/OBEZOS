OBEZOS.scenes.HUD = function(){
	
	this.setStage = function(stage) {
		var container = stage.insert(HUDContainer());
		insertScore(container);
		insertHealth(container);
		insertDelivered(container);
		insertAmmo(container);
	};

	var HUDContainer = function(){
		return new Q.UI.Container({
			x: 0,
			y: 20,
			fill: "rgba(0,0,0,0.5)"
		});
	},

	insertScore = function(container){
		Q.UI.Text.extend("Score", {
			init: function(p){
				this._super({
					label: "Score: 0",
					x: 100,
					y: 10,
					size: 20
				});
				Q.state.on("change.score",this,"score");
			},
			score: function(score) {
				this.p.label = "Score: " + score;
			}
		});
		container.insert(new Q.Score());
	},

	insertHealth = function(container){
		Q.UI.Text.extend("Health", {
			init: function(p){
				this._super({
					label: "Health: 100",
					x: 100,
					y: Q.height - 200,
					size: 20
				});
				Q.state.on("change.health",this,"health");
			},
			health: function(health) {
				this.p.label = "Health: " + health;
			}
		});
		container.insert(new Q.Health());
	},

	insertDelivered = function(container){
		Q.UI.Text.extend("Delivered", {
			init: function(p){
				this._super({
					label: "OBEZOS delivered: 0" ,
					x: Q.width - 200,
					y: 10,
					size: 20
				});
				Q.state.on("change.drone_delivered",this,"score");
			},
			score: function(score) {
				this.p.label = "OBEZOS DELIVERED: " + score;
			}
		});
		container.insert(new Q.Delivered());
	},

	insertAmmo = function(container){
		Q.UI.Text.extend("Ammo", {
			init: function(p){
				this._super({
					label: "Ammo: 31",
					x: Q.width - 100,
					y: Q.height-200,
					size: 20
				});
				OBEZOS.player.on("fire", this, "changeAmmo");
			},
			changeAmmo: function(ammo) {
				this.p.label = "Ammo: " + ammo;
			}
		});
		container.insert(new Q.Ammo());
	};
	
};

