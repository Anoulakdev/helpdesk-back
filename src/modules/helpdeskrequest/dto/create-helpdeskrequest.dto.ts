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

  @IsInt()
  @IsNotEmpty()
  telephone: number;

  @IsString()
  @IsOptional()
  details?: string;

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
