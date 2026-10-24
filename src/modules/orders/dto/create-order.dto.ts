import { IsString, IsEnum, IsBoolean, IsOptional, IsNumber } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiPropertyOptional({ example: 'ATX-2026-X94B', description: 'Booking reference code' })
  @IsOptional()
  @IsString()
  bookingReference?: string;

  @ApiProperty({
    type: 'number',
    example: 1,
    description: 'Reference to an existing Quote record',
  })
  @IsOptional()
  @IsNumber()
  quoteId?: number;

  @ApiProperty({
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'pending',
  })
  @IsEnum(['pending', 'confirmed', 'completed', 'cancelled'])
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';

  @ApiProperty({
    enum: ['cash', 'card', 'stripe'],
    default: 'cash',
  })
  @IsEnum(['cash', 'card', 'stripe'])
  paymentMethod: 'cash' | 'card' | 'stripe';

  @ApiProperty({ default: false, description: 'Whether payment is completed' })
  @IsBoolean()
  isPaid: boolean;

  @ApiPropertyOptional({ description: 'Payment transaction ID' })
  @IsOptional()
  @IsString()
  transactionId?: string;

  @ApiPropertyOptional({ description: 'Name of the contact person' })
  @IsOptional()
  @IsString()
  contactName?: string;

  @ApiPropertyOptional({ description: 'Phone number of the contact person' })
  @IsOptional()
  @IsString()
  contactPhone?: string;

  @ApiPropertyOptional({ description: 'Email of the contact person' })
  @IsOptional()
  @IsString()
  contactEmail?: string;
}
