import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  Permissions,
  Public,
  Roles as RolesGuard,
} from 'src/decorators/decorators.decorator';
import { CreateUserDto, LoginDto } from './dto/createOrUpdateUser.dto';
import { PermissionsTypes, Roles } from 'src/constants/role.enum';
import { ApiEndpoint } from 'src/swagger/docs';
@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly userService: UsersService) {}
  private readonly logger = new Logger(UsersController.name);
  @ApiEndpoint({
    summary: 'Signup',
    description: 'Create a new user account',
    tags: ['Users'],
    bodyType: CreateUserDto,
    responses: [
      { status: 201, description: 'User created' },
      { status: 422, description: 'Validation error' },
    ],
  })
  @Public()
  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto) {
    this.logger.log(`Executing ${this.signup.name}`);
    return await this.userService.signup(createUserDto);
  }
  @ApiEndpoint({
    summary: 'Login',
    description: 'User Login',
    tags: ['Users'],
    bodyType: LoginDto,
    responses: [
      { status: 201, description: 'User login' },
      { status: 401, description: 'Unauthorized' },
    ],
  })
  @Public()
  @Post('login')
  async login(@Body() data: LoginDto) {
    this.logger.log(`Executing ${this.login.name}`);
    return await this.userService.login(data);
  }
  @ApiEndpoint({
    summary: 'get user info',
    description: 'getting user info',
    tags: ['Users'],
    responses: [{ status: 201, description: 'get user' }],
    authRequired: true,
  })
  @RolesGuard(Roles.USER)
  @Permissions(PermissionsTypes.WRITE)
  @Get('info')
  async getUserInfo(@Req() req: any) {
    this.logger.log(`Executing ${this.getUserInfo.name}`);
    return await this.userService.getUserInfo(req.user);
  }
}
