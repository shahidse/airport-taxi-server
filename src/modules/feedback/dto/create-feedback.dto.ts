import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsInt,
  Min,
  Max,
  IsOptional,
  IsString,
  IsBoolean,
} from 'class-validator';

export class CreateFeedbackDto {
  @ApiProperty({
    description: 'ID of the order the feedback is for',
    example: 123,
  })
  @IsInt()
  orderId: number;

  @ApiPropertyOptional({
    description:
      'ID of the user giving the feedback (optional, can be anonymous)',
    example: 456,
  })
  @IsOptional()
  @IsInt()
  userId?: number;

  @ApiProperty({
    description: 'Rating from 1 to 5',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;

  @ApiPropertyOptional({
    description: 'Optional comment',
    example: 'Great service!',
  })
  @IsOptional()
  @IsString()
  comment?: string;

  @ApiPropertyOptional({
    description: 'Whether this feedback should be public',
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  isPublic?: boolean;
}
