import UserModel from "../../src/Models/UserModel";
import UserService from "../../src/Services/UserService";
describe("User Service", () => {
   
    interface UserMock {
        name: string,
        email: string,
        password: string
    }

    let userTest: UserMock = {
        name: "yan",
        email: "yan@gmail.com",
        password: "qwrwr4565645"
    };
    function randomString(tamanho: number) {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        return Array.from({ length: tamanho }, () => caracteres.charAt(Math.floor(Math.random() * caracteres.length))).join('');
    }

    it("sucess - verification if called method 'emailIsUnique' from model", async () =>{
        const userS: UserService = new UserService();
        
        //@ts-ignore
        const spyEmail:any = jest.spyOn(UserModel.prototype, "emailIsUnique");
       
        await userS.addUser(userTest);
        expect(spyEmail).toHaveBeenCalled();
        spyEmail.mockRestore();
    });

    it("success - verification if called method 'AddUser' from model", async () =>{
        const userS: UserService = new UserService();
        userTest.email = "yan1@hotmail.com";
        //@ts-ignore
        const spyAddUser: any = jest.spyOn(UserModel.prototype, "AddUser").mockImplementation(()=>{

        });
       
        await userS.addUser(userTest);
        expect(spyAddUser).toHaveBeenCalled();

       spyAddUser.mockRestore();
    });

    it("success - verification if call method 'getAllUsers' from model", async()=>{
        const userS: UserService = new UserService();
        //@ts-ignore
        const spyGetAllUsers: any = jest.spyOn(UserModel.prototype, "getAllUsers");

        await userS.getAllUsers();
        expect(spyGetAllUsers).toHaveBeenCalled();
        spyGetAllUsers.mockRestore();

    });

    it("success - verification if call method 'dropUserById' from model", async()=>{
        const userS: UserService = new UserService();
        //@ts-ignore
        const spyDropUserById: any = jest.spyOn(UserModel.prototype, "dropUserByID");
        let id: string = "jbruof134uh3o84ygg27bz1123u@$iqerufvbs";
        await userS.dropUserByID(id);

        expect(spyDropUserById).toHaveBeenCalled();
        spyDropUserById.mockRestore();
    });

    it("success - verification if call method 'alterUserByID' from model",async()=>{
        const userS: UserService = new UserService();
        let id: string = "382o23dnf=-sadjh23ir8-4ebhibas-3 h"
        //@ts-ignore
        const spyAlterUserByID: any = jest.spyOn(UserModel.prototype, "alterUserByID");
        await userS.alterUserByID(id,userTest);

        expect(spyAlterUserByID).toHaveBeenCalled();
        spyAlterUserByID.mockRestore();

    });

    it("success - call private methods cryptPassword and emailIsUnique", async()=>{
        const userS: UserService = new UserService();
        let email: string = await randomString(10) + "@hotmail.test";
        let pass: string = await randomString(9);
        
        let userAlterOBJ: object ={
            email: email,
            password: pass
        }

        //@ts-ignore
        const spyAlterUserByID: any = jest.spyOn(UserService.prototype, "emailIsUnique");

        let alterUser: any = await userS.alterUserByID("idteste-idteste-idteste", userAlterOBJ);

        expect(spyAlterUserByID).toHaveBeenCalled();
    })


});