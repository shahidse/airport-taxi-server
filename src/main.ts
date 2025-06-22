import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CatchEverythingFilter } from './exception/filter';
import { RequestMethod, ValidationPipe, VersioningType } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: '*',
    },
  });
  const httpAdapterHost = app.get(HttpAdapterHost);
  app.useGlobalFilters(new CatchEverythingFilter(httpAdapterHost));
  app.enableVersioning({
    type: VersioningType.URI,
  });
  app.setGlobalPrefix('api', {
    exclude: [{ path: '/', method: RequestMethod.GET }],
  });
  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  const config = new DocumentBuilder()
    .setTitle('AirTaxi Api')
    .setDescription('API for AirTaxi 1.0')
    .setVersion('1.0')
    .addTag('api')
    .addBearerAuth()
    .build();
  const configuration: any = app.get(ConfigService);
  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, documentFactory);
  await app.listen(configuration.get('app.port'));
}
bootstrap();
