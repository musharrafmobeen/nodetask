const {connectToServer} = require('../dbConneciton');
const {sendEmailConfirmation, emailVerification, emailUpdatePassword} = require('../utils/emailConfirmation');
const {v4:uuidv4} = require('uuid');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken');


const registerUser = async(req,reply)=>{
        let verificationId = uuidv4(); 
        const {email,password} = req.body;
        const db = await connectToServer;
        const userCollection = await db.collection('users');
        const user = await userCollection.findOne({email});
        if(!user){
            bcrypt.hash(password, 10, async (err, password) => {
            if (err)  {
                throw new Error("User Registeration Failed")
            } 
            else {
                const collection = await db.collection('userVerification');
                await collection.insertOne({email,password,verificationId});
            }
        });
            emailVerification(email,verificationId);
            return {message:"User Has Been Reistered",statusCode:201};
        }
        throw new Error("User Already Exists!")
        
}


const verifyUser = async(req,reply)=>{
        const {verificationId} = req.params;
        const db = await connectToServer;
        const userVerificationCollection = await db.collection('userVerification');
        const user =  await userVerificationCollection.findOneAndDelete({verificationId});
        if(user){
            const {email,password} = user.value;
            const userCollection = await db.collection('users');
            await userCollection.insertOne({email,password});
            sendEmailConfirmation(email,"New User","Your Account Has Been Registered");
            return {message:"User Has Been Reistered",statusCode:201};
        }else{
            throw new Error("User Not Found")
        }
}

const userLogin = async(req,reply)=>{
    const {email,password} = req.body;
    const db = await connectToServer;
    const collection = await db.collection('users');
    const user  = await collection.findOne({email});
    bcrypt.compare(password, user.password, (err,result)=>{
      if(err){
        throw new Error("User Login Failed")
      }
      const token = jwt.sign({
          email : user.email,
          _id : user._id
        },
        process.env.JWT_KEY,
        {
          expiresIn:"1h"
        })
        return reply.code(200).send({user,token});
      });

      return;
}

const getAllBooks = async(req,reply)=>{
    let data = [];
    const {authorization} = req.headers;
    if(jwt.verify(authorization,process.env.JWT_KEY)){
        const db = await connectToServer;
        const collection = await db.collection('books');
        const searchCursor = await collection.find();
        while(await searchCursor.hasNext()){
            data.push(await searchCursor.next());
        }
        return reply.code(200).send(data);
    }
    throw new Error("Not Authorized!");
}


const addBook = async(req,reply)=>{
    let data = [];
    const {authorization} = req.headers;
    if(jwt.verify(authorization,process.env.JWT_KEY)){
        const db = await connectToServer;
        const collection = await db.collection('books');
        const searchCursor = await collection.find();
        while(await searchCursor.hasNext()){
            data.push(await searchCursor.next());
        }
        return reply.code(200).send(data);
    }
    throw new Error("Not Authorized!");
}

const getOneBook = async(req,reply)=>{
    let data = [];
    const {authorization} = req.headers;
    if(jwt.verify(authorization,process.env.JWT_KEY)){
        const db = await connectToServer;
        const collection = await db.collection('books');
        const searchCursor = await collection.find();
        while(await searchCursor.hasNext()){
            data.push(await searchCursor.next());
        }
        return reply.code(200).send(data);
    }
    throw new Error("Not Authorized!");
}


const deleteOneBook = async(req,reply)=>{
    let data = [];
    const {authorization} = req.headers;
    if(jwt.verify(authorization,process.env.JWT_KEY)){
        const db = await connectToServer;
        const collection = await db.collection('books');
        const searchCursor = await collection.find();
        while(await searchCursor.hasNext()){
            data.push(await searchCursor.next());
        }
        return reply.code(200).send(data);
    }
    throw new Error("Not Authorized!");
}


const updateOneBook = async(req,reply)=>{
    let data = [];
    const {authorization} = req.headers;
    if(jwt.verify(authorization,process.env.JWT_KEY)){
        const db = await connectToServer;
        const collection = await db.collection('books');
        const searchCursor = await collection.find();
        while(await searchCursor.hasNext()){
            data.push(await searchCursor.next());
        }
        return reply.code(200).send(data);
    }
    throw new Error("Not Authorized!");
}


const forgotPassword = async(req,reply)=>{
    const {email} = req.body;
    const db = await connectToServer;
    const collection = await db.collection('users');
    const user  = await collection.findOne({email});
    if(user){
        emailUpdatePassword(email);
        return {message:"Check your Email and click on the link to update the password", statusCode:200}
    }else{
        throw new Error("User with this email does not exists.");
    }
}

const updatePassword = async(req,reply)=>{
    const {email} = req.params;
    const {password} = req.body;
    const db = await connectToServer;
    const collection = await db.collection('users');
    const user = await collection.findOneAndUpdate({email},{$set:{password}});
    return user.value;
}

module.exports = {
    registerUser,
    userLogin,
    getAllBooks,
    verifyUser,
    forgotPassword,
    updatePassword
}