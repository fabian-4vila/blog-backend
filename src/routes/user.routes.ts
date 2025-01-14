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
            })
            
        })
    }
}

export default UserRoute;