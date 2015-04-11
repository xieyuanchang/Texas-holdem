// 玩家人数
var PLAYERS_NUM = 5;
// 玩家当前持手牌数
var CARD_PER_PLAYER = 4;

// 根据剩余牌数和待发牌数计算发牌的组合
var combox = combination(49 - PLAYERS_NUM * CARD_PER_PLAYER, 5 - CARD_PER_PLAYER)

// 创建52张扑克牌
var poker = [];
for (var i = 1; i <= 52; i++) {
	var c = new card(i);
	poker.push(c);
}

// 洗牌
shuffe(poker);

// 发三张公牌
var commonCards = [];
commonCards.push(poker.pop());
commonCards.push(poker.pop());
commonCards.push(poker.pop());

// 创建N位玩家，并指定玩家名字
var players = [];
for (var i = 0; i < PLAYERS_NUM; i++) {
	players.push(new player("player" + (i + 1)));
};

// 给每位玩家发指定手牌
for (var i = 0; i < players.length; i++) {
	for (var j = 0; j < CARD_PER_PLAYER; j++) {
		players[i].addCard(poker.pop());
	};
};

// 创建玩家的模型
function player(name) {
	this.Name = name; //名字
	this.cards = []; //持牌
	this.posible_sets = []; //存放结束时持牌的各种可能结果

	// 接收牌
	this.addCard = function(card) {
		this.cards.push(card);
	};
	// 计算结束时持牌的各种可能结果
	this.allPb = function() {
		var sets = [];
		for (var i = 0; i < combox.length; i++) {
			var tmp = [];
			for (var j = 0; j < combox[i].length; j++) {
				tmp.push(poker[combox[i][j]]);
			};
			sets.push(new set(this.cards.concat(tmp), commonCards));
		};
		this.posible_sets = sets;
	};
	// 展示手牌
	this.show = function() {
		var privateMessage = [];
		for (var i = 0; i < this.cards.length; i++) {
			privateMessage.push(this.cards[i].toString());
		}
		return this.Name + "$ 手牌：" + privateMessage.join("-")
	}
}

// 显示公牌
var commomMessage = [];
for (var i = 0; i < commonCards.length; i++) {
	commomMessage.push(commonCards[i].toString());
}
console.log("公牌：" + commomMessage.join("-"));

// 显示每位玩家的手持牌
var map = new Object();
for (var i = 0; i < players.length; i++) {
	console.log(players[i].show());
	map[players[i].Name] = 0;
	players[i].allPb();
};

console.log("分析所有牌的组合。");
// 计算每位玩家的结束时所有可能牌的组合
for (var i = 0; i < players.length; i++) {
	for (var j = 0; j < players[i].posible_sets.length; j++) {
		players[i].posible_sets[j].maxCalculate();
	};
};

// 根据以上所有组合计算胜率
var wm = winning_matrix(players);
console.log("计算结果：存在[" + wm.length + "]种可能。");
console.log("根据分析结果，分别计算每位玩家胜率。");
for (var i = 0; i < wm.length; i++) {
	var maxVal = -1;
	var winnerName = "";
	for (var j = 0; j < players.length; j++) {
		if (wm[i][j].maxResult > maxVal) {
			winnerName = players[j].Name;
			maxVal = wm[i][j].maxResult;
		}
	};
	map[winnerName] = map[winnerName] + 1;
};
for (var name in map) {
	console.log(name + ": 胜率 [" + (map[name] * 100 / wm.length) + "%" + "]");
};

console.log("计算结束");