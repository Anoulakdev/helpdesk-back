import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateBrandDto {
  @IsInt()
  @IsNotEmpty()
  typeDeviceId: number;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  @IsNotEmpty()
  createdById: number;
}
