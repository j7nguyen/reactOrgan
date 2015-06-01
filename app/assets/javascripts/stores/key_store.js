(function() {

  var CHANGE_EVENT = "change";

  var _activeTones = {};

  KeyStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return Object.keys(_activeTones);
    },
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
      this.removeListener(CHANGE_EVENT, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload) {
      var noteName = KeyConstants.KEY_MAPPINGS[payload.key];
      if (payload.actionType === KeyConstants.KEY_PRESSED) {
        _activeTones[noteName] = true;
        KeyStore.emit(CHANGE_EVENT);
      }
      if (payload.actionType === KeyConstants.KEY_RELEASED) {
        delete _activeTones[noteName];
        KeyStore.emit(CHANGE_EVENT);
      }
    })
  });

})();
