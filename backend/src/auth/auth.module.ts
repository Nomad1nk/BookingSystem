import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '../prisma.service'; // PrismaService нэмнэ
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true, // Программ даяар ашиглана
      secret: 'super-secret-key', // Бодит төсөл дээр .env дотор байх ёстой!
      signOptions: { expiresIn: '1d' }, // Token 1 өдөр хүчинтэй
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, PrismaService], // PrismaService-ээ мартав аа
})
export class AuthModule {}
