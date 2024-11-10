import express, {Application, NextFunction, Request, Response} from "express"
import config from "./config/index"
// import {db} from "./database"


import { APIRouter, RoutesParam } from "./routes/index.routes"
import LoggerMiddleware from "./middlewares/log.middleware"
import { responseMiddleware } from "./middlewares/response.middleware"
import { setupJapaneseController } from "./domains/japanese/controllers/index.controller"
import Database from "./database"

const app: Application = express()
const logger = new LoggerMiddleware()



app.use(express.json())
app.use(logger.logRequests)
app.use(responseMiddleware)
app.get("/",(req: Request, res: Response) => {
    res.status(201).json("halo");
})
const db = new Database()

const japaneseController = setupJapaneseController()
const routeParam :RoutesParam  = {
    japaneseController
} 
const apiRouter = new APIRouter(routeParam);
app.use("/api/v1", apiRouter.router)


app.listen(config.configApp.port, async () => {
//    await db.migrate()
    await db.migrate()
   logger.logger.info(`Server running on port ${config.configApp.port}`)
})

process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await db.getSequelizeInstance().close();  // Close database connections
    process.exit();
  });

export default app;