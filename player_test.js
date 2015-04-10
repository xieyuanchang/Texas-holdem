
QUnit.test("四条测试", function(assert) {
	var poker = [];
	for (var i = 1; i <= 5; i++) {
		var c = new card(i);
		poker.push(c);
	};
	shuffe(poker);
	var player1 = new player(poker);
	assert.ok(player1.isFour(), player1.show());
});

QUnit.test("四条测试", function(assert) {
	var poker = [];
	for (var i = 2; i <= 6; i++) {
		var c = new card(i);
		poker.push(c);
	};
	shuffe(poker);
	var player1 = new player(poker);
	assert.ok(!player1.isFour(), player1.show());
});

QUnit.test("四条测试", function(assert) {
	var poker = [];
	for (var i = 4; i <= 8; i++) {
		var c = new card(i);
		poker.push(c);
	};
	shuffe(poker);
	var player1 = new player(poker);
	assert.ok(player1.isFour(), player1.show());
});

QUnit.test("三条测试", function(assert) {
	var poker = [];
	for (var i = 2; i <= 6; i++) {
		var c = new card(i);
		poker.push(c);
	};
	shuffe(poker);
	var player1 = new player(poker);
	assert.ok(player1.isTree(), player1.show());
});

QUnit.test("顺子测试", function(assert) {
	var poker = [];
	for (var i = 2; i <= 6; i++) {
		var c = new card(i);
		poker.push(c);
	};
	shuffe(poker);
	var player1 = new player(poker);
	assert.ok(!player1.isSorted(), player1.show());
});

QUnit.test("顺子测试", function(assert) {
	var poker = [];
	for (var i = 1; i <= 5; i++) {
		var c = new card(4*i);
		poker.push(c);
	};
	shuffe(poker);
	var player1 = new player(poker);
	assert.ok(player1.isSorted(), player1.show());
});

QUnit.test("顺子测试", function(assert) {
	var poker = [];
	for (var i = 2; i <= 6; i++) {
		var c = new card(4*i);
		poker.push(c);
	};
	shuffe(poker);
	var player1 = new player(poker);
	assert.ok(player1.isSorted(), player1.show());
});

QUnit.test("同花测试", function(assert) {
	var poker = [];
	for (var i = 2; i <= 6; i++) {
		var c = new card(4*i);
		poker.push(c);
	};
	shuffe(poker);
	var player1 = new player(poker);
	assert.ok(player1.isSameColor(), player1.show());
});

QUnit.test("同花测试", function(assert) {
	var poker = [];
	for (var i = 2; i <= 5; i++) {
		var c = new card(4*i);
		poker.push(c);
	};
	poker.push(new card(1));
	shuffe(poker);
	var player1 = new player(poker);
	assert.ok(!player1.isSameColor(), player1.show());
});