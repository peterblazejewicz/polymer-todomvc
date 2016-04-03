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

});
