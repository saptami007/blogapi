
export class LoginResponse{
    email:string;
    firstName:string;
    lastName: string;
    accessToken:string;

    constructor(data:any){
        this.email=data.email;
        this.firstName=data.firstName;
        this.lastName=data.lastName;
    }
}