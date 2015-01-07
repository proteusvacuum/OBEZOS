OBEZOS.scenes.start = function(){
	
	this.setStage = function(stage){
		setTimeout( this.playLaugh, 1000 );
		stage.insert( bezos_head() );
		stage.insert( instruction_label_1() );
		stage.insert( instruction_label_2() );
		stage.insert( play_button() );
	};

	var playLaugh = function(){
		Q.audio.play("laugh.mp3");
	},
	
	bezos_head = function(){
		return new Q.OBEZOS( bezos_position() );
	},
	
	bezos_position = function(){
		return { x: Q.width / 2, y: (Q.height / 2) - 200 };
	},

	instruction_label_1 = function(){
		return new Q.UI.Text({
			label: "When the OBEZOS drones deliver 10 packages, you'll be out of work!",
			x: Q.width / 2,
			y: (Q.height / 2)
		}); },

	instruction_label_2 = function(){
		return new Q.UI.Text({
			label: "Delivered packages catch on fire! Packages you shoot down contain goodies!",
			x: Q.width / 2,
			y: (Q.height / 2) + 33
		});},

	play_button = function(){
		return new Q.UI.Button({
			label: 'Play!',
			x: Q.width / 2,
			y: (Q.height / 2) + 80
		}, startGame);
	},

	startGame = function(){
		this.destroy();
		Q.state.reset({ drone_delivered: 0, health: 100, score: 0});

		Q.stageScene('level1');
	};
	
};