import { PartialType } from '@nestjs/mapped-types';
import { CreateSituacionesAcademicaDto } from './create-situaciones-academica.dto';

export class UpdateSituacionesAcademicaDto extends PartialType(CreateSituacionesAcademicaDto) {}
