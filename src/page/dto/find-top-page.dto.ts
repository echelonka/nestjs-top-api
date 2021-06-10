import { ApiProperty } from '@nestjs/swagger';

export class FindPageDto {
  @ApiProperty()
  firstCategory: string;
}
