var Key = React.createClass({
  getInitialState: function() {
    return ({
      active: false,
      octave: this.props.octave
    })
  },
  componentDidMount: function() {
    this.note = Notes[this.props.noteName];
    KeyStore.addChangeListener(this._onChange);
    KeyStore.addOctaveListener(this.changeOctave);
  },
  componentWillUnmount: function() {
    KeyStore.removeChangeListener(this._onChange);
  },
  changeOctave: function() {
    this.setState({octave: KeyStore.octave()})
    var noteName = KeyConstants.KEY_MAPPINGS[this.state.octave][this.props.thiskey]
    this.note = Notes[noteName]
  },
  _onChange: function() {
    var active = _.include(KeyStore.all(), this.props.noteName);

    if (active) {
      this.note.start();
    } else {
      this.note.stop();
    }
    this.setState({active: active});
  },
  render: function(){
    var classString = this.state.active ? "key active" : "key";

    return (
      <div className={this.props.classname + classString}>
        <h3>{this.props.noteName}</h3>
        <p>{this.props.label}</p>
      </div>
    )
  }
});
