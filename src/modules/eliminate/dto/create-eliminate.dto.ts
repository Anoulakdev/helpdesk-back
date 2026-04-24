import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateEliminateDto {
  @IsInt()
  @IsNotEmpty()
  helpdeskRequestId: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsString()
  @IsOptional()
  eliminatefile?: string;

  @IsInt()
  @IsNotEmpty()
  createdById: number;
}
