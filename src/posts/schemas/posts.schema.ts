import * as mongoose from 'mongoose';

export const PostSchema= new mongoose.Schema({
    email:String,
    postId:String,
    author:String,
    postTitle:String,
    postBody:String,
    createdDate:Date
});