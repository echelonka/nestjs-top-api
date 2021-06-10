import { ApiProperty } from '@nestjs/swagger';

export class FindProductDto {
  @ApiProperty()
  category: string;

  @ApiProperty()
  limit: number;
}
