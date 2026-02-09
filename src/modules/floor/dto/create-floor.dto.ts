import { IsNotEmpty, IsInt, IsString } from 'class-validator';

export class CreateFloorDto {
  @IsInt()
  @IsNotEmpty()
  buildingId: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}
