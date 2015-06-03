// var Track = window.Track = function(name, roll) {
//   this.name = name;
//   if (roll) {
//     this.roll = roll;
//   } else {
//     this.roll = [];
//   }
// }
//
// Track.prototype = {
//   startRecording: function() {
//     this.startTime = Date.now();
//   },
//   stopRecording: function() {
//     console.log(this.roll.map(function(slicer){return slicer.elapsed}));
//   },
//   addNotes: function(notes) {
//     var newSlice = {};
//     var timeElapsed = Date.now() - this.startTime;
//     newSlice.elapsed = timeElapsed;
//     newSlice.notes = notes;
//     this.roll.push(newSlice);
//   }
// }

var Track = window.Track = function(name, roll) {
  this.name = name;
  if (roll) {
    this.roll = roll;
  } else {
    this.roll = [{elapsed: 0, notes: []}];
  }
}

Track.prototype = {
  startRecording: function() {
    this.startTime = Date.now();
  },
  stopRecording: function() {
    console.log(this.roll.map(function(slicer){return slicer.elapsed}));
  },
  addNotes: function(notes) {
    var newSlice = {};
    var timeElapsed = Date.now() - this.startTime;
    newSlice.elapsed = timeElapsed;
    newSlice.notes = notes;
    this.roll.push(newSlice);
  }
}
