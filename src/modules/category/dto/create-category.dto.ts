import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateCategoryDto {
  @IsInt()
  @IsNotEmpty()
  headCategoryId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsOptional()
  catIconId?: number;

  @IsInt()
  @IsNotEmpty()
  createdById: number;
}
