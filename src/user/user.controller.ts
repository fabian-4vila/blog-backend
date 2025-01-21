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
        const {id:userId} = req.params;
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
    public createUser= async (_req:Request,res:Response) =>  {
        logger.info(`${UserController.name}-CreateUser`);
        const user = await this.userService.createUser();
            res.status(200).json({
                ok:true,
                user,
                message:`Usuario creado `
            });
    }

    /**
     * updateUserById
     */
    public updateUserById = async (req:Request ,res:Response) => {
        const {id:userId} = req.params;
        logger.info(`${UserController.name}-updateUserById`);
        const user = await this.userService.UpdateUserById(userId);
            res.status(200).json({
                ok:true,
                user,
                message:`Usuario actualizado `
            });
    }
    /**
     * deleteUserById
     */
    public deleteUserById= async (req:Request, res:Response) => {
        const {id:userId} = req.params;
        logger.info(`${UserController.name}-deleteUserById`);
        const user = await this.userService.deleteUserById(userId);
            res.status(200).json({
                ok:true,
                user,
                message:`Usuario borrado`
            });
    }
};

export default UserController