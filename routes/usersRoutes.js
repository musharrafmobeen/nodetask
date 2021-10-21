const {getUserOptions, registerUserOptions, userLoginOptions, verifyUserOptions, forgotPasswordOptions, updatePasswordOptions} = require('../optionsSchemas/userOptionsSchemas');


const userRoutes = (fastify,options,done) => {
    //get All Users
    fastify.get('/users', getUserOptions)


    //Login A User
    fastify.post('/user', userLoginOptions)


    //Register A User
    fastify.post('/users', registerUserOptions);

    //Verify User
    fastify.get('/userVerification/:verificationId', verifyUserOptions);

    //send email for password change
    fastify.post('/forgotPassword', forgotPasswordOptions);

    // //set new password
    fastify.patch('/forgotPassword/:email', updatePasswordOptions);

    done();
}

module.exports = userRoutes;