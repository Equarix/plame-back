import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

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


  @IsArray()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  conceptos: number[];
}
