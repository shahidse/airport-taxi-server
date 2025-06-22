import { Test, TestingModule } from '@nestjs/testing'
import { AuthService } from './auth.service'
import { AuthModule } from './auth.module'
import { ConfigModule } from '../../config/config.module'

describe('AuthService', () => {
    let service: AuthService

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule, AuthModule],
        }).compile()

        service = module.get<AuthService>(AuthService)
    })

    it('should be defined', () => {
        expect(service).toBeDefined()
    })
    it('should return jwtOptions', () => {
        const options = service.signOptions()
        expect(options).toMatchObject({
            audience: expect.arrayContaining([]),
            issuer: expect.any(String),
        })
    })
    it('should return jwt token', async () => {
        const token = await service.createJwtToken({
            id: 1234,
            username: 'sample',
        })
        expect(typeof token).toBe('string')
    })
})
