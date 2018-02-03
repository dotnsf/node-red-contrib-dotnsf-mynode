var crypto = require( 'crypto' );

module.exports = function( RED ){
  function HashNode( config ){
    RED.nodes.createNode( this, config );

    this.algorithm = config.algorithm;
    this.outputvar = config.outputvar;
//    var hash = crypto.createHash( this.algorithm );

    var node = this;
    node.on( 'input', function( msg ){
      var payload = msg.payload;
      var algorithm = msg.algorithm;
      var hash;
      if( algorithm ){
        console.log( algorithm );
        hash = crypto.createHash( algorithm );
      }else{
        hash = crypto.createHash( this.algorithm );
      }

      hash.update( payload );
      msg[this.outputvar] = hash.digest( 'hex' );
      node.send( msg );
    });
  }
  RED.nodes.registerType( "hash", HashNode );
}

