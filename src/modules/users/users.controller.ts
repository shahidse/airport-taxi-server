import { Body, Controller, Get, Logger, Post, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  Public,
  Resources,
  Roles as RolesGuard,
} from 'src/decorators/decorators.decorator';
import { GetSecretDto } from './dto/secret.dto';
import {
  ApiGetRoles,
  ApiPostSecret,
  ApiSignIn,
  ApiSignup,
} from './swagger/docs';
import { CreateUserDto, LoginDto } from './dto/createOrUpdateUser.dto';
import { ResourcesTypes, Roles } from 'src/constants/role.enum';
@Controller({ path: 'users', version: '1' })
export class UsersController {
  // constructor(private readonly userService: UsersService) {}
  // private readonly logger = new Logger(UsersController.name);
  // @ApiPostSecret()
  // @Public()
  // @Post('/secret')
  // async getSecret(@Body() body: GetSecretDto) {
  //   this.logger.log(`Executing ${this.getSecret.name}`);
  //   return await this.userService.getSecret(body);
  // }
  // @ApiSignup()
  // @RolesGuard(Roles.SUPER_USER)
  // @Resources(ResourcesTypes.NOT_RESOURCES)
  // @Post('signup')
  // async signup(@Body() createUserDto: CreateUserDto, @Req() req: any) {
  //   this.logger.log(`Executing ${this.signup.name}`);
  //   return await this.userService.signup(createUserDto, req?.user);
  // }
  // @ApiSignIn()
  // @RolesGuard(Roles.SUPER_USER)
  // @Resources(ResourcesTypes.NOT_RESOURCES)
  // @Post('login')
  // async login(@Body() data: LoginDto, @Req() req: any) {
  //   this.logger.log(`Executing ${this.login.name}`);
  //   return await this.userService.login(data, req?.user);
  // }
  // @ApiGetRoles()
  // @RolesGuard(Roles.SUPER_USER)
  // @Resources(ResourcesTypes.NOT_RESOURCES)
  // @Get('roles')
  // getRoles(@Req() req: any) {
  //   this.logger.log(`Executing ${this.getRoles.name}`);
  //   return this.userService.getRoles(req?.user);
  // }
}
