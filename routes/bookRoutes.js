const {getBooksOptions} = require('../optionsSchemas/booksOptionsSchema');


const userRoutes = (fastify,options,done) => {
    //get All Books
    fastify.get('/books', getBooksOptions)


    // //Login A User
    // fastify.post('/user', userLoginOptions)


    // //Register A User
    // fastify.post('/users', registerUserOptions);

    // //Verify User
    // fastify.get('/userVerification/:verificationId', verifyUserOptions);

    // //send email for password change
    // fastify.post('/forgotPassword', forgotPasswordOptions);

    // // //set new password
    // fastify.patch('/forgotPassword/:email', updatePasswordOptions);

    done();
}

module.exports = userRoutes;