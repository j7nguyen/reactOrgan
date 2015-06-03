var Organ = React.createClass({
  getInitialState: function() {
    return({octave: 4})
  },
  componentDidMount: function() {
    KeyStore.addOctaveListener(this.changeOctave);
    KeyActions.setOctave(this.state.octave);
  },
  changeOctave: function() {

    var octave = KeyStore.octave();
    this.setState({octave: octave});

  },

  render: function() {

    var keys = [];
    var mappings = KeyConstants.KEY_MAPPINGS[this.state.octave];
    var labels = KeyConstants.KEY_LABELS;
    KeyConstants.KEY_ORDER.forEach(function(thiskey, idx){
      var initClass;
      if (mappings[thiskey].length === 3) {
        initClass = "black "
      } else {
        initClass = "white ";
      }

      keys.push(<Key
        classname={initClass}
        octave={this.state.octave}
        thiskey={thiskey}
        key={thiskey + "-" + idx}
        noteName={KeyConstants.KEY_MAPPINGS[this.state.octave][thiskey]}
        label={labels[thiskey]}
        />

      )
    }.bind(this));

    return (
      <div>
        {keys}
        <Recorder />
      </div>
      )
  }
});
