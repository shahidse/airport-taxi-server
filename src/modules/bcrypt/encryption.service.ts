import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

@Injectable()
export class EncryptionService {
  constructor(private configService: ConfigService) {
    const secret = this.configService.get('app.encryptionKey');
    this.key = crypto.createHash('sha256').update(String(secret)).digest('base64').substr(0, 32);
    this.iv = crypto.randomBytes(16);
  }
  private readonly algorithm = 'aes-256-cbc'; // AES algorithm
  private readonly key: string;
  private readonly iv: Buffer; // Initialization vector for encryption

  // Encrypt function
  encrypt(text: string): string {
    const cipher = crypto.createCipheriv(
      this.algorithm,
      Buffer.from(this.key),
      this.iv,
    );
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return `${this.iv.toString('hex')}:${encrypted}`;
  }

  // Decrypt function
  decrypt(encryptedText: string): string {
    const [ivString, encrypted] = encryptedText.split(':');
    const iv = Buffer.from(ivString, 'hex');
    const decipher = crypto.createDecipheriv(
      this.algorithm,
      Buffer.from(this.key),
      iv,
    );
    let decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
