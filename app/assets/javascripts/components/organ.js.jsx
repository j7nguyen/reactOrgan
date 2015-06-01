var Organ = React.createClass({

  render: function() {
    var keys = [];
    var mappings = KeyConstants.KEY_MAPPINGS;
    var labels = KeyConstants.KEY_LABELS;
    KeyConstants.KEY_ORDER.forEach(function(thiskey, idx){
      var initClass;
      if (KeyConstants.KEY_MAPPINGS[thiskey].length === 3) {
        initClass = "black "
      } else {
        initClass = "white ";
      }
      keys.push(<Key
        classname={initClass}
        key={idx}
        noteName={mappings[thiskey]}
        label={labels[thiskey]} />
        )
    });

    return (
      <div>
        {keys}
      </div>
      );
  }
});
