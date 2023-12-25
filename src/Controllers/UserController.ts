import  User from "../Dtos/User";
import UserService from "../Services/UserService";

class UserController
{
    private readonly _userService: UserService;
    
    constructor(userS = new UserService())
    {
        this._userService = userS;
    }

    public async createUser(req: any, res: any)
    {
        const local: User = req.body;

        if(!local.name || !local.email || !local.password)
           return res.status(201).json( { "message" : "campos vazios, preencha todos por favor!" } );
        

        if(local.password.length < 8)
           return res.status(202).json( { "message" : "senha é muito curta, o mínimo é 8 caracteres." } );
        

        try
        {
            const userAdd = await this._userService.addUser(local);

            return res.status(203).json(userAdd);
            
        }catch(err)
        {
            return res.status(400).json({ 
                "message": "unable to complete user create!",
                "error": err          
            });
        }
        
       
    }

    public async getAllUsers(req: any, res: any)
    {
        try
        {
            let users : object = await this._userService.getAllUsers();
            
            return res.status(203).json(users);
        }
        catch(err)
        {
            return res.status(400).json({
                "message": "unable to complete user get by id!",
                "error": err
            });
        }
    }

    public async dropUserById(req: any, res: any)
    {
        let id: string = req.body.id;
        if(!id)
        {
            return res.status(201).json({
                message: "add variable ID to finish request",
                delete: false,
                error: true,
                return: false
            });
        }

        try
        {
            const response = await this._userService.dropUserByID(id);

            return res.status(203).json(response)
        }
        catch(err)
        {
            return res.status(400).json({
                message: "unable to complete user drop by id!",
                error: err
            });
        }
    }


    public async alterUserByID(req: any, res: any)
    {   
        try
        {
            let id_user: string = req.body.id;
            let name_user: string = req.body.name;
            let email_user: string = req.body.email;
            let password_user: string = req.body.password;
            if(!id_user)
            {
                return res.status(201).json({
                    message: "please, insert ID from alter user by id."
                });
            }

            if(!name_user && !email_user && !password_user)
            {
                return res.status(201).json({
                    message: "please, fill in any field to change"
                });
            }
            if(typeof password_user != undefined && password_user.length < 8)
            {
                return res.status(202).json({ 
                    "message" : "senha é muito curta, o mínimo é 8 caracteres." 
                });
            }



            delete req.body.id;
            let user: any = req.body;
            let userAlter: any = await this._userService.alterUserByID(id_user, user)
            return res.status(203).json(userAlter);

        }
        catch(err)
        {
            return res.status(400).json({
                message: "unable to complete user alter by id!",
                error: err
            });
        }
    }

}

export default UserController;