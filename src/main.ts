import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as expressBasicAuth from 'express-basic-auth';
import { AppModule } from './app.module';
import { setupSwagger } from './util/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));  
  app.use(
    ['/docs', '/docs-json'],
    expressBasicAuth({
      challenge: true,
      users: {
        [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
      },
    }),
  );
  setupSwagger(app);
  

  await app.listen(3000);
}
bootstrap();
