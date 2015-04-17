// 玩家人数(>=2)
var PLAYERS_NUM = 2; 
// 玩家当前持手牌数(>=3)
var CARD_PER_PLAYER = 3; 

// 根据剩余牌数和待发牌数计算发牌的组合
// 考虑每个人还有两张隐藏的牌
//var COMBOX = combination(49 - PLAYERS_NUM * CARD_PER_PLAYER + 2 * (PLAYERS_NUM - 1), 5 - CARD_PER_PLAYER)
var COMBOX = combination(49 - PLAYERS_NUM * CARD_PER_PLAYER + 2 * (PLAYERS_NUM - 1), 5 - CARD_PER_PLAYER)

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

// 显示公牌
var commomMessage = [];
for (var i = 0; i < commonCards.length; i++) {
	commomMessage.push(commonCards[i].toString());
}
console.log("公牌：" + commomMessage.join("-"));

// 显示每位玩家的手持牌
console.log("显示每位玩家的手持牌：[*]为对其他玩家的隐藏牌");
var map = {};
for (var i = 0; i < players.length; i++) {
	// 当前玩家未明确的牌 = 未发放的牌 + 其余玩家手上的隐藏牌
	var tmp_poker = [];
	for (var i1 = 0; i1 < players.length; i1++) {
		if (i != i1) {
			// 由于其他玩家的两张首牌为隐藏牌
			tmp_poker.push(players[i1].cards[0]);
			tmp_poker.push(players[i1].cards[1]);
		}
	}
	tmp_poker = poker.concat(tmp_poker);

	var sets = [];
	for (var j = 0; j < COMBOX.length; j++) {
		var tmp = [];
		for (var k = 0; k < COMBOX[j].length; k++) {
			tmp.push(tmp_poker[COMBOX[j][k]]);
		};
		sets.push(new set(players[i].cards.concat(tmp), commonCards));
	};
	players[i].posible_sets = sets;
	console.log(players[i].show());
};

console.log("分析所有牌的组合。");
// 计算每位玩家的结束时所有可能牌的组合
for (var i = 0; i < players.length; i++) {
	map[players[i].Name] = 0;
	for (var j = 0; j < players[i].posible_sets.length; j++) {
		players[i].posible_sets[j].maxCalculate();
	};
};

console.log("根据分析结果，分别计算每位玩家胜率。");
// 根据以上所有组合计算胜率
var wm = winning_matrix(players);
console.log("计算结果：存在[" + wm.length + "]种可能。");
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