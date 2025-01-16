import { Request, Response, Router } from "express";
import { Routes } from "../interfaces/route.interface";


class UserRoute implements Routes{
    public path = '/user';
    public router = Router();
    constructor (){
        this.initUserRoute();
    }
    /**
     * init
     */
    public initUserRoute() {
        this.router.get(`${this.path}`,(_req:Request, res:Response)=>{
            res.status(200).json({
                ok:true,
                message:`lista de usuarios`
            });
        });
        //getUserById
        this.router.get(`${this.path}/:id`,(req:Request, res:Response)=>{
            const {id:userId} = req.params;

            console.log(`Parametros de la req: `,req.params);
            console.log(`userId: ${userId}`);
            
            res.status(200).json({
                ok:true,
                message:`Detalles de usuario `
            });
        });
        //createUser
        this.router.post(`${this.path}`,(req:Request, res:Response)=>{
            const { body:userBody } = req;
            console.log(userBody);
            
            res.status(200).json({
                ok:true,
                message:`Usuario creado `
            });
        });
        //updateUserById
        this.router.put(`${this.path}/:id`,(req:Request, res:Response)=>{
            const {id:userId} = req.params;
            const {body:userBody}=req
            console.log(userBody,userId);
            
            res.status(200).json({
                ok:true,
                message:`Usuario actualizado `
            });
        });
        //deleteUserById
        this.router.delete(`${this.path}/:id`,(req:Request, res:Response)=>{
            const {id:userId} = req.params;
            
            console.log(`Parametros de la req: `,req.params);
            console.log(`userId: ${userId}`);
            
            res.status(200).json({
                ok:true,
                message:`Usuario borrado`
            });
        });
    }
}

export default UserRoute;