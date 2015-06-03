TrackActions = {
  saveTrack: function(track, trackName){
    AppDispatcher.dispatch({
      actionType: TrackConstants.SAVE_TRACK,
      track: track,
      trackName: trackName
    })
  },
  newTrack: function() {
    AppDispatcher.dispatch({
      actionType: TrackConstants.NEW_TRACK
    })
  }
}
