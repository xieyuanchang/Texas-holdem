
QUnit.test("四条测试", function(assert) {
	var poker = [];
	for (var i = 1; i <= 5; i++) {
		var c = new card(i);
		poker.push(c);
	};
	shuffe(poker);
	var set1 = new set(poker);
	assert.ok(set1.isFour(), set1.show());
});

QUnit.test("四条测试", function(assert) {
	var poker = [];
	for (var i = 2; i <= 6; i++) {
		var c = new card(i);
		poker.push(c);
	};
	shuffe(poker);
	var set1 = new set(poker);
	assert.ok(!set1.isFour(), set1.show());
});

QUnit.test("四条测试", function(assert) {
	var poker = [];
	for (var i = 4; i <= 8; i++) {
		var c = new card(i);
		poker.push(c);
	};
	shuffe(poker);
	var set1 = new set(poker);
	assert.ok(set1.isFour(), set1.show());
});

QUnit.test("三条测试", function(assert) {
	var poker = [];
	for (var i = 2; i <= 6; i++) {
		var c = new card(i);
		poker.push(c);
	};
	shuffe(poker);
	var set1 = new set(poker);
	assert.ok(set1.isTree(), set1.show());
});

QUnit.test("顺子测试", function(assert) {
	var poker = [];
	for (var i = 2; i <= 6; i++) {
		var c = new card(i);
		poker.push(c);
	};
	shuffe(poker);
	var set1 = new set(poker);
	assert.ok(!set1.isStraight(), set1.show());
});

QUnit.test("顺子测试", function(assert) {
	var poker = [];
	for (var i = 1; i <= 5; i++) {
		var c = new card(4*i);
		poker.push(c);
	};
	shuffe(poker);
	var set1 = new set(poker);
	assert.ok(set1.isStraight(), set1.show());
});

QUnit.test("顺子测试", function(assert) {
	var poker = [];
	for (var i = 2; i <= 6; i++) {
		var c = new card(4*i);
		poker.push(c);
	};
	shuffe(poker);
	var set1 = new set(poker);
	assert.ok(set1.isStraight(), set1.show());
});

QUnit.test("同花测试", function(assert) {
	var poker = [];
	for (var i = 2; i <= 6; i++) {
		var c = new card(4*i);
		poker.push(c);
	};
	shuffe(poker);
	var set1 = new set(poker);
	assert.ok(set1.isSameColor(), set1.show());
});

QUnit.test("同花测试", function(assert) {
	var poker = [];
	for (var i = 2; i <= 5; i++) {
		var c = new card(4*i);
		poker.push(c);
	};
	poker.push(new card(1));
	shuffe(poker);
	var set1 = new set(poker);
	assert.ok(!set1.isSameColor(), set1.show());
});