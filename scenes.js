Quintus.GameScenes = function(Q){
	
	Q.scene("start", function(stage){
		setTimeout(function(){Q.audio.play("laugh.mp3")}, 1000);
		stage.insert(new Q.OBEZOS({
			x: Q.width / 2,
			y: (Q.height / 2) - 200
		}));

		stage.insert(new Q.UI.Text({
			label: "When the OBEZOS drones deliver 10 packages, you'll be out of work!",
			x: Q.width / 2,
			y: (Q.height / 2)
		}));
		
		stage.insert(new Q.UI.Text({
			label: "Delivered packages catch on fire! Packages you shoot down contain goodies!",
			x: Q.width / 2,
			y: (Q.height / 2) + 33
		}));
		
		stage.insert(new Q.UI.Button({
			label: 'Play!',
			x: Q.width / 2,
			y: (Q.height / 2) + 80
		}, function() {
			this.destroy();
			Q.state.reset({ drone_delivered: 0, health: 100, score: 0});
			
			Q.stageScene('level1');


		}));
	});

	// ## Level1 scene
	// Create a new scene called level 1
	Q.scene("level1",function(stage) {
		
		Q.audio.play('music.mp3',{ loop: true });
		
		// Add in a repeater for a little parallax action
		// stage.insert(new Q.Repeater({ asset: "background-wall.png", speedX: 0.5, speedY: 0.5 }));

		// Add in a tile layer, and make it the collision layer
		stage.collisionLayer(new Q.TileLayer({
			dataAsset: 'level.json',
			sheet: 'tiles' }));

		player = stage.insert(new Q.Player());

		stage.insert(new Q.OBEZOS());
		
		Q.stageScene("HUD",1);
		
		Q.state.on("change.health", this, function(){
			if (Q.state.get("health") <= 0){
				Q.stageScene("endGame", {label: "You died!"});
			}
		});

		Q.state.on("change.drone_delivered", this, function(){
			if ( Q.state.get("drone_delivered") >= 10 ){
				Q.stageScene("endGame", {label: "Bend at the knee to the OBEZOS."});
			}
		});
	});


	Q.UI.Text.extend("Ammo", {
		init: function(p){
			this._super({
				label: "Ammo: 31",
				x: Q.width - 100,
				y: Q.height-200,
				size: 20
			});
			player.on("fire", this, "changeAmmo");
		},
		changeAmmo: function(ammo) {
			this.p.label = "Ammo: " + ammo;
		}
	});
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

	Q.scene("HUD", function(stage){
		var container = stage.insert(new Q.UI.Container({
			x: 0,
			y: 20,
			fill: "rgba(0,0,0,0.5)"
		}));
		container.insert(new Q.Delivered());
		container.insert(new Q.Ammo());
		container.insert(new Q.Health());
		container.insert(new Q.Score());
		// container.fit(20);
	});


	// To display a game over / game won popup box, 
	// create a endGame scene that takes in a `label` option
	// to control the displayed message.
	Q.scene('endGame',function(stage) {
		
		Q.audio.stop();
		
		Q.audio.play("laugh.mp3");
		
		var container = stage.insert(new Q.UI.Container({
			x: Q.width/2, y: Q.height/2, fill: "rgba(0,0,0,0.5)"
		}));

		var button = container.insert(new Q.UI.Button({ x: 0, y: 0, fill: "#CCCCCC",
			label: "Play Again" }));
		var label = container.insert(new Q.UI.Text({x:10, y: -10 - button.p.h,
			label: stage.options.label }));
		// When the button is clicked, clear all the stages
		// and restart the game.
		button.on("click",function() {
			Q.clearStages();
			Q.state.reset({ drone_delivered: 0, health: 100, score: 0});
			Q.stageScene('level1');
		});

		// Expand the container to visibily fit it's contents
		// (with a padding of 20 pixels)
		container.fit(20);
	});
};