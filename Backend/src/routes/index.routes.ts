import { Router } from 'express';
import { AuthRoutes } from './auth.routes';

export class Routes {
    public router: Router;
    private readonly authRoutes: AuthRoutes;
    constructor() {
        this.router = Router();
        this.authRoutes = new AuthRoutes();
        this.initializeRoutes();
    }
    private initializeRoutes(): void {
        this.router.use('/auth', this.authRoutes.router);
    }
}
