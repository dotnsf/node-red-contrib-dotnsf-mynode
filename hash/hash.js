var crypto = require( 'crypto' );
var hash = crypto.createHash( 'sha512' );
hash.setEncoding( 'hex' );

module.exports = function( RED ){
  function HashNode( config ){
    RED.nodes.createNode( this, config );
    var node = this;
    node.on( 'input', function( msg ){
      var payload = msg.payload;

      hash.update( payload );
      var newpayload = hash.digest( 'hex' );
      
      msg.payload.original = payload;
      msg.payload.hash = newpayload;
      node.send( msg );
    });
  }
  RED.nodes.registerType( "hash", HashNode );
}

