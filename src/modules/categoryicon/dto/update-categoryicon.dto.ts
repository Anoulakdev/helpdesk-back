import { PartialType } from '@nestjs/mapped-types';
import { CreateCategoryiconDto } from './create-categoryicon.dto';

export class UpdateCategoryiconDto extends PartialType(CreateCategoryiconDto) {}
