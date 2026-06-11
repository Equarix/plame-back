import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CreateSituacionesAcademicaDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsBoolean()
  @IsNotEmpty()
  requiereEstudios: boolean;
}
