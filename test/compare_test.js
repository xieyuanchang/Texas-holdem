var poker = [];
for (var i = 1; i <= 52; i++) {
	var c = new card(i);
	poker.push(c);
}
shuffe(poker);

QUnit.test("发牌测试", function(assert) {
	var sets = [];
	commomCards = poker.slice(0, 3);
	curIndex = 3;
	for (var i = 1; i <= 9; i++) {
		console.log(poker.length);
		sets.push(new set(poker.slice(curIndex, curIndex + 6), commomCards));
		curIndex = curIndex + 5;
	};
	for (var i = 0; i < sets.length; i++) {
		sets[i].maxCalculate();
		assert.ok(true, sets[i].show() + "@" + commomCards);
	};
});