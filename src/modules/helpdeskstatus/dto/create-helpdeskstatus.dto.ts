import { IsNotEmpty, IsString } from 'class-validator';

export class CreateHelpdeskstatusDto {
  @IsString()
  @IsNotEmpty()
  name: string;
}
