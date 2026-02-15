import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoryiconDto {
  @IsString()
  @IsNotEmpty()
  catIcon: string;
}
