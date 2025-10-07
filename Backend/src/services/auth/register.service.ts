import { UserRepository } from '../../repositories/user.repository';
import { HashService } from '../password/hash.service';
import { TokenService } from './token.service';
import { RegisterDto } from '../../models/dto/register.dto';
import { UserResponseDto } from '../../models/dto/user-response.dto';

export class RegisterService {
  private readonly userRepository: UserRepository;
  private readonly hashService: HashService;
  private readonly tokenService: TokenService;

  constructor() {
    this.userRepository = new UserRepository();
    this.hashService = new HashService();
    this.tokenService = new TokenService();
  }

  async execute(dto: RegisterDto): Promise<{ user: UserResponseDto; token: string }> {
    const { email, password } = dto;

    const userExists = await this.userRepository.existsByEmail(email);
    if (userExists) {
      throw new Error('Email already registered');
    }

    const passwordHash = await this.hashService.hash(password);
    const user = await this.userRepository.create(email, passwordHash);

    if (!user) {
      throw new Error('Failed to create user');
    }

    const token = this.tokenService.generate({
      userId: user.id,
      email: user.email,
    });

    const userResponse: UserResponseDto = {
      id: user.id,
      email: user.email,
      created_at: user.created_at,
      updated_at: user.updated_at,
    };

    return { user: userResponse, token };
  }
}