/*
	Circle Piece
*/
function CirclePiece(opts){
	Piece.call(this, opts);

	var defaults = {
		x : 0,
		y : 0,
		radius : 5,
		fillStyle : 'rgba(0,0,0,1)',
        jitter_factor : 1,
		jitter_radius : 10,
		jitter_speed : 1000
	};

	var _opts = $.extend({}, defaults, opts);
	this.point = new Point(_opts.x, _opts.y);
	this.presentationPoint = new Point(_opts.x, _opts.y);
	this.radius = _opts.radius;
	this.fillStyle = _opts.fillStyle;

	//Jitter
	this.jitter_factor = _opts.jitter_factor;
	this.jitter_radius = _opts.jitter_radius;
	this.jitter_speed = _opts.jitter_speed;
}

CirclePiece.prototype = new Piece();
CirclePiece.prototype.constructor = CirclePiece;

CirclePiece.prototype.draw = function(canvas){

	var self = this;

	//Update
	self.update();

	//Draw
	var point = self.jitter(self.presentationPoint);

	var ctx = canvas.getContext('2d');
	ctx.beginPath();
	ctx.arc(point.x, point.y, self.radius, 0, 2 * Math.PI, false );
	ctx.fillStyle = self.fillStyle;
	ctx.fill();

};

CirclePiece.prototype.jitter = function(source){

	var self = this;

	var point = new Point(source.x, source.y);

	/**
	 * 	Circular orbit
	 * 	- x = cx + r * cos(a)
	 * 	- y = cy + r * sin(a)
	 * 	note A is in radians
	 */
	 
	//How fast for a full rotation 360deg or 2PI
	var speed = self.jitter_speed;
	
	//Calculate phase
	var now = new Date().getTime();
	var rem = now % speed;
	var phase = rem/speed;
	var angle = phase * (2 * Math.PI);
	var radius = self.jitter_radius * self.jitter_factor;

	point.x = point.x + radius * Math.cos(angle);
	point.y = point.y + radius * Math.sin(angle);
	

	return point;
};
