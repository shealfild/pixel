var v_lock = {
	
	init : function() {
		
		console.time("lock");
		// var l1 = new lock();
		// var sx = 50;
		// var sy = 50;
		// l1.drawLock(sx, sy, 100, 100);
		
		// var l3 = new lock();
		// sx += 100;
		// l3.drawLock(sx, sy, 100, 100, 
			// {
				// "l1" : 40,
				// "l2" : 70,
				// "m1" : 0,
				// "m2" : 80,
				// "m3" : 100,
				// "r1" : 40,
				// "r2" : 70,
				// "cwCnt" : 50 /*절반*/
			// }
		// );
		
		var size = 100;
		for (var i = 0; i < 10; i++) {
			for (var k = 0; k < 10; k++) {
				var l = new lock();
				l.drawLock(k * size, i * size, size, size,
				{
					"l1" : Math.random() * 50,
					"l2" : 50 + Math.random() * 50,
					"m1" : Math.random() * 33,
					"m2" : 33 + Math.random() * 33,
					"m3" : 66 + Math.random() * 34,
					"r1" : Math.random() * 50,
					"r2" : 50 + Math.random() * 50,
					"cwCnt" : Math.random() * 100 
				}
				);
			}
		}
		
		//0	 0 1 2 3 4 5
		//1	  0 1 2 3 4 5
		
		//오차 범위 5
		// size 100으로 볼때
		
		// 위치
		// 0행의 0 위치 00, 100
		// 0행의 1 위치 100, 100
		// 1행의 0 위치 50 (approximately), 150
		// 1행의 1 위치 150, 150
		
		//
		// 0행의 0, 1은 r1 == l1 
		// 1행의 0은 0행의 0과 l1 == m3, m1 == r2
		// 1행의 0은 0행의 1과 m1 == l2, r1 == l2
		
		/*
		var rSize = 5;
		var size = 200;
		var landMap = {};
		for (var r = 0; r < 2; r++) {
			var rowMap = undefined;
			if (landMap[r] == undefined) {
				rowMap = {};
				landMap[r] = rowMap;
			} else {
				rowMap = landMap[r];
			}
			
			var isOdd = (r % 2 == 1);
			for (var c = 0; c < 5; c++) {
				var l = new lock();
				var left = isOdd ? size / 2 + c * size : c * size;
				var top = r * size / 4;
				
				var l1 = 30;
				var l2 = 80;
				var m1 = Math.random() * 33;
				var m2 = 33 + Math.random() * 33;
				var m3 = 66 + Math.random() * 34;
				var r1 = 30;
				var r2 = 80;
				
				
				var tRowMap = landMap[r - 1];
				var lLand = rowMap[c - 1];
				var tlLand = tRowMap == undefined ? undefined : tRowMap[isOdd ? c : c - 1];
				var trLand = tRowMap == undefined ? undefined : tRowMap[isOdd ? c + 1 : c];
				
				//l1
				if (lLand == undefined) {
					l1 = Math.random() * 50;
					l2 = 50 + Math.random() * 50;
					r1 = Math.random() * 50;
					r2 = 50 + Math.random() * 50;
				} else {
					l1 = lLand.r1 + Math.random() * rSize;
					l2 = lLand.r2 + Math.random() * rSize;
					r1 = Math.random() * 50;
					r2 = 50 + Math.random() * 50;
				}
				
				
				
				if (tlLand != undefined) {
					l1 = tlLand.m2 + Math.random() * rSize - top;
					m1 = tlLand.r1 + Math.random() * rSize - top;
					l1 = Math.max(l1, 0);
					m1 = Math.max(m1, 0);
				}
				
				if (trLand != undefined) {
					r1 = trLand.m2 + Math.random() * rSize - top;
				}
				
				// if (trLand != undefined) {
					// r1 = trLand.m2 + Math.random() * rSize;
				// }
				
				rowMap[c] = {
					l1 : l1,
					l2 : l2,
					m1 : m1,
					m2 : m2,
					m3 : m3,
					r1 : r1,
					r2 : r2
				}
				
				l.drawLock(left, top, size, size, rowMap[c]);
			}
		}
		*/
		 
		// sx += 100;
		// sy += 100;
		//l1.drawLock2(sx, sy, 300, 170);
		
		// sx += 20;
		// sy += 10;
		// l1.drawLock(sx, sy, 20, 20);
		
		console.timeEnd("lock");
	},
	
};



function lock() {
	
	var _us = 2;
	
	/*
	*_vi : vertex info 
	* l1 : 왼쪽 상단 y점 percentage
	* l2 : 왼쪽 하단 y점 percentage
	* m1 : 중앙 상단 y점 percentage
	* m2 : 중앙 중간 y점 percentage
	* m3 : 중앙 하단 y점 percentage
	* r1 : 오른쪽 상단 y점 percentage
	* r2 : 오른쪽 하단 y점 percentage
	* cwCnt : 중앙 x점 percentage
	*/
	
	this.__getValue = function(ey, h, cv, _vi, key) {
		return _vi != undefined && _vi[key] != undefined ? ey + h * _vi[key] / 100 : cv;
	};
	
	this.drawLock = function(startX, startY, w, h, _vi) {
		var sx = startX;
		var sy = startY + h;
		var ex = startX + w;
		var ey = startY;
		
		// setTimeout(function() {
			// mainContext.fillRect(sx, sy, 5, 5);
			// mainContext.fillText(sx + "," + sy, sx, sy, 100, 0);
			// mainContext.fillRect(ex, ey, 5, 5);
			// mainContext.fillText(ex + "," + ey, ex, ey, 100, 0);
		// }, 1);
		
		var wCnt = w / _us;
		var hCnt = h / _us;
		
		var l1 = sy - h / 3 * 2;
		var l2 = sy - h / 3 * 1;
		//var l1 = l2;
		var r1 = sy - h / 3 * 2;
		var r2 = sy - h / 3 * 1;		
		var m1 = ey + h / 5;
		var m2 = ey + h / 2; 
		var m3 = sy; //m2 = m3;
		
		l1 = this.__getValue(ey, h, l1, _vi, "l1");
		l2 = this.__getValue(ey, h, l2, _vi, "l2");
		m1 = this.__getValue(ey, h, m1, _vi, "m1");
		m2 = this.__getValue(ey, h, m2, _vi, "m2");
		m3 = this.__getValue(ey, h, m3, _vi, "m3");
		r1 = this.__getValue(ey, h, r1, _vi, "r1");
		r2 = this.__getValue(ey, h, r2, _vi, "r2");
		
		var cwCnt = _vi != undefined && _vi["cwCnt"] != undefined ? wCnt * _vi["cwCnt"] / 100 : wCnt / 2;
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
	
	
	this.drawLock2 = function(startX, startY, w, h) {
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
		
		//m1
		var m1_1 = ey + h / 5;
		var m1_2 = ey + h / 2;
		var m1_3 = sy;
		
		//m2
		var m2_1 = ey + h / 5;
		var m2_2 = ey + h / 2;
		var m2_3 = sy;
		
		//정육면채 같이 그림
		m1_1 = (l1 + m2_1) / 2;
		m2_2 = (m1_2 + r1) / 2;
		m2_3 = (m1_3 + r2) / 2;
		
		var cwCnt1 = wCnt / 3;
		var cwCnt2 = wCnt / 3 * 2;
		var cw1 = cwCnt1 * _us;
		var cw2 = cwCnt2 * _us;
		
		var inc1_1 = (l1 - m1_1) / (cw1);
		var inc1_2 = (l1 - m1_2) / (cw1);
		var inc1_3 = (l2 - m1_3) / (cw1);
		
		var inc2_1 = (m1_1 - m2_1) / (cw2 - cw1);
		var inc2_2 = (m1_2 - m2_2) / (cw2 - cw1);
		var inc2_3 = (m1_3 - m2_3) / (cw2 - cw1);
		
		var inc3_1 = (m2_1 - r1) / (w - cw2);
		var inc3_2 = (m2_2 - r1) / (w - cw2);
		var inc3_3 = (m2_3 - r2) / (w - cw2);
		
		mainContext.beginPath();
		mainContext.fillStyle = "lightgray";
		for (var c = 0; c < wCnt; c++) {
			var cc = sx + c * _us;
			for (var r = 0; r < hCnt; r++) {
				var cr = ey + r * _us;
				if (c <= cwCnt1) {
					var top1 = l1 - c * _us * inc1_1;
					var top2 = l1 - c * _us * inc1_2;
					var top3 = l2 + c * _us * inc1_3;
					if (top1 <= cr && cr <= top2) {
						mainContext.rect(cc, cr, _us, _us);
					}					
				} else if (c > cwCnt1 && c <= cwCnt2) {
					var _c = c - cwCnt1;
					var top1 = m1_1 - _c * _us * inc2_1;
					var top2 = m1_2 - _c * _us * inc2_2;
					var top3 = m1_3 + _c * _us * inc2_3;
					if (top1 <= cr && cr <= top2) {
						mainContext.rect(cc, cr, _us, _us);
					} 		
				} else if (c > cwCnt2) {
					var _c = c - cwCnt2;
					var top1 = m2_1 - _c * _us * inc3_1;
					var top2 = m2_2 - _c * _us * inc3_2;
					var top3 = m2_3 + _c * _us * inc3_3;
					if (top1 <= cr && cr <= top2) {
						mainContext.rect(cc, cr, _us, _us);
					} 			
				}
			}
		}
		mainContext.fill();
		
		mainContext.beginPath();
		mainContext.fillStyle = "#bbbbbb";
		for (var c = 0; c < wCnt; c++) {
			var cc = sx + c * _us;
			for (var r = 0; r < hCnt; r++) {
				var cr = ey + r * _us;
				if (c <= cwCnt1) {
					var top1 = l1 - c * _us * inc1_1;
					var top2 = l1 - c * _us * inc1_2;
					var top3 = l2 - c * _us * inc1_3;
					if (top2 <= cr && cr <= top3) {
						mainContext.rect(cc, cr, _us, _us);
					}						
				} 
			}
		}
		mainContext.fill();
		
		mainContext.beginPath();
		mainContext.fillStyle = "#999999";
		for (var c = 0; c < wCnt; c++) {
			var cc = sx + c * _us;
			for (var r = 0; r < hCnt; r++) {
				var cr = ey + r * _us;
				if (c > cwCnt1 && c <= cwCnt2) {
					var _c = c - cwCnt1;
					var top1 = m1_1 - _c * _us * inc2_1;
					var top2 = m1_2 - _c * _us * inc2_2;
					var top3 = m1_3 - _c * _us * inc2_3;
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
				if (c > cwCnt2) {
					var _c = c - cwCnt2;
					var top1 = m2_1 - _c * _us * inc3_1;
					var top2 = m2_2 - _c * _us * inc3_2;
					var top3 = m2_3 - _c * _us * inc3_3;
					if (top2 <= cr && cr <= top3) {
						mainContext.rect(cc, cr, _us, _us);
					}				
				}
			}
		}
		mainContext.fill();
	};
}