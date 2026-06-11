import { IsNotEmpty, IsString } from 'class-validator';

export class TEmpresaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  ruc: string;

  @IsString()
  @IsNotEmpty()
  address: string;
}
