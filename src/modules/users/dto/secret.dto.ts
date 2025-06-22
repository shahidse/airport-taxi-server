import { ApiProperty } from '@nestjs/swagger';

export class GetSecretDto {
  @ApiProperty({
    type: String,
    description: 'The secret key or value that needs to be processed.',
    example: 'super_user',
  })
  secret: string;
}
