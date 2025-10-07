import { Router } from 'express';
import { GetUsersController } from '../controllers/users/get-users.controller';
import { GetUserController } from '../controllers/users/get-user.controller';
import { UpdateUserController } from '../controllers/users/update-user.controller';
import { DeleteUserController } from '../controllers/users/delete-user.controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';

export class UsersRoutes {
  public router: Router;
  private readonly getUsersController: GetUsersController;
  private readonly getUserController: GetUserController;
  private readonly updateUserController: UpdateUserController;
  private readonly deleteUserController: DeleteUserController;
  private readonly authMiddleware: AuthMiddleware;

  constructor() {
    this.router = Router();
    this.getUsersController = new GetUsersController();
    this.getUserController = new GetUserController();
    this.updateUserController = new UpdateUserController();
    this.deleteUserController = new DeleteUserController();
    this.authMiddleware = new AuthMiddleware();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Todas las rutas requieren autenticación
    this.router.use(this.authMiddleware.handle.bind(this.authMiddleware));

    // GET /api/users - Listar todos los usuarios
    this.router.get(
      '/',
      this.getUsersController.handle.bind(this.getUsersController)
    );

    // GET /api/users/:id - Obtener un usuario
    this.router.get(
      '/:id',
      this.getUserController.handle.bind(this.getUserController)
    );

    // PUT /api/users/:id - Actualizar usuario
    this.router.put(
      '/:id',
      this.updateUserController.handle.bind(this.updateUserController)
    );

    // DELETE /api/users/:id - Eliminar usuario
    this.router.delete(
      '/:id',
      this.deleteUserController.handle.bind(this.deleteUserController)
    );
  }
}