var v_lock = {
	
	init : function() {
		
		console.time("lock");
		var l1 = new lock();
		var sx = 50;
		var sy = 50;
		l1.drawLock(sx, sy, 100, 100);
		sx += 60;
		sy += 50;
		l1.drawLock(sx, sy, 50, 60);
		
		sx += 20;
		sy += 10;
		l1.drawLock(sx, sy, 20, 20);
		
		console.timeEnd("lock");
	},
	
};



function lock() {
	
	var _us = 2;
	
	this.drawLock = function(startX, startY, w, h) {
		var sx = startX;
		var sy = startY + h;
		var ex = startX + w;
		var ey = startY;
		
		var wCnt = w / _us;
		var hCnt = h / _us;
		
		var l1 = sy - h / 3 * 2;
		var l2 = sy - h / 3 * 1;
		var r1 = sy - h / 3 * 2;
		var r2 = sy - h / 3 * 1;		
		var m1 = ey + h / 5;
		var m2 = ey + h / 2;
		var m3 = sy;
		
		var cwCnt = wCnt / 2;
		var cw = cwCnt * _us;
		
		var inc1 = (l1 - m1) / (cw);
		var inc2 = (l1 - m2) / (cw);
		var inc3 = (l2 - m3) / (cw);
		
		var inc1_1 = (m1 - r1) / (w - cw);
		var inc2_1 = (m2 - r1) / (w - cw);
		var inc3_1 = (m3 - r2) / (w - cw);
		
		mainContext.beginPath();
		mainContext.fillStyle = "lightgray";
		for (var c = 0; c < wCnt; c++) {
			var cc = sx + c * _us;
			for (var r = 0; r < hCnt; r++) {
				var cr = ey + r * _us;
				if (c <= cwCnt) {
					var top1 = l1 - c * _us * inc1;
					var top2 = l1 - c * _us * inc2;
					var top3 = l2 + c * _us * inc3;
					if (top1 <= cr && cr <= top2) {
						mainContext.rect(cc, cr, _us, _us);
					}					
				} else {
					var _c = c - cwCnt;
					var top1 = m1 - _c * _us * inc1_1;
					var top2 = m2 - _c * _us * inc2_1;
					var top3 = m3 + _c * _us * inc3_1;
					if (top1 <= cr && cr <= top2) {
						mainContext.rect(cc, cr, _us, _us);
					} 			
				}
			}
		}
		mainContext.fill();
		
		mainContext.beginPath();
		mainContext.fillStyle = "silver";
		for (var c = 0; c < wCnt; c++) {
			var cc = sx + c * _us;
			for (var r = 0; r < hCnt; r++) {
				var cr = ey + r * _us;
				if (c <= cwCnt) {
					var top1 = l1 - c * _us * inc1;
					var top2 = l1 - c * _us * inc2;
					var top3 = l2 - c * _us * inc3;
					if (top2 <= cr && cr <= top3) {
						mainContext.rect(cc, cr, _us, _us);
					}						
				} 
			}
		}
		mainContext.fill();
		
		mainContext.beginPath();
		mainContext.fillStyle = "gray";
		for (var c = 0; c < wCnt; c++) {
			var cc = sx + c * _us;
			for (var r = 0; r < hCnt; r++) {
				var cr = ey + r * _us;
				if (c > cwCnt) {
					var _c = c - cwCnt;
					var top1 = m1 - _c * _us * inc1_1;
					var top2 = m2 - _c * _us * inc2_1;
					var top3 = m3 - _c * _us * inc3_1;
					if (top2 <= cr && cr <= top3) {
						mainContext.rect(cc, cr, _us, _us);
					}				
				}
			}
		}
		mainContext.fill();
	};
}