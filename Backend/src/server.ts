import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ServerConfig } from "./config/server.config";
import { JwtConfig } from "./config/jwt.config";
import { Routes } from "./routes/index.routes";
import { LoggerMiddleware } from "./middlewares/logger.middleware";
import { ErrorHandlerMiddleware } from "./middlewares/error-handler.middleware";
dotenv.config();
class Server {
    private readonly app: Application;
    private readonly routes: Routes;
    private readonly loggerMiddleware: LoggerMiddleware;
    private readonly errorHandlerMiddleware: ErrorHandlerMiddleware;
    constructor() {
        this.app = express();
        this.routes = new Routes();
        this.loggerMiddleware = new LoggerMiddleware();
        this.errorHandlerMiddleware = new ErrorHandlerMiddleware();
        this.validateConfig();
        this.setupMiddlewares();
        this.setupRoutes();
        this.setupErrorHandler();
    }
    private validateConfig(): void {
        JwtConfig.validate();
    }
    private setupMiddlewares(): void {
        this.app.use(cors({
            origin: ServerConfig.FRONTEND_URL,
            credentials: true,
        }));
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));

        this.app.use(this.loggerMiddleware.handle.bind(this.loggerMiddleware));
    }
    private setupRoutes(): void {
        this.app.get('/health', (req, res) => {
            res.status(200).json({ status: 'OK', time: new Date().toISOString(), environment: ServerConfig.NODE_ENV , auth : 'JWT',});
        });
        this.app.use('/api', this.routes.router);
        this.app.use((req, res) => {
            res.status(404).json({ success: false, error: 'Not Found' , path: req.path });
        });
    }
    private setupErrorHandler(): void {
        this.app.use(this.errorHandlerMiddleware.handle.bind(this.errorHandlerMiddleware));
    }
    public start(): void {
        this.app.listen(ServerConfig.PORT, () => {
            console.log('================================================');
            console.log('Server running on http://localhost:' + ServerConfig.PORT);
            console.log ('Authentication: JWT');
            console.log('Environment: ' + ServerConfig.NODE_ENV);
            console.log('================================================');
            console.log('Available Routes:');
            console.log('GET     /health');
            console.log('POST    /api/auth/register');
            console.log('POST    /api/auth/login');
            console.log('GET     /api/auth/me');
            console.log('================================================');
        });
    }
}
const server = new Server();
server.start();