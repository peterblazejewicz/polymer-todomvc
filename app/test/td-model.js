/**
 * Tests are written in ES6
 */

suite('td-model tests', () => {
  'use strict';

  let tdModel,
    ls;

  setup(() => {
    tdModel = fixture('model');
    ls = tdModel.$$('iron-localstorage');
  });

  test('Has hidden attribute', () => {
    assert.isTrue(tdModel.hidden, 'The element is hidden');
  });

  test('Test child iron-localstorage', () => {
    assert.isNotNull(ls, 'There is a local storage component');
  });

  test('Has items', (done) => {
    // when loaded it creates default item array
    ls.addEventListener('iron-localstorage-load-empty', () => {
      assert.isOk(tdModel.items, 'Has items');
      done();
    });
    ls.save();
    ls.reload();
  });

});
