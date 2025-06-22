import { Test, TestingModule } from '@nestjs/testing'
import { BcryptService } from './bcrypt.service'

describe('BcryptService', () => {
    let service: BcryptService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [BcryptService],
        }).compile()

        service = module.get<BcryptService>(BcryptService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
    it('should return hash password and compare it', () => {
        const hash = service.hashPassword('admin123')
        expect(typeof hash).toBe('string')
        const compare = service.comparePasswords('admin123', hash)
        expect(compare).toBe(true)
    })
})
