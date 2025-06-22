import { Global, Module } from '@nestjs/common'
import { BcryptService } from './bcrypt.service'
import { EncryptionService } from './encryption.service'
@Global()
@Module({
    providers: [BcryptService, EncryptionService],
    exports: [BcryptService, EncryptionService],
})
export class BcryptModule {}
