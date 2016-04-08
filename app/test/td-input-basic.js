suite('td-input tests', () => {

  let input;

  setup(() => {
    input = fixture('basic');
  });

  test('uses input', () => {
    assert.equal(input.tagName.toLowerCase(), 'input');
  });

  test('native keydown event', () => {
    let enterKeySpy = sinon.spy();
    input.addEventListener('keydown', enterKeySpy);
    MockInteractions.pressEnter(input);
    assert.isTrue(enterKeySpy.called, 'the event was fired');
    input.removeEventListener('keydown', enterKeySpy);
  });

  test('td-input-commit event', () => {
    input.addEventListener('td-input-commit', (event) => {
       assert.isTrue(true, 'td-input-commit fired');
    });
    MockInteractions.pressEnter(input);
  });

});
