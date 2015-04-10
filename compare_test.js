var poker = [];
for (var i = 1; i <= 52; i++) {
	var c = new card(i);
	poker.push(c);
}
shuffe(poker);

QUnit.test("玩家发牌测试", function(assert) {
	var players = [];
	var curCarIndex = 3;
	for (var i = 1; i <= 10; i++) {
		if (curCarIndex + 4 < poker.length) {
			players.push(new player(poker.slice(curCarIndex, curCarIndex + 5), poker.slice(0, 3)));
			curCarIndex = curCarIndex + 5;
		}

	};

	for (var i = 0; i < players.length; i++) {
		players[i].maxCalculate();
		assert.ok(true, players[i].show());
	};
});