import { PartialType } from '@nestjs/mapped-types';
import { CreateHelpdeskstatusDto } from './create-helpdeskstatus.dto';

export class UpdateHelpdeskstatusDto extends PartialType(
  CreateHelpdeskstatusDto,
) {}
