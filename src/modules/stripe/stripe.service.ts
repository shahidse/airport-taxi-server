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
    // Ensure amount is in cents and at least 50 cents (Stripe min charge)
    const amountInCents = Math.max(50, Math.round(Number(amount || 10) * 100));
    const intent = await this.getStripeInstance().paymentIntents.create({
      amount: amountInCents,
      currency: 'usd',
      receipt_email: email || undefined,
    });
    return { clientSecret: intent.client_secret, amountInCents };
  }
}
