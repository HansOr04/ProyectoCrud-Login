import { Request, Response } from 'express';
import { UpdateUserService } from '../../services/users/update-user.service';
import { UpdateUserValidator } from '../../validators/users/update-user.validator';
import { successResponse, errorResponse } from '../../utils/response.util';

export class UpdateUserController {
  private readonly updateUserService: UpdateUserService;
  private readonly validator: UpdateUserValidator;

  constructor() {
    this.updateUserService = new UpdateUserService();
    this.validator = new UpdateUserValidator();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const dto = req.body;

      const validation = this.validator.validate(dto);
      if (!validation.valid) {
        errorResponse(res, validation.errors.join(', '), 400);
        return;
      }

      const user = await this.updateUserService.execute(id, dto);

      successResponse(res, {
        message: 'User updated successfully',
        user,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to update user';
      const statusCode = message === 'User not found' ? 404 : 400;
      errorResponse(res, message, statusCode);
    }
  }
}