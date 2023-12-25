import { Router } from "express";
import UserController from "./Controllers/UserController";
const user = new UserController();

export const routers = Router();

// ----> INITIAL ROUTES
routers.post("/", (req, res) => {  res.status(200).json({"message": "initial router success!"});  });
// <---- INITIAL ROUTES


// ----> USER ROUTES 
routers.post("/create_user", (req, res) =>{ user.createUser(req, res);  });

routers.get("/get_all_users", (req, res)=>{  user.getAllUsers(req, res);  })

routers.delete("/drop_user_by_id", (req, res) => {  user.dropUserById(req, res);  });

routers.put("/alter_user_by_id", (req, res) => {  user.alterUserByID(req, res)  });
// <----- USER ROUTES 
