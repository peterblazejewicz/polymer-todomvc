suite('td-input tests', () => {

  let element;

  setup(() => {
    element = fixture('basic');
  });

  test('uses input', () => {
    assert.equal(element.tagName.toLowerCase(), 'input');
  });

});
