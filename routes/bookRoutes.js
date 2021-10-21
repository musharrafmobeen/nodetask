const {getBooksOptions,addBookOptions,getOneBookOptions,updateBookOptions,deleteBookOptions} = require('../optionsSchemas/booksOptionsSchema');


const userRoutes = (fastify,options,done) => {
    //get All Books
    fastify.get('/books', getBooksOptions);

    //Add A Book
    fastify.post('/books', addBookOptions);

    //get One Book
    fastify.get('/books/:name', getOneBookOptions);

    //Delete One Book
    fastify.delete('/books', deleteBookOptions);

    //Update One Book
    fastify.patch('/books', updateBookOptions);

    done();
}

module.exports = userRoutes;