import {
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { Users } from '../database/entities/users.entity';
import { Roles } from '../database/entities/roles.entity';
import { CommonRepository } from '../database/repository/common_repository';
import { BcryptService } from '../bcrypt/bcrypt.service';
import { CreateUserDto, LoginDto } from './dto/createOrUpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly authService: AuthService,
    @Inject('USERS_REPOSITORY') private userRepository: CommonRepository<Users>,
    @Inject('ROLES_REPOSITORY') private roleRepository: CommonRepository<Roles>,
    private readonly bcryptService: BcryptService,
  ) {}

  async signup(createUserDto: CreateUserDto): Promise<any> {
    const {
      fullName,
      userName,
      email,
      password,
      state,
      address,
      city,
      country,
    } = createUserDto;
    const roleInfo = await this.roleRepository.findOne({
      where: { code: '0000' },
    });
    const hashedPassword = this.bcryptService.hashPassword(password);
    const {
      password: userPassword,
      encryptedPassword,
      ...user
    } = await this.userRepository.create({
      fullName,
      userName,
      email,
      password: hashedPassword,
      roles: roleInfo || undefined,
      state,
      address,
      city,
      country,
      isActive: true,
    });
    return { user, message: 'User registered successfully' };
  }
  async login(data: LoginDto) {
    const user = await this.userRepository.findOne({
      where: [{ email: data.email }, { userName: data.email }],
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const isAuthourize = this.bcryptService.comparePasswords(
      data.password,
      user.password,
    );
    if (!isAuthourize) {
      throw new UnauthorizedException('Invalid Credentials');
    }
    let { password, encryptedPassword, roles, ...userData } = user;
    userData = { ...roles, ...userData };
    const token = this.authService.createJwtToken(userData);
    return { userData, token };
  }
}
