import { Request, Response } from "express";
import { LoginService } from "../../services/auth/login.service";
import { LoginValidator } from "../../validators/auth/login.validator";
import { successResponse, errorResponse } from "../../utils/response.util";

export class LoginController {
    private readonly loginService: LoginService;
    private readonly loginValidator: LoginValidator;
    constructor() {
        this.loginService = new LoginService();
        this.loginValidator = new LoginValidator();
    }
    async handle(req: Request, res: Response): Promise<void> {
        try {
            const dto = req.body;
            const validation = this.loginValidator.validate(dto);
            if (!validation.valid) {
                errorResponse(res, validation.errors.join(", "), 400);
                return;
            }
            const result = await this.loginService.execute(dto);
            successResponse(res, {
                message: "Login successful",
                user: result.user,
                token: result.token,
            });
        } catch (error) {
            const message = error instanceof Error ? error.message : "Login failed";
            errorResponse(res, message, 401);
        }
    }
}