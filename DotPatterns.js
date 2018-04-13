$(document).ready(function() {
    var d_canvas = document.getElementById('canvas');
    var context = d_canvas.getContext('2d');
  
    //var ballon = document.getElementById('ballon')
  	//context.drawImage(background, 0, 0);
  	  // context.fillStyle = 'rgb(' + dotToDraw.r + ',' + dotToDraw.g + ',' + dotToDraw.b + ')';
          // context.fillRect(dotToDraw.x, dotToDraw.y, dotSize, dotSize);
    
    var count = 0;
    
    var maxSpeed = 4;
    var directionSwitchChance = 0.02;
    var dotSize = 1;
		var numDots = 10;
    var theDots = [];
    
    for (var i = 0; i < numDots; i++) {
      var x = Math.floor(Math.random() * canvas.width);
      var y = Math.floor(Math.random() * canvas.height);
      var hue = Math.floor(Math.random() * 360);
      
      var newDot = new MovingDot(x,y,0,0,hue);
      
      newDirectionAndSpeed(newDot);     
      theDots.push(newDot);
    }

		context.fillStyle = 'black';
		context.fillRect(0, 0, canvas.width, canvas.height);
    
    var myInterval = setInterval(redraw, 33);
    
    function redraw() {
        
        for (var i = 0; i < numDots; i++) {
        	var dotToDraw = theDots[i];
          
          dotToDraw.update();
          
          dotToDraw.draw(context);


        }
        
        
        count = count + 1;
        if (count > 30000) {
            clearInterval(myInterval);
        }
    }
    
    
    function MovingDot(xp, yp, xv, yv, hue) {
    			this.x = xp;
    			this.y = yp;
    	  this.xVelocity = xv;
    	  this.yVelocity = yv;
    	  var rgb = hsvToRgb(hue, 255, 255);
       this.r = rgb.r;  this.g = rgb.g;  this.b = rgb.b;
    	  
    	  this.update = function() {
    	  	this.prevX = this.x;
          this.prevY = this.y;
					checkInBounds(this);
					if (Math.random() <= directionSwitchChance) {
          	newDirectionAndSpeed(this);
          }
          this.x = this.x + this.xVelocity;
          this.y = this.y + this.yVelocity;
    	  }
          
       this.draw = function(context) {
       		context.beginPath();
          context.strokeStyle = 'rgb(' + this.r + ',' + this.g + ',' + this.b + ')';
          
          context.moveTo(this.prevX, this.prevY);
          context.lineTo(this.x, this.y);
          
          context.stroke();
       }
          
    }
    
    
    function newDirectionAndSpeed(dot) {
    	dot.speed = Math.max(1, Math.random() * maxSpeed);
      var direction = Math.floor(Math.random() * 360);
      dot.xVelocity = Math.cos(direction) * dot.speed;
      dot.yVelocity = Math.sin(direction) * dot.speed;
    }
    
    
    function checkInBounds(dot) {
    	if (dot.x < 0) {
      	dot.x = dot.x + maxSpeed;
       	dot.xVelocity = -dot.xVelocity;
      }
      if (dot.y < 0) {
      	dot.y = dot.y + maxSpeed;
       	dot.yVelocity = -dot.yVelocity;
      }
      if (dot.x > canvas.width) {
      	dot.x = dot.x - maxSpeed;
        dot.xVelocity = -dot.xVelocity;
      }
      if (dot.y > canvas.height) {
      	dot.y = dot.y - maxSpeed;
        dot.yVelocity = -dot.yVelocity;
      }
    }
    
    
    
    function hsvToRgb(h, s, v) {
        var rgb = {};
        if (s === 0) {
            rgb.r = rgb.g = rgb.b = v;
        } else {
            if (h < 0) { h = h + 360; }
            h = Math.abs(h % 360);
            var t1 = v;
            var t2 = (255 - s) * v / 255;
            var t3 = (t1 - t2) * (h % 60) / 60;
            if (h < 60) { rgb.r = t1; rgb.b = t2; rgb.g = t2 + t3; }
            else if (h < 120) { rgb.g = t1; rgb.b = t2; rgb.r = t1 - t3; }
            else if (h < 180) { rgb.g = t1; rgb.r = t2; rgb.b = t2 + t3; }
            else if (h < 240) { rgb.b = t1; rgb.r = t2; rgb.g = t1 - t3; }
            else if (h < 300) { rgb.b = t1; rgb.g = t2; rgb.r = t2 + t3; }
            else if (h < 360) { rgb.r = t1; rgb.g = t2; rgb.b = t1 - t3; }
            else { rgb.r = 0; rgb.g = 0; rgb.b = 0; }
        }
        return { r: Math.round(rgb.r), g: Math.round(rgb.g), b: Math.round(rgb.b) };
    }
    
});


    