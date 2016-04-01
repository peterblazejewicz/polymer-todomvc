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
    // public api
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
