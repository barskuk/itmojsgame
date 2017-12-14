;(function(){
//управление героем
document.onkeydown = function(e) {
	if (e.keyCode === 37) {
		var tempX = (parseInt(hero.style.left)) - 10;
		if (tempX >=0) {
			hero.style.left = (parseInt(hero.style.left) - 10) + "px";
			hero.style.transform = "rotate(" + -25 + "deg)";
			//checkCross();
		}
	} else if (e.keyCode === 39) {
		var tempX = (parseInt(hero.style.left)) + 30 + parseInt(hero.style.width);
		var gamePlace_x2 = parseInt(gamePlace.style.width);
		if (tempX <= gamePlace_x2) {
			hero.style.left = (parseInt(hero.style.left) + 10) + "px";
			hero.style.transform = "rotate(" + 25 + "deg)";
			//checkCross();
		}
	}
}
document.onkeyup = function() {
	hero.style.transform = "rotate(" + 0 + "deg)";
}
//битисишки
function coin(n) {
	
	//случайно определим номинал нашей монетки
	var min = 0;
	var max = 1;
	var amount = Math.random() * (max - min) + min;
	//случайно зададим положение по оси X в пределах игрового поля
	var minX = 30;
	var maxX = parseInt(gamePlace.style.width) - 30;
	var posX = Math.floor(Math.random() * (maxX - minX + 1) + minX);
	//размер монет смаштабируем к номиналу
	var coinSize = 2 * (amount + 1);
	var coinItem = "<i id='coin" + n + "' class='fab fa-btc fa-spin' style='position:absolute; top:10px; left:" + posX + "px; font-size:" + coinSize + "em;' data-amount='" + amount + "'></i>";
	
	return coinItem;
}

function animate({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {
    // timeFraction goes from 0 to 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // calculate the current animation state
    let progress = timing(timeFraction);

    draw(progress); // draw it

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}
function makeEaseOut(timing) {
	return function(timeFraction) {
		return 1 - timing(1 - timeFraction);
	}
}
function bounce(timeFraction) {
	for (var a = 0, b = 1, result; 1; a += b, b /= 2) {
		if (timeFraction >= (7 - 4 * a) / 11) {
			return -Math.pow((11 - 6 * a - 11 * timeFraction) / 4, 2) + Math.pow(b, 2)
		}
	}
}

function falling(btcId) {
	var to = 500 - 30;//btcId.clientHeight;

	animate({
        duration: 2000,
        timing: makeEaseOut(bounce),
        draw: function(progress) {
        	console.log(progress);
          btcId.style.top = to * progress + 'px';
        }
      });
}

//управление игрой
window.gameCryptoRush = {
	newGame: function(complexity) {
		//определяем настройки игры по уровню сложности
		//колличество монет
		coinCount = 10 * complexity;
		//интервал между монетками 
		coinInterval = 5000/complexity;
		//скорость монеток
		//coinSpeed = 
		j = 0;
		
		function coinGenerator() {
			//создаем монетку
			var coinItemAdd = coin(j+1);
			btc.innerHTML += coinItemAdd;
			if ( j > coinCount) {
				clearInterval(timerId);
			}
			j++;

			var coinId = "coin" + j;
			falling(coinId);
		}
		var i = 0;
		var timer;
		var timerId = setInterval(function(){
			coinGenerator();
		},coinInterval);

		


	}
};

















}());