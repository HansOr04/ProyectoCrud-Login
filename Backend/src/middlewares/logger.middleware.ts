import { Request, Response, NextFunction } from "express";

export class LoggerMiddleware {
    handle(req: Request, res: Response, next: NextFunction): void {
        const timestamp = new Date().toISOString();
        const method = req.method;
        const path = req.path;
        console.log(`[${timestamp}] ${method} ${path}`);
        next();
    }
}