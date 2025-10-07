import { Router } from 'express';
import { AuthRoutes } from './auth.routes';
import { UsersRoutes } from './users.routes';

export class Routes {
  public router: Router;
  private readonly authRoutes: AuthRoutes;
  private readonly usersRoutes: UsersRoutes;

  constructor() {
    this.router = Router();
    this.authRoutes = new AuthRoutes();
    this.usersRoutes = new UsersRoutes();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.use('/auth', this.authRoutes.router);
    this.router.use('/users', this.usersRoutes.router);
  }
}