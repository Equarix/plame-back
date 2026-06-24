import {
  IsArray,
  IsBoolean,
  IsDate,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import {
  CategoriaPersona,
  FormacionCompleta,
  JornadaLaboral,
  Pensiones,
  PeriodoIngreso,
  RegimenLaboral,
  RegimenPensionario,
  RegimenSalud,
  Salud,
  TipoContrato,
  TipoEducacion,
  TipoPago,
  TipoTrabajador,
} from '../../../generated/prisma/enums';
import { Type } from 'class-transformer';

export class EstudiosDto {
  @IsEnum(FormacionCompleta)
  @IsNotEmpty()
  formacionCompleta: FormacionCompleta;

  @IsBoolean()
  @IsNotEmpty()
  estudioPeru: boolean;

  @IsBoolean()
  @IsNotEmpty()
  privado: boolean;

  @IsEnum(TipoEducacion)
  @IsNotEmpty()
  tipoEducacion: TipoEducacion;

  @IsString()
  @IsNotEmpty()
  nombreInstitucion: string;

  @IsString()
  @IsNotEmpty()
  nombreCarrera: string;

  @IsNumber()
  @IsNotEmpty()
  añoEgreso: number;
}

export class CreateTPersonaDto {
  @IsNumber()
  @IsNotEmpty()
  personaId: number;

  @IsEnum(CategoriaPersona)
  @IsNotEmpty()
  categoria: CategoriaPersona;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  periodoInicio: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  periodoFin?: Date;

  @IsString()
  @IsOptional()
  motivoBaja?: string;

  @IsEnum(TipoTrabajador)
  @IsNotEmpty()
  tipoTrabajador: TipoTrabajador;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fechaIngreso: Date;

  @IsString()
  @IsOptional()
  motivoBajaTrabajador?: string;

  @IsEnum(RegimenLaboral)
  @IsNotEmpty()
  regimenLaboral: RegimenLaboral;

  @IsString()
  @IsOptional()
  otroRegimenLaboral?: string;

  @IsNumber()
  @IsNotEmpty()
  ocupacionId: number;

  @IsEnum(TipoContrato)
  @IsNotEmpty()
  tipoContrato: TipoContrato;

  @IsString()
  @IsOptional()
  otroTipoContrato?: string;

  @IsEnum(TipoPago)
  @IsNotEmpty()
  tipoPago: TipoPago;

  @IsString()
  @IsOptional()
  otroTipoPago?: string;

  @IsNumber()
  @IsNotEmpty()
  entidadId: number;

  @IsString()
  @IsOptional()
  cuentaBancaria?: string;

  @IsNumber()
  @IsNotEmpty()
  montoRemuneracionInicial: number;

  @IsEnum(RegimenSalud)
  @IsNotEmpty()
  regimenSalud: RegimenSalud;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fechaInicioSalud: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fechaFinSalud?: Date;

  @IsEnum(RegimenPensionario)
  @IsNotEmpty()
  regimenPensionario: RegimenPensionario;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fechaInicioPensionario: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fechaFinPensionario?: Date;

  @IsString()
  @IsOptional()
  CUSPP?: string;

  @IsBoolean()
  @IsNotEmpty()
  sctr: boolean;

  @IsNumber()
  @IsNotEmpty()
  situacionEducativaId: number;

  @IsArray()
  @IsNotEmpty({ each: true })
  @Type(() => EstudiosDto)
  estudios: EstudiosDto[];

  @IsBoolean()
  @IsNotEmpty()
  quintaCategoriaExonerada: boolean;

  @IsBoolean()
  @IsNotEmpty()
  evitaDobleImposicion: boolean;

  @IsNumber()
  @IsNotEmpty()
  tEmpresaCompanyId: number;

  @IsEnum(PeriodoIngreso)
  @IsNotEmpty()
  periodoIngreso: PeriodoIngreso;

  @IsString()
  @IsOptional()
  otroPeriodoIngreso?: string;

  @IsDate()
  @IsNotEmpty()
  @Type(() => Date)
  fechaInicio: Date;

  @IsString()
  @IsNotEmpty()
  telefono: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  codlocal: string;

  @IsEnum(JornadaLaboral)
  jornadaLaboral: JornadaLaboral;

  @IsString()
  @IsOptional()
  situacionEspecial?: string;

  @IsBoolean()
  discapacidad: boolean;

  @IsBoolean()
  sindicalizado: boolean;

  @IsEnum(Pensiones)
  @IsOptional()
  pension?: Pensiones;

  @IsEnum(Salud)
  @IsOptional()
  salud?: Salud;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fechaInicioSaludPension?: Date;

  @IsDate()
  @IsOptional()
  @Type(() => Date)
  fechaFinSaludPension?: Date;

  @IsString()
  @IsOptional()
  categoriaOcupacional?: string;
}
