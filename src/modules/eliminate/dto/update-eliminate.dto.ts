import { PartialType } from '@nestjs/mapped-types';
import { CreateEliminateDto } from './create-eliminate.dto';

export class UpdateEliminateDto extends PartialType(CreateEliminateDto) {}
