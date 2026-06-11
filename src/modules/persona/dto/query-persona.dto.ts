import { IsOptional, IsString } from 'class-validator';
import { QueryDto } from '../../../common/dto/query.dto';

export class QueryPersonaDto extends QueryDto {
  @IsString()
  @IsOptional()
  dni: string;
}
