(function() {

  var CHANGE_EVENT = "change";
  var CHANGE_OCTAVE = "change_octave";
  var _activeOctave;
  var _activeTones = {};

  KeyStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return Object.keys(_activeTones);
    },
    octave: function() {
      return _activeOctave;
    },
    addChangeListener: function(callback) {
      this.on(CHANGE_EVENT, callback);
    },
    removeChangeListener: function(callback) {
      this.off(CHANGE_EVENT, callback);
    },
    addOctaveListener: function(callback) {
      this.on(CHANGE_OCTAVE, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload) {
      if (payload.actionType === KeyConstants.KEY_PRESSED) {
        var numKey = KeyConstants.NUM_KEYS[payload.key];
        var noteName = KeyConstants.KEY_MAPPINGS[_activeOctave][payload.key];
        if (noteName) {
          _activeTones[noteName] = true;
          KeyStore.emit(CHANGE_EVENT);
        } else if (numKey) {
          _activeOctave = numKey;
          KeyStore.emit(CHANGE_OCTAVE);
          console.log("change octave");
        }
      }
      if (payload.actionType === KeyConstants.KEY_RELEASED) {
        var noteName = KeyConstants.KEY_MAPPINGS[_activeOctave][payload.key];
        delete _activeTones[noteName];
        KeyStore.emit(CHANGE_EVENT);
      }
      if (payload.actionType === KeyConstants.SET_OCTAVE) {

        _activeOctave = payload.octave;
      }
    })
  });

})();
