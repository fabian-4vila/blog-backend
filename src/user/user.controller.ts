import { Request, Response } from "express";
import UserService from "./user.service";
import { logger } from "../utils/logger";

class UserController { 
    private readonly userService: UserService = new UserService
    constructor () {

    }
    /**
     * getAllUsers
     */
    public getAllUsers= async(_req:Request, res:Response) => {
        logger.info(`${UserController.name}-getAllUser`);
        const users =await this.userService.getAllUser();
            res.json({
                ok:true,
                users:users,
                message:`lista de usuarios`
        });
    };

    /**
     * getUserById
     * */
    public getUserById = async (req:Request, res:Response) => {
        const {id: userId} = req.params;
        logger.info(`${UserController.name}-getUserById`);
        const user =  await this.userService.getUserById(userId)
            res.status(200).json({
                ok:true,
                user,
                message:`Detalles de usuario `
        });
    };
    
    /**
     * createUser
     * */
    public createUser= async (req:Request,res:Response) =>  {
        const {body: userBody} = req;
        logger.info(`${UserController.name}-CreateUser`);
        const newuser = await this.userService.createUser(userBody);
            res.status(200).json({
                ok:true,
                user:newuser,
                message:`Usuario creado `
            });
    }

    /**
     * updateUserById
     */
    public updateUserById = async (req:Request ,res:Response) => {
        const {id:userId} = req.params;
        const {body: userBody}=req
        logger.info(`${UserController.name}-updateUserById`);
        const updateUser = await this.userService.UpdateUserById(userId,userBody);
            res.status(200).json({
                ok:true,
                user:updateUser,
                message:`Usuario actualizado `
            });
    }
    /**
     * deleteUserById
     */
    public deleteUserById= async (req:Request, res:Response) => {
        const {id:userId} = req.params;
        logger.info(`${UserController.name}-deleteUserById`);
        const userDeleted = await this.userService.deleteUserById(userId);
            res.status(200).json({
                ok:true,
                user:userDeleted,
                message:`Usuario borrado`
            });
    }
};

export default UserController