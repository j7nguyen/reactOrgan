var Key = React.createClass({
  getInitialState: function() {
    return({
      active: false
    })
  },
  componentDidMount: function(){
    this.note = new Note(Tones[this.props.noteName]);
    KeyStore.addChangeListener(this._onChange);
    console.log(this.props.noteName)
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
    var classString = this.state.active ? "key active" : "key"
    return (
      <div className={this.props.classname + classString}>
        <h3>{this.props.noteName}</h3>
        <p>{this.props.label}</p>
      </div>
    )
  }
});
