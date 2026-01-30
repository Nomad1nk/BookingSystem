// backend/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // CORS тохиргоо: Vercel болон Localhost-ийг зөвшөөрнө
  app.enableCors({
    origin: true, // Бүх хаягаас хандахыг зөвшөөрнө (Production дээр URL-аа тодорхой бичих нь дээр)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  await app.listen(3001);
}
bootstrap();
