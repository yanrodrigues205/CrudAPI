import { compare, hash  } from "bcryptjs";
import User from "../Dtos/User";
import UserModel from "../Models/UserModel";
import UserType from "../@types/UserType";

class UserService extends UserModel
{
    private async cryptPassword(userPass: string): Promise<string>
    {
        let salt: number = 10;
        let passCript = await hash(userPass, salt);

        return passCript;
    }

    private async comparePassword(userPass:string, user: User) : Promise<Boolean>
    {
        let passCompare: boolean = await compare(userPass, user.password);
        return passCompare;
    }


    public async addUser(user: User):Promise<Object>
    {
        const passUpdate: string = await this.cryptPassword(user.password); 
        user.password = passUpdate;

        const verifyEmail = await super.emailIsUnique(user.email);

        if(verifyEmail)
        {
            const create_user = await super.AddUser(user);
            return create_user;
        }
        else
        {
            return {
                message: "verify your email adress, he exist in system!"
            }
        }
    }

    public async getAllUsers() : Promise<Object>
    {
        const users = await super.getAllUsers();
        return users;
    }

    public async dropUserByID(id: string): Promise<Object> 
    {
        const response = await super.dropUserByID(id);
        return response;
    }


    public async alterUserByID(id_user: string, dataUser: any): Promise<Object> 
    {
        let verifyEmail: any = true;
        if(dataUser.password)
        {
            let cryptPassword = "qefjkhuygryuhjabsdicgjkmn8uijkhnefoyij"//await this.cryptPassword(dataUser.password);
            dataUser.password = cryptPassword;
        }

        if(dataUser.email)
        {
            verifyEmail = await this.emailIsUnique(dataUser.email);
        }

        if(!verifyEmail)
        {
            return {
                message: "this email is not unique in system"
            };
        }

        let userAlter = await super.alterUserByID(id_user, dataUser);
        return userAlter;
    }
}

export default UserService;