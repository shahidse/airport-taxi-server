// bcrypt.service.ts
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class BcryptService {
  private readonly saltRounds = 10;

  hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }

  comparePasswords(plainPassword: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, hashedPassword);
  }

  generatePassword() {
    const plainPassword = this.generateUserPassword();
    const password = this.hashPassword(plainPassword);

    return { plainPassword, password };
  }
  validatePassword(password: string): boolean {
    // Password must be at least 8 characters long
    // Must contain at least one uppercase letter
    // Must contain at least one lowercase letter
    // Must contain at least one special character
    // Must contain at least one number
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  }

  private generateUserPassword(length = 10) {
    const charset =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?';

    // Ensure that password contains at least one character from each category
    const passwordComponents = [
      charset.charAt(Math.floor(Math.random() * 26)), // Uppercase
      charset.charAt(Math.floor(Math.random() * 26) + 26), // Lowercase
      charset.charAt(Math.floor(Math.random() * 10) + 52), // Digits
      charset.charAt(Math.floor(Math.random() * 32) + 62), // Special characters
    ];

    // Fill the rest of the password with random characters from the charset
    for (let i = passwordComponents.length; i < length; i++) {
      passwordComponents.push(
        charset.charAt(Math.floor(Math.random() * charset.length)),
      );
    }

    // Shuffle the array to randomize the order of the characters
    return passwordComponents.sort(() => Math.random() - 0.5).join('');
  }
}
