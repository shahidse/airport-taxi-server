import {
  Inject,
  Injectable,
  InternalServerErrorException,
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
  // constructor(
  //   private readonly authService: AuthService,
  //   @Inject('USERS_REPOSITORY') private userRepository: CommonRepository<Users>,
  //   @Inject('ROLES_REPOSITORY') private roleRepository: CommonRepository<Roles>,
  //   private readonly bcryptService: BcryptService,
  // ) {}

  // async getSecret(data: any) {
  //   const getRole = await this.roleRepository.findOneBy({
  //     secret: data.secret,
  //   });
  //   if (!getRole) {
  //     throw new NotFoundException('No Role Found');
  //   }
  //   const token = this.authService.createJwtToken({
  //     role: getRole.role,
  //     code: getRole.code,
  //     roleId: getRole.id,
  //   });
  //   if (!token) {
  //     throw new InternalServerErrorException('Error In Creating Token');
  //   }
  //   return { token };
  // }
  // async signup(createUserDto: CreateUserDto, roleInfo: any): Promise<any> {
  //   const { fullName, userName, email, password } = createUserDto;
  //   const hashedPassword = this.bcryptService.hashPassword(password);
  //   const { password: _, ...user } = await this.userRepository.create({
  //     fullName,
  //     userName,
  //     email,
  //     password: hashedPassword,
  //     roles: roleInfo?.roleId,
  //   });
  //   return { user, message: 'User registered successfully' };
  // }
  // async login(data: LoginDto, roleInfo: any) {
  //   const user = await this.userRepository.findOne({
  //     where: [
  //       { email: data.email, roles: roleInfo.id },
  //       { userName: data.email, roles: roleInfo.id },
  //     ],
  //     relations: ['roles', 'roles.acl', 'roles.acl.resource', 'roles.brands'],
  //   });
  //   if (!user) {
  //     throw new NotFoundException('User not found!');
  //   }
  //   const isAuthourize = this.bcryptService.comparePasswords(
  //     data.password,
  //     user.password,
  //   );
  //   if (!isAuthourize) {
  //     throw new UnauthorizedException('Invalid Credentials');
  //   }
  //   let { password: _, roles, ...userData } = user;
  //   userData = { ...roles, ...userData };
  //   const token = this.authService.createJwtToken(userData);
  //   return { userData, token };
  // }
  // getRoles(roleInfo: any) {
  //   return this.roleRepository.findAll({
  //     where: { brands: { id: roleInfo.brandsId } },
  //     relations: ['brands'],
  //   });
  // }
}
