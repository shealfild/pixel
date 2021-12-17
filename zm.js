
var v_zm = {

	init : function() {
		
		var z1 = new zm();
		z1.drawSE(200, 100, 40, 60);
		
		/*
		console.time("performance");
		var cnt = 0;
		for (var i = 0; i < 1920 / 4; i++) {
			for (var k = 0; k < 1080 / 4; k++) {
				//mainContext.beginPath();
				//mainContext.fillStyle = "green";
				//mainContext.fillRect(i * 4, k * 4, 3, 3);
				mainContext.fillText(i, i * 4, k * 4, 4, 4);
				cnt++;
				//mainContext.strokeRect(i * 4, k * 4, 4, 4);
				//mainContext.fill();
			}
		}
		console.log(cnt);
		console.timeEnd("performance");
		*/
		
		//var z2 = new zm();
		//z2.drawS(250, 100, 40, 60);		
		
	},
};
	

function zm() {
	
	var _us = 4;
	
	this.drawS = function(startX, startY, width, height) {
		var sx = startX;
		var sy = startY;
		
		//face
		var fs = width / 2;
		sx = startX + (width - fs) / 2;
		sy += 0;
		
		this.drawS_face(sx, sy, fs, "#e2a804");
		
		//nack
		var ns = fs / 5;
		sx = startX + (width - ns) / 2;
		sy += fs / 5 * 6;
		
		mainContext.beginPath();
		mainContext.fillStyle = "#9a7200";
		mainContext.rect(sx, sy, ns, ns);
		mainContext.fill();
		
		//body
		var bws = width / 3;
		var bhs = height / 3;
		sx = startX + (width - bws) / 2;
		sy += ns;
		
		this.drawS_body(sx, sy, bws, bhs);
	};
	
	this.drawS_face = function(sx, sy, fs, color) {
		mainContext.beginPath();
		mainContext.fillStyle = color;
		
		//얼굴요소 그리는 크기 
		var fss = fs / 5;
		mainContext.rect(sx, sy, fss * 3 , fss);
		mainContext.rect(sx - fss * 1, sy + fss, fss * 5 , fss);
		mainContext.rect(sx - fss * 1, sy + fss * 2, fss * 5 , fss);
		mainContext.rect(sx - fss * 1, sy + fss * 3, fss * 5 , fss);
		mainContext.rect(sx - fss * 1, sy + fss * 3, fss * 5 , fss);
		mainContext.rect(sx - fss * 1, sy + fss * 4, fss * 5 , fss);
		mainContext.rect(sx, sy + fss * 5, fss * 4 , fss);
		mainContext.fill();
		
		//eye
		mainContext.beginPath();
		mainContext.fillStyle = "red";
		mainContext.rect(sx + fss * 0, sy + fss * 2, fss * 1, fss * 1.5);
		mainContext.rect(sx + fss * 2, sy + fss * 2, fss * 1, fss * 1.5);
		mainContext.fill();
		
		//mouth
		mainContext.beginPath();
		mainContext.fillStyle = "#722121";
		mainContext.rect(sx + fss * 0.5, sy + fss * 4, fss * 2, fss * 1);
		mainContext.fill();
		
		//hair
		mainContext.beginPath();
		mainContext.fillStyle = "#549548";
		mainContext.rect(sx - fss * 0, sy - fss * 2, fss * 3 , fss);
		mainContext.rect(sx - fss * 1, sy - fss, fss * 5 , fss);
		mainContext.rect(sx - fss * 1, sy, fss * 1 , fss * 2);
		mainContext.rect(sx + fss * 3, sy, fss * 1 , fss * 1);
		mainContext.fill();
		
		//
		mainContext.beginPath();
		mainContext.fillStyle = "#722121";
		mainContext.rect(sx - fss * 1.5, sy + fss * 2, fss, fss * 2);
		mainContext.rect(sx + fss * 1.7, sy + fss * 5, fss * 0.8, fss * 1);
		mainContext.fill();
	};
	
	this.drawSE_face = function(sx, sy, fs, color) {
		mainContext.beginPath();
		mainContext.fillStyle = color;
		
		//얼굴요소 그리는 크기 
		var fss = fs / 5;
		mainContext.rect(sx, sy, fss * 3 , fss);
		mainContext.rect(sx - fss * 1, sy + fss, fss * 5 , fss);
		mainContext.rect(sx - fss * 1, sy + fss * 2, fss * 5 , fss);
		mainContext.rect(sx - fss * 1, sy + fss * 3, fss * 5 , fss);
		mainContext.rect(sx - fss * 1, sy + fss * 3, fss * 5 , fss);
		mainContext.rect(sx - fss * 1, sy + fss * 4, fss * 5 , fss);
		mainContext.rect(sx, sy + fss * 5, fss * 4 , fss);
		mainContext.fill();
		
		//eye
		mainContext.beginPath();
		mainContext.fillStyle = "red";
		mainContext.rect(sx + fss * 1, sy + fss * 2, fss * 1, fss * 1.5);
		mainContext.rect(sx + fss * 3, sy + fss * 2, fss * 1, fss * 1.5);
		mainContext.fill();
		
		//mouth
		mainContext.beginPath();
		mainContext.fillStyle = "#722121";
		mainContext.rect(sx + fss * 1.5, sy + fss * 4, fss * 2, fss * 1);
		mainContext.fill();
		
		//hair
		mainContext.beginPath();
		mainContext.fillStyle = "#549548";
		mainContext.rect(sx - fss * 0, sy - fss * 2, fss * 3 , fss);
		mainContext.rect(sx - fss * 1, sy - fss, fss * 5 , fss);
		mainContext.rect(sx - fss * 1, sy, fss * 2 , fss * 2);
		mainContext.rect(sx + fss * 3, sy, fss * 1 , fss * 1);
		mainContext.fill();
		
		//ear
		//mouth blood
		mainContext.beginPath();
		mainContext.fillStyle = "#722121";
		mainContext.rect(sx - fss * 1, sy + fss * 2, fss * 1, fss * 2);
		mainContext.rect(sx + fss * 2.7, sy + fss * 5, fss * 0.8, fss * 1);
		mainContext.fill();
	};
	
	this.drawS_body = function(sx, sy, bws, bhs) {
		
		var bwss = bws / 5;
		var bhss = bhs / 5;
		mainContext.beginPath();
		mainContext.fillStyle = "#e2a804";
		mainContext.rect(sx, sy, bws, bhs);
		mainContext.fill();
	};
	
	this.drawSE_body = function(sx, sy, bws, bhs) {
		
		var bwss = bws / 5;
		var bhss = bhs / 5;
		mainContext.beginPath();
		mainContext.fillStyle = "lightgreen";
		mainContext.rect(sx, sy, bws, bhs);
		mainContext.fill();
		
		mainContext.beginPath();
		for (var c = 0; c < 5; c++) {
			for (var r = 0; r < 5; r++) {
				var rand = Math.random() * 100;
				if (rand > 90) {
					mainContext.fillStyle = "red";
					mainContext.fillRect(sx + bwss * c, sy + bhss * r, bwss, bhss);
				} else if (rand > 80) {
					mainContext.fillStyle = "purple";
					mainContext.fillRect(sx + bwss * c, sy + bhss * r, bwss, bhss);
				}					
			}
		}
		
		var aws = bws / 4;
		var ahs = bhs;
		sx -= bwss * 0.5
		
		//arm right
		mainContext.beginPath();
		mainContext.fillStyle = "#9a7200";
		mainContext.fillRect(sx, sy, aws, aws);
		mainContext.fillRect(sx + aws * 0.5, sy + aws * 0.5, aws, aws);
		mainContext.fillRect(sx + aws * 1.5, sy + aws * 1, aws, aws);
		mainContext.fillStyle = "black";
		mainContext.fillRect(sx + aws * 2.5, sy + aws * 1.5, aws, aws);
		
		sx += bws;// - bwss * 0.5;
		//arm left
		mainContext.beginPath();
		mainContext.fillStyle = "#9a7200";
		mainContext.fillRect(sx, sy, aws, aws);
		mainContext.fillRect(sx + aws * 0.5, sy + aws * 0.5, aws, aws);
		mainContext.fillRect(sx + aws * 1.5, sy + aws * 1, aws, aws);
		mainContext.fillStyle = "black";
		mainContext.fillRect(sx + aws * 2, sy + aws * 1.3, aws, aws);
		
		
		//leg
		var lws = bws / 3;
		var lhs = bhs;
		
		sx -= bws;
		sy += bhs;
		
		mainContext.fillStyle = "green";
		mainContext.fillRect(sx, sy, lws * 1.4, lhs * 0.3);
		
		mainContext.fillStyle = "green";
		mainContext.fillRect(sx + lws * 1.5, sy, lws * 2, lhs * 0.3);
		
		mainContext.fillStyle = "#9a7200";
		mainContext.fillRect(sx + lws * 0.3, sy + lhs * 0.3, lws * 0.6, lhs * 0.7 );
		mainContext.fillRect(sx + lws, sy + lhs - lws * 0.5, lws, lws);		

		sx += (lws * 2);
		
		mainContext.fillRect(sx, sy + lhs * 0.3, lws * 0.6, lhs * 0.7 );
		mainContext.fillRect(sx + lws, sy + lhs - lws / 2, lws, lws);		
	};
	
	this.drawSE = function(startX, startY, width, height) {
		
		var sx = startX;
		var sy = startY;
		
		//face
		var fs = width / 2;
		sx = startX + (width - fs) / 2;
		sy += 0;
	
		this.drawSE_face(sx, sy, fs, "#e2a804");
		
		//nack
		var ns = fs / 5;
		sx = startX + (width - ns * 3) / 2;
		sy += fs / 5 * 6;
		
		mainContext.beginPath();
		mainContext.fillStyle = "#9a7200";
		mainContext.rect(sx, sy, ns, ns);
		mainContext.fill();
		
		//body
		var bws = width / 3;
		var bhs = height / 3;
		sx = startX + (width - bws * 1.6) / 2;
		sy += ns;
		
		this.drawSE_body(sx, sy, bws, bhs);
		return;
	};
	
} 

