import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { LoginDto } from './dto/login.dto';
import { compare, hash } from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { QueryDto } from '../../common/dto/query.dto';
import { Metadata } from '../../common/interface/types';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async onModuleInit() {
    const findUser = await this.prisma.user.findFirst({
      where: {
        username: 'admin',
      },
    });

    if (!findUser) {
      const passwordHash = await hash('admin', 10);

      await this.prisma.user.create({
        data: {
          username: 'admin',
          password: passwordHash,
          lastName: 'Admin',
          role: 'ADMIN',
          name: 'Admin',
        },
      });
      console.log('Admin user created:');
    }
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;
    const user = await this.prisma.user.findFirst({
      where: { username, status: true },
    });

    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }

    const isPasswordValid = await compare(password, user.password);

    if (!isPasswordValid) {
      throw new NotFoundException('Invalid credentials');
    }

    const payload = {
      userId: user.userId,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return {
      token,
      data: user,
    };
  }

  async register(registerDto: RegisterDto) {
    const { username, password, role, lastName, name } = registerDto;

    const existingUser = await this.prisma.user.findFirst({
      where: { username },
    });

    if (existingUser) {
      throw new NotFoundException('Username already exists');
    }

    const passwordHash = await hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        username,
        password: passwordHash,
        role,
        lastName,
        name,
      },
    });

    return newUser;
  }

  async getAllUsers(query: QueryDto) {
    const { page, limit } = query;

    const skip = (page - 1) * limit;

    const [users, count] = await this.prisma.$transaction([
      this.prisma.user.findMany({
        skip,
        take: limit,
      }),
      this.prisma.user.count(),
    ]);

    const totalPages = Math.ceil(count / limit);

    const metadata: Metadata = {
      totalItems: count,
      itemCount: users.length,
      totalPages,
      currentPage: page,
    };

    return {
      data: users,
      metadata,
    };
  }

  async deleteUser(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { userId: id },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return this.prisma.user.update({
      where: { userId: id },
      data: { status: false },
    });
  }

  async updateUser(id: number, updateData: RegisterDto) {
    const user = await this.prisma.user.findUnique({
      where: { userId: id, status: true },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { username, password, role, lastName, name } = updateData;
    const passwordHash = await hash(password, 10);

    return this.prisma.user.update({
      where: { userId: id },
      data: {
        username,
        password: passwordHash,
        role,
        lastName,
        name,
      },
    });
  }
}
