import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTurningDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
