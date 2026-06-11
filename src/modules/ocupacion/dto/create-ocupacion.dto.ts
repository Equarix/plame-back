import { IsNotEmpty, IsString } from 'class-validator';

export class CreateOcupacionDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
