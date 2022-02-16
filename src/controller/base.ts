import { Request, Response } from "express";


export class BaseController {
    public async getStatus(req: Request, res: Response){
        //get info about status of servers or services and return the result
        // func
        const servicesStatus = {
            ServerA:true,
            ServerB: false,
            ServiceA: true,
            ServiceB: true,
            ServiceC: false
        }
        return res.json({status:1,message:"",detail:"",date: new Date(),content:servicesStatus})
    }

    public async setStatus(req: Request, res: Response){
        //get the request body json to use to send data or orders to other services
        const {status} = req.body;
        return res.json({status,date:new Date()})
    }
}