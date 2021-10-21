const {connectToServer} = require('../dbConneciton');
const jwt = require('jsonwebtoken');




const getAllBooks = async(req,reply)=>{
    let data = [];
    const db = await connectToServer;
    const collection = await db.collection('books');
    const searchCursor = await collection.find();
    while(await searchCursor.hasNext()){
        data.push(await searchCursor.next());
    }
    return data;

}


const addBook = async(req,reply)=>{
    const {name,author} = req.body;
    const {authorization} = req.headers;
    if(jwt.verify(authorization,process.env.JWT_KEY)){
        const db = await connectToServer;
        const collection = await db.collection('books');
        await collection.insertOne({name,author});
        return {message:"Book has been added", statusCode:201};
    }
    throw new Error("Not Authorized!");
}

const getOneBook = async(req,reply)=>{
    const {authorization} = req.headers;
    const {name} = req.params;
    if(jwt.verify(authorization,process.env.JWT_KEY)){
        const db = await connectToServer;
        const collection = await db.collection('books');
        const book = await collection.findOne({name});
        return book;
    }
    throw new Error("Not Authorized!");
}


const deleteOneBook = async(req,reply)=>{
    const {authorization} = req.headers;
    const {name} = req.body;
    if(jwt.verify(authorization,process.env.JWT_KEY)){
        const db = await connectToServer;
        const collection = await db.collection('books');
        const book = await collection.findOneAndDelete({name});
        return {message:"Book and been deleted",book:book.value};
    }
    throw new Error("Not Authorized!");
}


const updateOneBook = async(req,reply)=>{
    const {authorization} = req.headers;
    const {name,author} = req.body;
    if(jwt.verify(authorization,process.env.JWT_KEY)){
        const db = await connectToServer;
        const collection = await db.collection('books');
        const book = await collection.findOneAndUpdate({name},{$set:{author}});
        return {message:"Book and been Updated",book:{...book.value,author}};
    }
    throw new Error("Not Authorized!");
}






module.exports = {
    addBook,
    getAllBooks,
    getOneBook,
    updateOneBook,
    deleteOneBook
}