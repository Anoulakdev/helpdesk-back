import { PartialType } from '@nestjs/mapped-types';
import { CreateHeadcategoryDto } from './create-headcategory.dto';

export class UpdateHeadcategoryDto extends PartialType(CreateHeadcategoryDto) {}
