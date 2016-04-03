suite('td-input tests', () => {

  let input;

  setup(() => {
    input = fixture('basic');
  });

  test('uses input', () => {
    assert.equal(input.tagName.toLowerCase(), 'input');
  });

});
