var canvas = document.getElementById('canvas');
var c = canvas.getContext('2d');
var W = canvas.width;
var H = canvas.height;
function kare(){
	this.x = 0;
	this.y = 0;
	this.w = 0;
	this.h = 0;
	this.draw = function(){
		c.fillRect(this.x,this.y,this.w,this.h);
	}
}

var ball = {
	x : W / 2,
	y : H / 2,
	r : 6,
	vx : 2,
	vy : 2,
	draw : function(){
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,Math.PI*2,true);
		c.fill();
	}
	
	
}

var score = 0;

var gamer1 = new kare();
gamer1.x = 0;
gamer1.y = H / 2 - 50;
gamer1.w = 5;
gamer1.h = 70;

var gamer2 = new kare();
gamer2.x = W - 5;
gamer2.y = H / 2 - 50;
gamer2.w = 5;
gamer2.h = 70;

var mousemove = function(e){
	gamer1.y = e.clientY - 60;
	gamer2.y = e.clientY - 60;
}

function Down(){
	gamer1.y += 15;
	gamer2.y += 15;
}
function Up(){
	gamer1.y -= 15;
	gamer2.y -= 15;
}


function draw(){
	c.clearRect(0,0,W,H);
	c.font = "20px Candara";
	c.fillText("Score: "+score,W/2-40,50)
	gamer1.draw(); 
	gamer2.draw();
	ball.draw();
	
	if(ball.y + ball.r > H || ball.y < 0){
		ball.vy *= -1;
	}
	
	if(ball.x - ball.r < gamer1.x + gamer1.w || ball.x + ball.r > gamer2.x){
		if(ball.x - ball.r < gamer1.x + gamer1.w){
			if(ball.y + ball.r > gamer1.y && ball.y < gamer1.y + gamer1.h){	
				score++;
			}
			else{
				window.alert("Your Score : "+ score);
				score = 0;
				window.location.reload();
				clearInterval(init);
			}
		}
		else if(ball.x + ball.r > gamer2.x){
			if(ball.y + ball.r > gamer2.y && ball.y < gamer2.y + gamer2.h){
				score++;
			}
			else{
				window.alert("Your Score : "+ score);
				score = 0;
				window.location.reload();
				clearInterval(init);
			}
		}
		ball.vx *= -1;
	}
	ball.x += ball.vx;
	ball.y += ball.vy;
	canvas.onmousemove = mousemove;
}

var init = setInterval(draw,20);
