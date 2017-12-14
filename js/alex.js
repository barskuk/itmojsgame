var pjs = new PointJS('2d', 400, 400);
		pjs.system.initFullPage();
	

		var log = pjs.system.log;
		var game = pjs.game;
		var point = pjs.vector.point;
		var camera = pjs.camera;
		var brush = pjs.brush;
		var OOP = pjs.OOP;
		var math = pjs.math;
		
		
		
		
		var width = game.getWH().w;
		var height = game.getWH().h;

		// var key = pjs.keyControl;
		// key.initKeyControl();

		var stars = [];
		var createStars = function(count) {
			OOP.forInt(count, function() {
		 		var w = math.random(1,3);
		 		var h = math.random(1,3);
		 		var x = math.random(0, width-w);
		 		var y = math.random(0, height-h);
		 		var dx = math.random(-2, 2)/100;
		 		var dy = math.random(-2, 2)/100;
		 		stars.push(game.newRectObject({
		 			x : x, y : y, 
		 			w : w, h : h, 
		 			fillColor : '#ffffff',
		 			userData : {
		 				dx : dx ,
		 				dy : dy
		 			}
			 	}));
			

		 	});
		};

		createStars(200);
		
		
		console.log(game);
		game.newLoop('game', function(){
			game.fill('#000000');
			//game.clear();
		
			OOP.forArr(stars, function(el){
				el.draw();
			 	el.move(point(el.dx, el.dy));
			 	if (el.y > height ) el.y = 0;
			 	if (el.y < 0 ) el.y = height;
			 	if (el.x > width ) el.x = 0;
			 	if (el.x < 0 ) el.x = width;
				//console.log(el);
			});
		});
		
		//game.startLoop('game');