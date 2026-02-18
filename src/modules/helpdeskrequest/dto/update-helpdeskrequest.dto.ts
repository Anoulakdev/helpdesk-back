import { PartialType } from '@nestjs/mapped-types';
import { CreateHelpdeskrequestDto } from './create-helpdeskrequest.dto';

export class UpdateHelpdeskrequestDto extends PartialType(
  CreateHelpdeskrequestDto,
) {}
