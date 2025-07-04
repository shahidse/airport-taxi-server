import {
  IsString,
  IsInt,
  IsDateString,
  IsBoolean,
  IsOptional,
  IsNumber,
} from 'class-validator';

export class CreateQuoteDto {
  @IsString()
  pickupLocation: string;

  @IsString()
  dropoffLocation: string;

  @IsDateString()
  pickupDateTime: Date;

  @IsInt()
  passengers: number;

  @IsString()
  vehicleType: string;

  @IsNumber()
  estimatedFare: number;

  @IsBoolean()
  isRoundTrip: boolean;

  @IsOptional()
  @IsDateString()
  returnDateTime?: Date;

  @IsOptional()
  @IsString()
  flightNumber?: string;

  @IsOptional()
  @IsString()
  specialInstructions?: string;
}
