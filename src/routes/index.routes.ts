import express, { Router } from "express";
import { IJapaneseController } from './../domains/japanese/controllers/index.controller';
export interface RoutesParam {
    japaneseController : IJapaneseController
}

export class APIRouter {
    public router:Router
    private routeParam : RoutesParam
    constructor(routeParam : RoutesParam) {
        this.routeParam = routeParam
        this.router = Router()
        this.initRoutes()
    }

    private initRoutes() {
        console.log("router param : ", this.routeParam)
        this.router.get("/japanese", this.routeParam.japaneseController.getKatakana)
        // this.router.post("/api/v1/users", UserController.createUser)
        // this.router.get("/api/v1/users", UserController.getUsers)
    }
}