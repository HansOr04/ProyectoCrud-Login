import { Request, Response } from "express";
import {RegisterService} from "../../services/auth/register.service";
import { RegisterValidator } from "../../validators/auth/register.validator";
import { successResponse, errorResponse } from "../../utils/response.util";

export class RegisterController {
    private readonly registerService: RegisterService;
    private readonly registerValidator: RegisterValidator;
    constructor() {
        this.registerService = new RegisterService();
        this.registerValidator = new RegisterValidator();
    }
    async handle(req: Request, res: Response): Promise<void> {
        try {
            const dto= req.body;
            const validation = this.registerValidator.validate(dto);
            if (!validation.valid) {
                errorResponse(res, validation.errors.join(", "), 400);
                return;
            }
            const result = await this.registerService.execute(dto);
            successResponse(res, {
                message: "User registered successfully",
                user: result.user,
                token: result.token,
            }, 201);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Registration failed";
            errorResponse(res, message, 500);
        }
    }
}