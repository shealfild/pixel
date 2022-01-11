var workManager = {

	recordQueue : [],
	recordLinkedActionMap : {},
	recordIndex : -1,
	
	ACTION_MAKE : "ACTION_MAKE",
	ACTION_DEL : "ACTION_DEL",
	ACTION_PROP : "ACTION_PROP",
	
	REC_FIRST : "FIRST",
	REC_LINKED : "LINKED",
	REC_NONE : "NONE",
	
	getMaxRecordIndex : function() {
		return workManager.recordQueue.length - 1;
	},
	
	removeRecord : function() {
		//undo 하여 실행시점 중간에 위치한 상태에서 신규 작업을 할경우 
		var maxRecordIndex = workManager.getMaxRecordIndex();
		if (maxRecordIndex != workManager.recordIndex) {
			for (var i = workManager.recordIndex + 1; i <= maxRecordIndex; i++) {
				delete workManager.recordLinkedActionMap[i];
			}
			workManager.recordQueue.splice(workManager.recordIndex + 1);
		}
	},
	
	cloneValue : function(value){
		return value == undefined ? undefined : JSON.parse(JSON.stringify(value));
	},
	
	record : function(actionName, recType, itemKey, propCategoryKey, propItemKey, propValue) {
		
		if (recType == workManager.REC_NONE) { return; }
		
		propValue = workManager.cloneValue(propValue);
		var preValue = undefined;
		var itemProperty = dMap[itemKey];
		
		switch (actionName) {
			case workManager.ACTION_MAKE:
				propValue = workManager.cloneValue(propValue);
				break;
			case workManager.ACTION_DEL:
				preValue = workManager.cloneValue(itemProperty);
				break;
			case workManager.ACTION_PROP:
				var itemProperty = dMap[itemKey];
				preValue = itemProperty[propCategoryKey] != undefined ? itemProperty[propCategoryKey][propItemKey] : undefined;
				preValue = workManager.cloneValue(preValue);
				break;
		}
		
		//remove record
		workManager.removeRecord();
		
		var actionData = { "k0" : actionName, "k1" : itemKey, "k2" : propCategoryKey, "k3" : propItemKey, "v" : propValue, "pv" : preValue };
		switch (recType) {
			case workManager.REC_FIRST:
				//first Action
				workManager.recordQueue[++workManager.recordIndex] = actionData;
				break;
			case workManager.REC_LINKED:
				//first-linked Action
				//여러개 일 수 있음
				var linkedActionMap = workManager.recordLinkedActionMap[workManager.recordIndex];
				if (linkedActionMap == undefined) {
					linkedActionMap = [];
					workManager.recordLinkedActionMap[workManager.recordIndex] = linkedActionMap;
				}
				linkedActionMap.push(actionData);
				break;
		}
	},
	
	undo : function() {
		if (workManager.recordIndex == -1) return;
		
		var actionData = workManager.recordQueue[workManager.recordIndex];
		var actionLinkedList = workManager.recordLinkedActionMap[workManager.recordIndex--];
		var actionCnt = actionLinkedList == undefined ? 0 : actionLinkedList.length;
		
		for (var i = -1; i < actionCnt; i++) {
			var undoData = i == -1 ? actionData : actionLinkedList[i];
			if (undoData == undefined) return;
			switch (undoData.k0) {
				case workManager.ACTION_MAKE: //del
					workManager.__undoMake(undoData);
					break;
				case workManager.ACTION_DEL:  //make
					workManager.__undoDel(undoData);
					break;
				case workManager.ACTION_PROP: //change property
					workManager.__undoProperty(undoData);
					break;
			}
		}
	},
	
	redo : function() {
		
		if (workManager.getMaxRecordIndex() < workManager.recordIndex + 1) return;
		
		var actionData = workManager.recordQueue[++workManager.recordIndex];
		var actionLinkedList = workManager.recordLinkedActionMap[workManager.recordIndex];
		var actionCnt = actionLinkedList == undefined ? 0 : actionLinkedList.length;
		
		for (var i = -1; i < actionCnt; i++) {
			var redoData = i == -1 ? actionData : actionLinkedList[i];
			if (redoData == undefined) return;
		
			switch (redoData.k0) {
				case workManager.ACTION_MAKE: //make
					workManager.__redoMake(redoData); 
					break;
				case workManager.ACTION_DEL: //del
					workManager.__redoDel(redoData);
					break;
				case workManager.ACTION_PROP:
					workManager.__redoProperty(redoData);
					break;
			}
		}
	},
	
	
	__undoMake : function(actionData) {
		var itemKey = actionData.k1;
		var itemProperty = dMap[itemKey];
		itemManager.__deleteItem(itemKey, workManager.REC_NONE);
	},
	
	__undoDel : function(actionData) {
		var itemKey = actionData.k1;
		var itemProperty = actionData.pv;
		itemManager.__makeItem(itemKey, itemProperty, workManager.REC_NONE);
	},
	
	__undoProperty : function(actionData) {
		var prevValue = actionData.pv;
		var itemKey = actionData.k1;
		var itemProperty = dMap[itemKey];
		itemManager.setProperty(itemKey, itemProperty, actionData.k2, actionData.k3, prevValue, workManager.REC_NONE);
		//draw 한번에 처리?
		drawer.drawItem(itemKey);
	},
	
	__redoMake : function(actionData) {
		var value = actionData.v;
		var itemKey = actionData.k1;
		var itemProperty = actionData.v;
		itemManager.__makeItem(itemKey, itemProperty, workManager.REC_NONE);
	},
	
	__redoDel : function(actionData) {
		var value = actionData.v;
		var itemKey = actionData.k1;
		itemManager.__deleteItem(itemKey, workManager.REC_NONE);
	},
	
	__redoProperty : function(actionData) {
		var value = actionData.v;
		var itemKey = actionData.k1;
		var itemProperty = dMap[itemKey];
		itemManager.setProperty(itemKey, itemProperty, actionData.k2, actionData.k3, value, workManager.REC_NONE);
		//draw 한번에 처리?
		drawer.drawItem(itemKey);
	},		
};

//itemManager.setProperty(itemKey, itemProperty, att1Name, att2Name, attValue, workManager.REC_FIRST);

