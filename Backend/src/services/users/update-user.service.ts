import { UserRepository } from '../../repositories/user.repository';
import { HashService } from '../password/hash.service';
import { UpdateUserDto } from '../../models/dto/update-user.dto';
import { UserResponseDto } from '../../models/dto/user-response.dto';

export class UpdateUserService {
  private readonly userRepository: UserRepository;
  private readonly hashService: HashService;

  constructor() {
    this.userRepository = new UserRepository();
    this.hashService = new HashService();
  }

  async execute(id: string, dto: UpdateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error('User not found');
    }

    // Verificar si el email ya existe (si se está cambiando)
    if (dto.email && dto.email !== user.email) {
      const emailExists = await this.userRepository.existsByEmail(dto.email);
      if (emailExists) {
        throw new Error('Email already in use');
      }
    }

    let passwordHash: string | undefined;
    if (dto.password) {
      passwordHash = await this.hashService.hash(dto.password);
    }

    const updatedUser = await this.userRepository.update(
      id,
      dto.email,
      passwordHash
    );

    return {
      id: updatedUser.id,
      email: updatedUser.email,
      created_at: updatedUser.created_at,
      updated_at: updatedUser.updated_at,
    };
  }
}