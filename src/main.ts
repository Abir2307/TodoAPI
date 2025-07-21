import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
  origin: 'https://todo-client-lovat.vercel.app',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  });
  await app.listen(process.env.PORT || 3001);
}
bootstrap();
