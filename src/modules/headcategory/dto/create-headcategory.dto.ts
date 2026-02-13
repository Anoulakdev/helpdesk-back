import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateHeadcategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty()
  departmentId: number;

  @IsInt()
  @IsNotEmpty()
  divisionId: number;
}
