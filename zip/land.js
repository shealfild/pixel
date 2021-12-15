var v_land = {
	
	init : function() {
		//120 x 120
		//1920 x 1080 (16 * 9)
		//sand1 (흙길) s1 
		//grass1 (잔디밭) g1
		//load1 (도로1) l1
		//load2 (도로2) l2
		//water1 (물1) w1
		//sand1 1/2 water1 1/2 (흙반, 물반) s1w1
		var landInfo = [];
		landInfo.push(["s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1"]);
		landInfo.push(["s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1"]);
		landInfo.push(["s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1"]);
		landInfo.push(["s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1"]);
		landInfo.push(["s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1"]);
		landInfo.push(["s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1"]);
		landInfo.push(["s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1"]);
		landInfo.push(["s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1"]);
		landInfo.push(["s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1", "s1"]);
		
		var width = 120;
		var height = 120;
		
		var l1 = new land();
		
		console.time("land");
		
		for (var i = 0; i < landInfo.length; i++) {
			var rowInfo = landInfo[i];
			for (var k = 0; k < rowInfo.length; k++) {
				var landType = rowInfo[k];
				var startX = k * width;
				var startY = i * height;
				l1.drawLand(startX, startY, width, height, landType);
			}
				
		}
		
		console.timeEnd("land");
	},
	
};


function land() {
	

	
	this.drawLand = function(startX, startY, w, h, landType) {
		
		var _us = 4;
		var sx = startX;
		var sy = startY;
		
		var defaultColor = "rgb(234, 234, 174)";
		var strongColor1 = "rgb(186, 114, 74)";
		var strongColor2 = "rgb(50, 114, 74)";
		
		landContext.beginPath();
		landContext.fillStyle = defaultColor;
		landContext.rect(startX, startY, w, h);
		landContext.fill();
		
		var wCnt = w / _us;
		var hCnt = h / _us;
		landContext.beginPath();
		landContext.fillStyle = strongColor1;
		for (var r = 0; r < hCnt; r++) {
			for (var c = 0; c < wCnt; c++) {
				if (Math.random() * 100 < 0.5) {
					landContext.rect(startX + c * _us, startY + r * _us, _us * 2, _us / 4);
				}
			}
		}
		landContext.fill();
		
		landContext.beginPath();
		landContext.fillStyle = strongColor2;
		for (var r = 0; r < hCnt; r++) {
			for (var c = 0; c < wCnt; c++) {
				if (Math.random() * 100 < 0.5) {
					landContext.rect(startX + c * _us, startY + r * _us, _us * 3, _us / 4);
				}
			}
		}
		landContext.fill();
	}
}