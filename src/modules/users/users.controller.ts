import { Body, Controller, Logger, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  Public,
  Roles as RolesGuard,
} from 'src/decorators/decorators.decorator';
import { CreateUserDto, LoginDto } from './dto/createOrUpdateUser.dto';
import { Roles } from 'src/constants/role.enum';
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
}
