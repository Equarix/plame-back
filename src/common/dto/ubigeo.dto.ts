import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { TipoVia, TipoZona } from '../../generated/prisma/enums';

export class CreateDireccionDto {
  @IsNumber()
  personaId: number;

  @IsNumber()
  departamentoId: number;

  @IsNumber()
  provinciaId: number;

  @IsNumber()
  distritoId: number;

  tipoVia: TipoVia;

  @IsString()
  nombreVia: string;

  @IsString()
  numero: string;

  @IsOptional()
  @IsString()
  dpto?: string;

  @IsOptional()
  @IsString()
  interior?: string;

  @IsOptional()
  @IsString()
  manzana?: string;

  @IsOptional()
  @IsString()
  lote?: string;

  @IsOptional()
  @IsString()
  block?: string;

  @IsOptional()
  @IsString()
  etapa?: string;

  tipoZona: TipoZona;

  @IsString()
  nombreZona: string;

  @IsOptional()
  @IsString()
  referencia?: string;

  @IsOptional()
  @IsBoolean()
  refiereEssalud?: boolean;
}
