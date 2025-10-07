import { Response } from 'express';
import { AuthRequest } from '../../middlewares/auth.middleware';
import { UserRepository } from '../../repositories/user.repository';
import { successResponse, errorResponse } from '../../utils/response.util';

export class MeController {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async handle(req: AuthRequest, res: Response): Promise<void> {
    try {
      const userId = req.userId;

      if (!userId) {
        errorResponse(res, 'User not authenticated', 401);
        return;
      }

      const user = await this.userRepository.findById(userId);

      if (!user) {
        errorResponse(res, 'User not found', 404);
        return;
      }

      successResponse(res, {
        user: {
          id: user.id,
          email: user.email,
          created_at: user.created_at,
          updated_at: user.updated_at,
        },
      });
    } catch (error: unknown) {
      console.error('Error in MeController:', error);
      const message = error instanceof Error ? error.message : 'Failed to get user';
      errorResponse(res, message, 500);
    }
  }
}