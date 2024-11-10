import { NextFunction, Response, Request } from "express";
import winston from "winston";

class LoggerMiddleware {
    public logger: winston.Logger;
  
    constructor() {
      // Inisialisasi logger menggunakan Winston
      this.logger = winston.createLogger({
        level: "debug",
        format: winston.format.combine(
          winston.format.timestamp(),
          winston.format.json()
        ),
        transports: [
          new winston.transports.Console({})
        ]
      });
    }
  
    // Middleware untuk logging request dan response
    public logRequests = (req: Request, res: Response, next: NextFunction) => {
      const start = Date.now(); // Waktu mulai untuk menghitung durasi request
  
      // Log informasi saat request diterima
      this.logger.info({
        message: `Incoming Request: ${req.method} ${req.url} from ${req.ip}`,
        request: {
            query: req.query,
            url: req.url,
            body: req.body
        }
      });
  
      // Menyimpan response asli
      const originalSend = res.send;
  
      // Overwrite method res.send untuk menangkap response sebelum dikirim
      res.send = (body: any) => {
        // Log response ketika dikirim
        const duration = Date.now() - start;
        this.logger.info({
            message: `Outgoing Response: ${req.method} ${req.url}`,
            response: {
                status: res.statusCode,
                duration: `[${duration} ms]`,
                body: JSON.parse(body)
            }
        });
  
        // Memanggil method asli `res.send`
        return originalSend.call(res, body);
      };
  
      next();
    };
  }
  
  export default LoggerMiddleware;