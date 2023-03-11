export class PostResponse{
    email: string;
    postId:string;
    author:string;
    postTitle:string;
    postBody:string;
    createdDate:Date
    constructor(data:any){
        this.email=data.email;
        this.postId=data.postId;
        this.author=data.author;
        this.postTitle=data.postTitle;
        this.postBody=data.postBody;
        this.createdDate=data.createdDate;
    }

}