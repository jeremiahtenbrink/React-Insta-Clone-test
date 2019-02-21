const bcrypt = require( "bcryptjs" );

export const savePassword = ( username, password ) => {
    bcrypt.genSalt( 10, function( err, salt ) {
        bcrypt.hash( password, salt, function( err, hash ) {
            localStorage.setItem( username, hash );
        } );
    } );
};

export const checkPassword = ( username, password, cb ) => {
    if( localStorage.hasOwnProperty( username ) ) {
        bcrypt.compare( password, localStorage.getItem( username ), ( err, res ) => {
            cb( err, res );
        } );
    }else {
        const error = new Error( "username not found in db" );
        
        cb( error, false );
    }
    
};