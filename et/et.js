var dMap = {}; //drawItem map

var cMap = {}; //controller map

var sInfo = {}; //reflow 유발하는 정보 

window.addEventListener("resize", function(e) {
	et.changeCanvasSize();
});

var et = {
	
	CURRENT_MODE : "MODE_NONE",
	MODE_NONE : "MODE_NONE",
	MODE_MAKE : "MODE_MAKE",
	MODE_RESIZE : "MODE_RESIZE",
	MODE_MOVE : "MODE_MOVE",
	MODE_SELECTED : "MODE_SELECTED",
	MODE_PARALL_MOVE_POINT : "MODE_PARALL_MOVE_POINT", //평행사변형 내부 점 이동
	MODE_AREA_SELECTION : "MODE_AREA_SELECTION",
	MODE_EMPTY_CLICK : "MODE_EMPTY_CLICK", //empty page click
	
	MAKE_COMPONENT_TYPE : "",
	
	CP_RECT : "CP_RECT", // 사각형
	CP_PARALL : "CP_PARALL", //평행 사변형
	CP_PARALL2 : "CP_PARALL2", //평행 사변형2
	CP_PARALL4 : "CP_PARALL4",
	CP_CUBE : "CP_CUBE",
	CP_TRIANGLE : "CP_TRIANGLE",
	CP_LINE : "CP_LINE",
	CP_GROUP : "CP_GROUP",
	CP_TREE : " CP_TREE",
	
	getComponentList : function() {
		return { 
			"rect1" : et.CP_RECT, 
			"rect2" : et.CP_PARALL,
			"rect3" : et.CP_PARALL2,
			"rect5" : et.CP_PARALL4,
			"cube" : et.CP_CUBE,
			"triangle" : et.CP_TRIANGLE,
			"line" : et.CP_LINE,
			"tree" : et.CP_TREE,
			//"group" : et.CP_GROUP,
		};
	},
	
	canvas : {
		land : document.getElementById("landCanvas")
		, main : document.getElementById("mainCanvas")
	},
	
	context : {
		land : document.getElementById("landCanvas").getContext("2d")
		, main : document.getElementById("mainCanvas").getContext("2d")
	},
	
	mainContainer : document.getElementById("editorMain"),
	adornerLayer : document.getElementById("adornerLayer"),

	/*
	* controlUnit
	*/
	ctrlUnit : {},
		
	init : function() { 
		var canvasWidth = et.canvas.land.getAttribute("width");
		var canvasHeight = et.canvas.land.getAttribute("height");
		et.ctrlUnit["canvas-width-unit"].value = parseInt(canvasWidth);
		et.ctrlUnit["canvas-height-unit"].value = parseInt(canvasHeight);
		
		cMap[et.CP_RECT] = cp_rect;
		cMap[et.CP_PARALL] = cp_parall;
		cMap[et.CP_PARALL2] = cp_parall2;
		cMap[et.CP_PARALL4] = cp_parall4;
		cMap[et.CP_CUBE] = cp_cube;
		cMap[et.CP_TRIANGLE] = cp_triangle;
		cMap[et.CP_LINE] = cp_line;
		cMap[et.CP_GROUP] = cp_group;
		cMap[et.CP_TREE] = cp_tree;
		et.changeCanvasSize();
	},
	
	initEvent : function() {
		
		var copyMap = {};
		
		document.addEventListener("keydown", function(e) {
			var ctrl = e.ctrlKey;
			var shift = e.shiftKey;
			switch (e.which) {
				case 67: //c
					break;
				case 86: //v
					break;
				case 46: //del
					break;
				case 83: //s
					if (ctrl) e.preventDefault();
					break;
				case 76: //l
					if (ctrl) e.preventDefault();
					break;
				case 90: //z undo
					if (ctrl) workManager.undo();
					break;
				case 89: //y redo
					if (ctrl) workManager.redo();
					break;
			}
		});
		
		document.addEventListener("keyup", function(e) {
			var ctrl = e.ctrlKey;
			var shift = e.shiftKey;
			console.log("document : " + e.which + " ctrl : " + ctrl + " shift : " + shift);
			switch (e.which) {
				case 67: //c
					if (ctrl) {
						itemManager.copyItem();
					}
					break;
				case 86: //v
					if (ctrl) {
						itemManager.pasteItem();
					}
					break;
				case 46: //del
					itemManager.deleteItem();
					break;
				case 83: //s
					if (ctrl) {
						fileManager.save();
					}
					break;
				case 76 : //l
					if (ctrl) {
						fileManager.load();
					}
					break;
			}
		});
	},
	
	makeTool : function() {
		
		var toolNode = document.createElement("div");
		var styleStr = "position:fixed;";
		styleStr += ";background:lightskyblue;width:20%;height:20%;left:80%;top:0%;"
		toolNode.style = styleStr;
		et.mainContainer.appendChild(toolNode);
		
		var wInput = document.createElement("input");
		wInput.setAttribute("type", "text");
		wInput.style.width = "50px";
		wInput.style.margin = "10px";
		toolNode.appendChild(wInput);
		var hInput = document.createElement("input");
		hInput.setAttribute("type", "text");
		hInput.style.width = "50px";
		hInput.style.margin = "10px";
		toolNode.appendChild(hInput);
		
		et.ctrlUnit["canvas-width-unit"] = wInput;
		et.ctrlUnit["canvas-height-unit"] = hInput;
		
		var applyBtn = document.createElement("a");
		applyBtn.setAttribute("href", "#");
		applyBtn.style = "margin:10px;"
		var textNode = document.createTextNode("apply");
		applyBtn.appendChild(textNode);
		toolNode.appendChild(applyBtn);
		
		//group
		var groupBtn = document.createElement("a");
		groupBtn.setAttribute("href", "#");
		groupBtn.style = "margin:10px;"
		groupBtn.appendChild(document.createTextNode("group"));
		toolNode.appendChild(groupBtn);
		//ungroup
		var unGroupBtn = document.createElement("a");
		unGroupBtn.setAttribute("href", "#");
		unGroupBtn.style = "margin:10px;"
		unGroupBtn.appendChild(document.createTextNode("ungroup"));
		toolNode.appendChild(unGroupBtn);
		
		applyBtn.addEventListener("click", function() {
			et.changeCanvasSize();
		});
		
		groupBtn.addEventListener("click", function() {
			var itemList = adorner.getSelectedItemList();
			itemManager.makeGroupItem(itemList);
		});
		
		unGroupBtn.addEventListener("click", function() {
			var itemList = adorner.getSelectedItemList();
			itemManager.releaseGroupItem(itemList);
		});
	},
	
	changeCanvasSize : function() {
		
		var canvasWidth = parseInt(et.ctrlUnit["canvas-width-unit"].value);
		var canvasHeight = parseInt(et.ctrlUnit["canvas-height-unit"].value);
		
		et.canvas.land.setAttribute("width", canvasWidth + "px");
		et.canvas.land.setAttribute("height", canvasHeight + "px");
		et.canvas.main.setAttribute("width", canvasWidth + "px");
		et.canvas.main.setAttribute("height", canvasHeight + "px");
		
		if (window.innerWidth <= canvasWidth) {
			et.mainContainer.style.width = canvasWidth + 10 + "px";
			et.adornerLayer.style.width = canvasWidth + 10 + "px";
			et.canvas.land.style.left = "10px";
			et.canvas.main.style.left = "10px";
		} else {
			et.canvas.land.style.left = "calc(50% - " + (canvasWidth / 2) + "px)";
			et.canvas.main.style.left = "calc(50% - " + (canvasWidth / 2) + "px)";
		}
		
		if (window.innerHeight <= canvasHeight) {
			et.mainContainer.style.height = canvasHeight + 10 + "px";
			et.adornerLayer.style.height = canvasHeight + 10 + "px";
			et.canvas.land.style.top = "10px";
			et.canvas.main.style.top = "10px";
		} else {
			et.canvas.land.style.top = "calc(50% - " + (canvasHeight / 2) + "px)";
			et.canvas.main.style.top = "calc(50% - " + (canvasHeight / 2) + "px)";
		}
		
		sInfo["dw"] = canvasWidth;
		sInfo["dh"] = canvasHeight;
		sInfo["dx"] = et.canvas.land.offsetLeft;
		sInfo["dy"] = et.canvas.land.offsetTop;
		//redrawAll
		
		drawer.drawAll();
	},
	
	makeComponentTool : function() {
		var componentDiv = document.createElement("div");
		var styleStr = "position:fixed;";
		styleStr += ";background:beige;width:20%;height:20%;left:80%;top:20%;"
		componentDiv.style = styleStr;
		et.mainContainer.appendChild(componentDiv);
		
		var componentList = et.getComponentList();
		
		var cKeys = Object.keys(componentList);
		var fc = document.createDocumentFragment();
		for (var i = 0; i < cKeys.length; i++) {
			var cKey = cKeys[i];
			var cVal = componentList[cKey];
			var cuNode = document.createElement("a");
			var cvNode = document.createTextNode(cKey);
			
			cuNode.style = "margin:5px;float:left;"
			cuNode.setAttribute("href", "#");
			cuNode.setAttribute("c-type", cVal);
			
			cuNode.appendChild(cvNode);
			fc.appendChild(cuNode);
			et.makeComponentTool_addComponentEvent(cuNode);
		}
		componentDiv.appendChild(fc);
	},
	
	makeComponentTool_addComponentEvent : function(componentNode) {
		componentNode.addEventListener("click", function(e) {
			var componentType = e.target.getAttribute("c-type");
			et.MAKE_COMPONENT_TYPE = componentType;
			et.CURRENT_MODE = et.MODE_MAKE;
		});
	},
	
	
};

var adorner = {
	
	segSize : 8,
	segStyle : undefined,
	
	ptColor : "brown",
	ptSize : 8,
	ptStyle : undefined,
	
	areaSelector : undefined,
	
	initAreaSelector : function() {
		if (adorner.areaSelector == undefined) {
			var areaSelector = document.createElement("div");
			areaSelector.style = "position:absolute;border:1px solid blue;background:rgba(0, 0, 255, 0.1);left:0px;top:0xp;width:0px;height:0px;";
			et.adornerLayer.appendChild(areaSelector);
			adorner.areaSelector = areaSelector;
		} else {
			adorner.areaSelector.style.width = "0px";
			adorner.areaSelector.style.height = "0px";
			adorner.areaSelector.style.left = "0px";
			adorner.areaSelector.style.top = "0px";
		}
	},
	
	getSegStyle : function() {
		if (adorner.segStyle == undefined) {
			adorner.segStyle = "cursor:pointer;position:absolute;width:" + adorner.segSize + "px;height:" + adorner.segSize + "px;background:red;";
		}
		return adorner.segStyle;
	},
	
	getPointStyle : function() {
		if (adorner.ptStyle == undefined) {
			adorner.ptStyle = "cursor:pointer;position:absolute;width:" + adorner.ptSize + "px;height:" + adorner.ptSize + "px;background:" + adorner.ptColor + ";";
		}
		return adorner.ptStyle;
	},
	
	
	makeEmptyAdorner: function (itemProperty) {
		var defaultSegStyle = adorner.getSegStyle();
		var fragment = document.createDocumentFragment();
		var borderDiv = document.createElement("div");
		borderDiv.style = "position:absolute;box-sizing:border-box;width:100px;height:100px;border:1px solid red";
		borderDiv.setAttribute("name", "adorner");
		borderDiv.setAttribute("target", itemProperty.basic.key);
		fragment.appendChild(borderDiv);
		adornerLayer.appendChild(fragment);
		return borderDiv;
	},
	
	makeDefaultAdorner : function(itemProperty) {
		var defaultSegStyle = adorner.getSegStyle();
		var fragment = document.createDocumentFragment();
		var borderDiv = document.createElement("div");
		var nwDiv = document.createElement("div");
		var neDiv = document.createElement("div");
		var swDiv = document.createElement("div");
		var seDiv = document.createElement("div");
		
		borderDiv.style = "position:absolute;box-sizing:border-box;width:100px;height:100px;border:1px solid red";
		nwDiv.style = defaultSegStyle + "left:-" + adorner.segSize + "px;top:-" + adorner.segSize + "px;";
		neDiv.style = defaultSegStyle + "left:100%;top:-" + adorner.segSize + "px;";
		swDiv.style = defaultSegStyle + "left:-" + adorner.segSize + "px;top:100%;";
		seDiv.style = defaultSegStyle + "left:100%;top:100%;";
		
		borderDiv.setAttribute("name", "adorner");
		borderDiv.setAttribute("target", itemProperty.basic.key);
		nwDiv.setAttribute("unit", "size-nw");
		neDiv.setAttribute("unit", "size-ne");
		swDiv.setAttribute("unit", "size-sw");
		seDiv.setAttribute("unit", "size-se");
		
		fragment.appendChild(borderDiv);
		borderDiv.appendChild(nwDiv);
		borderDiv.appendChild(neDiv);
		borderDiv.appendChild(swDiv);
		borderDiv.appendChild(seDiv);
		adornerLayer.appendChild(fragment);
		return borderDiv;
	},
	
	
	makeParallAdorner : function(itemProperty) {
		var itemAdorner = adorner.makeDefaultAdorner(itemProperty);
		var pointStyle = adorner.getPointStyle();
		var p1Div = document.createElement("div");
		var pPos = itemProperty.point.p;
		var w = itemProperty.basic.w;
		var h = itemProperty.basic.h;
		var p1Direction = itemProperty.point.d;
		var wPos = w * pPos / 100;
		var hPos = h * pPos / 100;
		
		switch (p1Direction) {
			case "hl":
				p1Div.style = pointStyle + "left:-" + adorner.ptSize * 1.5 + "px;top:" + hPos + "px;margin-top:-" + adorner.ptSize / 2 + "px;";
				break;
			case "hr":
				p1Div.style = pointStyle + "left:100%;top:" + hPos + "px;margin-top:-" + adorner.ptSize / 2 + "px;";
				break;
			case "vb":
				p1Div.style = pointStyle + "left:" + wPos + "px;top:100%;margin-left:-" + adorner.ptSize / 2 + "px;";
				break;
			case "vt":
				p1Div.style = pointStyle + "left:" + wPos + "px;top:-" + adorner.ptSize * 1.5 + "px;margin-left:-" + adorner.ptSize / 2 + "px;";
			break;
		}
		p1Div.setAttribute("unit", "parall-1");
		itemAdorner.appendChild(p1Div);
		return itemAdorner;
	},
	
	makeParall2Adorner : function(itemProperty) {
		var itemAdorner = adorner.makeDefaultAdorner(itemProperty);
		var pointStyle = adorner.getPointStyle();
		var hDiv = document.createElement("div");
		var vDiv = document.createElement("div");
		var vs = itemProperty.point.vp;
		var hs = itemProperty.point.hp;
		var w = itemProperty.basic.w;
		var h = itemProperty.basic.h;
		
		var wPos = w * hs / 100;
		var hPos = h * vs / 100;
		
		hDiv.style = pointStyle + "left:" + wPos + "px;top:-" + adorner.ptSize * 1.5 + "px;margin-left:-" + adorner.ptSize / 2 + "px;";
		vDiv.style = pointStyle + "top:" + hPos + "px;left:-" + adorner.ptSize * 1.5 + "px;margin-top:-" + adorner.ptSize /2 + "px;";
	
		hDiv.setAttribute("unit", "parall-h");
		vDiv.setAttribute("unit", "parall-v");
		itemAdorner.appendChild(hDiv);
		itemAdorner.appendChild(vDiv);
		return itemAdorner;
	},
	
	makeParall4Adorner : function(itemProperty) {
		var itemAdorner = adorner.makeDefaultAdorner(itemProperty);
		var pointStyle = adorner.getPointStyle();
		var p1Div = document.createElement("div");
		var p2Div = document.createElement("div");
		var p3Div = document.createElement("div");
		var p4Div = document.createElement("div");
		
		var w = itemProperty.basic.w;
		var h = itemProperty.basic.h;
		
		var p1x = w * itemProperty.point.p1.x / 100;
		var p1ml = -adorner.ptSize / 2;
		var p1y = -adorner.ptSize;
		
		var p2x = w;
		var p2y = h * itemProperty.point.p2.y / 100;
		var p2mt =  -adorner.ptSize / 2;
		
		var p3x = w * itemProperty.point.p3.x / 100;
		var p3ml = -adorner.ptSize / 2;
		var p3y = h;
		
		var p4x = -adorner.ptSize;
		var p4y = h * itemProperty.point.p4.y / 100;
		var p4mt =  - adorner.ptSize / 2;
		
		p1Div.style = pointStyle + adorner.__makePointStyle(p1x, p1y, p1ml, undefined);
		p2Div.style = pointStyle + adorner.__makePointStyle(p2x, p2y, undefined, p2mt);
		p3Div.style = pointStyle + adorner.__makePointStyle(p3x, p3y, p3ml, undefined);
		p4Div.style = pointStyle + adorner.__makePointStyle(p4x, p4y, undefined, p4mt);
		
		p1Div.setAttribute("unit", "parall-p1");
		p2Div.setAttribute("unit", "parall-p2");
		p3Div.setAttribute("unit", "parall-p3");
		p4Div.setAttribute("unit", "parall-p4");
		itemAdorner.appendChild(p1Div);
		itemAdorner.appendChild(p2Div);
		itemAdorner.appendChild(p3Div);
		itemAdorner.appendChild(p4Div);
		return itemAdorner;
	},
	
	
	makeLineAdorner : function(itemProperty) {
		var itemAdorner = adorner.makeEmptyAdorner(itemProperty);
		var pointStyle = adorner.getPointStyle();
		var l1Div = document.createElement("div");
		var l2Div = document.createElement("div");
		
		var w = itemProperty.basic.w;
		var h = itemProperty.basic.h;
		var point = itemProperty.point;
		
		var l1x = point.lpx1.x;
		var l1y = point.lpx1.y;
		var l2x = point.lpx2.x;
		var l2y = point.lpx2.y;
		
		var mg = - adorner.ptSize / 2;
		l1Div.style = pointStyle + adorner.__makePointStyle(l1x, l1y, mg, mg);
		l2Div.style = pointStyle + adorner.__makePointStyle(l2x, l2y, mg, mg);
		l1Div.setAttribute("unit", "line-lpx1");
		l2Div.setAttribute("unit", "line-lpx2");
		itemAdorner.appendChild(l1Div);
		itemAdorner.appendChild(l2Div);
		return itemAdorner;
	},
	
	adjustTriangleSeg : function(itemAdorner, itemProperty) {
		var w = itemProperty.basic.w;
		var h = itemProperty.basic.h;
		var point = itemProperty.point;
		adorner.__adjustSeg(itemAdorner, "triangle-t1", point.t1, w, h);
		adorner.__adjustSeg(itemAdorner, "triangle-t2", point.t2, w, h);
		adorner.__adjustSeg(itemAdorner, "triangle-t3", point.t3, w, h);
	},
	
	makeTriangleAdorner : function(itemProperty) {
		var itemAdorner = adorner.makeDefaultAdorner(itemProperty);
		var pointStyle = adorner.getPointStyle();
		var t1Div = document.createElement("div");
		var t2Div = document.createElement("div");
		var t3Div = document.createElement("div");
		
		var w = itemProperty.basic.w;
		var h = itemProperty.basic.h;
		var point = itemProperty.point;
		
		var t1x = w * point.t1.x / 100;
		var t1y = h * point.t1.y / 100;
		var t2x = w * point.t2.x / 100;
		var t2y = h * point.t2.y / 100;
		var t3x = w * point.t3.x / 100;
		var t3y = h * point.t3.y / 100;
		
		var mg = - adorner.ptSize / 2;
		t1Div.style = pointStyle + adorner.__makePointStyle(t1x, t1y, mg, mg);
		t2Div.style = pointStyle + adorner.__makePointStyle(t2x, t2y, mg, mg);
		t3Div.style = pointStyle + adorner.__makePointStyle(t3x, t3y, mg, mg);
		t1Div.setAttribute("unit", "triangle-t1");
		t2Div.setAttribute("unit", "triangle-t2");
		t3Div.setAttribute("unit", "triangle-t3");
		itemAdorner.appendChild(t1Div);
		itemAdorner.appendChild(t2Div);
		itemAdorner.appendChild(t3Div);
		return itemAdorner;
	},

	makeCubeAdorner : function(itemProperty) {

		var itemAdorner = adorner.makeDefaultAdorner(itemProperty);
		var pointStyle = adorner.getPointStyle();
		var l1Div = document.createElement("div");
		var l2Div = document.createElement("div");
		var m1Div = document.createElement("div");
		var m2Div = document.createElement("div");
		var m3Div = document.createElement("div");
		var r1Div = document.createElement("div");
		var r2Div = document.createElement("div");

		var w = itemProperty.basic.w;
		var h = itemProperty.basic.h;
		var point = itemProperty.point;
		
		var l1x = w * point.l1.x / 100;
		var l1y = h * point.l1.y / 100;
		var l2x = w * point.l2.x / 100;
		var l2y = h * point.l2.y / 100;
	
		var m1x = w * point.m1.x / 100;
		var m1y = h * point.m1.y / 100;
		var m2x = w * point.m2.x / 100;
		var m2y = h * point.m2.y / 100;
		var m3x = w * point.m3.x / 100;
		var m3y = h * point.m3.y / 100;
	
		var r1x = w * point.r1.x / 100;
		var r1y = h * point.r1.y / 100;
		var r2x = w * point.r2.x / 100;
		var r2y = h * point.r2.y / 100;

		var mg = - adorner.ptSize / 2;

		l1Div.style = pointStyle + adorner.__makePointStyle(l1x, l1y, mg, mg);
		l2Div.style = pointStyle + adorner.__makePointStyle(l2x, l2y, mg, mg);
		m1Div.style = pointStyle + adorner.__makePointStyle(m1x, m1y, mg, mg);
		m2Div.style = pointStyle + adorner.__makePointStyle(m2x, m2y, mg, mg);
		m3Div.style = pointStyle + adorner.__makePointStyle(m3x, m3y, mg, mg);
		r1Div.style = pointStyle + adorner.__makePointStyle(r1x, r1y, mg, mg);
		r2Div.style = pointStyle + adorner.__makePointStyle(r2x, r2y, mg, mg);

		l1Div.setAttribute("unit", "parall-l1");
		l2Div.setAttribute("unit", "parall-l2");
		m1Div.setAttribute("unit", "parall-m1");
		m2Div.setAttribute("unit", "parall-m2");
		m3Div.setAttribute("unit", "parall-m3");
		r1Div.setAttribute("unit", "parall-r1");
		r2Div.setAttribute("unit", "parall-r2");
	
		itemAdorner.appendChild(l1Div);
		itemAdorner.appendChild(l2Div);
		itemAdorner.appendChild(m1Div);
		itemAdorner.appendChild(m2Div);
		itemAdorner.appendChild(m3Div);
		itemAdorner.appendChild(r1Div);
		itemAdorner.appendChild(r2Div);
		return itemAdorner;
		
	},
	
	adjustCubeSeg : function(itemAdorner, itemProperty) {
		var w = itemProperty.basic.w;
		var h = itemProperty.basic.h;
		var point = itemProperty.point;
		adorner.__adjustSeg(itemAdorner, "parall-l1", point.l1, w, h);
		adorner.__adjustSeg(itemAdorner, "parall-l2", point.l2, w, h);
		adorner.__adjustSeg(itemAdorner, "parall-m1", point.m1, w, h);
		adorner.__adjustSeg(itemAdorner, "parall-m2", point.m2, w, h);
		adorner.__adjustSeg(itemAdorner, "parall-m3", point.m3, w, h);
		adorner.__adjustSeg(itemAdorner, "parall-r1", point.r1, w, h);
		adorner.__adjustSeg(itemAdorner, "parall-r2", point.r2, w, h);
	},
	
	__adjustSeg : function(itemAdorner, segName, point, w, h) {
		var segDiv = itemAdorner.querySelector("[unit=" + segName + "]");
		segDiv.style.left = (w * point.x / 100) + "px";
		segDiv.style.top = (h * point.y / 100) + "px";
	},
	
	__makePointStyle : function(x, y, marginLeft, marginTop) {
		var result = "left:" + x + "px;top:" + y + "px;";
		if (marginLeft != undefined) {
			result += "margin-left:" + marginLeft + "px;";
		}
		if (marginTop != undefined) {
			result += "margin-top:" + marginTop + "px;";
		}
		return result;
	},
	
	mousePositionToCanvasPosition : function(mouseX, mouseY) {
		var canvasLeft = sInfo["dx"];
		var canvasTop = sInfo["dy"];
		return [mouseX - canvasLeft, mouseY - canvasTop];
	},
	
	canvasPositionToPagePosition : function(canvasX, canvasY) {
		var canvasLeft = sInfo["dx"];
		var canvasTop = sInfo["dy"];
		return [canvasX + canvasLeft, canvasY + canvasTop];
	},
	
	getTopZIndex : function() {
		var keys = Object.keys(dMap);
		var maxZIndex = 0;
		for (var i = 0; i < keys.length; i++) {
			var zIndex = dMap[keys[i]]["basic"]["z"];
			if (zIndex > maxZIndex) {
				maxZIndex = zIndex;
			}
		}
		return maxZIndex + 1;
	},
	
	currentUnit : undefined,
	currentUnitInfo : undefined,
	prevMouseX : -1,
	prevMouseY : -1,
	mouseDownX : -1,
	mouseDownY : -1,
	
	initEvent : function() {
		
		/************************************************************************************
		* mouse down
		************************************************************************************/
		et.adornerLayer.addEventListener("mousedown", function(e) {
			
			adorner.mouseDownX = adorner.prevMouseX = e.pageX;
			adorner.mouseDownY = adorner.prevMouseY = e.pageY;
			
			var unitInfo = adorner.getUnitInfo(e.target);
			if (unitInfo != undefined) {
				switch (unitInfo[0]) {
					case "size":
						et.CURRENT_MODE = et.MODE_RESIZE;
						break;
					case "parall":
						et.CURRENT_MODE = et.MODE_PARALL_MOVE_POINT;
						break;
					case "triangle":
						et.CURRENT_MODE = et.MODE_PARALL_MOVE_POINT;
						break;
					case "line":
						et.CURRENT_MODE = et.MODE_PARALL_MOVE_POINT;
						break;
						
				}
			}
			
			switch (et.CURRENT_MODE) {
				case et.MODE_NONE:
					var shiftKey = e.shiftKey;
					var itemKey = hitChecker.check(e);
					var prevSel = adorner.checkAlreadySelected(itemKey);
					if (prevSel) {
						if (shiftKey) {
							adorner.removeAdorner(itemKey);
						}
						et.CURRENT_MODE = et.MODE_SELECTED;
					} else if (itemKey != undefined) {
						if (!shiftKey) {
							adorner.removeAdornerAll();
						}
						adorner.showAdorner(e, itemKey);
						et.CURRENT_MODE = et.MODE_SELECTED;
					} else {
						adorner.removeAdornerAll();
						et.CURRENT_MODE = et.MODE_EMPTY_CLICK;
					}
					break;
				case et.MODE_RESIZE:
					adorner.currentUnit = e.target;
					adorner.currentUnitInfo = unitInfo;
					adorner.resizeAdornerAsMove(e, true);
					break;
				case et.MODE_PARALL_MOVE_POINT:
					adorner.currentUnit = e.target;
					adorner.currentUnitInfo = unitInfo;
					break;
			}
		}, true);
		
			
		/************************************************************************************
		* mouse move
		************************************************************************************/
		et.adornerLayer.addEventListener("mousemove", function(e) {
			//console.log(et.CURRENT_MODE);
			switch (et.CURRENT_MODE) {
				case et.MODE_PARALL_MOVE_POINT:
					adorner.moveAdornerParallPoint(e);
					break;
				case et.MODE_SELECTED:
					et.CURRENT_MODE = et.MODE_MOVE;
					adorner.moveAdornerAsMove(e, true);
					break;
				case et.MODE_RESIZE:
					adorner.resizeAdornerAsMove(e);
					break;
				case et.MODE_MOVE:
					adorner.moveAdornerAsMove(e);
					break;
				case et.MODE_EMPTY_CLICK:
					et.CURRENT_MODE = et.MODE_AREA_SELECTION;
					adorner.showAreaSelection(e);
					break;
				case et.MODE_AREA_SELECTION:
					adorner.adjustAreaSelection(e);
					break;
			}
			
			adorner.prevMouseX = e.pageX;
			adorner.prevMouseY = e.pageY;
		}, true);
		
		
		/************************************************************************************
		* mouse up
		************************************************************************************/
		et.adornerLayer.addEventListener("mouseup", function(e) {
			switch (et.CURRENT_MODE) {
				case et.MODE_MAKE: 
					itemManager.makeItem(e); 
					break;
				case et.MODE_PARALL_MOVE_POINT: 
					adorner.moveItemToParallPoint(e); 
					break;
				case et.MODE_MOVE: 
					adorner.moveItemToAdorner(e);
					break;
				case et.MODE_RESIZE:
					adorner.resizeItemToAdorner(e);
					break;
				case et.MODE_AREA_SELECTION:
					var hittedList = hitChecker.checkArea(e);
					adorner.removeAdornerAll();
					adorner.showAdorner(e, hittedList);
					adorner.hideAreaSelection(e);
					break;
			}
			
			et.CURRENT_MODE = et.MODE_NONE;
			adorner.currentUnit = undefined;
			adorner.currentUnitInfo = undefined;
			adorner.mouseDownX = adorner.prevMouseX = -1;
			adorner.mouseDownY = adorner.prevMouseY = -1;
			
			var adornerArr = document.getElementsByName("adorner");
			if (adornerArr.length > 0) {
				propertyManager.showPropertyByAdorner(adornerArr[0]);
			}
		}, true);
	},
	
	showAreaSelection : function(e) {
		adorner.initAreaSelector();
		adorner.areaSelector.style.left = e.pageX + "px";
		adorner.areaSelector.style.top = e.pageY + "px";
		adorner.areaSelector.style.display = "block";
	},
	
	hideAreaSelection : function(e) {
		adorner.areaSelector.style.display = "none";
	},
	
	adjustAreaSelection : function(e) {
		var nextLeft = parseInt(adorner.areaSelector.style.left);
		var nextTop = parseInt(adorner.areaSelector.style.top);
		var nextWidth = e.pageX - adorner.mouseDownX;
		var nextHeight = e.pageY - adorner.mouseDownY;
		
		if (nextWidth < 0) {
			nextLeft = e.pageX;
			nextWidth = Math.abs(nextWidth);
		}
		
		if (nextHeight < 0) {
			nextTop = e.pageY;
			nextHeight = Math.abs(nextHeight);
		}
		
		adorner.areaSelector.style.left = nextLeft + "px";
		adorner.areaSelector.style.top = nextTop + "px";
		adorner.areaSelector.style.width = (nextWidth) + "px";
		adorner.areaSelector.style.height = (nextHeight) + "px";
	},
	
	checkAlreadySelected : function(itemKey) {
		var itemElement = et.adornerLayer.querySelector("[target=" + itemKey + "]");
		return itemElement != undefined;
	},
	
	resizeAdornerAsMove : function(e, isBegin) {
		
		if (adorner.currentUnitInfo == undefined) return;
		
		var adornerArr = document.getElementsByName("adorner");
		if (isBegin) {
			adorner.adornerUnitVisible(adornerArr, false);
		}
		
		var moveX = e.pageX - adorner.prevMouseX;
		var moveY = e.pageY - adorner.prevMouseY;
		for (var k = 0; k < adornerArr.length; k++) {
			var itemAdorner = adornerArr[k];
			var cWidth = parseInt(itemAdorner.style.width);
			var cHeight = parseInt(itemAdorner.style.height);
			var cLeft = parseInt(itemAdorner.style.left);
			var cTop = parseInt(itemAdorner.style.top);
			
			switch(adorner.currentUnitInfo[1]) {
				case "nw":
					itemAdorner.style.left = (cLeft + moveX) + "px";
					itemAdorner.style.top = (cTop + moveY) + "px";
					itemAdorner.style.width = (cWidth - moveX) + "px";
					itemAdorner.style.height = (cHeight - moveY) + "px";
					break;
				case "ne":
					itemAdorner.style.top = (cTop + moveY) + "px";
					itemAdorner.style.width = (cWidth + moveX) + "px";
					itemAdorner.style.height = (cHeight - moveY) + "px";
					break;
				case "sw":
					itemAdorner.style.left = (cLeft + moveX) + "px";
					itemAdorner.style.width = (cWidth - moveX) + "px";
					itemAdorner.style.height = (cHeight + moveY) + "px";
					break;
				default:
					itemAdorner.style.width = (cWidth + moveX) + "px";
					itemAdorner.style.height = (cHeight + moveY) + "px";
					break;
			}
		
		}
	},
	
	resizeItemToAdorner : function(e) {
		var adornerArr = document.getElementsByName("adorner");
		for (var k = 0; k < adornerArr.length; k++) {
			var itemAdorner = adornerArr[k];
			var itemKey = itemAdorner.getAttribute("target");
			var itemProperty = dMap[itemKey];
			var itemType = itemProperty.basic.t;
			var itemController = cMap[itemType];
			
			var cWidth = parseInt(itemAdorner.style.width);
			var cHeight = parseInt(itemAdorner.style.height);
			var cLeft = parseInt(itemAdorner.style.left);
			var cTop = parseInt(itemAdorner.style.top);
			var pos = adorner.mousePositionToCanvasPosition(cLeft, cTop);
			itemManager.setProperty(itemKey, itemProperty, "basic", "w" , cWidth, k == 0 ? workManager.REC_FIRST : workManager.REC_LINKED);
			itemManager.setProperty(itemKey, itemProperty, "basic", "h" , cHeight, workManager.REC_LINKED);
			itemManager.setProperty(itemKey, itemProperty, "basic", "x" , pos[0], workManager.REC_LINKED);
			itemManager.setProperty(itemKey, itemProperty, "basic", "y" , pos[1], workManager.REC_LINKED);
			drawer.drawItem(itemKey);
		}
		
		adorner.adornerUnitVisible(adornerArr, true);
		adorner.unitPointToResizedItem(adornerArr);
	},
	
	moveAdornerAsMove : function(e, isBegin) {
		var adornerArr = document.getElementsByName("adorner");
		if (isBegin) {
			adorner.adornerUnitVisible(adornerArr, false);
		}
		var moveX = e.pageX - adorner.prevMouseX;
		var moveY = e.pageY - adorner.prevMouseY;
		for (var k = 0; k < adornerArr.length; k++) {
			var itemAdorner = adornerArr[k];
			var cLeft = parseInt(itemAdorner.style.left);
			var cTop = parseInt(itemAdorner.style.top);
			itemAdorner.style.left = (cLeft + moveX) + "px";
			itemAdorner.style.top = (cTop + moveY) + "px";
		}
	},
	
	moveItemToAdorner : function(e) {
		var adornerArr = document.getElementsByName("adorner");
		for (var k = 0; k < adornerArr.length; k++) {
			var itemAdorner = adornerArr[k];
			var itemKey = itemAdorner.getAttribute("target");
			var itemProperty = dMap[itemKey];
			var itemType = itemProperty.basic.t;
			var itemController = cMap[itemType];
			
			var cLeft = parseInt(itemAdorner.style.left);
			var cTop = parseInt(itemAdorner.style.top);
			var pos = adorner.mousePositionToCanvasPosition(cLeft, cTop);
			itemManager.setProperty(itemKey, itemProperty, "basic", "x" , pos[0], k == 0 ? workManager.REC_FIRST : workManager.REC_LINKED);
			itemManager.setProperty(itemKey, itemProperty, "basic", "y" , pos[1], workManager.REC_LINKED);
			drawer.drawItem(itemKey);
		}
		adorner.adornerUnitVisible(adornerArr, true);
	},
	
	unitPointToResizedItem : function(adornerList) {
		for (var i = 0; i < adornerList.length; i++) {
			var itemAdorner = adornerList[i];	
			var itemKey = itemAdorner.getAttribute("target");
			var itemProperty = dMap[itemKey];
			switch (itemProperty.basic.t) {
				case et.CP_PARALL:
					var unitParall = itemAdorner.querySelector("[unit=parall-1]");
					switch (itemProperty.point.d) {
						case "hl":
						case "hr":
							unitParall.style.top = (itemProperty.basic.h * itemProperty.point.p / 100) + "px";
							break;
						case "vt":
						case "vb":
							unitParall.style.left = (itemProperty.basic.w * itemProperty.point.p / 100) + "px";
							break;
					}
					break;
				case et.CP_PARALL2:
					var unitParallH = itemAdorner.querySelector("[unit=parall-h]");
					var unitParallV = itemAdorner.querySelector("[unit=parall-v]");
					unitParallH.style.left = (itemProperty.basic.w * itemProperty.point.hp / 100) + "px";
					unitParallV.style.top = (itemProperty.basic.h * itemProperty.point.vp / 100) + "px";
					break;
				case et.CP_PARALL4:
					var unitParallP1 = itemAdorner.querySelector("[unit=parall-p1]");
					var unitParallP2 = itemAdorner.querySelector("[unit=parall-p2]");
					var unitParallP3 = itemAdorner.querySelector("[unit=parall-p3]");
					var unitParallP4 = itemAdorner.querySelector("[unit=parall-p4]");
					unitParallP1.style.left = (itemProperty.basic.w * itemProperty.point.p1.x / 100) + "px";
					unitParallP3.style.left = (itemProperty.basic.w * itemProperty.point.p3.x / 100) + "px";
					unitParallP3.style.top = itemProperty.basic.h + "px";
					unitParallP2.style.left = itemProperty.basic.w + "px";
					unitParallP2.style.top = (itemProperty.basic.h * itemProperty.point.p2.y / 100) + "px";
					unitParallP4.style.top = (itemProperty.basic.h * itemProperty.point.p4.y / 100) + "px";
					break;
				case et.CP_CUBE:
					adorner.adjustCubeSeg(itemAdorner, itemProperty);	
					break;
				case et.CP_TRIANGLE:
					adorner.adjustTriangleSeg(itemAdorner, itemProperty);
					break;
			}
		}
	},
	
	moveAdornerParallPoint : function(e) {
		var unit = adorner.currentUnit;
		var unitInfo = adorner.currentUnitInfo;
		var itemKey = unit.parentNode.getAttribute("target");
		var itemProperty = dMap[itemKey];
		var itemType = itemProperty.basic.t;
		var parallType = unitInfo[0];
		var parallSegName = unitInfo[1];
		
		if (parallSegName == 1) {
			//cp_parall
			switch (itemProperty.point.d) {
				case "hl":
				case "hr":
					var moveSize = e.pageY - adorner.prevMouseY;
					var cTop = parseInt(adorner.currentUnit.style.top);
					adorner.currentUnit.style.top  = (cTop + moveSize) + "px";
					break;
				case "vb":
				case "vt":
					var moveSize = e.pageX - adorner.prevMouseX;
					var cLeft = parseInt(adorner.currentUnit.style.left);
					adorner.currentUnit.style.left  = (cLeft + moveSize) + "px";
					break;
			}
		} else {
			//cp_parall2
			switch (parallSegName) {
				case "h":
					var moveSize = e.pageX - adorner.prevMouseX;
					var cLeft = parseInt(adorner.currentUnit.style.left);
					adorner.currentUnit.style.left  = (cLeft + moveSize) + "px";
					break;
				case "v":
					var moveSize = e.pageY - adorner.prevMouseY;
					var cTop = parseInt(adorner.currentUnit.style.top);
					adorner.currentUnit.style.top  = (cTop + moveSize) + "px";
					break;
					//cp_parall4
				case "p1":
				case "p3":	
				case "p2":
				case "p4":
					var x = itemProperty.basic.x;
					var y = itemProperty.basic.y;
					var w = itemProperty.basic.w;
					var h = itemProperty.basic.h;
					
					var ly = h * itemProperty.point.p4.y / 100;
					var ry = h * itemProperty.point.p2.y / 100;
					var tx = w * itemProperty.point.p1.x / 100;
					var bx = w * itemProperty.point.p3.x / 100;
					
					var tLimit = 0;
					var bLimit = 0;
					var lLimit = 0;
					var rLimit = 0;
					var limit = 99999;
					
					if (parallSegName == "p1") {
						lLimit = -limit;
						rLimit = limit;
						tLimit = -limit;
						bLimit = h;
					} else if (parallSegName == "p2") {
						lLimit = 0;
						rLimit = limit;
						tLimit = -limit;
						bLimit = limit;
					} else if (parallSegName == "p3") {
						lLimit = -limit;
						rLimit = limit;
						tLimit = 0;
						bLimit = limit;
					} else if (parallSegName == "p4") {
						lLimit = -limit;
						rLimit = w;
						tLimit = -limit;
						bLimit = limit;
					} 
				
					var moveX = e.pageX - adorner.prevMouseX;
					var moveY = e.pageY - adorner.prevMouseY;
					var cLeft = parseInt(adorner.currentUnit.style.left);
					var cTop = parseInt(adorner.currentUnit.style.top);
					var nLeft = cLeft + moveX;
					var nTop = cTop + moveY;
					
					if (nLeft < lLimit) { nLeft = lLimit; }
					else if (nLeft > rLimit) { nLeft = rLimit; }
					if (nTop < tLimit) { nTop = tLimit; }
					else if (nTop > bLimit) { nTop = bLimit; }
					
					adorner.currentUnit.style.left  = nLeft + "px";
					adorner.currentUnit.style.top  = nTop + "px";
					break;
				//cp_cube
				case "l1": 
				case "l2":
				case "r1":
				case "r2":
				case "m1":
				case "m2":
				case "m3":
				//triangle
				case "t1":
				case "t2":
				case "t3":
				//line
				case "lpx1": 
				case "lpx2":
					var x = itemProperty.basic.x;
					var y = itemProperty.basic.y;
					var w = itemProperty.basic.w;
					var h = itemProperty.basic.h;
					var moveX = e.pageX - adorner.prevMouseX;
					var moveY = e.pageY - adorner.prevMouseY;
					var cLeft = parseInt(adorner.currentUnit.style.left);
					var cTop = parseInt(adorner.currentUnit.style.top);
					var nLeft = cLeft + moveX;
					var nTop = cTop + moveY;
					adorner.currentUnit.style.left  = nLeft + "px";
					adorner.currentUnit.style.top  = nTop + "px";
					break;
			}
		}
	},
	
	moveItemToParallPoint : function(e) {
		var unit = adorner.currentUnit;
		var unitInfo = adorner.currentUnitInfo;
		var itemKey = unit.parentNode.getAttribute("target");
		var itemProperty = dMap[itemKey];
		var itemType = itemProperty.basic.t;
		var parallType = unitInfo[0];
		var parallSegName = unitInfo[1];
		var itemAdorner = adorner.currentUnit.parentNode;
		
		if (parallSegName == 1) {
			switch (itemProperty.point.d) {
				case "hl":
				case "hr":
					var unitTop = parseInt(adorner.currentUnit.style.top );
					var h = itemProperty.basic.h;
					itemManager.setProperty(itemKey, itemProperty, "point", "p", unitTop / h * 100, workManager.REC_FIRST);
					break;
				case "vb":
				case "vt":
					var unitLeft = parseInt(adorner.currentUnit.style.left);
					var w = itemProperty.basic.w;
					itemManager.setProperty(itemKey, itemProperty, "point", "p", unitLeft / w * 100, workManager.REC_FIRST);
					break;
			}
		} else {
			//cp_parall2
			switch (parallSegName) {
				case "h":
					var unitLeft = parseInt(adorner.currentUnit.style.left);
					var w = itemProperty.basic.w;
					itemManager.setProperty(itemKey, itemProperty, "point", "hp", unitLeft / w * 100, workManager.REC_FIRST);
					break;
				case "v":
					var unitTop = parseInt(adorner.currentUnit.style.top);
					var h = itemProperty.basic.h;
					itemManager.setProperty(itemKey, itemProperty, "point", "vp", unitTop / h * 100, workManager.REC_FIRST);
					break;
				case "p1":
				case "p2":
				case "p3":
				case "p4":
					var unitLeft = parseInt(adorner.currentUnit.style.left);
					var unitTop = parseInt(adorner.currentUnit.style.top);
					var x = itemProperty.basic.x;
					var y = itemProperty.basic.y;
					var w = itemProperty.basic.w;
					var h = itemProperty.basic.h;
					var tx = itemProperty.point.p1.x;
					var bx = itemProperty.point.p3.x;
					var ry = itemProperty.point.p2.y;
					var ly = itemProperty.point.p4.y;
					if (parallSegName == "p1") {
						var ryPX = (h * ry / 100);
						var lyPX = (h * ly / 100);
						var ny = y + unitTop;
						var nh = h - unitTop;
						// var nryPX = Math.max(0, ryPX - unitTop);
						// var nlyPX = Math.max(0, lyPX - unitTop);
						var nryPX = ryPX - unitTop;
						var nlyPX = lyPX - unitTop;
						var nry = nryPX / nh * 100;
						var nly = nlyPX / nh * 100;
						var np1x = unitLeft / w * 100;
						itemManager.setProperty(itemKey, itemProperty, "basic", "y", ny, workManager.REC_FIRST);
						itemManager.setProperty(itemKey, itemProperty, "basic", "h", nh, workManager.REC_LINKED);
						itemManager.setProperty(itemKey, itemProperty, "point", "p1", { x : np1x, y : 0 }, workManager.REC_LINKED);
						itemManager.setProperty(itemKey, itemProperty, "point", "p2", { x : 100, y : nry }, workManager.REC_LINKED);
						itemManager.setProperty(itemKey, itemProperty, "point", "p4", { x : 0, y : nly }, workManager.REC_LINKED);
					} else if (parallSegName == "p3") {
						var ryPX = (h * ry / 100);
						var lyPX = (h * ly / 100);
						var nh = unitTop;
						var nryPX = ryPX;
						var nlyPX = lyPX;
						var nry = nryPX / nh * 100;
						var nly = nlyPX / nh * 100;
						var np3x = unitLeft / w * 100;
						itemManager.setProperty(itemKey, itemProperty, "basic", "h", nh, workManager.REC_FIRST);
						itemManager.setProperty(itemKey, itemProperty, "point", "p3", { x : np3x, y : 100 }, workManager.REC_LINKED);
						itemManager.setProperty(itemKey, itemProperty, "point", "p2", { x : 100, y : nry }, workManager.REC_LINKED);
						itemManager.setProperty(itemKey, itemProperty, "point", "p4", { x : 0, y : nly }, workManager.REC_LINKED);
					} else if (parallSegName == "p2") {
						var txPX = (w * tx / 100);
						var bxPX = (w * bx / 100);
						var nw = unitLeft;
						var ntxPX = txPX;
						var nbxPX = bxPX;
						var ntx = ntxPX / nw * 100;
						var nbx = nbxPX / nw * 100;
						var np2y = unitTop / h * 100;
						itemManager.setProperty(itemKey, itemProperty, "basic", "w", nw, workManager.REC_FIRST);
						itemManager.setProperty(itemKey, itemProperty, "point", "p2", { x : 100, y : np2y }, workManager.REC_LINKED);
						itemManager.setProperty(itemKey, itemProperty, "point", "p1", { x : ntx, y : 0 }, workManager.REC_LINKED);
						itemManager.setProperty(itemKey, itemProperty, "point", "p3", { x : nbx, y : 100 }, workManager.REC_LINKED);
					} else if (parallSegName == "p4") {
						var txPX = (w * tx / 100);
						var bxPX = (w * bx / 100);
						var nx = x + unitLeft;
						var nw = w - unitLeft;
						var ntxPX = txPX - unitLeft;
						var nbxPX = bxPX - unitLeft;
						var ntx = ntxPX / nw * 100;
						var nbx = nbxPX / nw * 100;
						var np4y = unitTop / h * 100;
						itemManager.setProperty(itemKey, itemProperty, "basic", "x", nx, workManager.REC_FIRST);
						itemManager.setProperty(itemKey, itemProperty, "basic", "w", nw, workManager.REC_LINKED);
						itemManager.setProperty(itemKey, itemProperty, "point", "p4", { x : 0, y : np4y }, workManager.REC_LINKED);
						itemManager.setProperty(itemKey, itemProperty, "point", "p1", { x : ntx, y : 0 }, workManager.REC_LINKED);
						itemManager.setProperty(itemKey, itemProperty, "point", "p3", { x : nbx, y : 100 }, workManager.REC_LINKED);
					}
					break;
				//cp_cube
				case "l1":
				case "l2":
				case "r1":
				case "r2":
				case "m1":
				case "m2":
				case "m3":
				//cp_triangle
				case "t1":
				case "t2":
				case "t3":
					var unitLeft = parseInt(adorner.currentUnit.style.left);
					var unitTop = parseInt(adorner.currentUnit.style.top);
					var x = itemProperty.basic.x;
					var y = itemProperty.basic.y;
					var w = itemProperty.basic.w;
					var h = itemProperty.basic.h;
					var npx = unitLeft / w * 100;
					var npy = unitTop / h * 100;
					itemManager.setProperty(itemKey, itemProperty, "point", parallSegName, { x : npx, y : npy }, workManager.REC_FIRST);
					adorner.removeAdorner(itemKey);
					adorner.showAdorner(e, itemKey);
					break;
				 // cp_line
				case "lpx1":
				case "lpx2":
					var unitLeft = parseInt(adorner.currentUnit.style.left);
					var unitTop = parseInt(adorner.currentUnit.style.top);
					itemManager.setProperty(itemKey, itemProperty, "point", parallSegName, { x : unitLeft, y : unitTop }, workManager.REC_FIRST);
					break;
					
			}
			adorner.removeAdorner(itemKey);
			adorner.showAdorner(e, itemKey);
		}
		drawer.drawItem(itemKey);
	},
	
	getUnitInfo : function(node) {
		var unitType = node.getAttribute("unit");
		if (unitType != undefined ) {
			var unitTypeArr = unitType.split("-");
			return [unitTypeArr[0], unitTypeArr[1]]; 
		}
		return undefined;
	},
	
	
	showAdorner : function(e, itemKey) {
		var itemKeyList = undefined;
		if (itemKey instanceof Array) {
			itemKeyList = itemKey;
		} else {
			itemKeyList = [itemKey];
		}
		
		for (var i = 0; i < itemKeyList.length; i++) {
			var iKey = itemKeyList[i];
			var itemProperty = dMap[iKey];
			var itemType = itemProperty.basic.t;
			var itemAdorner = undefined;
			var itemController = cMap[itemType];
			switch(itemType) {
				case et.CP_RECT:
				default:
					itemAdorner = adorner.makeDefaultAdorner(itemProperty);
					break;
				case et.CP_PARALL:
					itemAdorner = adorner.makeParallAdorner(itemProperty);
					break;
				case et.CP_PARALL2:
					itemAdorner = adorner.makeParall2Adorner(itemProperty);
					break;
				case et.CP_PARALL4:
					itemAdorner = adorner.makeParall4Adorner(itemProperty);
					break;
				case et.CP_CUBE:
					itemAdorner = adorner.makeCubeAdorner(itemProperty);
					break;
				case et.CP_TRIANGLE:
					itemAdorner = adorner.makeTriangleAdorner(itemProperty);
					break;
				case et.CP_LINE:
					itemAdorner = adorner.makeLineAdorner(itemProperty);
					break;
			}
			
			var pagePos = adorner.canvasPositionToPagePosition(itemProperty.basic.x, itemProperty.basic.y);
			itemAdorner.style.left = pagePos[0] + "px";
			itemAdorner.style.top = pagePos[1] + "px";
			itemAdorner.style.width = itemProperty.basic.w + "px";
			itemAdorner.style.height = itemProperty.basic.h + "px";
		}
	},
	
	removeAdorner : function(itemKey) {
		var itemAdorner = et.adornerLayer.querySelector("[target=" + itemKey + "]");
		if (itemAdorner != undefined) {
			et.adornerLayer.removeChild(itemAdorner);
		}
	},
	
	removeAdornerAll : function() {
		var layer = et.adornerLayer;
		var adornerList = layer.querySelectorAll("[name=adorner]");
		
		if (adornerList != undefined) {
			for (var i = 0; i < adornerList.length; i++) {
				layer.removeChild(adornerList[i]);
			}
		}
		
	},
	
	adornerUnitVisible : function(adornerList, visible) {
		for (var i = 0; i < adornerList.length; i++) {
			var childList = adornerList[i].children;
			for (var k = 0; k < childList.length; k++) {
				childList[k].style.display = visible ? "block" : "none";
			}
		}
	},
	
	getSelectedItemList : function() {
		var layer = et.adornerLayer;
		var adornerList = layer.querySelectorAll("[name=adorner]");
		var itemList = [];
		for (var i = 0; i < adornerList.length; i++) {
			var itemAdorner = adornerList[i];
			var itemKey = itemAdorner.getAttribute("target");
			itemList.push(itemKey);
		}
		return itemList;
	},
};

var hitChecker = {
	
	checkArea : function(e) {
		
		var areaLeft = parseInt(adorner.areaSelector.style.left);
		var areaTop = parseInt (adorner.areaSelector.style.top);
		var areaWidth = parseInt(adorner.areaSelector.style.width);
		var areaHeight = parseInt(adorner.areaSelector.style.height);
		var areaPosOnCanvas = adorner.mousePositionToCanvasPosition(areaLeft, areaTop);
		
		areaLeft = areaPosOnCanvas[0];
		areaTop = areaPosOnCanvas[1];
		
		var dKeys = Object.keys(dMap);
		var dKeysCnt = dKeys.length;
		
		var hittedList = [];
		
		for (var i = 0; i < dKeysCnt; i++) {
			var itemKey = dKeys[i];
			var itemProperty = dMap[itemKey];
			var itemX = itemProperty.basic.x;
			var itemY = itemProperty.basic.y;
			var itemW = itemProperty.basic.w;
			var itemH = itemProperty.basic.h;
			var itemZ = itemProperty.basic.z;
			if (areaLeft <= itemX && itemX + itemW <= areaLeft + areaWidth 
				&& areaTop <= itemY && itemY + itemH <= areaTop + areaHeight) {
				hittedList.push(itemKey);
			}
		}
		
		return hittedList;
	},
	
	check : function(e) {
		var mouseX = e.pageX; //스크롤 포함 위치
		var mouseY = e.pageY; //스크롤 포함 위치
		var posOnCan = adorner.mousePositionToCanvasPosition(mouseX, mouseY);
		
		var x = posOnCan[0];
		var y = posOnCan[1];
		var dKeys = Object.keys(dMap);
		var dKeysCnt = dKeys.length;
		var hittedKey = undefined;
		var hittedZ = -1;
		
		for (var i = 0; i < dKeysCnt; i++) {
			var itemKey = dKeys[i];
			var itemProperty = dMap[itemKey];
			var itemX = itemProperty.basic.x;
			var itemY = itemProperty.basic.y;
			var itemW = itemProperty.basic.w;
			var itemH = itemProperty.basic.h;
			var itemZ = itemProperty.basic.z;
			if (itemX <= x && itemX + itemW >= x && itemY <= y && itemY + itemH >= y) {
				//check!
				if (hittedZ < itemZ) {
					hittedZ = itemZ;
					hittedKey = itemKey;
				}
			}
		}
		
		return hittedKey;
	},
};

var drawer = {
	
	unitSize : 4,
	
	__checkOverlap : function(p1, p2x, p2y) {
		var p1b = p1.basic;
		if (p1b.x <= p2x && p1b.x + p1b.w>= p2x
			&& p1b.y <= p2y && p1b.y + p1b.h>= p2y) {
			return true;
		}
		
		if (p1b.p_x != undefined) {
			if (p1b.p_x <= p2x && p1b.p_x + p1b.p_w>= p2x
				&& p1b.p_y <= p2y && p1b.p_y + p1b.p_h>= p2y) {
				return true;
			}
		}
		return false;
	},
	
	checkOverlap : function(p1, p2) {
		var p1b = p1["basic"];
		var p2b = p2["basic"];
		
		if (drawer.__checkOverlap(p1, p2b["x"], p2b["y"])
			|| drawer.__checkOverlap(p1, p2b["x"] + p2b["w"], p2b["y"])
			|| drawer.__checkOverlap(p1, p2b["x"], p2b["y"] + p2b["h"])
			|| drawer.__checkOverlap(p1, p2b["x"] + p2b["w"], p2b["y"] + p2b["h"]))
		{
			return true;
		}
		
		if (drawer.__checkOverlap(p2, p1b["x"], p1b["y"])
			|| drawer.__checkOverlap(p2, p1b["x"] + p1b["w"], p1b["y"])
			|| drawer.__checkOverlap(p2, p1b["x"], p1b["y"] + p1b["h"])
			|| drawer.__checkOverlap(p2, p1b["x"] + p1b["w"], p1b["y"] + p1b["h"]))
		{
			return true;
		}
		
		if (drawer.__checkOverlap(p2, p1b["p_x"], p1b["p_y"])
			|| drawer.__checkOverlap(p2, p1b["p_x"] + p1b["p_w"], p1b["p_y"])
			|| drawer.__checkOverlap(p2, p1b["p_x"], p1b["p_y"] + p1b["p_h"])
			|| drawer.__checkOverlap(p2, p1b["p_x"] + p1b["p_w"], p1b["p_y"] + p1b["h"]))
		{
			return true;
		}
		
		return false;
	},
	
	defineUpdateList : function(updateList) {
		var updateCnt = updateList.length;
		var keys = Object.keys(dMap);
		var keyCnt = keys.length;
		var newUpdateList = [];
		if (updateCnt == keyCnt) return;
		
		for (var i = 0; i < updateCnt; i++) {
			var updateKey = updateList[i];
			var uProperty =  dMap[updateKey];
			
			if (uProperty.basic.t == et.CP_GROUP) {
				for (var k = 0; k < uProperty.group.list.length; k++) {
					if (updateList.indexOf(uProperty.group.list[k]) >= 0) continue;
					newUpdateList.push(uProperty.group.list[k]);
				}
			}
			
			for (var k = 0; k < keyCnt; k++) {
				if (updateList.indexOf(keys[k]) >= 0) continue;
				var cProperty = dMap[keys[k]];
				//zIndex 가 더 큰것만 대상 아래 깔린것은 배경색 투명도를 조절 할때 로직은 추후로
				//TODO
				//if (uProperty["basic"]["z"] > cProperty["basic"]["z"]) continue;
				if (uProperty === cProperty) continue;
				var overlap = drawer.checkOverlap(uProperty, cProperty);					
				if (!overlap) continue;
				newUpdateList.push(keys[k]);
			}
		}
		
		if (newUpdateList.length > 0) {
			for (var i = 0; i < newUpdateList.length; i++) {
				if (updateList.indexOf(newUpdateList[i]) < 0) {
					updateList.push(newUpdateList[i]);
				}
			}
			drawer.defineUpdateList(updateList);
		}
	},
	
	
	clearAll : function() {
		var updateList = Object.keys(dMap);
		for (var i = 0; i < updateList.length; i++) {
			var updateKey = updateList[i];
			var updateProperty = dMap[updateKey];
			var updateController = cMap[updateProperty.basic.t];
			updateController.clearDraw(et.context.main, updateProperty);
		}
	},
	
	//updateList component keys
	drawAll : function() {
		var updateList = Object.keys(dMap);
		for (var i = 0; i < updateList.length; i++) {
			var updateKey = updateList[i];
			var updateProperty = dMap[updateKey];
			var updateController = cMap[updateProperty.basic.t];
			updateController.draw(et.context.main, updateProperty);
		}
	},
	
	clearItem : function(cKey) {
		var updateList = [cKey];
		drawer.defineUpdateList(updateList);
		for (var i = 0; i < updateList.length; i++) {
			var updateKey = updateList[i];
			var updateProperty = dMap[updateKey];
			var updateController = cMap[updateProperty.basic.t];
			updateController.clearDraw(et.context.main, updateProperty);
		}
		
		for (var i = 0; i < updateList.length; i++) {
			var updateKey = updateList[i];
			if (updateKey == cKey) continue;
			var updateProperty = dMap[updateKey];
			var updateController = cMap[updateProperty.basic.t];
			updateController.draw(et.context.main, updateProperty);
		}
		
		for (var i = 0; i < updateList.length; i++) {
			var updateKey = updateList[i];
			if (updateKey == cKey) continue;
			var updateProperty = dMap[updateKey];
			updateProperty["basic"]["p_x"] = undefined;
			updateProperty["basic"]["p_y"] = undefined;
			updateProperty["basic"]["p_w"] = undefined;
			updateProperty["basic"]["p_h"] = undefined;
		}
	},
	
	drawItem : function(cKey) {
		var updateList = [cKey];
		drawer.defineUpdateList(updateList);
		//order by zIndex
		drawer.orderByZIndex(updateList);
		for (var i = 0; i < updateList.length; i++) {
			var updateKey = updateList[i];
			var updateProperty = dMap[updateKey];
			var updateController = cMap[updateProperty.basic.t];
			updateController.clearDraw(et.context.main, updateProperty);
		}
		
		for (var i = 0; i < updateList.length; i++) {
			var updateKey = updateList[i];
			var updateProperty = dMap[updateKey];
			var updateController = cMap[updateProperty.basic.t];
			updateController.draw(et.context.main, updateProperty);
		}
		
		for (var i = 0; i < updateList.length; i++) {
			var updateKey = updateList[i];
			var updateProperty = dMap[updateKey];
			updateProperty["basic"]["p_x"] = undefined;
			updateProperty["basic"]["p_y"] = undefined;
			updateProperty["basic"]["p_w"] = undefined;
			updateProperty["basic"]["p_h"] = undefined;
		}
	},
	
	
	orderByZIndex : function(itemList) {
		itemList.sort(drawer.__comparator_zIndex);
	},
	
	__comparator_zIndex : function(p1, p2) {
		return (dMap[p1].basic.z - dMap[p2].basic.z);
	},
};

var itemManager = {
	
	copyMap : {},
	copyGroupedMap : {},
	
	copyItem : function() {
		delete itemManager.copyMap;
		itemManager.copyMap = {};
		var itemList = adorner.getSelectedItemList();
		itemManager.__copyItem(itemList);
	},
	
	__copyItem : function(copyList, groupKey) {
		for (var i = 0; i < copyList.length; i++) {
			var itemKey = copyList[i];
			var itemProperty = dMap[itemKey];
			var clonedProperty = JSON.parse(JSON.stringify(itemProperty));
			
			if (groupKey == undefined) {
				itemManager.copyMap[itemKey] = clonedProperty;
			} else {
				var groupedMap = itemManager.copyGroupedMap[groupKey];
				if (groupedMap == undefined) {
					groupedMap = {};
				}
				groupedMap[itemKey] = clonedProperty;
				itemManager.copyGroupedMap[groupKey] = groupedMap;
			}
			
			if (itemProperty.basic.t == et.CP_GROUP) {
				var groupedList = itemProperty.group.list;
				itemManager.__copyItem(groupedList, itemKey);
			}
		}
	},
	
	pasteItem : function() {
		var copyList = Object.keys(itemManager.copyMap);
		itemManager.__pasteItem(copyList, undefined);
	},
	
	__pasteItem : function(copyList, preGroupKey, newGroupKey) {
		
		for (var i = 0; i < copyList.length; i++) {
			var itemKey = copyList[i];
			var clonedProperty = preGroupKey == undefined ? itemManager.copyMap[itemKey] : itemManager.copyGroupedMap[preGroupKey][itemKey];
			var clonedType = clonedProperty.basic.t;
			var newKey = itemManager.genItemKey(clonedType);
			var newZIndex = adorner.getTopZIndex();
			clonedProperty.basic.key = newKey;
			clonedProperty.basic.z = newZIndex;
			clonedProperty.basic.x += 50;
			clonedProperty.basic.y += 50;
			if (newGroupKey != undefined) {
				clonedProperty.group = { o : newKey };
			}
			
			itemManager.__makeItem(newKey, clonedProperty, i == 0 ? workManager.REC_FIRST : workManager.REC_LINKED);
			
			if (newGroupKey != undefined) {
				var currGroupList = dMap[newGroupKey].group.list;
				currGroupList = JSON.parse(JSON.stringify(currGroupList));
				currGroupList.push(newKey);
				itemManager.setProperty(newGroupKey, dMap[newGroupKey], "group", "list", currGroupList, workManager.REC_LINKED);
			}
			
			if (clonedType == et.CP_GROUP) {
				var groupedList = clonedProperty.group.list;
				clonedProperty.group.list = [];
				itemManager.__pasteItem(groupedList, itemKey, newKey);
			}
		}
	},
	
	//일단 그룹된 아이템은 삭제 되지 않도록 함
	deleteItem : function() {
		var itemList = adorner.getSelectedItemList();
		for (var i = 0; i < itemList.length; i++) {
			var itemKey = itemList[i];
			var itemProperty = dMap[itemKey];
			var groupOwner= itemProperty.group != undefined ? itemProperty.group.o : undefined;
			if (groupOwner != undefined) {
				continue;
			}
			itemManager.__deleteItem(itemKey, 
				i == 0 ? workManager.REC_FIRST : workManager.REC_LINKED);
		}
		adorner.removeAdornerAll();
	},
	
	__deleteItem : function(itemKey, recType) {
		
		workManager.record(workManager.ACTION_DEL
							, recType
							, itemKey);
		
		drawer.clearItem(itemKey);
		
		delete dMap[itemKey];
	},
	
	genItemKey : function(itemType) {
		var dateKey = Date.now();
		var genKey = itemType + "_" + dateKey;
		while(dMap[genKey] != undefined) {
			genKey = itemType + "_" + (++dateKey);
		}
		return genKey;
	},
	
	makeItem : function(e) {
		var makeController = cMap[et.MAKE_COMPONENT_TYPE];
		var makeProperty = makeController.make();
		var mouseX = e.pageX; //스크롤 포함 위치
		var mouseY = e.pageY; //스크롤 포함 위치
		var posOnCan = adorner.mousePositionToCanvasPosition(mouseX, mouseY);
		var makeKey = itemManager.genItemKey(et.MAKE_COMPONENT_TYPE);
		makeProperty["basic"]["key"] = makeKey;
		makeProperty["basic"]["x"] = posOnCan[0];
		makeProperty["basic"]["y"] = posOnCan[1];
		makeProperty["basic"]["z"] = adorner.getTopZIndex();
		
		//record
		itemManager.__makeItem(makeKey, makeProperty, workManager.REC_FIRST);
	},
	
	__makeItem : function(makeKey, makeProperty, recType) {
		
		workManager.record(workManager.ACTION_MAKE
						, recType
						, makeKey, undefined, undefined, makeProperty);
						
		dMap[makeKey] = makeProperty;
		drawer.drawItem(makeKey);
	},
	
	releaseGroupItem : function(itemList) {
		if (itemList.length != 1) return;
		var groupKey = itemList[0];
		var groupProperty = dMap[groupKey];
		itemManager.__deleteItem(groupKey, workManager.REC_FIRST);
		
		for (var i = 0; i < groupProperty.group.list.length; i++) {
			var groupedKey = groupProperty.group.list[i];
			itemManager.setProperty(groupedKey, dMap[groupedKey], "group", "o", undefined, workManager.REC_LINKED);
		}
	},
	
	makeGroupItem : function(itemList) {
		var makeController = cMap[et.CP_GROUP];
		var makeProperty = makeController.make();
		var left = 999999;
		var top = 999999;
		var right = 0;
		var bottom = 0;
		var topZIndex = adorner.getTopZIndex();
		drawer.orderByZIndex(itemList);
		var makeKey = itemManager.genItemKey(et.CP_GROUP);
		
		for (var i = 0; i < itemList.length; i++) {
			var itemKey = itemList[i];
			var itemProperty = dMap[itemKey];
			var basicProperty = itemProperty.basic;
			if (left > basicProperty.x) {
				left = basicProperty.x;
			}
			if (top > basicProperty.y) {
				top = basicProperty.y;
			}
			if (right < basicProperty.x + basicProperty.w) {
				right = basicProperty.x + basicProperty.w;
			}
			if (bottom < basicProperty.y + basicProperty.h) {
				bottom = basicProperty.y + basicProperty.h;
			}
			
		}
		
		makeProperty["basic"]["key"] = makeKey;
		makeProperty["basic"]["z"] = topZIndex;
		makeProperty["group"]["list"] = itemList;
		makeProperty["basic"]["x"] = left - 5;
		makeProperty["basic"]["y"] = top - 5;
		makeProperty["basic"]["w"] = right - left + 10;
		makeProperty["basic"]["h"] = bottom - top + 10;
		itemManager.__makeItem(makeKey, makeProperty, workManager.REC_FIRST);
		
		for (var i = 0; i < itemList.length; i++) {
			var itemKey = itemList[i];
			var itemProperty = dMap[itemKey];
			itemManager.setProperty(itemKey, itemProperty, "basic", "z", topZIndex++, workManager.REC_LINKED);
			itemManager.setProperty(itemKey, itemProperty, "group", "o", makeKey, workManager.REC_LINKED);
		}
	},
	
	setProperty : function(itemKey, itemProperty, att1, att2, value, recType) {
		switch (att1) {
			case "point":
			case "basic":
				switch (att2) {
					case "x":
					case "y":
					case "w":
					case "h":
					case "lpx1":
					case "lpx2":
						//이전 위치, 크기값
						if (itemProperty["basic"]["p_x"] == undefined) {
							itemProperty["basic"]["p_x"] = itemProperty["basic"]["x"];
							itemProperty["basic"]["p_y"] = itemProperty["basic"]["y"];
							itemProperty["basic"]["p_w"] = itemProperty["basic"]["w"];
							itemProperty["basic"]["p_h"] = itemProperty["basic"]["h"];
						}
						break;
				}
				break;
		}
		
		//undo redo stack
		workManager.record(workManager.ACTION_PROP, recType, itemKey, att1, att2, value);
		
		var itemController = cMap[itemProperty.basic.t];
		itemController.setProperty(itemProperty, att1, att2, value);
	},
};

var propertyManager = {
	
	disableList : [
		"basic.t",
		"basic.key",
		"basic.p_x",
		"basic.p_y",
		"basic.p_w",
		"basic.p_h",
	],
	
	colorCtrlMap : {},
	colorCtrlUseMap : {},
	
	init : function() {
		var propertyDiv = document.createElement("div");
		var styleStr = "position:fixed;tabindex='0'";
		styleStr += ";background:pink;width:20%;height:60%;left:80%;top:40%;overflow:scroll;"
		propertyDiv.style = styleStr;
		propertyDiv.setAttribute("id", "propertyContainer");
		et.mainContainer.appendChild(propertyDiv);
		propertyDiv.addEventListener("keyup", function(e) {
			if (e.which == 13) {
				var tName = e.target.getAttribute("name");
				if (tName != "prop-value") return;
				var att1Name = e.target.getAttribute("att1");
				var att2Name = e.target.getAttribute("att2");
				var attValue = e.target.value;
				var itemKey = propertyDiv.getAttribute("target");
				var itemProperty = dMap[itemKey];
				
				var numValue = parseFloat(attValue);
				if (numValue == attValue) {
					attValue = numValue;
				}
				
				itemManager.setProperty(itemKey, itemProperty, att1Name, att2Name, attValue, workManager.REC_FIRST);
				drawer.drawItem(itemKey);
			}
		}, true);
	},
	
	clearProperty : function() {
		var propCon = document.getElementById("propertyContainer");
		while (propCon.firstChild) {
			propCon.removeChild(propCon.firstChild);
		}
		propCon.setAttribute("target", undefined);

		//hide color control
		var colorKeyList = Object.keys(propertyManager.colorCtrlUseMap);
		for (var i = 0 ; i < colorKeyList.length; i++) {
			var colorKey = colorKeyList[i];
			propertyManager.colorCtrlUseMap[colorKey] = false;
			propertyManager.colorCtrlMap[colorKey].colorDiv.style.display = "none";
			propertyManager.colorCtrlMap[colorKey].setEndCallback(undefined);
		}
	},
	
	showPropertyByAdorner : function(itemAdorner) {
		var itemKey = itemAdorner.getAttribute("target");
		var itemProperty = dMap[itemKey];
		propertyManager.showProperty(itemKey, itemProperty);
	},
	
	showProperty : function(itemKey, itemProperty) {
		propertyManager.clearProperty();
		var fmt = document.createDocumentFragment();
		var level1List = Object.keys(itemProperty);
		var colorControlSize = 100;
		var colorControlIndex = 0;
		
		for (var i = 0; i < level1List.length; i++) {
			var l1Name = level1List[i]
			var l1Property = itemProperty[l1Name];
			var level2List = Object.keys(l1Property);
			
			var l1Div = document.createElement("div");
			var l1TextNode = document.createTextNode(l1Name);
			l1Div.appendChild(l1TextNode);
			l1Div.style = "margin:10px;font-size:15px;font-weight:bold;";
			fmt.append(l1Div);
			
			for (var k = 0; k < level2List.length; k++) {
				var l2Name = level2List[k];
				var l2Value = l1Property[l2Name];
				var l2Div = document.createElement("div");
				var l2TextNode = document.createTextNode(l2Name);
				var l2ValueNode = document.createElement("input");
				
				l2ValueNode.value = l2Value;
				l2Div.style = "margin:5px 5px 5px 20px;"
				l2ValueNode.style = "margin-left:5%;width:50%;";
				l2Div.appendChild(l2TextNode);
				l2Div.appendChild(l2ValueNode);
				
				l2ValueNode.setAttribute("att1", l1Name);
				l2ValueNode.setAttribute("att2", l2Name);
				l2ValueNode.setAttribute("name", "prop-value");
				if (propertyManager.disableList.indexOf(l1Name + "." + l2Name) >= 0) {
					l2ValueNode.setAttribute("disabled", true);
				}
				
				fmt.append(l2Div);
			}
			
			if (l1Name.indexOf("background") >= 0) {
				(function(att1Name) {
					var colorObject = propertyManager.colorCtrlMap[att1Name];
					if (colorObject == undefined) {
						colorObject = colorManager.init(0
							, colorControlSize * colorControlIndex
							, colorControlSize, colorControlSize);
						propertyManager.colorCtrlMap[att1Name] = colorObject;
						propertyManager.colorCtrlUseMap[att1Name] = true;
					} else {
						propertyManager.colorCtrlMap[att1Name].colorDiv.style.display = "block";
						propertyManager.colorCtrlUseMap[att1Name] = true;
					}
					
					colorObject.setEndCallback(function(r, g, b,a) {
						itemManager.setProperty(itemKey, itemProperty, att1Name, "r" , r);
						itemManager.setProperty(itemKey, itemProperty, att1Name, "g" , g);
						itemManager.setProperty(itemKey, itemProperty, att1Name, "b" , b);
						itemManager.setProperty(itemKey, itemProperty, att1Name, "a" , a);
						drawer.drawItem(itemKey);
					});
					
					colorManager.setValue(colorObject, 
						itemProperty[att1Name].r,
						itemProperty[att1Name].g,
						itemProperty[att1Name].b,
						itemProperty[att1Name].a);
					
					colorControlIndex++;
				})(l1Name);
			}
		}
		
		var propCon = document.getElementById("propertyContainer");
		propCon.setAttribute("target", itemKey);
		propCon.appendChild(fmt);
	},
	
};

//사각형
var cp_rect = {
	
	property : {
		"basic" : {
			"t" : et.CP_RECT,
			"n" : "rectangle",
			"w" : 100,
			"h" : 100,
			"x" : 100,
			"y" : 100,
			"a" : 0,
			"z" : 0,
			"key" : undefined,
		},
		"background" : {
			"r" : 0,
			"g" : 255,
			"b" : 0,
			"a" : 1,
		},
		"border" : {
			"w" : [1, 1, 1, 1],
			"t" : "solid",
			"r" : 0,
			"g" : 255,
			"b" : 0,
			"a" : 1,
		},
	},
	
	clearDraw : function(ctx, property) {
		cp_parall.clearDraw(ctx, property);
	},
	
	setProperty : function(property, att1, att2, value) {
		try {
			if (property[att1] == undefined) property[att1] = {};
			property[att1][att2] = value;
		} catch (ex){
			console.err(ex);
		}
	},
	
	make : function() {
		return JSON.parse(JSON.stringify(cp_rect.property));
	},
	
	draw : function(ctx, property) {
		ctx.fillStyle = "rgba(" 
			+ property["background"]["r"] + ","
			+ property["background"]["g"] + ","
			+ property["background"]["b"] + ","
			+ property["background"]["a"] + 
			")";
			
		var x = property["basic"]["x"];
		var y = property["basic"]["y"];
		var w = property["basic"]["w"];
		var h = property["basic"]["h"];
		var uSize = drawer.unitSize;
		var wuSize = w / uSize;
		var huSize = h / uSize;
		for (var c = 0; c < wuSize; c++) {
			for (var r = 0; r < huSize; r++) {
				ctx.fillRect(x + c * uSize, y + r * uSize, uSize, uSize);		
			}
		}
	},
};

var cp_group = {
	
	property : {
		"basic" : { 
			"t" : et.CP_GROUP,
			"n" : "group",
			"w" : 100,
			"h" : 100,
			"x" : 100,
			"y" : 100,
			"a" : 0,
			"z" : 0,
			"key" : undefined,
		},
		"group" : {
			"list" : [],
		},
	},
	
	getAllGroupedKey : function(property, list) {
		var groupedList = property["group"]["list"];
		for (var i = 0; i < groupedList.length; i++) {
			var groupedKey = groupedList[i];
			if (list.indexOf(groupedKey) < 0) list.push(groupedKey);
			if (dMap[groupedKey]["basic"]["t"] == et.CP_GROUP) {
				cp_group.getAllGroupedKey(dMap[groupedKey], list);
			}
		}
	},
	
	setProperty : function(property, att1, att2, value) {
		try {
			var preValue = property[att1][att2];
			if (property[att1] == undefined) property[att1] = {};
			property[att1][att2] = value;
			
			switch (att1) {
				case "basic":
					var groupedList = [];
					cp_group.getAllGroupedKey(property, groupedList);
					var groupCnt = groupedList.length;
					var valueGap = value - preValue;
					switch (att2) {
						case "w":
							var preWidth = preValue;
							var width = value;
							var x = property.basic.x;
							for (var i = 0; i < groupCnt; i++) {
								var memberKey = groupedList[i];
								var memberProperty = dMap[memberKey];
								var mmx = memberProperty.basic.x;
								var mmw = memberProperty.basic.w;
								var nmmx = x + (mmx - x) / preWidth * width;
								var nmmw = mmw / preWidth * width;
								memberProperty.basic.x = nmmx;
								memberProperty.basic.w = nmmw;
							}
							break;
						case "h":
							var preHeight = preValue;
							var height = value;
							var y = property.basic.y;
							for (var i = 0; i < groupCnt; i++) {
								var memberKey = groupedList[i];
								var memberProperty = dMap[memberKey];
								var mmy = memberProperty.basic.y;
								var mmh = memberProperty.basic.h;
								var nmmy = y + (mmy - y) / preHeight * height;
								var nmmh = mmh / preHeight * height;
								memberProperty.basic.y = nmmy;
								memberProperty.basic.h = nmmh;
							}
							break;
						case "x":
							for (var i = 0; i < groupCnt; i++) {
								var memberKey = groupedList[i];
								var memberProperty = dMap[memberKey];
								memberProperty.basic.x += valueGap;
							}
							break;
						case "y":
							for (var i = 0; i < groupCnt; i++) {
								var memberKey = groupedList[i];
								var memberProperty = dMap[memberKey];
								memberProperty.basic.y += valueGap;
							}
							break;
					}
					break;
			}
		}
		catch (ex) {
			console.error(ex);
		}
	},
	
	make : function() {
		return JSON.parse(JSON.stringify(cp_group.property));
	},
	
	clearDraw : function(ctx, property) {
		cp_parall.clearDraw(ctx, property);
	},
	
	draw : function(ctx, property) {
		ctx.strokeStyle = "rgba(255,0,0,0.5)";
		ctx.strokeRect(property.basic.x + 1, property.basic.y + 1, property.basic.w - 2, property.basic.h - 2);
	},
};

var cp_line = {
	
	property : {
		"basic" : { 
			"t" : et.CP_LINE,
			"n" : "line",
			"w" : 100,
			"h" : 100,
			"x" : 100,
			"y" : 100,
			"a" : 0,
			"z" : 0,
			"key" : undefined,
		},
		"point" : {
			"lpx1" : {x : 0, y : 0},
			"lpx2" : {x : 100, y : 100},
		},
		"draw" : {
			"s" : 4,
		},
		"background" : {
			"r" : 100,
			"g" : 100,
			"b" : 100,
			"a" : 1,
		},

	},
	
	setProperty : function(property, att1, att2, value) {
		try {
			if (property[att1] == undefined) property[att1] = {};
			property[att1][att2] = value;
			
			switch (att1) {
				case "point":
					var x1 = property[att1]["lpx1"].x;
					var y1 = property[att1]["lpx1"].y;
					var x2 = property[att1]["lpx2"].x;
					var y2 = property[att1]["lpx2"].y;
					var p1 = undefined;
					var p2 = undefined;

					if (x1 <= x2) {
						p1 = { x : x1 , y : y1 };
						p2 = { x : x2 , y : y2 };
					} else {
						p2 = { x : x1 , y : y1 };
						p1 = { x : x2 , y : y2 };
					}
					
					var nx = property["basic"].x;
					var ny = property["basic"].y;
					var nw = undefined;
					var nh = undefined;
					var moveX = undefined;
					var moveY = undefined;
					
					if (p1.x < p2.x) {
						moveX = p1.x;
						nw = p2.x - p1.x;
					} else {
						moveX = p2.x;
						nw = p1.x - p2.x;
					}
					nx += moveX;
					p1.x -= moveX;
					p2.x -= moveX;
					
					if (p1.y < p2.y) {
						moveY = p1.y;
						nh = p2.y - p1.y;
					} else {
						moveY = p2.y;
						nh = p1.y - p2.y;
					}
					
					ny += moveY;
					p1.y -= moveY;
					p2.y -= moveY;
					property["point"]["lpx1"] = p1;
					property["point"]["lpx2"] = p2;
					property["basic"]["x"] = nx;
					property["basic"]["y"] = ny;
					property["basic"]["w"] = nw;
					property["basic"]["h"] = nh;
					break;
				case "basic":
					break;
			}
		} catch (ex){
			console.err(ex);
		}
	},
	
	make : function() {
		return JSON.parse(JSON.stringify(cp_line.property));
	},
	
	clearDraw : function(ctx, property) {
		var ds = property["draw"]["s"];
		var x = property["basic"]["x"];
		var y = property["basic"]["y"];
		var w = property["basic"]["w"];
		var h = property["basic"]["h"];
		ctx.clearRect(x - ds, y - ds, w + ds * 2, h + ds * 2);
		
		if (property["basic"]["p_x"] != undefined) {
			var px = property["basic"]["p_x"];
			var py = property["basic"]["p_y"];
			var pw = property["basic"]["p_w"];
			var ph = property["basic"]["p_h"];
			ctx.clearRect(px - ds, py - ds, pw + ds * 2, ph + ds * 2);
		}
	},
	
	draw2PointLine : function(ctx, property, co_t1, co_t2) {
		
		// var uSize = drawer.unitSize;
		var uSize = property.draw.s;
		var lp, rp;
		if (co_t1.x < co_t2.x) {
			lp = co_t1;
			rp = co_t2;
		} else {
			lp = co_t2;
			rp = co_t1;
		}
		
		var w = property["basic"]["w"];
		var h = property["basic"]["h"];
		var x = property["basic"]["x"];
		var y = property["basic"]["y"];
		var lInc = -(rp.y - lp.y) / (rp.x - lp.x);
		var inc = w < h ? (w / h) : 1;
		
		if (inc == 0) {
			ctx.fillRect(x, y, uSize, Math.abs(rp.y - lp.y) * uSize);
		} else {
			for (var c = lp.x; c < rp.x; c += inc) {
				var dx = lp.x * uSize + (c) * uSize;
				var dy = lp.y * uSize - (c - lp.x) * lInc * uSize;
				var dw = uSize;
				var dh = uSize;
				ctx.fillRect(x + dx, y + dy, dw, dh);
			}
		}
	},
	
	draw : function(ctx, property) {
		var uSize = property.draw.s;
		var color = "rgba(" 
			+ property["background"]["r"] + ","
			+ property["background"]["g"] + ","
			+ property["background"]["b"] + ","
			+ property["background"]["a"] + 
			")";
			
		ctx.fillStyle = color;
		var w = property["basic"]["w"];
		var h = property["basic"]["h"];
		var x = property["basic"]["x"];
		var y = property["basic"]["y"];
		var point = property["point"];
		
		var co_t1x = (point["lpx1"]["x"]) / uSize;
		var co_t1y = (point["lpx1"]["y"]) / uSize;
		var co_t2x = (point["lpx2"]["x"]) / uSize;
		var co_t2y = (point["lpx2"]["y"]) / uSize;
	
		var co_r = Math.max(co_t1x, co_t2x);
		var co_l = Math.max(co_t1x, co_t2x);
		var co_t = Math.max(co_t1y, co_t2y);
		var co_b = Math.max(co_t1y, co_t2y);
		var co_t1 = undefined; 
		var co_t2 = undefined; 
		
		if (co_t1x <= co_t2x) {
			co_t1 = { x : co_t1x, y : co_t1y };
			co_t2 = { x : co_t2x, y : co_t2y };
		} else {
			co_t2 = { x : co_t1x, y : co_t1y };
			co_t1 = { x : co_t2x, y : co_t2y };
		}
		cp_line.draw2PointLine(ctx, property, co_t1, co_t2);
	},
};

var cp_triangle = {
	
	property : {
		"basic" :{ 
			"t" : et.CP_TRIANGLE,
			"n" : "triangle",
			"w" : 100,
			"h" : 100,
			"x" : 100,
			"y" : 100,
			"a" : 0,
			"z" : 0,
			"key" : undefined,
		},
		"point" : {
			"t1" : {x : 50, y : 0},
			"t2" : {x : 0, y : 100},
			"t3" : {x : 100, y : 100},
		},
		"background" : {
			"r" : 100,
			"g" : 100,
			"b" : 100,
			"a" : 0.2,
		},
		"border" : {
			"w" : [1, 1, 1, 1],
			"t" : "solid",
			"r" : 0,
			"g" : 255,
			"b" : 0,
			"a" : 1,
		},
	},
	
	setProperty : function(property, att1, att2, value) {
		try {
			if (property[att1] == undefined) property[att1] = {};
			property[att1][att2] = value;
		} catch (ex){
			console.err(ex);
		}
	},
	
	make : function() {
		return JSON.parse(JSON.stringify(cp_triangle.property));
	},
	
	clearDraw : function(ctx, property) {
		cp_parall.clearDraw(ctx, property);
	},
	
	
	draw3Triangle : function(ctx, property, co_t1, co_t2, co_t3) {
		var uSize = drawer.unitSize;
		var x = property.basic.x;
		var y = property.basic.y;
		var w = property.basic.w;
		if (co_t1.x == co_t2.x) {
			var tInc = -(co_t3.y - co_t1.y) / (co_t3.x - co_t1.x);
			var bInc = -(co_t3.y - co_t2.y) / (co_t3.x - co_t2.x);
			for (var c = co_t1.x; c < co_t3.x;c++) {
				var td = co_t1.y - c * (tInc == Infinity ? 0 : tInc);
				var bd = co_t2.y - c * (bInc == Infinity ? 0 : bInc);
				var dw = Math.min(uSize, (x + c * uSize + uSize) - w);
				ctx.fillRect(x + c * uSize, y + td * uSize, dw, (bd - td) * uSize);
			}
		} else if (co_t1.x == co_t3.x) {
			var tInc = -(co_t2.y - co_t1.y) / (co_t2.x - co_t1.x);
			var bInc = -(co_t2.y - co_t3.y) / (co_t2.x - co_t3.x);
			for (var c = co_t2.x; c < co_t1.x;c++) {
				var td = co_t2.y - c * (tInc == Infinity ? 0 : tInc);
				var bd = co_t2.y - c * (bInc == Infinity ? 0 : bInc);
				var dw = Math.min(uSize, (x + c * uSize + uSize) - w);
				ctx.fillRect(x + c * uSize, y + td * uSize, dw, (bd - td) * uSize);
			}
		} else {
			if (co_t1.x < co_t2.x) {
				var tInc = -(co_t3.y - co_t1.y) / (co_t3.x - co_t1.x);
				var b1Inc = -(co_t2.y - co_t1.y) / (co_t2.x - co_t1.x);
				var b2Inc = -(co_t3.y - co_t2.y) / (co_t3.x - co_t2.x);
				for (var c = co_t1.x; c < co_t3.x; c++) {
					var td = undefined;
					var bd = undefined;
					if (c < co_t2.x) {
						td = co_t1.y - (c - co_t1.x) * tInc;
						bd = co_t1.y - (c - co_t1.x) * b1Inc;
					} else if (c >= co_t2.x) {
						td = co_t1.y - (c - co_t1.x) * tInc;
						bd = co_t2.y - (c - co_t2.x) * b2Inc;
					}
					var dw = uSize;
					if (w < (c + 1) * uSize) {
						dw = (c + 1) * uSize - w;
					}
					ctx.fillRect(x + c * uSize, y + td * uSize, dw, (bd - td) * uSize);
				}
			} else if (co_t1.x > co_t3.x) {
				
			} else {
				var t1Inc = -(co_t1.y - co_t2.y) / (co_t1.x - co_t2.x);
				var t2Inc = -(co_t3.y - co_t1.y) / (co_t3.x - co_t1.x);
				var bInc = -(co_t3.y - co_t2.y) / (co_t3.x - co_t2.x);
				for (var c = co_t2.x; c < co_t3.x; c++) {
					var td = undefined;
					var bd = undefined;
					if (c < co_t1.x) {
						td = co_t2.y - (c - co_t2.x) * t1Inc;
						bd = co_t2.y - (c - co_t2.x) * bInc;
					} else if (c >= co_t1.x) {
						td = co_t1.y - (c - co_t1.x) * t2Inc;
						bd = co_t2.y - (c - co_t2.x) * bInc;
					}
					var dw = uSize;
					if (w < (c + 1) * uSize) {
						dw = (c + 1) * uSize - w;
					}
					ctx.fillRect(x + c * uSize, y + td * uSize, dw, (bd - td) * uSize);
				}
			}
		}
	},
	
	draw : function(ctx, property) {
		
		var color = "rgba(" 
			+ property["background"]["r"] + ","
			+ property["background"]["g"] + ","
			+ property["background"]["b"] + ","
			+ property["background"]["a"] + 
			")";
			
		ctx.fillStyle = color;
		var uSize = drawer.unitSize;
		var w = property["basic"]["w"];
		var h = property["basic"]["h"];
		var x = property["basic"]["x"];
		var y = property["basic"]["y"];
		
		var co_t1x = (w * property["point"]["t1"]["x"] / 100) / uSize;
		var co_t1y = (h * property["point"]["t1"]["y"] / 100) / uSize;
		var co_t2x = (w * property["point"]["t2"]["x"] / 100) / uSize;
		var co_t2y = (h * property["point"]["t2"]["y"] / 100) / uSize;
		var co_t3x = (w * property["point"]["t3"]["x"] / 100) / uSize;
		var co_t3y = (h * property["point"]["t3"]["y"] / 100) / uSize;

		var co_r = Math.max(co_t1x, co_t2x, co_t3x);
		var co_l = Math.max(co_t1x, co_t2x, co_t3x);
		var co_t = Math.max(co_t1y, co_t2y, co_t3y);
		var co_b = Math.max(co_t1y, co_t2y, co_t3y);
		
		var co_t1 = { x : co_t1x, y : co_t1y };
		var co_t2 = { x : co_t2x, y : co_t2y };
		var co_t3 = { x : co_t3x, y : co_t3y };
		
		cp_triangle.draw3Triangle(ctx, property, co_t1, co_t2, co_t3);
	},
};


var cp_cube = {
	
		property : {
		"basic" : {
			"t" : et.CP_CUBE,
			"n" : "cube",
			"w" : 200,
			"h" : 200,
			"x" : 100,
			"y" : 100,
			"a" : 0,
			"z" : 0,
			"key" : undefined,
		},
		"point" : {
			"l1" : {x : 1, y : 30},
			"l2" : {x : 0, y : 80},
			"m1" : {x : 50, y : 0},
			"m2" : {x : 51, y : 50},
			"m3" : {x : 50, y : 100},
			"r1" : {x : 100, y : 30},
			"r2" : {x : 99, y : 80},
		},
	
		"background_1" : {
			"r" : 102,
			"g" : 100,
			"b" : 100,
			"a" : 0.2,
		},
		"background_2" : {
			"r" : 73,
			"g" : 68,
			"b" : 100,
			"a" : 0.46,
		},
		"background_3" : {
			"r" : 175,
			"g" : 164,
			"b" : 181,
			"a" : 0.2,
		},
		"border" : {
			"w" : [1, 1, 1, 1],
			"t" : "solid",
			"r" : 0,
			"g" : 255,
			"b" : 0,
			"a" : 1,
		},
	},
	
	setProperty : function(property, att1, att2, value) {
		try {
			if (property[att1] == undefined) property[att1] = {};
			property[att1][att2] = value;
		} catch (ex){
			console.err(ex);
		}
	},
	
	make : function() {
		return JSON.parse(JSON.stringify(cp_cube.property));
	},
	
	clearDraw : function(ctx, property) {
		cp_parall.clearDraw(ctx, property);
	},
	
	draw : function(ctx, property) {
		
		var color1 = "rgba(" 
			+ property["background_1"]["r"] + ","
			+ property["background_1"]["g"] + ","
			+ property["background_1"]["b"] + ","
			+ property["background_1"]["a"] + 
			")";
			
		var color2 = "rgba(" 
			+ property["background_2"]["r"] + ","
			+ property["background_2"]["g"] + ","
			+ property["background_2"]["b"] + ","
			+ property["background_2"]["a"] + 
			")";
			
		var color3 = "rgba(" 
			+ property["background_3"]["r"] + ","
			+ property["background_3"]["g"] + ","
			+ property["background_3"]["b"] + ","
			+ property["background_3"]["a"] + 
			")";
			
		var x = property["basic"]["x"];
		var y = property["basic"]["y"];
		var w = property["basic"]["w"];
		var h = property["basic"]["h"];
		var uSize = drawer.unitSize;
		
	
		var co_l1x = (w * property["point"]["l1"]["x"] / 100) / uSize;
		var co_l1y = (h * property["point"]["l1"]["y"] / 100) / uSize;
		var co_l2x = (w * property["point"]["l2"]["x"] / 100) / uSize;
		var co_l2y = (h * property["point"]["l2"]["y"] / 100) / uSize;
		var co_m1x = (w * property["point"]["m1"]["x"] / 100) / uSize;
		var co_m1y = (h * property["point"]["m1"]["y"] / 100) / uSize;
		var co_m2x = (w * property["point"]["m2"]["x"] / 100) / uSize;
		var co_m2y = (h * property["point"]["m2"]["y"] / 100) / uSize;
		var co_m3x = (w * property["point"]["m3"]["x"] / 100) / uSize;
		var co_m3y = (h * property["point"]["m3"]["y"] / 100) / uSize;
		var co_r1x = (w * property["point"]["r1"]["x"] / 100) / uSize;
		var co_r1y = (h * property["point"]["r1"]["y"] / 100) / uSize;
		var co_r2x = (w * property["point"]["r2"]["x"] / 100) / uSize;
		var co_r2y = (h * property["point"]["r2"]["y"] / 100) / uSize;
		

		var co_r = Math.max(co_m2x, co_m3x);
		var co_b = h / uSize;
		//uSize로 나눈 좌표 (왼쪽 모서리 위치 부터 시계방향으로 순서)
		//해당 포인트 안을 채워서 그린다.
		var co_p1 = { x : co_l1x, y : co_l1y }; 
		var co_p4 = { x : co_l2x, y : co_l2y };
		var co_p2 = { x : co_m2x, y : co_m2y }; 
		var co_p3 = { x : co_m3x, y : co_m3y };
		cp_parall4.__draw4Point(ctx, property, co_r, co_b, co_p1, co_p2, co_p3, co_p4, color1);
		
		//var co_l = Math.min(co_m2x, co_m3x)
		var co_r = Math.max(co_r1x, co_r2x);
		var co_b = h / uSize;
		//uSize로 나눈 좌표 (왼쪽 모서리 위치 부터 시계방향으로 순서)
		//해당 포인트 안을 채워서 그린다.
		var co_p1 = { x : co_m1x, y : co_m1y }; 
		var co_p4 = { x : co_l1x, y : co_l1y };
		var co_p2 = { x : co_r1x, y : co_r1y }; 
		var co_p3 = { x : co_m2x, y : co_m2y };
		cp_parall4.__draw4Point(ctx, property, co_r, co_b, co_p1, co_p2, co_p3, co_p4, color3);
		

		var co_r = Math.max(co_r1x, co_r2x);
		var co_b = h / uSize;
		//uSize로 나눈 좌표 (왼쪽 모서리 위치 부터 시계방향으로 순서)
		//해당 포인트 안을 채워서 그린다.
		var co_p1 = { x : co_m2x, y : co_m2y }; 
		var co_p4 = { x : co_m3x, y : co_m3y };
		var co_p2 = { x : co_r1x, y : co_r1y }; 
		var co_p3 = { x : co_r2x, y : co_r2y };
		cp_parall4.__draw4Point(ctx, property, co_r, co_b, co_p1, co_p2, co_p3, co_p4, color2);
	},
};

var cp_parall4 = {
	
	property : {
		"basic" : {
			"t" : et.CP_PARALL4,
			"n" : "parall4",
			"w" : 100,
			"h" : 100,
			"x" : 100,
			"y" : 100,
			"a" : 0,
			"z" : 0,
			"key" : undefined,
		},
		"point" : {
			"p1" : {x : 50, y : 0},
			"p2" : {x : 100, y : 50},
			"p3" : {x : 50, y : 100},
			"p4" : {x : 0, y : 50},
		},
		"background" : {
			"r" : 255,
			"g" : 100,
			"b" : 100,
			"a" : 1,
		},
		"border" : {
			"w" : [1, 1, 1, 1],
			"t" : "solid",
			"r" : 0,
			"g" : 255,
			"b" : 0,
			"a" : 1,
		},
	},
	
	setProperty : function(property, att1, att2, value) {
		try {
			if (property[att1] == undefined) property[att1] = {};
			property[att1][att2] = value;
		} catch (ex){
			console.err(ex);
		}
	},
	
	make : function() {
		return JSON.parse(JSON.stringify(cp_parall4.property));
	},
	
	clearDraw : function(ctx, property) {
		cp_parall.clearDraw(ctx, property);
	},
	
	draw : function(ctx, property) {
		ctx.fillStyle = "rgba(" 
			+ property["background"]["r"] + ","
			+ property["background"]["g"] + ","
			+ property["background"]["b"] + ","
			+ property["background"]["a"] + 
			")";
			
		var x = property["basic"]["x"];
		var y = property["basic"]["y"];
		var w = property["basic"]["w"];
		var h = property["basic"]["h"];
		var uSize = drawer.unitSize;
		
		var co_r = w / uSize;
		var co_b = h / uSize;
		
		var co_p1x = (w * property["point"]["p1"]["x"] / 100) / uSize;
		var co_p1y = (h * property["point"]["p1"]["y"] / 100) / uSize;
		var co_p2x = (w * property["point"]["p2"]["x"] / 100) / uSize;
		var co_p2y = (h * property["point"]["p2"]["y"] / 100) / uSize;
		var co_p3x = (w * property["point"]["p3"]["x"] / 100) / uSize;
		var co_p3y = (h * property["point"]["p3"]["y"] / 100) / uSize;
		var co_p4x = (w * property["point"]["p4"]["x"] / 100) / uSize;
		var co_p4y = (h * property["point"]["p4"]["y"] / 100) / uSize;
		
		//uSize로 나눈 좌표 (왼쪽 모서리 위치 부터 시계방향으로 순서)
		//해당 포인트 안을 채워서 그린다.
		var co_p1 = { x : co_p1x, y : co_p1y }; 
		var co_p2 = { x : co_p2x, y : co_p2y };
		var co_p3 = { x : co_p3x, y : co_p3y }; 
		var co_p4 = { x : co_p4x, y : co_p4y };
		cp_parall4.__draw4Point(ctx, property, co_r, co_b, co_p1, co_p2, co_p3, co_p4);
	},
	
	//4개의 좌표가 주어지면 그린다.
	__draw4Point : function(ctx, property, co_right, co_bottom, co_p1, co_p2, co_p3, co_p4, color, co_left) {
		
		if (color != undefined) {
			ctx.fillStyle = color;
		}
		
		var uSize = drawer.unitSize;
		//top line
		var inc41 = -((co_p1.y - co_p4.y) / (co_p1.x - co_p4.x));
		var inc12 = -((co_p2.y - co_p1.y) / (co_p2.x - co_p1.x));
		//bottom line
		var inc34 = -((co_p4.y - co_p3.y) / (co_p4.x - co_p3.x));	
		var inc23 = -((co_p3.y - co_p2.y) / (co_p3.x - co_p2.x));
		
		inc41 = isFinite(inc41) ? inc41 : 500;
		inc12 = isFinite(inc12) ? inc12 : -500;
		inc34 = isFinite(inc34) ? inc34 : 500;
		inc23 = isFinite(inc23) ? inc23 : -500;
		
		
		co_left = co_left == undefined ? co_p4.x : co_left;
		
		for (var c = co_left; c < co_right; c++) {
			var co_dt = 0;
			var co_db = co_bottom;
			
			//if (co_p4.x > c) continue;
			
			if (c < co_p1.x) {
				co_dt = co_p4.y + (c - co_left) * -inc41;
			} else /* if (c >= co_p1.x) */ {
				var base = co_p4.y + (co_p1.x - co_left) * -inc41;
				co_dt = base + (c - co_p1.x) * -inc12;
			}
			
			if (c < co_p3.x) {
				co_db = co_p4.y + (c - co_left) * -inc34;
			} else  /*if (c >= co_p3.x) */{
				var base = co_p4.y + (co_p3.x - co_left) * -inc34
				co_db = base + (c - co_p3.x) * -inc23;
			}
			
			var x = property.basic.x;
			var y = property.basic.y;
			var w = property.basic.w;
			var h = property.basic.h;
			
			var dx = c * uSize;
			var dy = co_dt * uSize;
			var dw = uSize;
			var dh = (co_db - co_dt) * uSize;
			dx = x + dx;
			dy = y + dy;
			
			dx = Math.max(dx, x);
			dy = Math.max(dy, y);
			dx = Math.min(dx, x + w);
			dy = Math.min(dy, y + h);
			var maxWidth = x + w - dx;
			dw = Math.min(dw, maxWidth);
			var maxHeight = y + h - dy;
			dh = Math.min(dh, maxHeight);
			ctx.fillRect(dx, dy, dw, dh);
		}
	},
	
	//4개의 좌표가 주어지면 그린다.
	__draw4Point : function(ctx, property, co_right, co_bottom, co_p1, co_p2, co_p3, co_p4, color) {
		
		if (color != undefined) {
			ctx.fillStyle = color;
		}
		
		var uSize = drawer.unitSize;
		//top line
		var inc41 = -((co_p1.y - co_p4.y) / (co_p1.x - co_p4.x));
		var inc12 = -((co_p2.y - co_p1.y) / (co_p2.x - co_p1.x));
		//bottom line
		var inc34 = -((co_p4.y - co_p3.y) / (co_p4.x - co_p3.x));	
		var inc23 = -((co_p3.y - co_p2.y) / (co_p3.x - co_p2.x));
		
		var isUp3 = false;
		if (co_p2.x < co_p3.x) {
			//위 라인이 3개 인경우
			isUp3 = true;
		}
		
		inc41 = isFinite(inc41) ? inc41 : 500;
		inc12 = isFinite(inc12) ? inc12 : -500;
		inc34 = isFinite(inc34) ? inc34 : 500;
		inc23 = isFinite(inc23) ? inc23 : -500;
		
		co_top = Math.min(co_p1.y, co_p2.y, co_p3.y, co_p4.y);
		co_left = Math.min(co_p1.x, co_p2.x, co_p3.x, co_p4.x);
		co_right = Math.max(co_p1.x, co_p2.x, co_p3.x, co_p4.x);
		co_bottom = Math.max(co_p1.y, co_p2.y, co_p3.y, co_p4.y);
		
		for (var c = co_left; c < co_right; c++) {
			var co_dt = 0;
			var co_db = co_bottom;

			if (c < co_p1.x) {
				co_dt = co_p4.y + (c - co_left) * -inc41;
			} else if (c >= co_p1.x && c < co_p2.x ) {
				var base = co_p1.y;
				co_dt = base + (c - co_p1.x) * -inc12;
			} else if (c >= co_p2.x && c < co_p3.x) {
				var base = co_p2.y;
				co_dt = base + (c - co_p2.x) * -inc23;
			}
			
			if (co_p1.x <= c && c < co_p4.x && co_left == co_p1.x && co_left != co_p4.x) {
				var base = co_p1.y;
				co_db = base + (c - co_p1.x) * -inc41
			} else if (co_p4.x <= c && c < co_p3.x) {
				var base = co_p4.y;
				co_db = base + (c - co_p4.x) * -inc34;
			} else if (co_p3.x <= c) {
				var base = co_p3.y;
				co_db = base + (c - co_p3.x) * -inc23;
			}
			
			var x = property.basic.x;
			var y = property.basic.y;
			var w = property.basic.w;
			var h = property.basic.h;
			
			var dx = c * uSize;
			var dy = co_dt * uSize;
			var dw = uSize;
			var dh = (co_db - co_dt) * uSize;
			dx = x + dx;
			dy = y + dy;
			
			dx = Math.max(dx, x);
			dy = Math.max(dy, y);
			dx = Math.min(dx, x + w);
			dy = Math.min(dy, y + h);
			var maxWidth = x + w - dx;
			dw = Math.min(dw, maxWidth);
			var maxHeight = y + h - dy;
			dh = Math.min(dh, maxHeight);
			ctx.fillRect(dx, dy, dw, dh);
		}
	},
	
	__draw4FreePoint : function(ctx, property, co_right, co_bottom, co_p1, co_p2, co_p3, co_p4) {
		
		//find 4 point 
		//just draw
		
		//find 3 point
		//find 1 point position
		//최왼쪽, 최오른쪽 기울기의 
		//아래 2
		//위 2
		//아래1 위1
				
		//find 2 point 
		//find 2 point position
		ctx.beginPath(); 
		
		// var x1 =  ;
		// var y1 = ;
		// var x2 = ;
		// var y2 = ;
		
		
		// ctx.moveTo(
		
		
		
		// ctx.closePath();
	},
};

var cp_parall2 = {
	property : {
		"basic" : {
			"t" : et.CP_PARALL2,
			"n" : "parall2",
			"w" : 100,
			"h" : 100,
			"x" : 100,
			"y" : 100,
			"a" : 0,
			"z" : 0,
			"key" : undefined,
		},
		"point" : {
			"hp" : 45,
			"vp" : 90,
		},
		"background" : {
			"r" : 100,
			"g" : 100,
			"b" : 100,
			"a" : 1,
		},
		"border" : {
			"w" : [1, 1, 1, 1],
			"t" : "solid",
			"r" : 0,
			"g" : 255,
			"b" : 0,
			"a" : 1,
		},
	},
	
	setProperty : function(property, att1, att2, value) {
		try {
			if (property[att1] == undefined) property[att1] = {};
			property[att1][att2] = value;
		} catch (ex){
			console.err(ex);
		}
	},
	
	make : function() {
		return JSON.parse(JSON.stringify(cp_parall2.property));
	},
	
	clearDraw : function(ctx, property) {
		cp_parall.clearDraw(ctx, property);
	},
	
	draw : function(ctx, property) {
		
		ctx.fillStyle = "rgba(" 
			+ property["background"]["r"] + ","
			+ property["background"]["g"] + ","
			+ property["background"]["b"] + ","
			+ property["background"]["a"] + 
			")";
			
		var x = property["basic"]["x"];
		var y = property["basic"]["y"];
		var w = property["basic"]["w"];
		var h = property["basic"]["h"];
		var uSize = drawer.unitSize;
		var wuCnt = w / uSize;
		var huCnt = h / uSize;
		
		var vh = (h * property["point"]["vp"] / 100) / uSize;
		var u1 = (w * property["point"]["hp"] / 100) / uSize;
		var d1 = wuCnt - u1;
		
		var u1Inc = vh / u1;
		var u2Inc = (huCnt - vh) / (wuCnt - u1);
		var d1Inc = u2Inc;
		var d2Inc = u1Inc;
		
		for (var c = 0; c < wuCnt; c++) { 		//horz
			var uLimit = 0 * uSize;
			var dLimit = huCnt * uSize;
			
			if (c < u1) {
				uLimit = vh * uSize - c * u1Inc * uSize;
			} else {
				uLimit = (c - u1) * u2Inc * uSize
			}
			
			if (c < d1) {
				dLimit = vh * uSize + c * d1Inc * uSize;
			} else {
				dLimit = huCnt * uSize - (c - d1) * d2Inc * uSize;
			}
			
			var dLeft = x + c * uSize;
			var dTop = y + uLimit;
			var maxWidth = x + w - dLeft;
			var dWidth = Math.min(maxWidth, uSize);
			var maxHeight = y + h - dTop;
			var dHeight = Math.min(maxHeight, dLimit - uLimit);
			ctx.fillRect(dLeft, dTop, dWidth, dHeight);		
		}
	},
};

var cp_parall = {
	property : {
		"basic" : {
			"t" : et.CP_PARALL,
			"n" : "parall",
			"w" : 100,
			"h" : 100,
			"x" : 100,
			"y" : 100,
			"a" : 0,
			"z" : 0,
			"key" : undefined,
		},
		"point" : {
			"d" : "hr", //vt : vertical top, vb : vertical bottom, hl : horizontal left, hr : horizontal right
			"p" : 30,
		},
		"background" : {
			"r" : 0,
			"g" : 0,
			"b" : 255,
			"a" : 1,
		},
		"border" : {
			"w" : [1, 1, 1, 1],
			"t" : "solid",
			"r" : 0,
			"g" : 255,
			"b" : 0,
			"a" : 1,
		},
	},
	
	setProperty : function(property, att1, att2, value) {
		try {
			if (property[att1] == undefined) property[att1] = {};
			property[att1][att2] = value;
		} catch (ex){
			console.err(ex);
		}
	},
	
	make : function() {
		return JSON.parse(JSON.stringify(cp_parall.property));
	},
	
	clearDraw : function(ctx, property) {
		var x = property["basic"]["x"];
		var y = property["basic"]["y"];
		var w = property["basic"]["w"];
		var h = property["basic"]["h"];
		ctx.clearRect(x, y, w, h);
		
		if (property["basic"]["p_x"] != undefined) {
			var px = property["basic"]["p_x"];
			var py = property["basic"]["p_y"];
			var pw = property["basic"]["p_w"];
			var ph = property["basic"]["p_h"];
			ctx.clearRect(px, py, pw, ph);
		}
	},
	
	draw : function(ctx, property) {
		
		ctx.fillStyle = "rgba(" 
			+ property["background"]["r"] + ","
			+ property["background"]["g"] + ","
			+ property["background"]["b"] + ","
			+ property["background"]["a"] + 
			")";
			
		var x = property["basic"]["x"];
		var y = property["basic"]["y"];
		var w = property["basic"]["w"];
		var h = property["basic"]["h"];
		var uSize = drawer.unitSize;
		var wuCnt = w / uSize;
		var huCnt = h / uSize;
		
		var direction = property["point"]["d"]; // vt, vb, hl, hr
		var u1 = undefined;
		var d2 = undefined;
		var uInc = undefined;
		var dInc = undefined;
		
		switch (direction) {
			case "vt":
				u1 = (w * property["point"]["p"] / 100) / uSize;
				d2 = wuCnt - u1;
				uInc = huCnt / u1;
				dInc = uInc;
				break;
			case "vb":
				d2 = (w * property["point"]["p"] / 100) / uSize;
				u1 = wuCnt - d2;
				dInc = -(huCnt / d2);
				uInc = dInc;
				break;
			case "hl":
				u1 = wuCnt;
				d2 = 0;
				uInc = ((h * property["point"]["p"] / 100) / uSize) / wuCnt;
				dInc = uInc;
				break;
			case "hr":
				d2 = wuCnt;
				u1 = 0;
				dInc = -((h * property["point"]["p"] / 100) / uSize) / wuCnt;
				uInc = dInc;
				break;
		}
		
		
		for (var c = 0; c < wuCnt; c++) { 		//horz
			var uLimit = 0 * uSize;
			var dLimit = huCnt * uSize;
			switch (direction) {
				case "hl":
					if (c < u1) {
						uLimit = ((wuCnt - c) * uInc * uSize);
					}
					if (c >= d2) {
						dLimit = h - ((c) * dInc * uSize);
					}
					break;
				case "hr":
					if (c < d2) {
						uLimit = -(c * uInc * uSize);
					}
					if (c >= u1) {
						dLimit = (h + ((wuCnt - c) * dInc * uSize));
					}
					break;
				case "vt":
					if (c < u1) {
						uLimit = h - (c * uInc * uSize);
					}
					if (c >= d2) {
						dLimit = h - ((c - d2) * dInc * uSize);
					}
					break;
				case "vb":
					if (c < d2) {
						dLimit = - (c * dInc * uSize);
					}
					if (c >= u1) {
						uLimit = - ((c - u1) * uInc * uSize);	
					}
					break;
			}
			
			var dLeft = x + c * uSize;
			var dTop = y + uLimit;
			var maxWidth = x + w - dLeft;
			var dWidth = Math.min(maxWidth, uSize);
			var maxHeight = y + h - dTop;
			var dHeight = Math.min(maxHeight, dLimit - uLimit);
			ctx.fillRect(dLeft, dTop, dWidth, dHeight);		
		}
	},
};

var cp_tree = {
	property : {
		"basic" : {
			"t" : et.CP_TREE,
			"n" : "tree",
			"w" : 100,
			"h" : 200,
			"x" : 100,
			"y" : 100,
			"a" : 0,
			"z" : 0,
			"key" : undefined,
		},
		"background" : {
			"r" : 0,
			"g" : 0,
			"b" : 255,
			"a" : 1,
		},
		"border" : {
			"w" : [1, 1, 1, 1],
			"t" : "solid",
			"r" : 0,
			"g" : 255,
			"b" : 0,
			"a" : 1,
		},
		"draw" : {
			"s" : 4,
		},
	},
	
	setProperty : function(property, att1, att2, value) {
		try {
			if (property[att1] == undefined) property[att1] = {};
			property[att1][att2] = value;
		} catch (ex){
			console.err(ex);
		}
	},
	
	make : function() {
		return JSON.parse(JSON.stringify(cp_tree.property));
	},
	
	clearDraw : function(ctx, property) {
		var x = property["basic"]["x"];
		var y = property["basic"]["y"];
		var w = property["basic"]["w"];
		var h = property["basic"]["h"];
		ctx.clearRect(x, y, w, h);
		
		if (property["basic"]["p_x"] != undefined) {
			var px = property["basic"]["p_x"];
			var py = property["basic"]["p_y"];
			var pw = property["basic"]["p_w"];
			var ph = property["basic"]["p_h"];
			ctx.clearRect(px, py, pw, ph);
		}
	},
	
	draw : function(ctx, property) {
		
		var colorLeafMain = "green";
		var colorLeafSub = "lightgreen";
		var colorApple = "red";
		
		var sx = property.basic.x;
		var sy = property.basic.y;
		var w = property.basic.w;
		var h = property.basic.h;
		
		sx += w / 2;
		sy += w / 2;
		
		var tw = w / 5;
		var th =  h - w;
		
		cp_tree.drawTree_trunk(ctx, sx, sy, w, tw, th);
		cp_tree.drawTree_leaf(ctx, sx, sy, w, colorLeafMain, 60);
		cp_tree.drawTree_leaf(ctx, sx, sy, w, colorLeafSub, 50);
		cp_tree.drawTree_leaf(ctx, sx, sy, w, colorApple, 2, 8);
	},
	
	
	drawTree_trunk : function(ctx, sx, sy, w, tw, th) {
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
	},
	
	drawTree_leaf : function(ctx, sx, sy, w, color, density, _size) {
		
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
	},
};


var colorManager = {

	displayInputWidth : 25,
	gap : 5,

	getTrackStyle : function(conWidth, conHeight, idx) {
		var d = colorManager.displayInputWidth;
		var g = colorManager.gap;
		//
		conHeight = conHeight - g * 2;
		//
		var left, top, width, height;
		width = conWidth - (d + g * 6);
		height = Math.max(10, (conHeight - 2 * g) / 10);
		left = g;
		top = (conHeight / 4 * idx) + ((conHeight / 4) - height) / 2;
		//
		top += g;
		//
		var style = "position:absolute;background:lightgray;border:1px solid white;box-sizing:border-box;";
		style += "left:" + left + "px;";
		style += "top:" + top + "px;";
		style += "width:" + width + "px;";
		style += "height:" + height + "px;";
		return style;
	},
	
	getBtnStyle : function(conWidth, conHeight, idx) {
		var d = colorManager.displayInputWidth;
		var g = colorManager.gap;
		//
		conHeight = conHeight - g * 2;
		//
		var left, top, width, height;
		width = Math.max(10, (conWidth - 2 * g) / 20);
		height = (conHeight - 2 * g) / 4;
		left = 0;
		top = (conHeight / 4 * idx) + ((conHeight / 4) - height) / 2;
		//
		top += g;
		//
		var style = "position:absolute;background:gray;border:1px solid white;box-sizing:border-box;";
		style += "left:" + left + "px;";
		style += "top:" + top + "px;";
		style += "width:" + width + "px;";
		style += "height:" + height + "px;";
		style += "margin-left:" + g + "px;";
		return style;
	},
	
	getDisplayValueStyle : function(conHeight, idx) {
		var d = colorManager.displayInputWidth;
		var g = colorManager.gap;
		//
		conHeight = conHeight - g * 2;
		//
		var height = (conHeight - 2 * g) / 8;
		var top = (conHeight / 4 * idx) + ((conHeight / 4) - height) / 2;
		var style = "position:absolute;width:" + d + "px;border:none;";
		//
		top += g;
		//
		style += "left:calc(100% - " + (d + g * 2) + "px);";
		style += "top:" + top + "px;";
		//style += "margin-top:" + g * 2 + "px;";
		style += "height:" + height + "px;";
		return style;
	},
	
	
	setValue : function(colorObject, r, g, b, a) {
		
		var colorDiv = colorObject.colorDiv;
		
		if (r != undefined) {
			var rDiv = colorDiv.querySelector("[id=r]");
			var rTrack = colorDiv.querySelector("[id=rt]");
			var rInput = colorDiv.querySelector("[id=rdv]");
			rDiv.style.left = (parseInt(rTrack.style.width) / 255 * r) + "px";
			rInput.value = r;
		}
		
		if (g != undefined) {
			var gDiv = colorDiv.querySelector("[id=g]");
			var gTrack = colorDiv.querySelector("[id=gt]");
			var gInput = colorDiv.querySelector("[id=gdv]");
			gDiv.style.left = (parseInt(gTrack.style.width) / 255 * g) + "px";
			gInput.value = g;
		}
		
		if (b != undefined) {
			var bDiv = colorDiv.querySelector("[id=b]");
			var bTrack = colorDiv.querySelector("[id=bt]");
			var bInput = colorDiv.querySelector("[id=bdv]");
			bDiv.style.left = (parseInt(bTrack.style.width) / 255 * b) + "px";
			bInput.value = b;
		}
		
		if (a != undefined) {
			var aDiv = colorDiv.querySelector("[id=a]");
			var aTrack = colorDiv.querySelector("[id=at]");
			var aInput = colorDiv.querySelector("[id=adv]");
			aDiv.style.left = (parseInt(aTrack.style.width) / 100 * (a * 100)) + "px";
			aInput.value = a;
		}
		
		colorManager.drawColor(colorObject, false);
	},

	/*
	* top : 100px 50%
	* left : 100px 50%
	* width : 100px 
	* height : 100px 
	*/
	init : function(top, left, width, height, endCallback) {
		
		var colorDiv = document.createElement("div");
		var colorObject = new colorManager.colorObject(colorDiv, endCallback);
		
		var colorDivStyle = "position:fixed;left:" + left + "px;top:" + top + "px;";
		colorDivStyle += "width:" + width + "px;height:" + height + "px;border:1px solid yellow";
		colorDiv.setAttribute("tabindex", 0);
		
		colorDiv.style = colorDivStyle;
		et.mainContainer.appendChild(colorDiv);
		
		var rDiv = document.createElement("div");
		var gDiv = document.createElement("div");
		var bDiv = document.createElement("div");
		var aDiv = document.createElement("div");
		
		var trackRDiv = document.createElement("div");
		var trackGDiv = document.createElement("div");
		var trackBDiv = document.createElement("div");
		var trackADiv = document.createElement("div");
		
		var rInput = document.createElement("input");
		var gInput = document.createElement("input");
		var bInput = document.createElement("input");
		var aInput = document.createElement("input");
		
		trackRDiv.style = colorManager.getTrackStyle(width, height, 0);
		trackGDiv.style = colorManager.getTrackStyle(width, height, 1);
		trackBDiv.style = colorManager.getTrackStyle(width, height, 2);
		trackADiv.style = colorManager.getTrackStyle(width, height, 3);
		colorDiv.appendChild(trackRDiv);
		colorDiv.appendChild(trackGDiv);
		colorDiv.appendChild(trackBDiv);
		colorDiv.appendChild(trackADiv);
		
		trackRDiv.setAttribute("id", "rt");
		trackGDiv.setAttribute("id", "gt");
		trackBDiv.setAttribute("id", "bt");
		trackADiv.setAttribute("id", "at");
		
		rDiv.style = colorManager.getBtnStyle(width, height, 0);
		gDiv.style = colorManager.getBtnStyle(width, height, 1);
		bDiv.style = colorManager.getBtnStyle(width, height, 2);
		aDiv.style = colorManager.getBtnStyle(width, height, 3);
		colorDiv.appendChild(rDiv);
		colorDiv.appendChild(gDiv);
		colorDiv.appendChild(bDiv);
		colorDiv.appendChild(aDiv);
		
		rDiv.setAttribute("id", "r");
		gDiv.setAttribute("id", "g");
		bDiv.setAttribute("id", "b");
		aDiv.setAttribute("id", "a");
		
		rInput.style = colorManager.getDisplayValueStyle(height, 0);
		gInput.style = colorManager.getDisplayValueStyle(height, 1);
		bInput.style = colorManager.getDisplayValueStyle(height, 2);
		aInput.style = colorManager.getDisplayValueStyle(height, 3);
		colorDiv.appendChild(rInput);
		colorDiv.appendChild(gInput);
		colorDiv.appendChild(bInput);
		colorDiv.appendChild(aInput);
		
		rInput.setAttribute("id", "rdv");
		gInput.setAttribute("id", "gdv");
		bInput.setAttribute("id", "bdv");
		aInput.setAttribute("id", "adv");
		
		var downX = -1;
		colorDiv.addEventListener("mousedown", function(e) {
			var targetID = e.target.getAttribute("id");
			if (targetID != "r" 
				&& targetID != "g" 
				&& targetID != "b"
				&& targetID != "a") {
				return;
			}
			downX = e.pageX;
			colorDiv.setAttribute("current", targetID);
		}, false);
		
		colorDiv.addEventListener("mousemove", function(e) {
			var targetID = colorDiv.getAttribute("current");
			if (targetID != "r" 
				&& targetID != "g" 
				&& targetID != "b"
				&& targetID != "a") {
				return;
			}
			
			var rgbSeg = colorDiv.querySelector("[id=" + targetID + "]");
			var trackSeg = colorDiv.querySelector("[id=" + targetID + "t]");
			var dvSeg = colorDiv.querySelector("[id=" + targetID + "dv]");
			var moveX = e.pageX - downX;
			var cLeft = parseInt(rgbSeg.style.left);
			var mWidth = parseInt(trackSeg.style.width);
			cLeft = (cLeft + moveX);
			cLeft = Math.min(mWidth, cLeft);
			cLeft = Math.max(0, cLeft);
			rgbSeg.style.left = (cLeft) + "px";
			
			downX = e.pageX;
			colorManager.drawColor(colorObject, true);
			return false;
		}, false);
		
		colorDiv.addEventListener("mouseup", function(e) {
			colorDiv.setAttribute("current", undefined);
			return false;
		}, false);
		
		colorDiv.addEventListener("keyup", function(e) {
			if (e.which == 13) {
				var tid = e.target.getAttribute("id");
				var rgbaValue = e.target.value;
				var rgba = tid.substring(0, 1);
				switch (rgba) {
					case "r":
						colorManager.setValue(colorDiv, rgbaValue);
						break;
					case "g":
						colorManager.setValue(colorDiv, undefined,rgbaValue);
						break;
					case "b":
						colorManager.setValue(colorDiv, undefined, undefined,rgbaValue);
						break;
					case "a":
						colorManager.setValue(colorDiv, undefined, undefined, undefined,rgbaValue);
						break;
				}
			}
			return false;
		}, false);
		
		return  colorObject;
	},

	colorObject : function(colorDiv, endCallback) {
		this.colorDiv = colorDiv;
		this.endCallback = endCallback;
		this.setEndCallback = function(newCallback) {
			this.endCallback = newCallback;
		};
	},
	
	drawColor : function(colorObject, doCallback) {
		
		var colorDiv = colorObject.colorDiv;
		var rDiv = colorDiv.querySelector("[id=r]");
		var gDiv = colorDiv.querySelector("[id=g]");
		var bDiv = colorDiv.querySelector("[id=b]");
		var aDiv = colorDiv.querySelector("[id=a]");
		var rTrack = colorDiv.querySelector("[id=rt]");
		var rInput = colorDiv.querySelector("[id=rdv]");
		var gInput = colorDiv.querySelector("[id=gdv]");
		var bInput = colorDiv.querySelector("[id=bdv]");
		var aInput = colorDiv.querySelector("[id=adv]");
		var maxWidth = parseFloat(rTrack.style.width);
		
		var r = parseFloat(rDiv.style.left);
		var g = parseFloat(gDiv.style.left);
		var b = parseFloat(bDiv.style.left);
		var a = parseFloat(aDiv.style.left);
		
		r = parseInt(r / maxWidth * 255);
		g = parseInt(g / maxWidth * 255);
		b = parseInt(b / maxWidth * 255);
		a = parseInt(a / maxWidth * 100);
		a = (Math.min(1, a / 100.0)).toFixed(2);
		
		var colorStyle = "rgba(" + r + "," + g + "," + b + "," + a + ")";
		var colorR = "rgb(" + r + ", 0, 0)";
		var colorG = "rgb(0, " + g + ", 0)";
		var colorB = "rgb(0, 0, " + b + ")";
		colorDiv.style.background = colorStyle;
		rDiv.style.background = colorR;
		gDiv.style.background = colorG;
		bDiv.style.background = colorB;
		
		rInput.value = r;
		gInput.value = g;
		bInput.value = b;
		aInput.value = a;
		
		if (doCallback && colorObject.endCallback != undefined) {
			colorObject.endCallback(r, g, b, a);
		}
	},
};


var fileManager = {
	
	save : function() {
		const a = document.createElement("a");
		a.href = URL.createObjectURL(new Blob([JSON.stringify(dMap, null, 2)], { type: "text/plain" }));
		a.setAttribute("download", "page_" + Date.now() + ".txt");
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	},
	
	load : function() {
		var input = document.createElement("input");
		input.type = "file";
		input.accept = "text/plain"; // 확장자가 xxx, yyy 일때, ".xxx, .yyy"
		input.onchange = function (event) {
			fileManager.processFile(event.target.files[0]);
		};
		input.click();
	},
	
	processFile : function(file) {
		var reader = new FileReader();
		drawer.clearAll();
		reader.onload = function () {
			console.log(reader.result);
			var loadedMap = JSON.parse(reader.result);
			dMap = loadedMap;
			drawer.drawAll();
		};
		reader.readAsText(file, /* optional */ "euc-kr");
	}
};

et.makeTool();
et.makeComponentTool();
et.init();
et.initEvent();
propertyManager.init();
adorner.initEvent();

