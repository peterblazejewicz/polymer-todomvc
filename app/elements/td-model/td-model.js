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
      },
      filter: {
        type: String
      }
    },
    _initializeDefaultTodos: function () {
      this.items = [];
    }
  });
})();
