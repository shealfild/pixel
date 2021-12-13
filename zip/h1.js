
var v1 = {
	
	init : function() {
	
		console.time("draw house");
		var h1 = new house1();
		
		h1.drawOutter(100, 100);
		console.timeEnd("draw house");
	}
	
	
};

v1.init();


function drawPlane(context, sx, sy, w, h, inct, color) {
	//unit 4px
	var unit = 4;
	var cntW = w / unit;
	var cntH = h / unit;
	context.beginPath();
	context.fillStyle = color;
	for (var i = 0; i < cntH; i++) {
		for (var k = 0; k < cntW; k++) {
			var hDepth = (unit * k) * inct;
			context.rect(sx + unit * k, sy + unit * i + hDepth, unit, unit);
		}
	}
	context.fill();
	//context.closePath();
	
};

function drawPlane2(context, sx, sy, w, h, inct, color) {
	//unit 4px
	var unit = 4;
	var cntW = w / unit;
	var cntH = h / unit;
	context.beginPath();
	context.fillStyle = color;
	for (var i = 0; i < cntH; i++) {
		for (var k = 0; k < cntW; k++) {
			var hDepth = (unit * k) * inct * -1;
			context.rect(sx + unit * k, sy + unit * i + hDepth, unit, unit);
		}
	}
	context.fill();
};

function drawPlane3(context, sx, sy, w, h, inct, incvt, color) {
	var unit = 4;
	var cntW = w / unit;
	var cntH = h / unit;

	context.beginPath();
	context.fillStyle = color;
	for (var i = 0; i < cntH; i++) {
		var wDepth = (unit * i) * incvt;
		for (var k = 0; k < cntW; k++) {
			var hDepth = (unit * k) * inct * -1;
			context.rect(sx + unit * k + wDepth, sy + unit * i + hDepth, unit * 2, unit * 2);
		}
	}
	context.fill();
};

function drawPlane3(context, sx, sy, w, h, inct, incvt, color, x1, x2, anglePoint) {
	//unit 4px
	var unit = 4;
	var cntW = w / unit;
	context.beginPath();
	context.fillStyle = color;
	
	var cntX1 = x1 / unit;
	var cntX2 = x2 / unit;
	var hCnt = 0;
	var hGap = 0;
	
	anglePoint = anglePoint == undefined ? 1 : anglePoint;
	
	for (var k = 0; k < cntW; k++) {
		var hDepth1 = (unit * k) * inct * - 1;
		var hDepth2 = (unit * k) * (inct * anglePoint) * 1;
		
		if (k < cntX1) {
			hGap = hDepth2 - hDepth1;
			hCnt = Math.abs(Math.round(hGap / unit));
			for (var i = 0; i <= hCnt; i++) {
				context.rect(sx + unit * k, sy + unit * i + hDepth1, unit, unit);
			}
		} else if (k > cntX2) {
			var hDepth3 = unit * cntX2 * inct - (unit * (k - cntX2) * inct );
			hDepth3 *= -1;
			hGap -= (unit * inct * 2);
			hCnt = Math.abs(Math.round(hGap / unit));
			for (var i = 0; i <= hCnt; i++) {
				context.rect(sx + unit * k, sy + unit * i + hDepth3, unit, unit);
			}
		} else {
			for (var i = 0; i <= hCnt; i++) {
				context.rect(sx + unit * k, sy + unit * i + hDepth1, unit, unit);
			}
		}
	}
	
	context.fill();
};

function house1() {
	
	var dSize = 24; //24px
	var uSize = 4; 
	var dInc = 24;
	var dIncx = 0;
	var dIncy = 0;
	var dInct = Math.tan(dInc *  Math.PI / 180);
	var dIncvt = Math.tan((90 - dInc) *  Math.PI / 180);
	var colorFloorMain = "#" + rgbDecimalToHex(213, 170, 195);
	var colorFloorSub = "#" + rgbGetNearColor(213, 195, 195);
	var colorWall = "#" + rgbDecimalToHex(196, 210, 208);
	var colorPillar = "#" + rgbDecimalToHex(230, 230, 230);
	var colorDoor = "#" + rgbDecimalToHex(221,221,221);
	var colorDoorSub = getTransparentColor(216, 122, 44, 0.4);
	
	this.drawOutter = function(centerX, centerY) {
		
		dIncx = centerX;
		dIncy = centerY;
		
		
		// sx = centerX - uSize;
		// sy = centerY - uSize * 2;
		// drawPlane3(mainContext, sx, sy , dSize * 6, dSize * 4, dInct, dIncvt, colorFloorMain);
		var sx = centerX;
		var sy = centerY;
		drawPlane3(mainContext, sx, sy, dSize * 10, undefined
			, dInct, dIncvt, colorFloorMain, dSize * 4, dSize * 6);
		
		
		var sx = centerX;
		var sy = centerY;
		//draw 1f 3 wall 
		drawPlane(mainContext, sx, sy , dSize * 4, dSize * 3, dInct, colorWall);
		
		//draw 1f 4wall
		sx = centerX + dSize * 4;
		sy = centerY + (sx - dIncx) * dInct;
		drawPlane2(mainContext, sx , sy , dSize * 6, dSize * 3, dInct, colorWall);
		
		//pillar 4-1
		// sx = centerX;
		// sy = centerY + (sx - dIncx) * dInct;
		// mainContext.beginPath();
		// mainContext.fillStyle = colorPillar;
		// mainContext.rect(sx, sy, uSize / 2, dSize * 3);
		// mainContext.fill();
		
		//pillar 3-4
		sx = centerX + dSize * 4;
		sy = centerY + (sx - dIncx) * dInct;
		mainContext.beginPath();
		mainContext.fillStyle = colorPillar;
		mainContext.rect(sx, sy, uSize / 4, dSize * 3);
		mainContext.fill();
		
		//pillar 2-3
		// sx = centerX + dSize * 4;
		// sy = centerY + (sx - dIncx) * dInct;
		// sx = centerX + dSize * 6;
		// sy += (sx - dIncx) * -dInct;
		// sx = centerX + dSize * 10;
		// mainContext.beginPath();
		// mainContext.fillStyle = colorPillar;
		// mainContext.rect(sx, sy, uSize / 2, dSize * 3);
		// mainContext.fill();
		
		//door
		sx = centerX + dSize;
		sy = centerY + (sx - dIncx) * dInct;
		sy += dSize;
		
		drawPlane(mainContext, sx, sy , dSize * 1, dSize * 2, dInct, colorDoor);
		//door hand
		mainContext.beginPath();
		mainContext.fillStyle = colorPillar;
		mainContext.rect(sx + uSize, sy + dSize + (sx + uSize - sx) * dInct, uSize, uSize);
		mainContext.fill();
		
		//door loof
		drawPlane3(mainContext, sx - 15, sy, dSize * 2, undefined
			, dInct, dIncvt, colorDoorSub, dSize, dSize);
		
		
		//3side sun loof
		sx = centerX + dSize * 4;
		sy = centerY + (sx - dIncx) * dInct;
		
		drawPlane3(mainContext, sx, sy, dSize * 8, undefined
			, dInct, dIncvt
			, "rgba(0, 0, 230, 0.5)", dSize * 2, dSize * 6);
	
	};
	
	this.drawBorder = function(x1, y1, x2, y2, w, h) {
		
	};
	
	this.drawInner = function() {
		
	};
};