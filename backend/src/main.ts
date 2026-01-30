// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS тохиргоо: 3000 портыг (Frontend) зөвшөөрнө
  app.enableCors({
    origin: 'http://localhost:3000', // Frontend хаяг
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
