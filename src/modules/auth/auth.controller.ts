import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { Auth } from '../../common/decorator/auth/auth.decorator';
import { RegisterDto } from './dto/register.dto';
import { Role } from '../../generated/prisma/enums';
import { QueryDto } from '../../common/dto/query.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('login-admin')
  async loginAdmin(@Body() loginDto: LoginDto) {
    return this.authService.loginAdmin(loginDto);
  }

  @Auth([Role.ADMIN])
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Auth([Role.ADMIN])
  @Get('all-users')
  async getAllUsers(@Query() query: QueryDto) {
    return this.authService.getAllUsers(query);
  }

  @Auth([Role.ADMIN])
  @Delete('delete-user/:id')
  async deleteUser(@Param('id') id: number) {
    return this.authService.deleteUser(id);
  }

  @Auth()
  @Patch('edit/:id')
  async updateUser(@Param('id') id: number, @Body() updateData: RegisterDto) {
    return this.authService.updateUser(id, updateData);
  }

  @Auth()
  @Get('validate')
  validateToken() {
    return this.authService.validateToken();
  }

  @Auth([Role.ADMIN])
  @Get('validate/admin')
  validateAdminToken() {
    return this.authService.validateToken();
  }
}
