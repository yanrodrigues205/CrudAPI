import UserService from "../../src/Services/UserService";
import UserController from "../../src/Controllers/UserController";
const request = require("supertest");
const app = require("../../src/server");

describe("User Controller", ()=>{
    /**
     * @error
     * @createUser
     * @201 - error data type user 
     * @202 - password error
     * @203 - succes
     * @400 - call function UserService
     */
    interface UserMock {
        name: string,
        email: string,
        password: string
    }

    let userTest: UserMock = {
        name: "yan",
        email: "ddd@gmail.com",
        password: "qwrwr4565645"
    };

    let mockRequest = { body: userTest };
    
    let mockResponse: any ={
        status: jest.fn().mockReturnThis(),
        json: jest.fn()
    };
    

    it("sucess - controller sucess call method from service", async ()=>{ 
        let userC = new UserController();
        let addUserMock = jest.fn();

        UserService.prototype.addUser = addUserMock;
        
        await userC.createUser(mockRequest, mockResponse);

        expect(addUserMock).toHaveBeenCalled();
        expect(addUserMock).toHaveBeenCalledTimes(1);
    });

    it("error - password lenght min is 8 caracters", async ()=>{
        userTest.password = "9934j";
        let rq = await request(app)
                       .post("/create_user")
                       .send(userTest)

        expect(rq.statusCode).toBe(202);
    });

    it("erro - inpust emptys or null in data json", async ()=>{
        //verify if data json is User type and not inputs emptys
        userTest.password = "wdknqrkleqionr";
        userTest.name = "";
        let rq = await request(app)
                       .post("/create_user")
                       .send(userTest)

        expect(rq.statusCode).toBe(201);
    });

    it("success - get all users in database", async()=>{
        let rq = await request(app)
        .get("/get_all_users")
        .send(userTest)

        expect(rq.statusCode).toBe(203);
        expect(Array.isArray(rq.body)).toBe(true);
    });


    it("error - empty id in event drop user by id", async () =>{
        let rq = await request(app)
                            .delete("/drop_user_by_id")
                            .send({});
    
        expect(rq.statusCode).toBe(201);
        expect(rq.body.delete).toBe(false);
        expect(rq.body.error).toBe(true);
        expect(rq.body.return).toBe(false);

    });


    it("error - ID value its not valid from drop user by id", async () => {
        let rq = await request(app)
                            .delete("/drop_user_by_id")
                            .send({
                                id: "jwjkbhwej12847t13g4ns_kjsdvu@jkhavfuyOI189394Y8049"
                            });

        expect(rq.statusCode).toBe(203);
        expect(rq.body.delete).toBe(false);
        expect(typeof rq.body.error).toBe("object");
        expect(rq.body.return).toBe(false);
    });


    
});



