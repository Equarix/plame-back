import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../../../generated/prisma/enums';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  username: string;
  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(Role)
  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;
}
