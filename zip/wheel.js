var v_wheel = {
	
	init : function() {
		
		console.time("wheel");
		var l1 = new wheel();
		var sx = 250;
		var sy = 50;
		l1.drawWheel(sx, sy, 100, 50, 30, -5);
		console.timeEnd("wheel");
	},
	
};


function wheel() {
	
	var _us = 2;
	
	//    (startX, startY) ----------- (ex, ey)
	//					|				|					
	//					|				|
	//					|	(cx, cy)	|
	//					|				|
	//					|				|
	//    		  (sx, sy) -------------
	
	this.drawWheel = function(startX, startY, w1, w2, h, angle) {
		var sx = startX;
		var sy = startY + w2;
		var ex = startX + w1;
		var ey = startY;
		var cx = (sx + ex) / 2;
		var cy = (sy + ey) / 2;
		var colCnt = w1 / _us;
		var rowCnt = w2 / _us;
		
		var a = w1 / 2;
		var b = w2 / 2;
		
		var ellSize = Math.pow(a, 2) * Math.pow(b, 2);
		
		mainContext.beginPath();
		//mainContext.translate(cx, cy);
		//mainContext.rotate((Math.PI / 180) * angle); // 회전
		//mainContext.translate(-cx, -cy); // 예전 위치로 이동하기
		mainContext.fillStyle = "gray";
		for (var x = -(colCnt / 2); x <= colCnt / 2; x++) {
			for (var y = -(rowCnt / 2); y <= 0 / 2; y++) {
				var cPos = Math.pow(x * _us, 2) * Math.pow(b, 2) + Math.pow(y * _us, 2) * Math.pow(a, 2);
				if (parseInt(cPos) > parseInt(ellSize) / 1.2
					&& parseInt(cPos) < parseInt(ellSize) * 1.2) {
					var l = cx + x * _us;
					var t = cy - y * _us;
					mainContext.rect(l, t, _us, h);
				}
			}
		}
		mainContext.fill();
		
		mainContext.beginPath();
		mainContext.fillStyle = "lightgray";
		for (var x = -(colCnt / 2); x <= colCnt / 2; x++) {
			for (var y = -(rowCnt / 2); y <= rowCnt / 2; y++) {
				var cPos = Math.pow(x * _us, 2) * Math.pow(b, 2) + Math.pow(y * _us, 2) * Math.pow(a, 2);
				if (cPos <= ellSize * 1.1) {
					var l = cx + x * _us;
					var t = cy - y * _us;
					mainContext.rect(l, t, _us, _us);
				}
			}
		}
		mainContext.fill();
		mainContext.rotate(0); 
	};
}