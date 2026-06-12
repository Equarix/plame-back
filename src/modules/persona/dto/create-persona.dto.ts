import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { CreateDireccionDto } from '../../../common/dto/ubigeo.dto';

export class CreatePersonaDto {
  @IsString()
  @IsNotEmpty()
  dni: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fechaNacimiento: Date;

  @IsString()
  @IsNotEmpty()
  sexo: string;

  @IsString()
  @IsNotEmpty()
  estadoCivil: string;

  @IsString()
  @IsNotEmpty()
  nacionalidad: string;

  @ValidateNested()
  @IsNotEmpty()
  @Type(() => CreateDireccionDto)
  direccion: CreateDireccionDto;

  @IsString()
  @IsNotEmpty()
  nombres: string;

  @IsString()
  @IsNotEmpty()
  apellidoPaterno: string;

  @IsString()
  @IsNotEmpty()
  apellidoMaterno: string;
}
