var crypto = require( 'crypto' );

module.exports = function( RED ){
  function HashNode( config ){
    RED.nodes.createNode( this, config );

    this.algorithm = config.algorithm;
    console.log( this.algorithm );
    var hash = crypto.createHash( this.algorithm );

    var node = this;
    node.on( 'input', function( msg ){
      var payload = msg.payload;
      var algorithm = msg.algorithm;
      if( algorithm ){
        console.log( algorithm );
        hash = crypto.createHash( algorithm );
      }

      hash.update( payload );
      msg.hash = hash.digest( 'hex' );
      node.send( msg );
    });
  }
  RED.nodes.registerType( "hash", HashNode );
}

