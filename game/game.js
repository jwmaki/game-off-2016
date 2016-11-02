var g = Crafty.init(1500,750, document.getElementById('game'));
var frame = 0;


var update_frame = function(){
	if(frame == 24)
		frame = 0;
	else
		frame++
}

var start = new Date().getTime()
var randomNumber = function(multiplier) { return Math.random()*multiplier}

// var square = Crafty.e('2D, DOM, Color').attr({x: 500, y: 500, w: 100, h: 100}).color('#F00');

// square.bind('EnterFrame', function() {
// 	this.rotation = this.rotation + 1
// })

var spawn_player = function() {
	console.log(Crafty.viewport._height)
	console.log(g.h)
	var direction = 1
	var acceleration = 5
	var player = Crafty.e('2D, DOM, Player, Collision, Motion, Color, Twoway, Tween')
		player.attr({x: Crafty.viewport._width / 2, y: Crafty.viewport._height * .8, w: 50, h: 50})
			.color('red') 
			.twoway(200)
			.checkHits('Solid') // check for collisions with entities that have the Solid component in each frame
		    .bind("HitOn", function(hitData) {
		        Crafty.log("Collision with Solid entity occurred for the first time.");
		        this.attr({rotation:0})
   				this.tween({rotation:720}, 2000, "smootherStep")
		    })
		    // .bind("HitOff", function(comp) {
		    //     Crafty.log("Collision with Solid entity ended.");
		    // });
		  // .bind('EnterFrame', function() {
		  // 	this.x = this.x + acceleration*direction
		  // 	if(this.x > 1000 || this.x < 300)
		  // 		direction = -direction
		  // })
		  // .bind('KeyDown', function(e) {
		  // 	var a
		  // 	if(e.key === Crafty.keys.RIGHT_ARROW) {
		  // 		acceleration = 2.5
		  // 	}else if(e.key === Crafty.keys.LEFT_ARROW){
		  // 		acceleration = 7.5
		  // 	} else if(e.key === Crafty.keys.DOWN_ARROW){
		  // 		acceleration = 5
		  // 	}
		  // });
		  return player;
}

var spawn_block = function(x){
	if(frame == 0 || frame == 12 ){
		return Crafty.e('2D, Canvas, Collision, Color, Twoway, Gravity, Solid')
		  .attr({x: x, y: 0, w: 50, h: 50})
		  .color('#F00')
		  .twoway(200)
		  .gravity('Floor')
		  
	}
}

var move_player = function(player){
	vel = player.velocity()
	var velocity = 250;
	vel.x = velocity 

	player.bind('EnterFrame', function(){
		if(player._x > Crafty.viewport.width - 200)
			vel.x = -velocity
		if(player._x < 100)
			vel.x = velocity
	})
	
}
move_player(spawn_player())

g.bind('EnterFrame', function(){
	update_frame()
	spawn_block(randomNumber(1450))
})

  // Crafty.e("2D, Canvas, Color, Keyboard")
  // .attr({x: 10, y: 10, w: 30, h: 30})
  // .color("red")
  // .bind('KeyDown', function(e) {
  // 	console.log('Key', e.key)
  //   if(e.key == Crafty.keys.LEFT_ARROW) {
  //     this.x = this.x - 10;
  //   } else if (e.key == Crafty.keys.RIGHT_ARROW) {
  //     this.x = this.x + 10;
  //   } else if (e.key == Crafty.keys.UP_ARROW) {
  //     this.y = this.y - 10;
  //   } else if (e.key == Crafty.keys.DOWN_ARROW) {
  //     this.y = this.y + 10;
  //   }
  // });