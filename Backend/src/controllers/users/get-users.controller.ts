import { Request, Response } from 'express';
import { GetUsersService } from '../../services/users/get-users.service';
import { successResponse, errorResponse } from '../../utils/response.util';

export class GetUsersController {
  private readonly getUsersService: GetUsersService;

  constructor() {
    this.getUsersService = new GetUsersService();
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.getUsersService.execute();

      successResponse(res, {
        message: 'Users retrieved successfully',
        users,
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to get users';
      errorResponse(res, message, 500);
    }
  }
}