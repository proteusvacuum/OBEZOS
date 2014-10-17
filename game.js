window.addEventListener("load",function() {
loadGame();

function loadGame() {

	var Q = window.Q = Quintus({ development: true })
		.include("Sprites, Scenes, Input, 2D, Anim, Touch, UI, Audio")
		.include("GameComponents, GameSprites, GameScenes, GameFunctions")
		.setup({
			width: 1024,
			height: 700
		})
		.controls()
		.touch()
		.enableSound();
	
	Q.SPRITE_DUDE = 2;
	Q.SPRITE_BULLET = 3;
	Q.SPRITE_DRONE = 4;
	Q.SPRITE_OBEZOS = 5;
	Q.SPRITE_BOX = 6;

	Q.input.keyboardControls({
		UP: "goUp"
	});
	
	Q.load("drone.png, bullet.png, box.png, box.json, postman_sprite.png, OBEZOS.png, sprites.json, level.json, level2.json, tiles.png, background-wall.png", function() {
		// Sprites sheets can be created manually
		Q.sheet("drone", "drone.png", { tilew: 74, tileh: 30, cols: 2 });
		Q.sheet("obezos", "OBEZOS.png", { tilew: 164, tileh: 224 });
		Q.sheet("bullet","bullet.png", { tilew: 8, tileh: 4 });
		Q.sheet("tiles","tiles.png", { tilew: 32, tileh: 32 });
		// Q.sheet("box","box.png", { tilew: 21, tileh: 11 });
		Q.compileSheets("box.png", "box.json");
		// Or from a .json asset that defines sprite locations
		Q.compileSheets("postman_sprite.png","sprites.json");
		Q.state.reset({ drone_delivered: 0, health: 100, score: 0});
		// Finally, call stageScene to run the game
		Q.stageScene("start");
	});
	Q.load("music.mp3, fire.mp3, laugh.mp3, explode.mp3, coin.mp3, ouch.mp3");
}

});
