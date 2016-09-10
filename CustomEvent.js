//创建一个CustomEvent构造函数
function CustomEvent(param){    // param为检测每个自定义事件的函数能够多次绑定
	this.unique = param;
	this.evFnObj = {};          // 这个对象用来存放自定义事件，以及对应的函数数组
}

CustomEvent.prototype.addEvent = function (evName,evFn){
	if( !this.evFnObj[evName] ){    // 假如当前事件下的函数数组不存在
		this.evFnObj[evName] = [];  // 创建一个数组用来存放函数事件
	}
	var evFnArr = this.evFnObj[evName];
	if( this.unique === "unique" ){  // 此条件为只能当前事件不能多次绑定同一函数
		var onOff = true;
		for( var i = 0; i < evFnArr.length; i++ ){
			if( evFnArr[i] === evFn ){   // 如果成立，则说明已经存在，不能再次绑定了
				onOff = false;
				break;
			}
		}
		if( onOff ){
			evFnArr.push(evFn);
		}
	} else {                          // 说明可以多次绑定，直接push到数组里即可
		evFnArr.push(evFn);
	}
}

CustomEvent.prototype.trigger = function (evName){  // 自定义事件触发方法
	var evFnArr = this.evFnObj[evName];
	if( evName ){
		for( var i = 0; i < evFnArr.length; i++ ){  // 循环执行当前事件数组里的函数
			evFnArr[i]();
		}
	}
}

CustomEvent.prototype.removeEvent = function (evName,evFn){  // 移除事件函数
	var evFnArr = this.evFnObj[evName];
	if( !evFn ){  // 如果当前事件对应的evFn函数已经不存在，则
		delete evFnArr;
	} else {      // 如果存在，则循环遍历当前evName下的evFn
		if( this.unique === "unique" ){      // 如果成立，则说明只能单次绑定
			for( var i = 0; i < evFnArr.length; i++ ){
				if( evFnArr[i] === evFn ){   // 找到即可移除，只需要移除一次
					evFnArr.splice(i,1);
					break;
				}
			}
		} else {                             // 如果成立，说明可以多次绑定
			for( var i = 0; i < evFnArr.length; i++ ){
				if( evFnArr[i] === evFn ){   // 找到移除，需要遍历移除所有才可以
					evFnArr.splice(i,1);
					i--;
				}
			}
		}
	}
}