import { UserRepository } from "../../repositories/user.repository";
import { CompareService } from "../password/compare.service";
import { TokenService } from "./token.service";
import { LoginDTO } from "../../models/dto/login.dto";
import { UserResponseDto } from "../../models/dto/user-response.dto";

export class LoginService {
    private readonly userRepository: UserRepository;
    private readonly compareService: CompareService;
    private readonly tokenService: TokenService;

    constructor() {
        this.userRepository = new UserRepository();
        this.compareService = new CompareService();
        this.tokenService = new TokenService();
    }
    async execute(dto: LoginDTO): Promise<{ user: UserResponseDto; token: string }> {
        const { email, password } = dto;
        const user = await this.userRepository.findByEmail(email);
        if (!user) {
            throw new Error('Invalid email or password');
        }
        const isPasswordValid = await this.compareService.compare(password, user.password_hash);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
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