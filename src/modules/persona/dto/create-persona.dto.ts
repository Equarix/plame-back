import { Type } from 'class-transformer';
import { IsDate, IsNotEmpty, IsString } from 'class-validator';

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

  @IsString()
  @IsNotEmpty()
  primeraDireccion: string;

  @IsString()
  @IsNotEmpty()
  segundaDireccion: string;

  @IsString()
  @IsNotEmpty()
  telefono: string;
  email: string;
}
