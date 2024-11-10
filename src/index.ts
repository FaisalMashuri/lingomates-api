import express, {Application, Request, Response} from "express"
import config from "./config/index"
// import {db} from "./database"


import { APIRouter, RoutesParam } from "./routes/index.routes"
import LoggerMiddleware from "./middlewares/log.middleware"
import { responseMiddleware } from "./middlewares/response.middleware"
import { setupJapaneseController } from "./domains/japanese/controllers/index.controller"

const app: Application = express()
const logger = new LoggerMiddleware()

app.use(express.json())
app.use(logger.logRequests)
app.use(responseMiddleware)
app.get("/",(req: Request, res: Response) => {
    res.status(201).json("halo");
})

const japaneseController = setupJapaneseController()
const routeParam :RoutesParam  = {
    japaneseController
} 
const apiRouter = new APIRouter(routeParam);
app.use("/api/v1", apiRouter.router)


app.listen(config.configApp.port, async () => {
//    await db.migrate()
   logger.logger.info(`Server running on port ${config.configApp.port}`)
})

export default app