import { Router } from 'express';
import { RegisterController } from '../controllers/auth/register.controller';
import { LoginController } from '../controllers/auth/login.controller';
import { MeController } from '../controllers/auth/me.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class AuthRoutes {
  public router: Router;
  private readonly registerController: RegisterController;
  private readonly loginController: LoginController;
  private readonly meController: MeController;
  private readonly authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.registerController = new RegisterController();
    this.loginController = new LoginController();
    this.meController = new MeController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Public routes
    this.router.post(
      '/register',
      this.registerController.handle.bind(this.registerController)
    );

    this.router.post(
      '/login',
      this.loginController.handle.bind(this.loginController)
    );

    // Protected routes - BIND del middleware
    this.router.get(
      '/me',
      this.authMiddleware.handle.bind(this.authMiddleware),
      this.meController.handle.bind(this.meController)
    );
  }
}