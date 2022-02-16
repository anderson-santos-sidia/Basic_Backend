import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { User } from "../dto/user";

const prisma = new PrismaClient()

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

    public async getUsersList(req: Request, res: Response){
        //get info about status of servers or services and return the result
        // func
        let allUsers;
        try {
            allUsers = await prisma.user.findMany()
        } catch (error) {
            return res.json({status:10,message:error,detail:null,date: new Date(),content:null})
        }
        async () => {await prisma.$disconnect()}
        return res.json({status:1,message:null,detail:null,date: new Date(),content:allUsers})
    }

    public async setNewUser(req: Request<{},{},User>, res: Response){
        //get info about status of servers or services and return the result
        // func
        const user = req.body;
        let allUsers;
        try {
            await prisma.user.create({
                data: {
                  name: user.name,
                  email: user.email,
                  profile: {
                    create: { bio: user.bio },
                  },
                },
              });
            allUsers = await prisma.user.findMany({
                include: {
                  profile: true,
                },
              });
        } catch (error) {
            return res.json({status:10,message:error,detail:null,date: new Date(),content:null})
        }
        async () => {await prisma.$disconnect()}
        return res.json({status:1,message:null,detail:null,date: new Date(),content:allUsers})
    }
        
}