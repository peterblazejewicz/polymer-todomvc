suite('td-input tests', () => {

  let input;

  setup(() => {
    input = fixture('basic');
  });

  test('uses input', () => {
    assert.equal(input.tagName.toLowerCase(), 'input');
  });

  test('brodcasts td-input-commit event on ENTER', () => {
    let enterKeySpy = sinon.spy();
    input.addEventListener('td-input-commit', enterKeySpy);
    input.focus();
    assert.equal(input, document.activeElement, 'input has focus');
    MockInteractions.pressEnter(input);
    assert.isTrue(enterKeySpy.called, 'the event was fired');
    input.removeEventListener('td-input-commit', enterKeySpy);
  });

});
