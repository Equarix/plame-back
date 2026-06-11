import { IsOptional, IsString } from 'class-validator';

export class QueryFindDto {
  @IsString()
  @IsOptional()
  str: string;
}
