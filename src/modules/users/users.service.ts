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
    let roleInfo = await this.roleRepository.findOne({
      where: [{ code: '1111' }, { code: '0000' }, { role: 'User' }],
    });
    if (!roleInfo) {
      roleInfo = await this.roleRepository.create({
        role: 'User',
        code: '1111',
        secret: 'user',
      });
    }
    const hashedPassword = this.bcryptService.hashPassword(password);
    const {
      password: userPassword,
      encryptedPassword,
      ...user
    } = await this.userRepository.create({
      fullName,
      userName: userName || email.split('@')[0],
      email,
      password: hashedPassword,
      roles: roleInfo,
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
    const { password, encryptedPassword, roles, ...userDataRaw } = user;
    const userData = {
      ...userDataRaw,
      role: roles?.role || 'User',
      roleId: roles?.id,
    };
    const token = this.authService.createJwtToken(userData);
    return { userData, token };
  }
  async getUserInfo(userInfo: any) {
    const user = await this.userRepository.findOne({
      where: { id: userInfo.id },
      relations: ['roles', 'quotes'],
    });
    if (!user) {
      throw new NotFoundException('User not found!');
    }
    const { password, encryptedPassword, roles, ...userDataRaw } = user;
    const userData = {
      ...userDataRaw,
      role: roles?.role || 'User',
      roleId: roles?.id,
    };
    return { userData };
  }
}
