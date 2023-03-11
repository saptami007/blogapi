import { PostResponse } from "./posts.response";
import { PostSchemaModel } from "./postsschema.model";

export class PostResponseList{
    postResponseList: PostResponse[];

    constructor(result:PostSchemaModel[]){
        this.postResponseList=result.map((res)=> new PostResponse(res));
    }
}