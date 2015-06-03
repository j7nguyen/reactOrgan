var Recorder = React.createClass({
  getInitialState: function() {
    return(
    {recording: false}
  )},
  componentDidMount: function() {
    this.track = new Track("unsaved");
  },
  startStop: function() {
    if (this.state.recording == false) {
      this.track.startRecording();
      KeyStore.addChangeListener(this.addNotes);
      this.setState({recording: true})
    } else {
      this.track.stopRecording();
      this.setState({recording: false})
    }
  },
  addNotes: function() {
    var notes = KeyStore.all();
    this.track.addNotes(notes);
  },
  playBack: function() {
    var slices = this.track.roll.slice(0);
    this.playNotes(slices);
  },
  playNotes: function(slices) {
    var currentEl = slices.shift();
    var nextEl = slices.shift();
    var startNotes = _.difference(nextEl.notes, currentEl.notes)
    var stopNotes = _.difference(currentEl.notes, nextEl.notes)
    var playRate = 1
    var startTime = Date.now();

    var playTick = setInterval(function(){
        var currentTime = Date.now() - startTime;

        if (currentTime >= nextEl.elapsed) {
          startNotes.forEach(function(note){ Notes[note].start(); });
          stopNotes.forEach(function(note){ Notes[note].stop(); });

          currentEl = nextEl;
          if (slices.length === 0) {
            clearInterval(playTick)
          } else {
            nextEl = slices.shift();
            startNotes = _.difference(nextEl.notes, currentEl.notes)
            stopNotes = _.difference(currentEl.notes, nextEl.notes)
          }
        }

    }, playRate)
  },
  resetTrack: function() {
    this.track = new Track("unsaved");
  },
  saveTrack: function() {
    var trackName = prompt("Enter track name:")
    TrackActions.saveTrack(this.track, trackName);
  },
  render: function() {
    return (
      <div>
        <button onClick={this.startStop}>
        {this.state.recording ? "Stop recording" : "Start recording"}
        </button>
        <button onClick={this.resetTrack}>{"Reset track"}</button>
        <button onClick={this.playBack}>{"Play"}</button>

        <button onClick={this.saveTrack}>{"Save track"}</button>
      </div>
    );
  }
});
