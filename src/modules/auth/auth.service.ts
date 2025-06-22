import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  signOptions(): JwtSignOptions {
    return {
      issuer: '',
      audience: [],
    };
  }
  createJwtToken(user: any) {
    return this.jwtService.sign(user);
  }

  createPasswordToken(password: string, email: string) {
    return this.jwtService.sign({ password, email });
  }

  decodePasswordToken(token: string) {
    return this.jwtService.decode(token).password;
  }
  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }
//   async compareTokenWithDatabase(tokenFromRequest: string): Promise<boolean> {
//     const user = this.decodeToken(tokenFromRequest);
//     if (!user || !user.id) {
//       throw new UnauthorizedException('Invalid Token');
//     }
//     const userData = await this.userRepository.findOne({
//       id: user.id,
//     });
//     if (!userData) {
//       throw new UnauthorizedException('User not found');
//     }
//     const loginInfo = userData.logged_users;
//     const isExist = loginInfo.some(
//       (item: any) => item.token === tokenFromRequest,
//     );
//     return isExist ? true : false;
//   }
}
