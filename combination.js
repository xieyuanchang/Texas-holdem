// 从alllen里取出sublen的组合
// canRepeat true：顺序相关 false：顺序无关
function combination(alllen, sublen, canRepeat) {
	var arr = [];
	var combox = [];
	if (alllen < sublen) {
		return combox;
	}

	for (var i = 0; i < alllen; i++) {
		arr.push(i);
	};

	var map = {};
	this.makeCombox = function(subarr) {
		if (subarr.length >= sublen) {
			if (!canRepeat) {
				var key = subarr.sort().join("-")
				if (map[key] == null) {
					combox.push(subarr);
					map[key] = 1;
				}
			} else {
				combox.push(subarr);
			}
		} else {
			for (var i = 0; i < arr.length; i++) {
				if (this.index(subarr, arr[i]) < 0) {
					var tmp = subarr.concat(arr[i]);
					this.makeCombox(tmp);
				}
			};
		}
	}

	this.index = function(arr, val) {
		for (var i = 0; i < arr.length; i++) {
			if (arr[i] == val) {
				return i;
			}
		};
		return -1;
	}

	this.makeCombox([], sublen);
	return combox;
}

// var combox = combination(8, 3);
// for (var i = 0; i < combox.length && i < 10; i++) {
// 	console.log(combox[i])
// };

// console.log(combox.length);


function matrix(arr) {
	this.data = arr;
	this.ret = [];

	this.addCell = function(i_arr, len) {
		var nextIndex = i_arr.length;
		if (nextIndex >= len) {
			this.ret.push(i_arr.concat());
		} else {
			for (var j = 0; j < this.data[nextIndex].length; j++) {
				addCell(i_arr.concat(this.data[nextIndex][j]), len);
			};
		}
	}

	this.show = function() {
		for (var i = 0; i < this.ret.length; i++) {
			console.log(this.ret[i]);
		};
	}
	this.addCell([], this.data.length);
	return this.ret;
}

// var arr = [];
// arr.push(["1", "2", "3"]);
// arr.push(["a", "b", "c"]);
// arr.push(["!", "@", "#"]);
// matrix(arr);


function winning_matrix(players) {
	this.data = players;
	this.ret = [];
	this.addCell = function(i_arr, len) {
		var nextIndex = i_arr.length;
		if (nextIndex >= len) {
			this.ret.push(i_arr.concat());
		} else {
			var usedCard = [];
			for (var i = 0; i < i_arr.length; i++) {
				usedCard = usedCard.concat(i_arr[i].rawCards);
			};
			for (var j = 0; j < this.data[nextIndex].posible_sets.length; j++) {
				if (!_hasIntersection(usedCard, this.data[nextIndex].posible_sets[j].rawCards)) {
					addCell(i_arr.concat(this.data[nextIndex].posible_sets[j]), len);
				}
			};
		}
	}

	this.show = function() {
		for (var i = 0; i < this.ret.length; i++) {
			console.log(this.ret[i]);
		};
	}
	this.addCell([], this.data.length);
	return this.ret;
}


function _hasIntersection(set1, set2) {
	for (var i = 0; i < set1.length; i++) {
		for (var j = 0; j < set2.length; j++) {
			if (set1[i].val == set2[j].val) {
				return true;
			}
		};
	};
	return false;
}