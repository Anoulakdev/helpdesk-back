import { PartialType } from '@nestjs/mapped-types';
import { CreateTypedeviceDto } from './create-typedevice.dto';

export class UpdateTypedeviceDto extends PartialType(CreateTypedeviceDto) {}
