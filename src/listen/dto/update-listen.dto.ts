import { PartialType } from '@nestjs/mapped-types';
import { CreateListenDto } from './create-listen.dto';

export class UpdateListenDto extends PartialType(CreateListenDto) {}
