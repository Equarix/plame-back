import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEntidadBancariaDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
