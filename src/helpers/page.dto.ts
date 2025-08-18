import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';
export class PageDataDto {
  @ApiPropertyOptional()
  @IsNumber()
  //   @IsOptional()
  @Type(() => Number)
  page: number;

  @ApiPropertyOptional()
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  dataPerPage: number = 10;
}
