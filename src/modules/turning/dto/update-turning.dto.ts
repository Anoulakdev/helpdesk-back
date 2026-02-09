import { PartialType } from '@nestjs/mapped-types';
import { CreateTurningDto } from './create-turning.dto';

export class UpdateTurningDto extends PartialType(CreateTurningDto) {}
