import { Request, Response } from 'express';
import { GetUserService } from '../../services/users/get-user.service';
import { successResponse, errorResponse } from '../../utils/response.util';

export class GetUserController {
  private readonly getUserService: GetUserService;

  constructor() {
    this.getUserService = new GetUserService();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const user = await this.getUserService.execute(id);

      successResponse(res, {
        message: 'User retrieved successfully',
        user,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to get user';
      const statusCode = message === 'User not found' ? 404 : 500;
      errorResponse(res, message, statusCode);
    }
  }
}