import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  constructor(private readonly configService: ConfigService) {}

  getStripeInstance() {
    const apiVersion: any = this.configService.get<string>('stripe.apiVersion');
    const stripe = new Stripe(
      this.configService.get<string>('stripe.secretKey')!,
      {
        apiVersion,
      },
    );
    return stripe;
  }

  async createPaymentIntent(amount: number, email: string) {
    const intent = await this.getStripeInstance().paymentIntents.create({
      amount,
      currency: 'usd',
      receipt_email: email,
    });
    return { clientSecret: intent.client_secret };
  }
}
