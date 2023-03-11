import { Body, Controller, Get, Param, Post, Query,Put, Delete } from '@nestjs/common';
import { PostResponseList } from './models/post.response.list';
import { UpdatePostRequest } from './models/post.update.request';
import { PostsRequest } from './models/posts.request';
import { PostResponse } from './models/posts.response';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {

    constructor(private postsService:PostsService){}

 @Get('getUserPost')
 async getUserPost(@Query("email") email:string):Promise<PostResponseList>{

   return await this.postsService.getUserPostSvc(email);
    
 }

 @Post('createPost')
 async createPost(@Body() request:PostsRequest):Promise<PostResponse>{

    return await this.postsService.createPostSvc(request);

 }

 @Get('getPostById/:id')
 async getPostById(@Param('id') id:string,@Query("email") email:string):Promise<PostResponse>{

   return await this.postsService.getPostByIdSvc(id,email);
 }

 @Put('updatePostById')
 async updatePostById(@Body() updatePostReq:UpdatePostRequest):Promise<PostResponse>{

   return await this.postsService.updatePostByIdSvc(updatePostReq)
 }


 @Delete('deletePostById')
 async deletePostById(@Query("postId") postId:string, @Query("email") email:string):Promise<PostResponseList>{

   return await this.postsService.deletePostByIdSvc(postId,email)
 }


}
