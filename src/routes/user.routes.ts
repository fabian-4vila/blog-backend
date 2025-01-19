import { Router } from "express";
import { Routes } from "../interfaces/route.interface";
import UserController from "../user/user.controller";


class UserRoute implements Routes{
    public path = '/user';
    public router = Router();
    public userController = new UserController();
    constructor (){
        this.initUserRoute();
    }
    /**
     * init
     */
    public initUserRoute() {
        //getAllUser
        this.router.get(`${this.path}s`,this.userController.getAllUsers);
        //getUserById
        this.router.get(`${this.path}/:id`,this.userController.getUserById);
        //createUser
        this.router.post(`${this.path}`,this.userController.createUser);
        //updateUserById
        this.router.put(`${this.path}/:id`,this.userController.updateUserById);
        //deleteUserById
        this.router.delete(`${this.path}/:id`,this.userController.deleteUserById);
    }
}

export default UserRoute;