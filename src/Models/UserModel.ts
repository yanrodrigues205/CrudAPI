import User from "../Dtos/User";
import { dataclient } from "../Repositorys/DataClient";

class UserModel{

    constructor(){}

    protected async emailIsUnique(email: string):Promise<Boolean> 
    {
       try
       {
            const verify = await dataclient.user.findUnique({
                where: {
                    email: email
                }
            });

            if(verify)
                return false;
            else
                return true;
       }
       catch(err)
       {
            return false;
       }
    }

    protected async AddUser(user: User): Promise<Object>{
        try
        {
            const create_user = await dataclient.user.create({
                data:{
                    name: user.name,
                    email: user.email,
                    password: user.password
                },
                select:
                {
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    create_at: true,
                    update_at: true
                }
            });

            return create_user;
        }
        catch(err)
        {
            return {
                message: "its not posible user created",
                error: err
            };
        }
    }

    protected async getAllUsers():Promise<Object>
    {
        try
        {
            const users = await dataclient.user.findMany();
            return users;
        }        
        catch(err)
        {
            return {
                message: "its not possible get all users in system!",
                error: err
            }
        }
    }

    protected async dropUserByID(id: string): Promise<Object>
    {
        try
        {
            let dropUser: object = await dataclient.user.delete({
                where:{
                    id: id
                }
            });

            return {
                message: "sucess in drop user by id",
                delete: true,
                error: false,
                return: dropUser
            };
        
        }
        catch(err)
        {
            return {
                message: "its not possible drop user by id in system",
                delete: false,
                error: err,
                return: false
            };
        }
    }

    protected async alterUserByID(id_user:string, dataUser: object): Promise<Object>
    {

        try
        {
            let userAlter: object = await dataclient.user.update({
                where: {
                    id: id_user
                },
                data: dataUser
            });

            return userAlter;
        }
        catch(err)
        {
            return {
                message: "it is not possible alter user in system",
                alter: false,
                error: err
            };
        }
    }

    protected async getUserByID(id_user: string): Promise<Object>
    {
        try
        {
            let user: object = dataclient.user.findUnique({
                where:{
                    id: id_user
                },
                select:{
                    id: true,
                    name: true,
                    email: true,
                    password: true,
                    create_at: true,
                    update_at: true
                }
            });

            return user;
        }
        catch(err)
        {
            return {
                message: "it not possible get user by id in system!",
                error: err
            }
        }
    }

}

export default UserModel;