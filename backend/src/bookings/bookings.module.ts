import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { PrismaService } from '../prisma.service'; // <--- 1. ЭНИЙГ НЭМНЭ

@Module({
  controllers: [BookingsController],
  providers: [BookingsService, PrismaService], // <--- 2. ЭНД БАС НЭМНЭ
})
export class BookingsModule {}
