import { PartialType } from '@nestjs/mapped-types';
import { CreateTopMusicDto } from './create-top-music.dto';

export class UpdateTopMusicDto extends PartialType(CreateTopMusicDto) {}
