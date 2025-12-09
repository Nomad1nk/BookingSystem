// src/services/services.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service'; // Prisma-г оруулж ирнэ
import { CreateServiceDto } from './dto/create-service.dto';
import { UpdateServiceDto } from './dto/update-service.dto';

@Injectable()
export class ServicesService {
  // Prisma-г ашиглахад бэлдэх
  constructor(private prisma: PrismaService) { }

  // 1. Шинэ үйлчилгээ бүртгэх (CREATE)
  create(createServiceDto: CreateServiceDto) {
    return this.prisma.service.create({
      data: createServiceDto,
    });
  }

  // 2. Бүх үйлчилгээг жагсааж харах (READ)
  findAll() {
    return this.prisma.service.findMany();
  }

  // Нэг үйлчилгээг ID-аар нь харах
  findOne(id: number) {
    return this.prisma.service.findUnique({
      where: { id },
    });
  }

  // Засварлах
  update(id: number, updateServiceDto: UpdateServiceDto) {
    return this.prisma.service.update({
      where: { id },
      data: updateServiceDto,
    });
  }

  // Устгах
  remove(id: number) {
    return this.prisma.service.delete({
      where: { id },
    });
  }
}