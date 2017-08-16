var crypto = require( 'crypto' );
var hash = crypto.createHash( 'sha512' );

module.exports = function( RED ){
  function HashNode( config ){
    RED.nodes.createNode( this, config );
    var node = this;
    node.on( 'input', function( msg ){
      var payload = msg.payload;

      hash.update( payload );
      msg.hash = hash.digest( 'hex' );
      node.send( msg );
    });
  }
  RED.nodes.registerType( "hash", HashNode );
}

