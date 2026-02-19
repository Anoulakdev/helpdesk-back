import { IsNotEmpty, IsInt, IsArray } from 'class-validator';
export class CreateAssignmentDto {
  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  helpdeskRequestId: number[];

  @IsArray()
  @IsInt({ each: true })
  @IsNotEmpty()
  assignedToId: number[];
}
