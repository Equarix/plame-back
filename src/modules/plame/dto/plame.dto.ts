import { IsString, IsInt, IsBoolean, IsOptional, IsNumber, IsArray } from 'class-validator';

export class SyncPlameDto {
  @IsInt()
  companyId: number;

  @IsString()
  periodo: string; // e.g. "06/2026"
}

export class IngresoDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsNumber()
  devengado: number;

  @IsNumber()
  pagado: number;
}

export class DescuentoDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsNumber()
  monto: number;
}

export class TributoDto {
  @IsString()
  code: string;

  @IsString()
  name: string;

  @IsNumber()
  base: number;

  @IsNumber()
  monto: number;
}

export class UpdatePlameDetalleDto {
  @IsOptional()
  @IsInt()
  diasLaborados?: number;

  @IsOptional()
  @IsInt()
  diasSubsidiados?: number;

  @IsOptional()
  @IsInt()
  diasNoLaborados?: number;

  @IsOptional()
  @IsString()
  horasOrdinarias?: string;

  @IsOptional()
  @IsString()
  horasSobretiempo?: string;

  @IsOptional()
  @IsArray()
  ingresos?: IngresoDto[];

  @IsOptional()
  @IsArray()
  descuentos?: DescuentoDto[];

  @IsOptional()
  @IsArray()
  tributos?: TributoDto[];
}

export class UpdatePlameDeclaracionDto {
  @IsOptional()
  @IsBoolean()
  sustitutoria?: boolean;

  @IsOptional()
  @IsString()
  numeroOrden?: string;

  @IsOptional()
  @IsString()
  estado?: string;

  @IsOptional()
  @IsNumber()
  totalNetoAPagar?: number;

  @IsOptional()
  @IsNumber()
  creditoEps602?: number;

  @IsOptional()
  @IsNumber()
  creditoEps612?: number;

  @IsOptional()
  @IsNumber()
  otrasDeducciones605?: number;

  @IsOptional()
  @IsNumber()
  pagosPreviosSNP?: number;

  @IsOptional()
  @IsNumber()
  pagosPreviosEsSalud?: number;

  @IsOptional()
  @IsNumber()
  pagosPreviosRenta?: number;

  @IsOptional()
  @IsNumber()
  interesSNP?: number;

  @IsOptional()
  @IsNumber()
  interesEsSalud?: number;

  @IsOptional()
  @IsNumber()
  interesRenta?: number;

  @IsOptional()
  @IsNumber()
  importePagarSNP?: number;

  @IsOptional()
  @IsNumber()
  importePagarEsSalud?: number;

  @IsOptional()
  @IsNumber()
  importePagarRenta?: number;

  @IsOptional()
  @IsString()
  formaPago?: string;

  @IsOptional()
  @IsString()
  banco?: string;

  @IsOptional()
  @IsString()
  numeroCheque?: string;
}
