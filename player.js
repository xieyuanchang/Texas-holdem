// 创建玩家的模型
function player(name) {
	this.Name = name; //名字
	this.cards = []; //持牌
	this.posible_sets = []; //存放结束时持牌的各种可能结果

	// 接收牌
	this.addCard = function(card) {
		this.cards.push(card);
	};
	
	// 展示手牌
	this.show = function() {
		var privateMessage = [];
		for (var i = 0; i < this.cards.length; i++) {
			if (i < 2) {
				privateMessage.push("*" + this.cards[i].toString());
			} else {
				privateMessage.push(" " + this.cards[i].toString());
			}

		}
		//return this.Name + "$ 手牌：" + privateMessage.join("-") + "   [" + this.posible_sets.length + "]"
		return this.Name + "$ 手牌：" + privateMessage.join("-")
	}
}