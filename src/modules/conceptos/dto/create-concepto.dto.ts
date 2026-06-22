import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { SubConcepto, TipoConcepto } from '../../../generated/prisma/enums';

export class CreateConceptoDto {
  @IsString()
  @IsNotEmpty()
  nombre: string;

  @IsString()
  @IsNotEmpty()
  codigo: string;

  @IsEnum(TipoConcepto)
  @IsNotEmpty()
  tipo: TipoConcepto;

  @IsEnum(SubConcepto)
  @IsOptional()
  subConcepto?: SubConcepto;

  @IsNumber()
  @IsOptional()
  porcentaje?: number;
}
