import { Request, Response, NextFunction } from "express";
import {TokenService} from "../services/auth/token.service";

export interface AuthRequest extends Request {
    userId?: string;
    userEmail?: string;
}
export class AuthMiddleware {
    private readonly tokenService: TokenService;

    constructor() {
        this.tokenService = new TokenService();
    }
    handle(req: AuthRequest, res: Response, next: NextFunction): void {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                res.status(401).json({ success: false, message: "No token provided" });
                return;
            }
            const token = authHeader.replace("Bearer ", "");
            const decoded = this.tokenService.verify(token);

            if (!decoded) {
                res.status(401).json({ success: false, message: "Invalid token" });
                return;
            }
            req.userId = decoded.userId;
            req.userEmail = decoded.email;
            next();
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error" });
        }
    }
}