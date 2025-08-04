import { Controller, Post, Body } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { ApiEndpoint } from 'src/swagger/docs';
import {
  Permissions,
  Roles as RolesGuard,
} from '../../decorators/decorators.decorator';
import { PermissionsTypes, Roles } from '../../constants/role.enum';

class CreatePaymentIntentDto {
  email: string;
  amount: number;
}
@Controller({ path: 'stripe', version: '1' })
export class StripeController {
  constructor(private readonly stripeService: StripeService) {}
  @ApiEndpoint({
    summary: 'Create Payment Intent',
    description: 'Create a payment intent for processing payments',
    tags: ['Quotes'],
    bodyType: CreatePaymentIntentDto,
    responses: [{ status: 201, description: 'Payment Created' }],
    authRequired: true,
  })
  @RolesGuard(Roles.USER)
  @Permissions(PermissionsTypes.WRITE)
  @Post('create-payment-intent')
  async create(@Body() body: { email: string; amount: number }) {
    return this.stripeService.createPaymentIntent(body.amount, body.email);
  }
}
