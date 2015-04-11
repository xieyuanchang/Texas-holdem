var Color = new Object()
Color.SPADE = 1
Color.HEART = 2
Color.PLUM = 3
Color.DIAMOND = 4
var COMBOX_8to5 = combination(8, 5);// 8取5的各种组合
function card(value) {
	this.val = value;
	// ♦♣♥♠
	switch (value % 4) {
		case 1:
			this.color = Color.DIAMOND;
			this.img = "♦";
			break;
		case 2:
			this.color = Color.PLUM;
			this.img = "♣";
			break;
		case 3:
			this.color = Color.HEART;
			this.img = "♥";
			break;
		case 0:
			this.color = Color.SPADE;
			this.img = "♠";
			break;
	}

	this.view = Math.floor((value - 1) / 4) + 1;
	this.toString = function() {
		return "[" + this.img + this.view + "]";
	};
}

function shuffe(card_arr) {
	for (var i = 0; i < card_arr.length; i++) {
		var j = Math.floor(Math.random() * card_arr.length);
		tmp = card_arr[i];
		card_arr[i] = card_arr[j];
		card_arr[j] = tmp;
	};
}

// 一套牌(5张手牌，3张公牌)
function set(card_arr, commonCard) {
	this.commonCard = commonCard;
	this.rawCard = card_arr.concat();

	this.init = function(card_arr) {
		this.cards = card_arr;
		this.cards.sort(function(a, b) {
			return a.view - b.view;
		});

		this.map = new Object();
		this.maxView = 0;
		this.maxVal = 0;
		for (var i = 0; i < this.cards.length; i++) {
			if (this.maxView < this.cards[i].view) {
				this.maxView = this.cards[i].view;
			}
			if (this.maxVal < this.cards[i].val) {
				this.maxVal = this.cards[i].val;
			}
			if (this.map[this.cards[i].view] == null) {
				this.map[this.cards[i].view] = 1;
			} else {
				this.map[this.cards[i].view] = this.map[this.cards[i].view] + 1;
			}
		};
	}

	// 输出调试信息
	this.show = function() {
		var showMessage = [];
		for (var i = 0; i < this.rawCard.length; i++) {
			showMessage.push(this.rawCard[i].toString());
		};
		var commomMessage = [];
		if (this.commonCard) {
			for (var i = 0; i < this.commonCard.length; i++) {
				commomMessage.push(this.commonCard[i].toString());
			}
		}
		var maxMessage = [];
		if (this.maxCards) {
			for (var i = 0; i < this.maxCards.length; i++) {
				maxMessage.push(this.maxCards[i].toString());
			};
		}
		// return "手牌："+showMessage.join("-") + "   /  公牌:" + commomMessage.join("-")  + " @原积分:" + this.rawResult + " 最佳组合： " + maxMessage.join("-") + "  @最佳积分:" + this.maxResult;
		return "手牌：" + showMessage.join("-") + (commomMessage.length > 0 ? "   +  公牌:" + commomMessage.join("-") : "") + (maxMessage.length > 0 ? " = 最佳组合： " + maxMessage.join("-") : "")+ "  @:" + this.maxResult;
	};

	// 是否为顺子
	this.isStraight = function() {
		var f = this.cards[0];
		for (var i = 1; i < this.cards.length; i++) {
			if (this.cards[i].view - this.cards[i - 1].view != 1) {
				return false;
			}
		};
		return true;
	}

	// 是否为四条
	this.isFour = function() {
		this.fourVal = 0;
		for (var d in this.map) {
			if (this.map[d] == 4) {
				this.fourVal = d;
				return true;
			}
		}
		return false;
	}

	// 是否为三条
	this.isTree = function() {
		this.treeVal = 0;
		this.twoVal = 0;
		var flg = false;
		for (var d in this.map) {
			if (this.map[d] == 3) {
				this.treeVal = d;
				flg = true;
			}
			if (this.map[d] == 2) {
				this.twoVal = d;
			}
		}
		return flg;
	};

	// 是否为满堂红:三张同一点数的牌，加一对其他点数的牌。
	this.isFullhouse = function() {
		return this.isTree() && this.twoVal > 0
	}

	// 是否为同花
	this.isSameColor = function() {
		for (var i = 0; i < this.cards.length - 1; i++) {
			if (this.cards[i].color != this.cards[i + 1].color) {
				return false;
			}
		};
		return true
	}

	// 是否带两对
	this.isTwoPairs = function() {
		this.twoVal_max = 0;
		this.twoVal_min = 0;
		var count = 0;
		var arr = [];
		for (var d in this.map) {
			if (this.map[d] == 2) {
				count++;
				arr.push(d);
			}
		}

		if (count == 2) {
			this.twoVal_max = arr[0] > arr[1] ? arr[0] : arr[1];
			this.twoVal_min = arr[0] > arr[1] ? arr[1] : arr[0];
		} else if (count == 1) {
			this.twoVal_max = arr[0];
		}
		return count;
	}

	// 计算最佳组合(this.calculate计算的最高分数为最佳组合)
	this.maxCalculate = function() {
		if (!this.commonCard) {
			this.maxCards = this.cards.concat();
			this.maxResult = this.calculate();
		} else {
			var all_card = this.rawCard.concat(this.commonCard)
			this.maxResult = 0;
			for (var i = 0; i < COMBOX_8to5.length; i++) {
				var cards = [];
				for (var j = 0; j < COMBOX_8to5[i].length; j++) {
					cards.push(all_card[COMBOX_8to5[i][j]]);
				};
				this.init(cards);
				var r = this.calculate();
				if (r > this.maxResult) {
					this.maxResult = r;
					this.maxCards = this.cards.concat();
				}
			}
		}
	};


	// 根据当前牌的组合计算分数
	this.calculate = function() {
		var lev = [1, 52, 520, 5200, 52000, 520000, 5200000, 52000000, 520000000, 5200000000];
		var result = 0;
		var curLev = 9;
		// 同花顺
		if (this.isSameColor() && this.isStraight()) {
			result = result + lev[curLev];
			result = result + (4 - this.cards[0].color) * lev[curLev - 1];
			result = result + this.maxView * lev[curLev - 2];
			return result;
		}
		curLev--;

		// 四条
		if (this.isFour()) {
			result = result + lev[curLev];
			result = result + this.fourVal * lev[curLev - 1];
			return result;
		}
		curLev--;

		// 满堂红
		if (this.isFullhouse()) {
			result = result + lev[curLev];
			result = result + this.treeVal * lev[curLev - 1];
			result = result + this.twoVal * lev[curLev - 2];
			return result;
		}
		curLev--;

		// 同花
		if (this.isSameColor()) {
			result = result + lev[curLev];
			result = result + (4 - this.cards[0].color) * lev[curLev - 1];
			result = result + this.maxView * lev[curLev - 2];
			return result;
		}
		curLev--;

		// 顺子
		if (this.isStraight()) {
			result = result + lev[curLev];
			result = result + this.maxView * lev[curLev - 1];
			result = result + (4 - this.cards[4].color) * lev[curLev - 2];
			return result;
		}
		curLev--;

		// 三条不带对子
		if (this.isTree() && this.twoVal == 0) {
			result = result + lev[curLev];
			result = result + this.treeVal * lev[curLev - 2];
			return result;
		}
		curLev--;

		// 带两个对子
		if (this.isTwoPairs() == 2) {
			result = result + lev[curLev];
			result = result + this.twoVal_max * lev[curLev - 1];
			result = result + this.twoVal_min * lev[curLev - 2];
			return result;
		}
		curLev--;

		// 带一个对子
		if (this.isTwoPairs() == 1) {
			result = result + lev[curLev];
			result = result + this.twoVal_max * lev[curLev - 1];
			return result;
		}
		curLev--;

		result = result + this.maxVal;
		return result;

	}
	this.init(card_arr);
	this.rawResult = this.calculate();
	this.maxResult = this.rawResult;
}