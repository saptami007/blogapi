import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostResponseList } from './models/post.response.list';
import { UpdatePostRequest } from './models/post.update.request';
import { PostsRequest } from './models/posts.request';
import { PostResponse } from './models/posts.response';
import { PostSchemaModel } from './models/postsschema.model';
import * as _ from 'lodash';

@Injectable()
export class PostsService {

    constructor(@InjectModel('posts') private readonly postModel: Model<PostSchemaModel>) {

    }

    async createPostSvc(request: PostsRequest): Promise<PostResponse> {
        let today = new Date();
        request.createdDate = today;
        request.postId = today.getTime().toString();
        try{
            const newPost = new this.postModel(request)
            await newPost.save();
            return new PostResponse(request);
        }catch(error){
            throw new HttpException('Post is not created Successfully',400)
        }
        
        

    }


    async getUserPostSvc(email: string): Promise<PostResponseList> {
        let postListForUser = await this.postModel.find({ 'email': email }).exec();
        console.log(postListForUser.length)
        if (postListForUser.length > 0) {
            return new PostResponseList(postListForUser);
        } else {
            throw new HttpException('Email Id does not exists', 404);
        }

    }

    async getPostByIdSvc(id: string, email: string): Promise<PostResponse> {
        let postByIdRes = await this.postModel.find({ 'email': email, 'postId': id }).exec();
        if(postByIdRes.length>0){
            return new PostResponse(postByIdRes[0]);
        }else{
            throw new HttpException('Post does not exists', 404);
        }
        
    }

    async updatePostByIdSvc(request: UpdatePostRequest): Promise<PostResponse> {

        let getPostResult = await this.postModel.findOne({ 'email': request.email, 'postId': request.postId }).exec();
        if (getPostResult) {
            if (request.postBody) {
                getPostResult.postBody = request.postBody
            }
            if (request.postTitle) {
                getPostResult.postTitle = request.postTitle
            }

            await this.postModel.updateOne({ 'email': request.email, 'postId': request.postId }, getPostResult).exec();
            let getAfterUpdateRes = await this.postModel.findOne({ 'email': request.email, 'postId': request.postId }).exec();
            return new PostResponse(getAfterUpdateRes);

        }
        throw new HttpException('Updating Post is not successful', 400);
    }

    async deletePostByIdSvc(postId: string, email: string): Promise<PostResponseList> {
        console.log("Hi")
        const checkEntryPresent = await this.postModel.findOne({ 'email': email, 'postId': postId }).exec();
        if (checkEntryPresent) {
            await this.postModel.deleteOne({ 'email': email, 'postId': postId });
        }else{
            throw new HttpException('Post for this user does not exists for deletion', 400);
        }
        let getFinalPostResponseList = await this.postModel.find({ 'email': email }).exec();
        return new PostResponseList(getFinalPostResponseList)
    }


}
