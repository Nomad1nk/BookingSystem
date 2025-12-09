import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateAuthDto } from './dto/create-auth.dto'; // Login DTO
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  // 1. БҮРТГҮҮЛЭХ (Register)
  async signup(dto: CreateAuthDto) {
    // Имэйл давхардсан эсэхийг шалгах
    const exists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (exists) throw new BadRequestException('Энэ имэйл бүртгэлтэй байна.');

    // Нууц үгийг нууцлах (Hashing)
    const hashedPassword = await bcrypt.hash(dto.password, 10);

    // Хэрэглэгч үүсгэх
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,
      },
    });

    return this.generateToken(user.id, user.email, user.name);
  }

  // 2. НЭВТРЭХ (Login)
  async signin(dto: CreateAuthDto) {
    // Хэрэглэгч хайх
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user)
      throw new UnauthorizedException('Имэйл эсвэл нууц үг буруу байна.');

    // Нууц үг таарах эсэхийг шалгах
    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch)
      throw new UnauthorizedException('Имэйл эсвэл нууц үг буруу байна.');

    return this.generateToken(user.id, user.email, user.name);
  }

  // Token үүсгэдэг туслах функц
  private async generateToken(userId: number, email: string, name: string) {
    const payload = { sub: userId, email, name }; // Token дотор нуух мэдээлэл
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: { id: userId, name, email }, // Frontend-д хэрэг болно
    };
  }
}
