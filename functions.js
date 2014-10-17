Quintus.GameFunctions = function(Q){
	
	Q.addBox = function (params) {
		var rand = Math.random();
		
		if (rand > 0 && rand < 0.2){
			params.contents = "health";
		}
		else if (rand > 0.2 && rand < 0.4){
			params.contents = "ammo";
		}
		else if (rand > 0.4 && rand < 1){
			params.contents = "nothing";
		}

		var box = new Q.Box(params);
		if (box.p.self_destruct){
			Q.selfDestruct(box);
		}
		Q.stage(0).insert(box);
	};

	Q.selfDestruct = function (what){
		setTimeout(function(){
			what.destroy();
		},
			5000
		);
	};

	Q.addText = function (label, timeout) {

		if (timeout === undefined){
			var timeout = 1000;
		}

		var text = new Q.UI.Text({
			label: label,
			x: Q.width / 2,
			y: (Q.height / 2) + 33
		});
		
		text.add("tween");

		
		setTimeout(function(){
			text.destroy();
		}, timeout);

		Q.stage(1).insert(text);

		text.animate({y:text.p.y-200});
	};
};