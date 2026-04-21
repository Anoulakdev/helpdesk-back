import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateTypedeviceDto {
  @IsInt()
  @IsNotEmpty()
  headCategoryId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  createdById: number;
}
