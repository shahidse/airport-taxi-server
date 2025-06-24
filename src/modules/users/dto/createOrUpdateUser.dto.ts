import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsInt,
  IsOptional,
  MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsUnique } from 'src/decorators/isUnique.decorator';

export class CreateUserDto {
  @ApiProperty({ example: 'John Doe', description: 'Full name of the user' })
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  fullName: string;

  @ApiPropertyOptional({ example: 25, description: 'Age of the user' })
  @IsOptional()
  @IsInt()
  age?: number;

  @ApiProperty({
    example: 'johndoe@example.com',
    description: 'Unique email address',
  })
  @IsEmail()
  @IsUnique({ tableName: 'users', column: 'email' })
  @MinLength(3)
  email: string;

  @ApiPropertyOptional({ example: '+1234567890', description: 'Phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'SecurePassword123!', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiPropertyOptional({ example: '1998-05-15', description: 'Date of birth' })
  @IsOptional()
  @IsString()
  dob?: string;

  @ApiPropertyOptional({
    example: 'profile-pic.jpg',
    description: 'Profile picture URL',
  })
  @IsOptional()
  @IsString()
  profilePic?: string;

  @ApiProperty({ example: 'john_doe', description: 'Unique username' })
  @IsString()
  @IsUnique({ tableName: 'users', column: 'userName' })
  userName: string;

  @ApiPropertyOptional({
    example: '0000',
    description: 'Street address of the user',
  })
  @IsOptional()
  @IsString()
  address?: string;
  @ApiPropertyOptional({
    example: 'New York',
    description: 'City of the user',
  })
  @IsOptional()
  @IsString()
  city?: string;
  @ApiPropertyOptional({
    example: 'NY',
    description: 'State of the user',
  })
  @IsOptional()
  @IsString()
  state?: string;
  @ApiPropertyOptional({
    example: '10001',
    description: 'Postal code of the user',
  })
  @IsOptional()
  @IsString()
  postalCode?: string;
  @ApiPropertyOptional({
    example: 'USA',
    description: 'Country of the user',
  })
  @IsOptional()
  @IsString()
  country?: string;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
export class LoginDto {
  @ApiProperty({
    example: 'user@example.com',
    description: 'Email, Username, or Phone',
  })
  @IsString()
  @MinLength(3)
  email: string;
  @ApiProperty({ example: 'SecurePassword123!', description: 'User password' })
  @IsString()
  password: string;
}
