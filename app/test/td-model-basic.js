/**
 * Tests are written in ES6
 */

suite('td-model', () => {

  let tdModel;

  suiteSetup(() => {
    tdModel = fixture('td-model');
    let ls = tdModel.$$('iron-localstorage');
    ls.reload();
    assert.isNotNull(tdModel);
  });

  /**
   * Some common td-model properties
   */
  suite('common properties', () => {
    test('hidden', () => {
      assert.isOk(tdModel.hidden, 'has hidden property');
    });

    test('iron-localstorage', () => {
      assert.isOk(tdModel.$$('iron-localstorage'), 'the iron-localstore is present');
    });

    test('items', () => {
      let ls = tdModel.$$('iron-localstorage');
      ls.reload();
      assert.isDefined(tdModel.items, 'Items is defined  property');
    });

  });

  /**
   * Adding new item tests
   */
  suite('newItem', () => {
    setup((done) => {
      assert.isDefined(tdModel.items);
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      done();
    });

    teardown((done) => {
      assert.isDefined(tdModel.items);
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      done();
    });

    test('It adds one item', () => {
      tdModel.newItem('new item');
      assert.lengthOf(tdModel.items, 1, 'Item was added');
    });

    test('it broadcast change', () => {
      let changespy = sinon.spy();
      tdModel.addEventListener('items-changed', changespy);
      assert.isFalse(changespy.called);
      tdModel.newItem('new item');
      assert.isTrue(changespy.called);
      tdModel.removeEventListener('items-changed', changespy);
    });

    test('it creates correct new item', () => {
      let title = 'the new item title';
      tdModel.newItem(title);
      let item = tdModel.items[tdModel.items.length - 1];
      assert.isNotNull(item, 'the item is created');
      assert.isOk(item.title, 'the property title is present');
      assert.equal(item.title, title, 'the title is correct');
      assert.isFalse(item.completed, 'the item state is correct');
    });

  });


  /**
   * Fitlers tests
   */
  suite('filters', () => {
    let newItem;
    setup((done) => {
      assert.isDefined(tdModel.items);
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      tdModel.newItem('new item');
      newItem = tdModel.items[tdModel.items.length - 1];
      done();
    });

    teardown((done) => {
      assert.isDefined(tdModel.items);
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      newItem = null;
      done();
    });

    test('filters property', () => {
      assert.isDefined(tdModel.filters, 'property is defined');
    });

    test('filters.active', () => {
      assert.isDefined(tdModel.filters.active, 'active method exists');
    });

    test('filters.active results', () => {
      assert.isTrue(tdModel.filters.active(newItem), 'returns true when item is created');
      newItem.completed = true;
      assert.isFalse(tdModel.filters.active(newItem), 'returns false when item is completed');
    });

    test('filters.completed', () => {
      assert.isDefined(tdModel.filters.completed, 'completed methods exists');
    });

    test('filters.completed results', () => {
      assert.isFalse(tdModel.filters.completed(newItem), 'returns false when item is created');
      newItem.completed = true;
      assert.isTrue(tdModel.filters.completed(newItem), 'returns true when when item is completed');
    });

  });

  suite('destroyItem', () => {
    let item;
    setup((done) => {
      assert.isDefined(tdModel.items);
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      tdModel.newItem('new item');
      assert.lengthOf(tdModel.items, 1, 'Length is reset');
      item = tdModel.items[0];
      done();
    });

    teardown((done) => {
      assert.isDefined(tdModel.items);
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      item = null;
      done();
    });

    test('destroys item', () => {
      tdModel.destroyItem(item);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
    });

    test('dispatches event', () => {
      let changespy = sinon.spy();
      tdModel.addEventListener('items-changed', changespy);
      assert.isFalse(changespy.called);
      tdModel.destroyItem(item);
      assert.isTrue(changespy.called);
      tdModel.removeEventListener('items-changed', changespy);
    });

  });

  suite('getCompletedCount', () => {
    setup((done) => {
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      done();
    });

    teardown((done) => {
      assert.isDefined(tdModel.items);
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      done();
    });

    test('getCompletedCount method', () => {
      assert.isOk(tdModel.getCompletedCount, 'the method is defined');
    });

    test('no completed by default', () => {
      assert.equal(tdModel.getCompletedCount(), 0, 'by default there are no complete tasks');
    });

    test('no completed when adding new items', () => {
      tdModel.newItem('new item');
      tdModel.newItem('another new item');
      assert.equal(tdModel.getCompletedCount(), 0, 'when tasks are created there are no complete tasks');
    });

    test('correct count of completed', () => {
      tdModel.newItem('new item');
      let item = tdModel.items[tdModel.items.length - 1];
      item.completed = true;
      assert.equal(tdModel.getCompletedCount(), 1, 'when tasks are created there are no complete tasks');
      tdModel.newItem('another new item');
      item = tdModel.items[tdModel.items.length - 1];
      item.completed = true;
      assert.equal(tdModel.getCompletedCount(), 2, 'when tasks are created there are no complete tasks');
    });
  });

  suite('getActiveCount', () => {
    setup((done) => {
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      done();
    });

    teardown((done) => {
      assert.isDefined(tdModel.items);
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      done();
    });

    test('getActiveCount method', () => {
      assert.isOk(tdModel.getActiveCount, 'the method is defined');
    });

    test('no active by default', () => {
      assert.equal(tdModel.getActiveCount(), 0, 'by default there are no active tasks');
    });

    test('all active when adding new items', () => {
      tdModel.newItem('new item');
      tdModel.newItem('another new item');
      assert.equal(tdModel.getActiveCount(), 2, 'when tasks are created all are active tasks');
    });

    test('correct count of active', () => {
      tdModel.newItem('new item');
      tdModel.newItem('new item');
      assert.equal(tdModel.getActiveCount(), 2, 'all task are active by default');
      let item = tdModel.items[0];
      item.completed = true;
      assert.equal(tdModel.getActiveCount(), 1, 'only one task should be active now');
      item = tdModel.items[tdModel.items.length - 1];
      item.completed = true;
      assert.equal(tdModel.getActiveCount(), 0, 'all task should be complete now and no active');
    });

  });

  suite('clearCompletedItems', () => {
    setup((done) => {
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      done();
    });

    teardown((done) => {
      assert.isDefined(tdModel.items);
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      done();
    });

    test('clearCompletedItems method', () => {
      assert.isOk(tdModel.clearCompletedItems, 'the method is defined');
    });

    test('clears all completed items', () => {
      tdModel.newItem('new item');
      tdModel.newItem('new item');
      let item = tdModel.items[tdModel.items.length - 1];
      item.completed = true;
      tdModel.newItem('new item');
      item = tdModel.items[tdModel.items.length - 1];
      item.completed = true;
      assert.lengthOf(tdModel.items, 3, 'there are 3 items');
      assert.equal(tdModel.getActiveCount(), 1, 'there is 1 active item');
      assert.equal(tdModel.getCompletedCount(), 2, 'there are 2 completed item');
      tdModel.clearCompletedItems();
      assert.lengthOf(tdModel.items, 1, 'there is only one item now');
      assert.equal(tdModel.getActiveCount(), 1, 'there is only one active item');
      assert.equal(tdModel.getCompletedCount(), 0, 'all completed items are removed');
    });
  });

  suite('setItemsCompleted', () => {
    setup((done) => {
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      done();
    });

    teardown((done) => {
      assert.isDefined(tdModel.items);
      tdModel.splice('items', 0);
      assert.lengthOf(tdModel.items, 0, 'Length is reset');
      done();
    });

    test('setItemsCompleted method', () => {
      assert.isOk(tdModel.setItemsCompleted, 'the method is defined');
    });

    test('sets all items completed', () => {
      tdModel.newItem('new item');
      tdModel.newItem('new item');
      tdModel.newItem('new item');
      assert.equal(tdModel.getActiveCount(), 3, 'all are active');
      tdModel.setItemsCompleted(true);
      assert.equal(tdModel.getActiveCount(), 0, 'no active items now');
      assert.equal(tdModel.getCompletedCount(), 3, 'all are completed');
    });

    test('sets all items active', () => {
      let item;
      tdModel.newItem('new item');
      item = tdModel.items[tdModel.items.length - 1];
      item.completed = true;
      tdModel.newItem('new item');
      item = tdModel.items[tdModel.items.length - 1];
      item.completed = true;
      tdModel.newItem('new item');
      item = tdModel.items[tdModel.items.length - 1];
      item.completed = true;
      assert.equal(tdModel.getActiveCount(), 0, 'all are completed');
      assert.equal(tdModel.getCompletedCount(), 3, 'all are completed');
      tdModel.setItemsCompleted(false);
      assert.equal(tdModel.getActiveCount(), 3, 'all are active');
      assert.equal(tdModel.getCompletedCount(), 0, 'all are not completed');
    });

  });
});
