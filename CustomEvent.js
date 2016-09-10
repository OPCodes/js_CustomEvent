
function CustomEvent(param){
	this.unique = param;
	this.evFnObj = {};
}

CustomEvent.prototype.addEvent = function (evName,evFn){
	if( !this.evFnObj[evName] ){
		this.evFnObj[evName] = [];
	}
	var evFnArr = this.evFnObj[evName];
	if( this.unique === "unique" ){
		var onOff = true;
		for( var i = 0; i < evFnArr.length; i++ ){
			if( evFnArr[i] === evFn ){
				onOff = false;
				break;
			}
		}
		if( onOff ){
			evFnArr.push(evFn);
		}
	} else {
		evFnArr.push(evFn);
	}
}

CustomEvent.prototype.trigger = function (evName){
	var evFnArr = this.evFnObj[evName];
	if( evName ){
		for( var i = 0; i < evFnArr.length; i++ ){
			evFnArr[i]();
		}
	}
}

CustomEvent.prototype.removeEvent = function (evName,evFn){
	var evFnArr = this.evFnObj[evName];
	if( !evFn ){
		delete this.evFnObj[evName];
	} else {
		if( this.unique === "unique" ){
			for( var i = 0; i < evFnArr.length; i++ ){
				if( evFnArr[i] === evFn ){
					evFnArr.splice(i,1);
					break;
				}
			}
		} else {
			for( var i = 0; i < evFnArr.length; i++ ){
				if( evFnArr[i] === evFn ){
					evFnArr.splice(i,1);
					i--;
				}
			}
		}
	}
}