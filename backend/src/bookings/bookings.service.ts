// backend/src/bookings/bookings.service.ts
import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import Stripe from 'stripe';

@Injectable()
export class BookingsService {
  private stripe: Stripe;

  constructor(private prisma: PrismaService) {
    // Stripe тохиргоо (TypeScript алдааг тоохгүй байх 'as any' тохиргоотой)
    this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
      apiVersion: '2024-11-20.acacia' as any,
    });
  }

  // 1. Захиалга үүсгэх
  async create(createBookingDto: CreateBookingDto) {
    const newStart = new Date(createBookingDto.startTime);
    const newEnd = new Date(createBookingDto.endTime);

    // Давхардал шалгах
    const overlap = await this.prisma.booking.findFirst({
      where: {
        staffId: 1,
        OR: [{ startTime: { lt: newEnd }, endTime: { gt: newStart } }],
        NOT: { status: 'CANCELLED' },
      },
    });

    if (overlap) {
      throw new BadRequestException(
        'Уучлаарай, энэ цаг дээр аль хэдийн захиалгатай байна!',
      );
    }

    // Үйлчилгээг хайх
    const service = await this.prisma.service.findUnique({
      where: { id: createBookingDto.serviceId },
    });

    if (!service) throw new BadRequestException('Үйлчилгээ олдсонгүй');

    // --- FIX: Ажилтан болон Хэрэглэгч байгаа эсэхийг шалгах (Auto-Seed) ---
    // 1. Ажилтан (Staff) шалгах, байхгүй бол үүсгэх
    let staff = await this.prisma.staff.findUnique({ where: { id: 1 } });
    if (!staff) {
      staff = await this.prisma.staff.create({
        data: { id: 1, name: 'Самбуу (Default)' },
      });
    }

    // 2. Хэрэглэгч (User) шалгах, байхгүй бол түр үүсгэх (Туршилтын журмаар)
    let user = await this.prisma.user.findUnique({ where: { id: 1 } });
    if (!user) {
      // Ийм тохиолдол гарах ёсгүй (Login хийсэн үед), гэхдээ аюулгүй байдлын үүднээс:
      const hashedPassword = await import('bcrypt').then(m => m.hash('password123', 10));
      user = await this.prisma.user.create({
        data: {
          id: 1,
          email: 'test@example.com',
          password: hashedPassword,
          name: 'Test User',
        },
      });
    }
    // -----------------------------------------------------------------------

    // PENDING захиалга үүсгэх
    const booking = await this.prisma.booking.create({
      data: {
        startTime: newStart,
        endTime: newEnd,
        user: { connect: { id: user.id } },  // Олдсон эсвэл үүсгэсэн ID-г ашиглана
        staff: { connect: { id: staff.id } }, // Олдсон эсвэл үүсгэсэн ID-г ашиглана
        service: { connect: { id: service.id } },
        status: 'PENDING',
      },
    });

    // Stripe Checkout Session үүсгэх
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'jpy',
              product_data: { name: service.name },
              unit_amount: service.price,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/success?booking_id=${booking.id}`,
        cancel_url: `${process.env.FRONTEND_URL}/`,
      });

      return { url: session.url };
    } catch (error: any) {
      console.error('Stripe Error:', error.message); // Алдаа гарвал Terminal дээр харуулна
      throw new BadRequestException(
        'Төлбөрийн системд алдаа гарлаа: ' + error.message,
      );
    }
  }

  // Бусад функцууд
  findAll() {
    return this.prisma.booking.findMany({
      include: { user: true, staff: true, service: true },
      orderBy: { startTime: 'desc' },
    });
  }
  findOne(id: number) {
    return this.prisma.booking.findUnique({
      where: { id },
      include: { user: true, service: true },
    });
  }
  update(id: number, updateBookingDto: UpdateBookingDto) {
    return this.prisma.booking.update({
      where: { id },
      data: {
        ...(updateBookingDto.startTime && {
          startTime: new Date(updateBookingDto.startTime),
        }),
        ...(updateBookingDto.endTime && {
          endTime: new Date(updateBookingDto.endTime),
        }),
        status: updateBookingDto.status,
      },
    });
  }
  remove(id: number) {
    return this.prisma.booking.delete({ where: { id } });
  }
}
