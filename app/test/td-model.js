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
    ls.save();
    ls.reload();
  });

  teardown(() => {
    ls.value = null;
    ls.save();
  });

  test('Has hidden attribute', () => {
    assert.isTrue(tdModel.hidden, 'The element is hidden');
  });

  test('Test child iron-localstorage', () => {
    assert.isNotNull(ls, 'There is a local storage component');
  });

  test('Has items property', () => {
    assert.isOk(tdModel.items, 'Hasss items');
  });

});
