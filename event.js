
var mainCanvas = document.getElementById("mainCanvas");
var mainContext = mainCanvas.getContext("2d");

mainContext.font = '20px 굴림';

var v = {

	init : function() {

		var m1 = new men(101, 101, 20, 20, 20, 20,
		 {
			hair1 : getRandomColor()
			, hair2 : getRandomColor()
			, eye : getRandomColor()
			, bodyTop : getRandomColor()
			, bodyBottom : getRandomColor()
			, hand : getRandomColor()
			, foot : getRandomColor()
			, colorLeg1 : getRandomColor()
			, colorLeg2 : getRandomColor()
		 }
		);
		m1.drawHead();
		m1.drawBody();
		
		var m2 = new men(150, 100, 20, 20, 20, 20, 
		// {
			// hair1 : getRandomColor()
			// , hair2 : getRandomColor()
			// , eye : getRandomColor()
			// , bodyTop : getRandomColor()
			// , bodyBottom : getRandomColor()
			// , hand : getRandomColor()
			// , foot : getRandomColor()
		// }
		);
		m2.drawSideHead("l");
		m2.drawSideBody("l");
		
		var m3 = new men(200, 100, 20, 20, 20, 20, {
			hair1 : getRandomColor()
			, hair2 : getRandomColor()
			, eye : getRandomColor()
			, bodyTop : getRandomColor()
			, bodyBottom : getRandomColor()
			, hand : getRandomColor()
			, foot : getRandomColor()
		});
		m3.drawSideHead("r");
		m3.drawSideBody("r");
		
		var m4 = new men(250, 100, 20, 20, 20, 20, {
			hair1 : getRandomColor()
			, hair2 : getRandomColor()
			, eye : getRandomColor()
			, bodyTop : getRandomColor()
			, bodyBottom : getRandomColor()
			, hand : getRandomColor()
			, foot : getRandomColor()
		});
		
		m4.drawBackHead();
		m4.drawBody();
		/*
		var idx = 0;
		setInterval(function() {
			switch (idx % 4) {
				case 0:
					m1.drawHead();
					m1.drawBody();
					// m2.drawSideHead("l");
					// m2.drawSideBody("l");
					// m3.drawSideHead("r");
					// m3.drawSideBody("r");
					m4.drawBackHead();
					m4.drawBody();
					break;
				case 1:
					m1.drawSideHead("l");
					m1.drawSideBody("l");
					// m2.drawBackHead();
					// m2.drawBody();
					// m3.drawHead();
					// m3.drawBody();
					m4.drawSideHead("r");
					m4.drawSideBody("r");
					break;
				case 2:
					m1.drawBackHead();
					m1.drawBody();
					// m2.drawSideHead("r");
					// m2.drawSideBody("r");
					// m3.drawSideHead("l");
					// m3.drawSideBody("l");
					m4.drawHead();
					m4.drawBody();
					break;
				case 3:
					m1.drawSideHead("r");
					m1.drawSideBody("r");
					// m2.drawHead();
					// m2.drawBody();
					// m3.drawBackHead();
					// m3.drawBody();
					m4.drawSideHead("l");
					m4.drawSideBody("l");
					break;
			}
			idx++;
		}, 1000);
		
		setInterval(function() {
			switch (idx % 4) {
				case 0:
					// m1.drawHead();
					// m1.drawBody();
					m2.drawSideHead("l");
					m2.drawSideBody("l");
					m3.drawSideHead("r");
					m3.drawSideBody("r");
					// m4.drawBackHead();
					// m4.drawBody();
					break;
				case 1:
					// m1.drawSideHead("l");
					// m1.drawSideBody("l");
					m2.drawBackHead();
					m2.drawBody();
					m3.drawHead();
					m3.drawBody();
					// m4.drawSideHead("r");
					// m4.drawSideBody("r");
					break;
				case 2:
					// m1.drawBackHead();
					// m1.drawBody();
					m2.drawSideHead("r");
					m2.drawSideBody("r");
					m3.drawSideHead("l");
					m3.drawSideBody("l");
					// m4.drawHead();
					// m4.drawBody();
					break;
				case 3:
					// m1.drawSideHead("r");
					// m1.drawSideBody("r");
					m2.drawHead();
					m2.drawBody();
					m3.drawBackHead();
					m3.drawBody();
					// m4.drawSideHead("l");
					// m4.drawSideBody("l");
					break;
			}
			idx++;
		}, 500);
	*/
	},
	
	init : function() {

		var m2 = new men(150, 100, 24, 24, 24, 24, 
		 // {
			// hair1 : getRandomColor()
			// , hair2 : getRandomColor()
			// , eye : getRandomColor()
			// , bodyTop : getRandomColor()
			// , bodyBottom : getRandomColor()
			// , hand : getRandomColor()
			// , foot : getRandomColor()
			// , leg1 : getRandomColor()
			// , leg2 : getRandomColor()
		 // }
		);
		m2.drawSideHead("l");
		m2.drawSideBody("l");
		//m2.doAction("fire");
		
		var m3 = new men(200, 100, 24, 24, 24, 24, 
		 {
			hair1 : getRandomColor()
			, hair2 : getRandomColor()
			, eye : getRandomColor()
			, bodyTop : getRandomColor()
			, bodyBottom : getRandomColor()
			, hand : getRandomColor()
			, foot : getRandomColor()
			, leg1 : getRandomColor()
			, leg2 : getRandomColor()
		 }
		);
		m3.drawSideHead("l");
		m3.drawSideBody("l");
		m3.doAction("move");
		
		var m4 = new men(250, 100, 24, 24, 24, 24, 
		 {
			hair1 : getRandomColor()
			, hair2 : getRandomColor()
			, eye : getRandomColor()
			, bodyTop : getRandomColor()
			, bodyBottom : getRandomColor()
			, hand : getRandomColor()
			, foot : getRandomColor()
			, leg1 : getRandomColor()
			, leg2 : getRandomColor()
		 }
		);
		m4.drawSideHead("l");
		m4.drawSideBody("l");
		m4.doAction("move");
		
		var m5 = new men(300, 100, 24, 24, 24, 24, 
		 {
			hair1 : getRandomColor()
			, hair2 : getRandomColor()
			, eye : getRandomColor()
			, bodyTop : getRandomColor()
			, bodyBottom : getRandomColor()
			, hand : getRandomColor()
			, foot : getRandomColor()
			, leg1 : getRandomColor()
			, leg2 : getRandomColor()
		 }
		);
		m5.drawSideHead("l");
		m5.drawSideBody("l");
		m5.doAction("fire", -1);
		return m2;
	}
	
};

//var cm = v.init();

function getRandomColor() {
	var r = _getRandomColor() + _getRandomColor();
	var g = _getRandomColor() + _getRandomColor();
	var b = _getRandomColor() + _getRandomColor();
	return "#" + r + g + b;
};

function rgbDecimalToHex(r, g, b) {
	return r.toString(16) + g.toString(16) + b.toString(16);
};

function rgbGetNearColor(r, g, b, range) {
	range = range * (Math.random() * 10 > 5.1 ? -1 : 1);
	r = parseInt(r + Math.random() * range) % 255
	range = range * (Math.random() * 10 > 5.1 ? -1 : 1);
	g = parseInt(g + Math.random() * range) % 255
	range = range * (Math.random() * 10 > 5.1 ? -1 : 1);
	b = parseInt(b + Math.random() * range) % 255
	return getRandomColor(r, g, b);
};

function getTransparentColor(r, g, b, a) {
	return "rgba(" + r + "," + g + "," + b + "," + a + ")";
};


function _getRandomColor() {
	var n = (Math.random() * 16).toFixed(0);
	var nh = "";
	switch (n) {
		case "10": nh = "A"; break;
		case "11": nh = "B"; break;
		case "12": nh = "C"; break;
		case "13": nh = "D"; break;
		case "14": nh = "E"; break;
		case "15": nh = "F"; break;
		default: nh = n;
	}
	return nh;
}

function men(cx, cy, w, h, hw, hh, color) {
	
	var colorEye,colorHair1, colorHair2, colorSkin1, colorSkin2, colorBodyTop, colorBodyBottom, colorFoot, colorHand
	var colorLeg1, colorLeg2;
	
	if (color != undefined) {
		colorEye = color.eye;
		colorHair1 = color.hair1;
		colorHair2 = color.hair2;
		colorSkin1 = color.skin1;
		colorSkin2 = color.skin2;
		colorBodyTop = color.bodyTop;
		colorBodyBottom = color.bodyBottom;
		colorLeg1 = color.leg1;
		colorLeg2 = color.leg2;
		colorFoot = color.foot;
		colorHand = color.hand;
	}
	
	colorEye = colorEye == undefined ? "black" : colorEye;
	colorHair1 = colorHair1 == undefined ? "brown" : colorHair1;
	colorHair2 = colorHair2 == undefined ? "gray" : colorHair2;
	colorSkin1 = colorSkin1 == undefined ? "#fbceb1" : colorSkin1;
	colorSkin2 = colorSkin2 == undefined ? "#bd9778" : colorSkin2;
	colorBodyTop = colorBodyTop == undefined ? "green" : colorBodyTop;
	colorBodyBottom = colorBodyBottom == undefined ? "blue" : colorBodyBottom;
	colorLeg1 = colorLeg1 == undefined ? "#00a8ff" : colorLeg1;
	colorLeg2 = colorLeg2 == undefined ? "#00a8ff" : colorLeg2;
	colorFoot = colorFoot == undefined ? "lightgray" : colorFoot;
	colorHand = colorHand == undefined ? "red" : colorHand;
	
	var cx = cx;
	var cy = cy;
	var w = w;
	var h = h;
	
	var hw = hw;
	var hh = hh;
	//머리 
	var hws = hw / 6;
	var hhs = hh / 6;
	//몸 발 다리
	var ws = w / 6;
	var hs = h / 6;
	
	this.clearHead = function(sx, sy) {
		mainContext.clearRect(sx, sy, hw, hh);
	};
	
	this.clearBody = function(sx, sy) {
		mainContext.clearRect(sx + ws * -3.0, sy, w + ws * 3.5, hs * 9);
	};
	
	this.drawHead = function() {
		var sx = cx;
		var sy = cy;
		this.clearHead(sx, sy);
		//hr
		mainContext.beginPath();
		mainContext.fillStyle = colorHair1;
		mainContext.rect(sx + hws, sy, hw - hws * 2, hhs);
		mainContext.rect(sx, sy + hhs, hw, hhs);
		mainContext.rect(sx, sy + hhs * 2, hw, hhs);
		mainContext.rect(sx, sy + hhs * 3, hws, hhs);
		mainContext.rect(sx + hw - hws, sy + hhs * 3, hws, hhs);
		mainContext.fill();
		
		//hd
		mainContext.beginPath();
		mainContext.fillStyle = colorSkin1;
		mainContext.rect(sx + hws, sy + hhs * 3, hws * 4, hhs);
		mainContext.rect(sx + hws, sy + hhs * 4, hws * 4, hhs);
		mainContext.rect(sx + hws, sy + hhs * 5, hws * 4, hhs);
		mainContext.fill();
		
		//e2
		mainContext.beginPath();
		mainContext.fillStyle = colorEye;
		mainContext.rect(sx + hws + hws / 2, sy + hhs * 4, hws, hhs / 2);
		mainContext.rect(sx + hws + hws / 2 * 5, sy + hhs * 4, hws, hhs / 2);
		mainContext.fill();
	};
	
	this.drawBody = function() {
		var sx = cx - (w - hw) / 2;
		var sy = cy + (hh);
		this.clearBody(sx, sy);
		
		mainContext.beginPath();
		mainContext.fillStyle = colorSkin2;
		mainContext.rect(sx + ws * 2, sy, w - ws * 4, hs / 2);
		mainContext.fill();
		
		//body top
		mainContext.beginPath();
		mainContext.fillStyle = colorBodyTop;
		mainContext.rect(sx + ws * 2, sy + hs / 2, w - ws * 4, hs / 2);
		mainContext.rect(sx + ws, sy + hs, w - ws * 2, hs);
		mainContext.rect(sx + ws * 2, sy + hs * 2, w - ws * 4, hs);
		mainContext.rect(sx + ws * 2, sy + hs * 3, w - ws * 4, hs);
		mainContext.fill();
		
		//body bottom
		mainContext.beginPath();
		mainContext.fillStyle = colorBodyBottom;
		mainContext.rect(sx + ws * 2, sy + hs * 4, w - ws * 4, hs);
		mainContext.rect(sx + ws * 2, sy + hs * 5, ws/2, hs);
		mainContext.rect(sx + ws * 3.5, sy + hs * 5, ws/2, hs);
		mainContext.rect(sx + ws * 1.5, sy + hs * 6, ws/2, hs);
		mainContext.rect(sx + ws * 4, sy + hs * 6, ws/2, hs);
		mainContext.rect(sx + ws * 1.5, sy + hs * 7, ws/2, hs);
		mainContext.rect(sx + ws * 4, sy + hs * 7, ws/2, hs);
		mainContext.fill();
		
		mainContext.beginPath();
		mainContext.fillStyle = colorFoot;
		mainContext.rect(sx + ws * 1, sy + hs * 8, ws, hs);
		mainContext.rect(sx + ws * 4, sy + hs * 8, ws, hs);
		mainContext.fill();
		
		//arm
		mainContext.beginPath();
		mainContext.fillStyle = colorSkin1;
		mainContext.rect(sx + ws, sy + hs * 2, ws / 2, hs);
		mainContext.rect(sx + ws / 2, sy + hs * 3, ws / 2, hs);
		mainContext.fill();
		mainContext.beginPath();
		mainContext.fillStyle = colorHand;
		mainContext.rect(sx, sy + hs * 4, ws / 2, hs);
		mainContext.fill();
			
		//hand
		mainContext.beginPath();
		mainContext.fillStyle = colorSkin1;
		mainContext.rect(sx + w - ws, sy + hs * 2, ws / 2, hs);
		mainContext.rect(sx + w - ws / 2, sy + hs * 3, ws / 2, hs);
		mainContext.fill();
		mainContext.beginPath();
		mainContext.fillStyle = colorHand;
		mainContext.rect(sx + w, sy + hs * 4, ws / 2, hs);
		mainContext.fill();
	};
	
	this.drawSideBody = function(direction) {
		var sx = cx - (w - hw) / 2;
		var sy = cy + (hh);
		this.clearBody(sx, sy);
		
		switch (direction) {
			case "l":
				this.drawSideBody_rightSide_armLeft(sx, sy);
				break;
			case "r":
				this.drawSideBody_leftSide_armRight(sx, sy);
				break;
		}

		this.drawSideBody_body(sx, sy);
		
		switch (direction) {
			case "l":
				this.drawSideBody_leftSide_leg1(sx, sy);
				this.drawSideBody_leftSide_armLeft(sx, sy);
				break;
			case "r":
				this.drawSideBody_rightSide_leg(sx, sy);
				this.drawSideBody_rightSide_armRight(sx, sy);
				break
		}
	};
	
	this.doAction = function(action, cnt) {
		var sx = cx - (w - hw) / 2;
		var sy = cy + (hh);
		switch (action) {
			case "move" :
				this.moveLeftSide_leg(sx, sy);
				break;
			case "stop" :
				this.stopLeftSide_leg(sx, sy);
				break;
			case "fire":
				this.fireLeftSide(sx, sy, cnt);
				break;
		}
	};
	
	this.moveIdx = -1;
	this.fireIdx = -1;
	
	this.stopLeftSide_leg = function(sx, sy) {
		clearInterval(this.moveIdx);
		this.moveIdx = -1;
		this.clearLeg(sx, sy);
		this.drawSideBody_leftSide_leg1(sx, sy);
	};
	
	this.moveLeftSide_leg = function(sx, sy) {
		var idx = 0;
		var host = this;
		this.moveIdx = setInterval(function() {
			host.clearLeg(sx, sy);
			switch (idx % 8){
				case 0:
					host.drawSideBody_leftSide_leg0(sx, sy);
					break;
				case 1:
					host.drawSideBody_leftSide_leg1(sx, sy);
					break;
				case 2:
					host.drawSideBody_leftSide_leg2(sx, sy);
					break;
				case 3:
					host.drawSideBody_leftSide_leg3(sx, sy);
					break;
				case 4:
					host.drawSideBody_leftSide_leg4(sx, sy);
					break;
				case 5:
					host.drawSideBody_leftSide_leg3(sx, sy);
					break;
				case 6:
					host.drawSideBody_leftSide_leg2(sx, sy);
					break;
				case 7:
					host.drawSideBody_leftSide_leg1(sx, sy);
					break;
			}
			idx++;
		}, 150);
	};
	
	this.fireLeftSide = function(sx, sy, cnt) {
		var sx = cx - (w - hw) / 2;
		var sy = cy + (hh);
		this.clearBody(sx, sy);
		this.drawSideBody_leftSide_armRight_fire(sx, sy);
		this.drawSideBody_body(sx, sy);
		this.drawSideBody_leftSide_leg1(sx, sy);
		this.drawSideBody_leftSide_armLeft_fire(sx, sy);
		
		//this.fireIdx = -1;
		var idx = 0;
		var fireCnt = 0;
		var host = this;
		
		if (this.fireIdx != -1) {
			clearInterval(this.fireIdx);
			this.fireIdx = -1;
		}
			
		
		this.fireIdx = setInterval(function() {
			host.clearFire(sx, sy);
			switch (idx % 7) {
				case 0:
					break;
				case 1:
					host.drawSideBody_leftFire1(sx, sy);
					break;
				case 2:
					host.drawSideBody_leftFire2(sx, sy);
					break;
				case 3:
					host.drawSideBody_leftFire3(sx, sy);
					break;
				case 4:
					host.drawSideBody_leftFire4(sx, sy);
					break;
				case 5:
					host.drawSideBody_leftFire3(sx, sy);
					break;
				case 6:
					host.drawSideBody_leftFire2(sx, sy);
					fireCnt++;
					break;
			}
			idx++;
			if (cnt != -1 && fireCnt >= cnt) {
				clearInterval(host.fireIdx);
				//host.fireIdx = -1;
				host.clearFire(sx, sy);
				host.clearBody(sx, sy);
				host.drawSideBody_leftSide_armRight(sx, sy);
				host.drawSideBody_body(sx, sy);
				host.drawSideBody_leftSide_leg1(sx, sy);
				host.drawSideBody_leftSide_armLeft(sx, sy);
			}
		}, 100);
	};
	

	
	this.drawSideBody_body = function(sx, sy) {
		//nack
		mainContext.beginPath();
		mainContext.fillStyle = colorSkin2;
		mainContext.rect(sx + ws * 2.5, sy, w - ws * 5, hs / 2);
		mainContext.fill();
		//body top
		mainContext.beginPath();
		mainContext.fillStyle = colorBodyTop;
		mainContext.rect(sx + ws * 2.5, sy + hs / 2, w - ws * 5, hs / 2);
		mainContext.rect(sx + ws * 2, sy + hs, w - ws * 4, hs);
		mainContext.rect(sx + ws * 2, sy + hs * 2, w - ws * 4, hs);
		mainContext.rect(sx + ws * 2, sy + hs * 3, w - ws * 4, hs);
		mainContext.fill();
		//body bottom
		mainContext.beginPath();
		mainContext.fillStyle = colorBodyBottom;
		mainContext.rect(sx + ws * 2, sy + hs * 4, w - ws * 4, hs);
		mainContext.fill();
	};
	
	this.drawSideBody_leftSide_armLeft = function(sx, sy) {
		//left arm
		mainContext.beginPath();
		mainContext.fillStyle = colorSkin1;
		mainContext.rect(sx + ws * 2.5, sy + hs * 2, ws, hs);
		mainContext.rect(sx + ws * 3, sy + hs * 3, ws / 2, hs);
		mainContext.fill();
		//left hand
		mainContext.beginPath();
		mainContext.fillStyle = colorHand;
		mainContext.rect(sx + ws * 2.5, sy + hs * 4, ws, hs);
		mainContext.fill();
	};
	
	this.drawSideBody_leftSide_armRight_fire = function(sx, sy) {
		//left arm
		mainContext.beginPath();
		mainContext.fillStyle = colorSkin1;
		mainContext.rect(sx + ws * 0, sy + hs * 1, ws * 1, hs * 0.7);
		mainContext.rect(sx + ws * 1, sy + hs * 1, ws * 1, hs * 0.7);
		mainContext.rect(sx + ws * 2, sy + hs * 1, ws * 1, hs * 0.7);
		mainContext.fill();
		//left hand
		mainContext.beginPath();
		mainContext.fillStyle = colorHand;
		mainContext.rect(sx + ws * -0.5, sy + hs * 1, ws, hs);
		mainContext.fill();
	};
	
	this.drawSideBody_leftSide_armLeft_fire = function(sx, sy) {
		//left arm
		mainContext.beginPath();
		mainContext.fillStyle = colorSkin1;
		mainContext.rect(sx + ws * 0, sy + hs * 2, ws * 1, hs * 0.6);
		mainContext.rect(sx + ws * 1, sy + hs * 2, ws * 1.2, hs * 0.6);
		mainContext.rect(sx + ws * 2, sy + hs * 1.5, ws * 0.8, hs * 1.3);
		mainContext.fill();
		//left hand
		mainContext.beginPath();
		mainContext.fillStyle = colorHand;
		mainContext.rect(sx + ws * -1, sy + hs * 1.4, ws, hs);
		mainContext.fill();
		
		//gun
		mainContext.beginPath();
		mainContext.fillStyle = "gray";
		mainContext.rect(sx + ws * -3.0, sy + hs * 0.2, ws * 3.0, hs * 0.6);
		mainContext.rect(sx + ws * -2.0, sy + hs * 0.8, ws * 2.0, hs * 0.7);
		//mainContext.rect(sx + ws * 0, sy + hs * 1.5, ws * 1, hs * 0.3);
		mainContext.fill();
	};
	
	this.clearFire = function(sx, sy) {
		mainContext.clearRect(sx + ws * -6.0, sy + hs * -1.0, ws * 3, hs * 3);
	};
	
	this.drawSideBody_leftFire1 = function(sx, sy) {
		mainContext.beginPath();
		mainContext.fillStyle = "red";
		mainContext.rect(sx + ws * -3.8, sy + hs * -0.5, ws * 0.3, hs * 0.3);
		mainContext.rect(sx + ws * -4.0, sy + hs * -0.3, ws * 0.3, hs * 0.5);
		mainContext.rect(sx + ws * -4.2, sy + hs * -0.5, ws * 0.3, hs * 0.7);
		mainContext.rect(sx + ws * -4.4, sy + hs * -0.0, ws * 0.3, hs * 0.4);
		mainContext.rect(sx + ws * -4.6, sy + hs * -0.3, ws * 0.3, hs * 0.6);
		mainContext.rect(sx + ws * -4.8, sy + hs * -0.1, ws * 0.3, hs * 0.8);
		mainContext.rect(sx + ws * -6.0, sy + hs * +0.1, ws * 1.2, hs * 0.4);
		mainContext.fill();
	};
	
	this.drawSideBody_leftFire2 = function(sx, sy) {
		mainContext.beginPath();
		mainContext.fillStyle = "darkorange";
		mainContext.rect(sx + ws * -3.8, sy + hs * -0.5, ws * 0.3, hs * 0.3);
		mainContext.rect(sx + ws * -4.0, sy + hs * -0.3, ws * 0.3, hs * 0.5);
		mainContext.rect(sx + ws * -4.2, sy + hs * +0.8, ws * 0.3, hs * 0.5);
		mainContext.rect(sx + ws * -4.4, sy + hs * -0.5, ws * 0.3, hs * 0.6);
		mainContext.rect(sx + ws * -4.6, sy + hs * -0.3, ws * 0.3, hs * 0.4);
		mainContext.rect(sx + ws * -4.8, sy + hs * -0.1, ws * 0.3, hs * 0.8);
		mainContext.rect(sx + ws * -6.0, sy + hs * +0.1, ws * 1.2, hs * 0.4);
		mainContext.fill();
	};
	
	this.drawSideBody_leftFire3 = function(sx, sy) {
		mainContext.beginPath();
		mainContext.fillStyle = "orange";
		mainContext.rect(sx + ws * -3.8, sy + hs * -0.5, ws * 0.3, hs * 0.3);
		mainContext.rect(sx + ws * -4.0, sy + hs * -0.3, ws * 0.3, hs * 0.5);
		mainContext.rect(sx + ws * -4.2, sy + hs * +0.8, ws * 0.3, hs * 0.5);
		mainContext.rect(sx + ws * -4.4, sy + hs * -0.0, ws * 0.3, hs * 0.6);
		mainContext.rect(sx + ws * -4.6, sy + hs * -0.3, ws * 0.3, hs * 0.4);
		mainContext.rect(sx + ws * -4.8, sy + hs * -0.1, ws * 0.3, hs * 0.8);
		mainContext.rect(sx + ws * -6.0, sy + hs * +0.1, ws * 1.2, hs * 0.4);
		mainContext.fill();
	};
	
	this.drawSideBody_leftFire4 = function(sx, sy) {
		mainContext.beginPath();
		mainContext.fillStyle = "brown";
		mainContext.rect(sx + ws * -3.8, sy + hs * -0.5, ws * 0.3, hs * 0.3);
		mainContext.rect(sx + ws * -4.0, sy + hs * -0.3, ws * 0.3, hs * 0.5);
		mainContext.rect(sx + ws * -4.2, sy + hs * -0.4, ws * 0.3, hs * 0.6);
		mainContext.rect(sx + ws * -4.4, sy + hs * -0.0, ws * 0.3, hs * 0.7);
		mainContext.rect(sx + ws * -4.6, sy + hs * -0.3, ws * 0.3, hs * 0.4);
		mainContext.rect(sx + ws * -4.8, sy + hs * -0.1, ws * 0.3, hs * 0.8);
		mainContext.rect(sx + ws * -6.0, sy + hs * +0.1, ws * 1.2, hs * 0.4);
		mainContext.fill();
	};
	
	this.drawSideBody_rightSide_armRight = function(sx, sy) {
		//left arm
		mainContext.beginPath();
		mainContext.fillStyle = colorSkin1;
		mainContext.rect(sx + ws * 2.5, sy + hs * 2, ws, hs);
		mainContext.rect(sx + ws * 2.5, sy + hs * 3, ws / 2, hs);
		mainContext.fill();
		//left hand
		mainContext.beginPath();
		mainContext.fillStyle = colorHand;
		mainContext.rect(sx + ws * 2.5, sy + hs * 4, ws, hs);
		mainContext.fill();
	};
	
	
	this.clearLeg = function(sx, sy) {
		mainContext.clearRect(sx, sy + hs * 5, w + ws / 2, hs * 9);
	};
	
	this.drawText = function(txt, sx, sy) {
		//mainContext.fillStyle = "black";
		//mainContext.fillText(txt, sx + ws, sy + hs * 8, ws, hs);
	};
	
	this.drawSideBody_leftSide_leg0 = function(sx, sy) {
		//right leg
		mainContext.beginPath();
		mainContext.fillStyle = colorLeg2;
		var bp1 = 0.8;
		
		mainContext.rect(sx + ws * 3, sy + hs * 5, ws * bp1, hs);
		mainContext.rect(sx + ws * 3.5, sy + hs * 6, ws/2 * bp1, hs);
		mainContext.rect(sx + ws * 4, sy + hs * 7, ws/2 * bp1, hs);
		
		// mainContext.rect(sx + ws * 3, sy + hs * 5, ws * bp1, hs);
		// mainContext.rect(sx + ws * 3, sy + hs * 6, ws/2  * bp1, hs);
		// mainContext.rect(sx + ws * 3.5, sy + hs * 7, ws/2 * bp1, hs);
		mainContext.fill();
		//right foot
		mainContext.beginPath();
		mainContext.fillStyle = colorFoot;
		mainContext.rect(sx + ws * 3, sy + hs * 8, ws * 1 * bp1, hs);
		mainContext.rect(sx + ws * 3.5, sy + hs * 7.5, ws * 1.5 * bp1, hs);
		mainContext.fill();
		//left leg
		mainContext.beginPath();
		mainContext.fillStyle = colorLeg1;
		mainContext.rect(sx + ws * 1.7, sy + hs * 5, ws, hs);
		mainContext.rect(sx + ws * 1.5, sy + hs * 6, ws/2, hs);
		mainContext.rect(sx + ws * 1.3, sy + hs * 7, ws/2, hs);
		mainContext.fill();
		//left foot
		mainContext.beginPath();
		mainContext.fillStyle = colorFoot;
		mainContext.rect(sx + ws * 0.0, sy + hs * 7.5, ws * 1.5, hs);
		mainContext.rect(sx + ws * 0.5, sy + hs * 8, ws * 1, hs / 2);
		mainContext.fill();
		
		this.drawText("0", sx, sy);
	};
	
	this.drawSideBody_leftSide_leg1 = function(sx, sy) {
		//right leg
		mainContext.beginPath();
		mainContext.fillStyle = colorLeg2;
		var bp1 = 0.8;
		mainContext.rect(sx + ws * 3, sy + hs * 5, ws * bp1, hs);
		mainContext.rect(sx + ws * 3, sy + hs * 6, ws/2  * bp1, hs);
		mainContext.rect(sx + ws * 3.5, sy + hs * 7, ws/2 * bp1, hs);
		mainContext.fill();
		//right foot
		mainContext.beginPath();
		mainContext.fillStyle = colorFoot;
		mainContext.rect(sx + ws * 3, sy + hs * 8, ws * 1.5 * bp1, hs);
		mainContext.fill();
		//left leg
		mainContext.beginPath();
		mainContext.fillStyle = colorLeg1;
		mainContext.rect(sx + ws * 2, sy + hs * 5, ws, hs);
		mainContext.rect(sx + ws * 2, sy + hs * 6, ws/2, hs);
		mainContext.rect(sx + ws * 2, sy + hs * 7, ws/2, hs);
		mainContext.fill();
		//left foot
		mainContext.beginPath();
		mainContext.fillStyle = colorFoot;
		mainContext.rect(sx + ws * 0.8, sy + hs * 8, ws * 1.5, hs);
		mainContext.fill();
		
		this.drawText("1", sx, sy);
	};
	
	this.drawSideBody_leftSide_leg2 = function(sx, sy) {
		//right leg
		mainContext.beginPath();
		mainContext.fillStyle = colorLeg2;
		var bp1 = 0.8;
		mainContext.rect(sx + ws * 2.5, sy + hs * 5, ws * bp1, hs);
		mainContext.rect(sx + ws * 2.5, sy + hs * 6, ws/2  * bp1, hs);
		mainContext.rect(sx + ws * 3, sy + hs * 7, ws/2 * bp1, hs);
		mainContext.fill();
		//right foot
		mainContext.beginPath();
		mainContext.fillStyle = colorFoot;
		mainContext.rect(sx + ws * 2.5, sy + hs * 8, ws * 1.5 * bp1, hs);
		mainContext.fill();
		//left leg
		mainContext.beginPath();
		mainContext.fillStyle = colorLeg1;
		mainContext.rect(sx + ws * 2, sy + hs * 5, ws, hs);
		mainContext.rect(sx + ws * 2, sy + hs * 6, ws/2, hs);
		mainContext.rect(sx + ws * 2.5, sy + hs * 7, ws/2, hs);
		mainContext.fill();
		//left foot
		mainContext.beginPath();
		mainContext.fillStyle = colorFoot;
		mainContext.rect(sx + ws * 2, sy + hs * 8, ws * 1.5, hs);
		mainContext.fill();
		
		this.drawText("2", sx, sy);
	};
	
	this.drawSideBody_leftSide_leg3 = function(sx, sy) {
		//right leg
		mainContext.beginPath();
		mainContext.fillStyle = colorLeg2;
		var bp1 = 0.8;
		mainContext.rect(sx + ws * 2, sy + hs * 5, ws * bp1, hs);
		mainContext.rect(sx + ws * 2, sy + hs * 6, ws/2  * bp1, hs);
		mainContext.rect(sx + ws * 2.5, sy + hs * 7, ws/2 * bp1, hs);
		mainContext.fill();
		//right foot
		mainContext.beginPath();
		mainContext.fillStyle = colorFoot;
		mainContext.rect(sx + ws * 1, sy + hs * 8, ws * 1.5 * bp1, hs);
		mainContext.fill();
		//left leg
		mainContext.beginPath();
		mainContext.fillStyle = colorLeg1;
		mainContext.rect(sx + ws * 3, sy + hs * 5, ws, hs);
		mainContext.rect(sx + ws * 3, sy + hs * 6, ws/2, hs);
		mainContext.rect(sx + ws * 3.5, sy + hs * 7, ws/2, hs);
		mainContext.fill();
		//left foot
		mainContext.beginPath();
		mainContext.fillStyle = colorFoot;
		mainContext.rect(sx + ws * 3, sy + hs * 8, ws * 1, hs);
		mainContext.rect(sx + ws * 3.5, sy + hs * 7.5, ws * 1, hs);
		mainContext.fill();
		
		this.drawText("3", sx, sy);
	};
	
	this.drawSideBody_leftSide_leg4 = function(sx, sy) {
		var bp1 = 0.8;
		//right leg
		mainContext.beginPath();
		mainContext.fillStyle = colorLeg2;
		mainContext.rect(sx + ws * 1.7, sy + hs * 5, ws * bp1, hs);
		mainContext.rect(sx + ws * 1.5, sy + hs * 6, ws/2 * bp1, hs);
		mainContext.rect(sx + ws * 1.3, sy + hs * 7, ws/2 * bp1, hs);
		mainContext.fill();
		//right foot
		mainContext.beginPath();
		mainContext.fillStyle = colorFoot;
		mainContext.rect(sx + ws * 0.0, sy + hs * 7.5, ws * 1.5 * bp1, hs);
		mainContext.rect(sx + ws * 0.5, sy + hs * 8, ws * 1 * bp1, hs / 2);
		mainContext.fill();
		
		//left leg
		mainContext.beginPath();
		mainContext.fillStyle = colorLeg1;
		
		mainContext.rect(sx + ws * 3, sy + hs * 5, ws, hs);
		mainContext.rect(sx + ws * 3.5, sy + hs * 6, ws/2, hs);
		mainContext.rect(sx + ws * 4, sy + hs * 7, ws/2, hs);
		mainContext.fill();
		//left foot
		mainContext.beginPath();
		mainContext.fillStyle = colorFoot;
		mainContext.rect(sx + ws * 3, sy + hs * 8, ws * 1, hs);
		mainContext.rect(sx + ws * 3.5, sy + hs * 7.5, ws * 1.5, hs);
		mainContext.fill();
		
		this.drawText("4", sx, sy);
	};
	
	
	this.drawSideBody_rightSide_leg = function(sx, sy) {
		//left leg
		mainContext.beginPath();
		mainContext.fillStyle = colorBodyBottom;
		mainContext.rect(sx + ws * 2, sy + hs * 5, ws, hs);
		mainContext.rect(sx + ws * 2, sy + hs * 6, ws/2, hs);
		mainContext.rect(sx + ws * 1.5, sy + hs * 7, ws/2, hs);
		mainContext.fill();
		//left foot
		mainContext.beginPath();
		mainContext.fillStyle = colorFoot;
		mainContext.rect(sx + ws * 1.5, sy + hs * 8, ws, hs);
		mainContext.fill();
		//right leg
		mainContext.beginPath();
		mainContext.fillStyle = colorBodyBottom;
		mainContext.rect(sx + ws * 3.5, sy + hs * 5, ws, hs);
		mainContext.rect(sx + ws * 4, sy + hs * 6, ws/2, hs);
		mainContext.rect(sx + ws * 3.5, sy + hs * 7, ws/2, hs);
		mainContext.fill();
		//right foot
		mainContext.beginPath();
		mainContext.fillStyle = colorFoot;
		mainContext.rect(sx + ws * 3.5, sy + hs * 8, ws * 1.5, hs);
		mainContext.fill();
		
	};
	
	this.drawSideBody_leftSide_armRight = function(sx, sy) {
		
	};
	
	this.drawSideBody_rightSide_armLeft = function(sx, sy) {
		
	};
	
	this.drawSideHead = function(direction) {
		var sx = cx;
		var sy = cy;
		this.clearHead(sx, sy);
		//hd
		mainContext.beginPath();
		mainContext.fillStyle = colorSkin1;
		mainContext.rect(sx + hws, sy + hhs * 3, hws * 4, hhs);
		mainContext.rect(sx + hws, sy + hhs * 4, hws * 4, hhs);
		mainContext.rect(sx + hws, sy + hhs * 5, hws * 4, hhs);
		mainContext.fill();
		
		//hr
		mainContext.beginPath();
		mainContext.fillStyle = colorHair1;
		mainContext.rect(sx + hws, sy, hw - hws * 2, hhs);
		mainContext.rect(sx + hws - hws / 2, sy + hhs, hw - hws, hhs);
		mainContext.rect(sx + hws - hws / 2, sy + hhs * 2, hw - hws, hhs);
		switch (direction) {
			case "l":
				mainContext.rect(sx + hws * 2, sy + hhs * 3, hws, hhs);
				break;
			case "r":
				mainContext.rect(sx + hws * 3, sy + hhs * 3, hws, hhs);
				break;
		}
	
		mainContext.fill();
		//e2
		mainContext.beginPath();
		mainContext.fillStyle = colorEye;
		switch (direction) {
			case "l":
				mainContext.rect(sx + hws, sy + hhs * 4, hws, hhs / 2);
				break;
			case "r":
				mainContext.rect(sx + hw + hws - hws * 3, sy + hhs * 4, hws, hhs / 2);
				break;
		}
		mainContext.fill();
	};
	
	this.drawBackHead = function() {
		
		var sx = cx;
		var sy = cy;
		this.clearHead(sx, sy);
		
		//hd
		mainContext.beginPath();
		mainContext.fillStyle = colorSkin1;
		mainContext.rect(sx + hws, sy + hhs * 3, hws * 4, hhs);
		mainContext.rect(sx + hws, sy + hhs * 4, hws * 4, hhs);
		mainContext.rect(sx + hws, sy + hhs * 5, hws * 4, hhs);
		mainContext.fill();
		
		//hr
		mainContext.beginPath();
		mainContext.fillStyle = colorHair1;
		mainContext.rect(sx + hws, sy, hw - hws * 2, hhs);
		mainContext.rect(sx, sy + hhs, hw, hhs);
		mainContext.rect(sx, sy + hhs * 2, hw, hhs);
		mainContext.rect(sx, sy + hhs * 3, hw, hhs);
		mainContext.fill();
		mainContext.beginPath();
		mainContext.fillStyle = colorHair2;
		mainContext.rect(sx + hws, sy + hhs * 4,  hw - hws * 2, hhs);
		mainContext.fill();
	};
	
} 