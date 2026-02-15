import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';

export class CreateTicketDto {
  @IsInt()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @IsNotEmpty()
  createdById: number;
}
