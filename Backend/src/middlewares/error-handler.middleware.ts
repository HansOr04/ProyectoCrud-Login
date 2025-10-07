import { Request, Response, NextFunction } from "express";
import { ServerConfig } from "../config/server.config";

export class ErrorHandlerMiddleware {
    handle(err: Error, req: Request, res: Response, next: NextFunction): void {
        console.error('Unhandled error:', err);
        const statusCode = res.statusCode !== 200 ? res.statusCode : 500;
        res.status(statusCode).json({
            success: false,
            error: 'Internal Server Error',
            message: ServerConfig.isDevelopment() ? err.message : undefined,
            stack: ServerConfig.isDevelopment() ? err.stack : undefined,
        });
    }
}