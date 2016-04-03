(function () {
  'use strict';

  Polymer({
    is: 'td-model',
    hostAttributes: {
      hidden: true
    },
    properties: {
      items: {
        type: Array,
        notify: true
      }
    },
    filters: {
      active: function(item) {
        return !item.completed;
      },
      completed: function (item) {
        return item.completed;
      }
    },
    // public api
    getActiveCount: function() {
      return (this.items) ? this.items.filter(this.filters.active).length : 0;
    },
    getCompletedCount: function() {
      return (this.items) ? this.items.filter(this.filters.completed).length : 0;
    },
    newItem: function(title) {
      title = String(title).trim();
      if(!title) return;
      this.push('items', {
        title: title,
        completed: false
      });
    },
    destroyItem: function(item) {
      var i = this.items.indexOf(item);
      if (i > -1) {
        this.splice('items', i, 1);
      }
    },
    // private api
    _initializeDefaultTodos: function () {
      this.items = [];
    }
  });
})();
