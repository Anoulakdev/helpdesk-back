import {
  IsNotEmpty,
  IsInt,
  IsArray,
  IsOptional,
  IsString,
} from 'class-validator';
export class CreateAssignmentDto {
  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  id: number[];

  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  helpdeskRequestId: number[];

  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  assignedToId: number[];

  @IsInt()
  @IsOptional()
  helpdeskStatusId?: number;

  @IsString()
  @IsOptional()
  comment?: string;

  @IsString()
  @IsOptional()
  commentImg?: string;

  @IsOptional()
  lat?: number;

  @IsOptional()
  lng?: number;
}
