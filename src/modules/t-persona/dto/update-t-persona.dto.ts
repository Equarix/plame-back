import { PartialType } from '@nestjs/mapped-types';
import { CreateTPersonaDto } from './create-t-persona.dto';

export class UpdateTPersonaDto extends PartialType(CreateTPersonaDto) {}
