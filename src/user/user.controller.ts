import { Request, Response } from "express";

class UserController { 
    constructor () {

    }
    /**
     * getAllUsers
     */
    public getAllUsers= async(_req:Request, res:Response) => {
        res.status(200).json({
            ok:true,
            message:`lista de usuarios`
        });
    };

    /**
     * getUserById
     * */
    public getUserById = async (req:Request, res:Response) => {
        const {id:userId} = req.params;
        console.log(`userId: ${userId}`);
        res.status(200).json({
            ok:true,
            message:`Detalles de usuario `
        });
    };
    
    /**
     * createUser
     * */
    public createUser= async (req:Request,res:Response) =>  {
        console.log("Body de la req",req.body);
            res.status(200).json({
                ok:true,
                message:`Usuario creado `
            });
    }

    /**
     * updateUserById
     */
    public updateUserById = async (req:Request ,res:Response) => {
        const {id:userId} = req.params;
            console.log(`Parametros de la req: `,req.params);
            console.log(`userId: ${userId}`);
            res.status(200).json({
                ok:true,
                message:`Usuario actualizado `
            });
    }
    /**
     * deleteUserById
     */
    public deleteUserById= async (req:Request, res:Response) => {
        const {id:userId} = req.params;
            
            console.log(`Parametros de la req: `,req.params);
            console.log(`userId: ${userId}`);
            
            res.status(200).json({
                ok:true,
                message:`Usuario borrado`
            });
    }
};

export default UserController