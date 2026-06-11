import { PartialType } from '@nestjs/mapped-types';
import { CreateEntidadBancariaDto } from './create-entidad-bancaria.dto';

export class UpdateEntidadBancariaDto extends PartialType(CreateEntidadBancariaDto) {}
