import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class CreateBoardDto {
  @IsNotEmpty()
  @ApiProperty({ description: '제목s' })
  title: string;

  @IsNotEmpty()
  @ApiProperty({ description: '내용' })
  content: string;

  @ApiProperty({ description: '작성자' })
  writer: string;
}
