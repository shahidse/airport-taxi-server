import { IsString, IsEnum, IsBoolean, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ example: 'ABC123XYZ', description: 'Booking reference code' })
  @IsString()
  bookingReference: string;

  @ApiProperty({
    type: 'number',
    example: '15216',
    description: 'Reference to an existing Quote record',
  })
  quoteId: number;

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
