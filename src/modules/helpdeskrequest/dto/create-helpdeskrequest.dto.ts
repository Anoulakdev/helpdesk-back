import {
  IsNotEmpty,
  IsInt,
  IsString,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateHelpdeskrequestDto {
  @IsInt()
  @IsNotEmpty()
  ticketId: number;

  @IsInt()
  @IsOptional()
  helpdeskStatusId?: number;

  @IsInt()
  @IsNotEmpty()
  buildingId: number;

  @IsInt()
  @IsNotEmpty()
  floorId: number;

  @IsInt()
  @IsNotEmpty()
  turningId: number;

  @IsString()
  @IsOptional()
  room?: string;

  @IsString()
  @IsNotEmpty()
  numberSKT: string;

  @IsString()
  @IsNotEmpty()
  telephone: string;

  @IsString()
  @IsOptional()
  details?: string;

  @IsInt()
  @IsOptional()
  yearUse?: number;

  @IsString()
  @IsOptional()
  yearToyear?: string;

  @IsInt()
  @IsOptional()
  typeDeviceId?: number;

  @IsInt()
  @IsOptional()
  brandId?: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  hdImgs?: string[];

  @IsString()
  @IsOptional()
  hdFile?: string;

  @IsInt()
  @IsOptional()
  priorityId?: number;

  @IsInt()
  @IsNotEmpty()
  createdById: number;
}
