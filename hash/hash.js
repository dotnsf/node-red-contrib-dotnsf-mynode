var crypto = require( 'crypto' );

module.exports = function( RED ){
  function HashNode( config ){
    RED.nodes.createNode( this, config );

    this.algorhythm = config.algorhythm;
    console.log( this.algorhythm );
    var hash = crypto.createHash( this.algorhythm );

    var node = this;
    node.on( 'input', function( msg ){
      var payload = msg.payload;
      var algorhythm = msg.algorhythm;
      if( algorhythm ){
        console.log( algorhythm );
        hash = crypto.createHash( algorhythm );
      }

      hash.update( payload );
      msg.hash = hash.digest( 'hex' );
      node.send( msg );
    });
  }
  RED.nodes.registerType( "hash", HashNode );
}

