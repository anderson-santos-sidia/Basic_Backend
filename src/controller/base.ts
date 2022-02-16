import { Request, Response } from "express";
import { PrismaClient } from '@prisma/client';
import { User } from "../dto/user";

const prisma = new PrismaClient()

export class BaseController {
    
    //get info about status of servers or services and return the result
    public async getStatus(req: Request, res: Response){
        const servicesStatus = {
            ServerA:true,
            ServerB: false,
            ServiceA: true,
            ServiceB: true,
            ServiceC: false
        }
        return res.json({status:1,message:"",detail:"",date: new Date(),content:servicesStatus})
    }

    //get the request body json to use to send data or orders to other services
    public async setStatus(req: Request, res: Response){
        const {status} = req.body;
        return res.json({status,date:new Date()})
    }

    //get a json with all users in the BD
    public async getUsersList(req: Request, res: Response){
        let allUsers;
        try {
            allUsers = await prisma.user.findMany()
        } catch (error) {
            return res.json({status:10,message:error,detail:null,date: new Date(),content:null})
        }
        async () => {await prisma.$disconnect()}
        return res.json({status:1,message:null,detail:null,date: new Date(),content:allUsers})
    }

    //Save a new user on the BD
    public async setNewUser(req: Request<{},{},User>, res: Response){
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