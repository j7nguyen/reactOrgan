(function() {
  _tracks = {};

  var NEW_TRACK = "new_track";
  var TRACK_SAVED = "track_saved";

  TrackStore = $.extend({}, EventEmitter.prototype, {
    all: function() {
      return _tracks;
    },
    addNewTrackListener: function(callback){
      this.on(NEW_TRACK, callback);
    },
    addTrackSavedListener: function(callback){
      this.on(TRACK_SAVED, callback);
    },
    dispatcherID: AppDispatcher.register(function(payload) {
      if (payload.actionType === TrackConstants.SAVE_TRACK) {
        _tracks[payload.trackName] = payload.track;
        TrackStore.emit(TRACK_SAVED);
      }
      if (payload.actionType === TrackConstants.NEW_TRACK) {
        TrackStore.emit(NEW_TRACK);
      }
    })

  })

})();
