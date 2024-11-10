import { NextFunction, Request, Response } from "express";

export interface IJapaneseController {
    getKatakana(req:Request, res:Response,next:NextFunction) : Promise<void>
}

class JapaneseController implements IJapaneseController {
    async getKatakana(req: Request, res: Response, next: NextFunction): Promise<void> {
        res.json("Halooo")
        return
    }
}

export const setupJapaneseController = (): IJapaneseController => {
    return new JapaneseController()
}