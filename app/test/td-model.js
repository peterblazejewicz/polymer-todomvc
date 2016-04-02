/**
 * Tests are written in ES6
 */

suite('td-model tests', () => {
  'use strict';

  let tdModel,
    ls,
    itemsChangedSpy;

  setup(() => {
    tdModel = fixture('model');
    ls = tdModel.$$('iron-localstorage');
    ls.save();
    ls.reload();
    itemsChangedSpy = sinon.spy();
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

  test('It adds new item', () => {
    let length = tdModel.items.length;
    tdModel.newItem('new item');
    assert.lengthOf(tdModel.items, ++length, 'The item should be added');
  });

  test('It broadcasts event when new item is added', () => {
    itemsChangedSpy.reset();
    tdModel.addEventListener('items-changed', itemsChangedSpy);
    tdModel.newItem('new item');
    assert.isTrue(itemsChangedSpy.called);
  });

  test('It destroys item', () => {
    assert(false, 'TBD');
  });


});
