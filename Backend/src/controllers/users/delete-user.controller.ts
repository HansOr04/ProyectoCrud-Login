import { Request, Response } from 'express';
import { DeleteUserService } from '../../services/users/delete-user.service';
import { successResponse, errorResponse } from '../../utils/response.util';

export class DeleteUserController {
  private readonly deleteUserService: DeleteUserService;

  constructor() {
    this.deleteUserService = new DeleteUserService();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.deleteUserService.execute(id);

      successResponse(res, {
        message: 'User deleted successfully',
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to delete user';
      const statusCode = message === 'User not found' ? 404 : 500;
      errorResponse(res, message, statusCode);
    }
  }
}