var v_plant = {
	
	init : function() {
		
		var g1 = new plant();
		
		g1.draw(300, 300);
	},
	
};



function plant() {
	
	var dSize = 24; //24px
	var uSize = 4; 
	var type = "grass";
	
	var colorLeafMain = "green";
	var colorLeafSub = "lightgreen";
	
	
	this.draw = function(startX, startY) {
		
		var sx = startX;
		var sy = startY;
		
		var sSize = 5 + Math.random() * 10;
		this.drawGrassLeaf(mainContext, sx - 3, sy, sSize / 2, sSize / 2, "l3", colorLeafMain);
		this.drawGrassLeaf(mainContext, sx, sy, sSize - 4, sSize, "l1", colorLeafSub);
		this.drawGrassLeaf(mainContext, sx, sy, sSize, sSize - 4, "l", colorLeafMain);
		this.drawGrassLeaf(mainContext, sx, sy, sSize, sSize, "r", colorLeafMain);
		this.drawGrassLeaf(mainContext, sx, sy, sSize - 2, sSize - 4, "r5", colorLeafSub);
		//grass
		sx += 24; this.drawRandomGrass(sx, sy);
		sx += 24; this.drawRandomGrass(sx, sy);
		sx += 24; this.drawRandomGrass(sx, sy);
		sx += 24; this.drawRandomGrass(sx, sy);
		sx += 24; this.drawRandomGrass(sx, sy);
		//tree
		//sx += 100; this.drawTree(mainContext, sx, sy, 40, 8, 20);
		sx += 150; 
		this.drawTree(mainContext, sx, sy + 20, 120, 20, 80);
		this.drawRandomGrass(sx, sy + 160);
		this.drawRandomGrass(sx + 20, sy + 160);
		
		return;
		
		sx += 70; sy += 30; 
		this.drawTree(mainContext, sx, sy + 20, 120, 20, 80);
		this.drawRandomGrass(sx, sy);
		sx += 70; sy += 30; 
		this.drawTree(mainContext, sx, sy + 40, 120, 20, 60);
		this.drawRandomGrass(sx, sy);
		sx += 70; sy += 30; 
		this.drawTree(mainContext, sx, sy + 40, 80, 20, 80);
		this.drawRandomGrass(sx, sy);
		sx += 70; sy += 30; 
		this.drawTree(mainContext, sx, sy + 20, 120, 20, 80);
		this.drawRandomGrass(sx, sy);
		
		
		//sx += 150; this.drawTree(mainContext, sx, sy + 60, 140, 20, 40);
		//sx += 200; this.drawTree(mainContext, sx, sy + 60, 60, 20, 30);
	};
	
	this.drawRandomGrass = function(sx, sy) {
		
		var leafCnt = 3 + parseInt(Math.random() * 7);
		var sSize = 5 + Math.random() * 5;
		
		for (var i = 0; i < leafCnt; i++) {
			var r1 = parseInt(Math.random() * 5);
			var r2 = parseInt(Math.random() * 5);
			var r3 = parseInt(Math.random() * 5);
			var r4 = parseInt(Math.random() * 5);
			var r5 = parseInt(Math.random() * 5);
			var r6 = parseInt(Math.random() * 100);
			var r7 = parseInt(Math.random() * 100);
			
			this.drawGrassLeaf(mainContext
				, sx + r1
				, sy + r2
				, sSize + r3
				, sSize + r4
				, (r6 > 50 ? "l" : "r") + (r5 + "")
				, (r7 % 2 == 0 ? colorLeafMain : colorLeafSub)
			);
		}
	};
	
	this.drawGrassLeaf = function(ctx, sx, sy, w, h, direction, color) {
		
		var uws = w / 5;
		var uhs = h / 5
		var directionDepth = parseInt(direction.substring(1));
		directionDepth = isNaN(directionDepth) ? 1 : directionDepth;
		direction = direction.substring(0, 1);
		
		var dg = 1 + directionDepth / 10;
		var dp = uws;
		
		ctx.beginPath();
		ctx.fillStyle = color;
		
		switch (direction) {
			case "l":
				ctx.rect(sx - uws * dg * 0, sy - uhs * dg * 0, uhs * 1.0 * dg, uhs * dg );
				ctx.rect(sx - uws * dg * 1, sy - uhs * dg * 1, uws * 2.0 * dg, uhs * dg );
				ctx.rect(sx - uws * dg * 1, sy - uhs * dg * 2, uws * 2.0 * dg, uhs * dg );
				ctx.rect(sx - uws * dg * 1, sy - uhs * dg * 3, uws * 1.0 * dg, uhs * dg );
				ctx.rect(sx - uws * dg * 1, sy - uhs * dg * 4, uws * 1.0 * dg, uhs * dg );
				ctx.rect(sx - uws * dg * 2, sy - uhs * dg * 5, uws * 1.0 * dg, uhs * dg );
				ctx.rect(sx - uws * dg * 3, sy - uhs * dg * 6, uws * 1.0 * dg, uhs * dg );
				ctx.rect(sx - uws * dg * 3, sy - uhs * dg * 7, uws * 0.5 * dg, uhs * dg );
				break;
			case "r":
				ctx.rect(sx + uws * dg * 0, sy - uhs * dg * 0, uhs * 1.0 * dg, uhs * dg);
				ctx.rect(sx + uws * dg * 0, sy - uhs * dg * 1, uws * 2.0 * dg, uhs * dg);
				ctx.rect(sx + uws * dg * 0, sy - uhs * dg * 2, uws * 2.0 * dg, uhs * dg);
				ctx.rect(sx + uws * dg * 1, sy - uhs * dg * 3, uws * 2.0 * dg, uhs * dg);
				ctx.rect(sx + uws * dg * 1, sy - uhs * dg * 4, uws * 2.0 * dg, uhs * dg);
				ctx.rect(sx + uws * dg * 2, sy - uhs * dg * 5, uws * 1.0 * dg, uhs * dg);
				ctx.rect(sx + uws * dg * 3, sy - uhs * dg * 6, uws * 1.0 * dg, uhs * dg);
				ctx.rect(sx + uws * dg * 3.5, sy - uhs * dg * 7, uws * 0.5, uhs * dg);
				break;
			case "c":
				break;
				
		}
		
		ctx.fill();
		//ctx.closePath();
	};
	
	this.drawTree = function(ctx, sx, sy, w, tw, th) {
		var _us = 4;
		this.drawTree_trunk(ctx, sx, sy, w, tw, th);
		this.drawTree_leaf(ctx, sx, sy, w, colorLeafMain, 60);
		this.drawTree_leaf(ctx, sx, sy, w, colorLeafSub, 50);
		this.drawTree_leaf(ctx, sx, sy, w, "red", 2, 8);
		this.drawTree_leafBoundary(ctx, sx, sy, w, "blue", 90, 1.5);
	};
	
	this.drawTree_trunk = function(ctx, sx, sy, w, tw, th) {
		var _us = 4;
		sx = sx - tw / 2;
		sy = sy + w / 2;
		ctx.beginPath();
		ctx.fillStyle = "brown";
		
		var wCnt = tw / _us;
		for (var i = 0; i < wCnt; i++) {
			var rootRandom = Math.random() * _us;
			var rootNegative = Math.random() * 10 > 5 ? true : false;
			if (rootNegative) {
				rootRandom *= -1;
			}
			
			if (i == 0 && wCnt > 3) {
				var rn = Math.random() * (th / 2);
				ctx.rect(sx + _us * 0.5, sy + rn, _us / 2, th - rn + rootRandom);	
			} else if (i == wCnt - 1 && wCnt > 3) {
				var rn = Math.random() * (th / 2);
				ctx.rect(sx + _us * i, sy + rn, _us / 2, th - rn + rootRandom);	
			} else {
				var rn = Math.random() * (th / 2);
				ctx.rect(sx + _us * i, sy - rn, _us, th + rn + rootRandom);	
			}
		}
		ctx.fill();
	};
	
	this.drawTree_leaf = function(ctx, sx, sy, w, color, density, _size) {
		
		var _us = 4;
		density = density == undefined ? 60 : density;
		_size = _size == undefined ? _us : _size;
		var wCnt = w / 4;
		//반지름
		var _rv = (wCnt / 2);
		ctx.beginPath();
		ctx.fillStyle = color;
		for (var r = -_rv; r <= _rv; r++) {
			var top = sy + r * _us;
			for (var c = -_rv; c <= _rv; c++) {
				//원형범위 안인 좌표만 그린다.
				var _cv = Math.sqrt(Math.pow(r, 2) + Math.pow(c, 2));
				if (_rv > _cv) {
					var left = sx + c * _us;
					if (Math.random() * 100 > (100 - density)) {
						ctx.rect(left, top, _size, _size);
					} 
				} 
			}
		}
		ctx.fill();
		//ctx.closePath();
	};
	
	this.drawTree_leafBoundary = function(ctx, sx, sy, w, color, density, _gap) {
		
		var _us = 4;
		density = density == undefined ? 60 : density;
		var wCnt = w / 4;
		//반지름
		var _rv = (wCnt / 2);
		ctx.beginPath();
		ctx.fillStyle = color;
		for (var r = -_rv; r <= _rv; r++) {
			var top = sy + r * _us;
			for (var c = -_rv; c <= _rv; c++) {
				//원형범위 안인 좌표만 그린다.
				var _cv = Math.sqrt(Math.pow(r, 2) + Math.pow(c, 2));
				if (_rv * _gap > _cv && _rv < _cv) {
					var left = sx + c * _us;
					if (Math.random() * 100 > (100 - density)) {
						ctx.rect(left, top, _us / 2, _us / 2);
					} 
				} 
			}
		}
		ctx.fill();
		//ctx.closePath();
	};
	
}