import UserModel from "../../src/Models/UserModel";
import { Request } from "express";
const request = require("supertest");
const app = require("../../src/server");

describe("User Model", ()=>{
    interface UserMock {
        name: string,
        email: string,
        password: string
    }
    type UserMockAddTest = {
        id: string,
        name: string,
        email: string,
        password: string,
        create_at: string,
        update_at: string
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

    it("testing method verification email adress 'emailIsUnique'", async()=>{
        let emailAdress: string = "yan@gmail.com"; // exists in database

        class EmailTest extends UserModel{
            public async test(email:string){
                let verify = await super.emailIsUnique(email);
                return verify;
            }
        }

        let emailTest = new EmailTest();
        let dataReturn: Boolean = await emailTest.test(emailAdress);

        expect(typeof dataReturn).toBe("boolean");
        expect(dataReturn).toBe(false);
    });

    it("testing protected method add user 'AddUser'", async () => {
        

        userTest.email = randomString(9) + "@hotmail.com";

        class AddTest extends UserModel
        {
            public async test(user: UserMock)
            {
                return await super.AddUser(user);
            }
        }

        let addT = new AddTest();
        let test = await addT.test(userTest);

        expect(typeof test).toBe("object"); 
        expect(test).toHaveProperty("id");
        expect(test).toHaveProperty("name");
        expect(test).toHaveProperty("email");
        expect(test).toHaveProperty("password");
        expect(test).toHaveProperty("create_at");
        expect(test).toHaveProperty("update_at");

    });

    it("testing protected method get all users 'getAllUsers'", async ()=>{
        class AddTest extends UserModel
        {
            public async test()
            {
                return await super.getAllUsers();
            }
        }

        let addT = new AddTest();
        let test = await addT.test();

        expect(typeof test).toBe("object");
    });


    it("testing protected method get all users 'getAllUsers'", async ()=>{
        userTest.email = randomString(9) + "@hotmail.com.br";
        type msg_drop_user = {
            message: string,
            delete: boolean,
            error: boolean | object,
            false: boolean | object
        };

        class AddTest extends UserModel
        {

            public async add()
            {
                return await super.AddUser(userTest);
            }
            public async test(id: string)
            {
                return await super.dropUserByID(id);
            }
        }

        let addT: AddTest = new AddTest();
        let userAddTest = (await addT.add()) as UserMockAddTest;
        let id_us = userAddTest.id;
        
        let test = await (addT.test(id_us)) as msg_drop_user;
        let deleteUser =  test.delete;
        let errorUser =  test.error;

        expect(deleteUser).toBe(true);
        expect(errorUser).toBe(false);
    });


    it("testing protected method alter user by id", async()=>{
        class AddTest extends UserModel
        {
            public async test(id: string, user: any)
            {
                return await super.alterUserByID(id, user);
            }
        }

        let rq:Request = await request(app)
                       .post("/create_user")
                       .send(userTest);
        
        let email:string = await randomString(10) + "@hotmail.test";
        let alterComponents = {
            email: email
        };
       

        let id_us:string = rq.body.id;
        let alter:any = await new AddTest().test(id_us, alterComponents);

        expect(alter).toHaveProperty("id");
        expect(alter).toHaveProperty("create_at");
        expect(alter).toHaveProperty("update_at");
        expect(alter.email).toBe(email);
    });

});