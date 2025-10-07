import { UserRepository } from '../../repositories/user.repository';
import { UserResponseDto } from '../../models/dto/user-response.dto';

export class GetUsersService {
  private readonly userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async execute(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.findAll();

    return users.map((user) => ({
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    }));
  }
}