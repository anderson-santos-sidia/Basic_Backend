import { Router } from "express";

import { BaseController } from "../controller/base";

const baseController = new BaseController;

export const route = Router();


route.get('/',baseController.getStatus)
route.post('/',baseController.setStatus)
route.get('/users',baseController.getUsersList)
route.post('/users',baseController.setNewUser)