import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @ApiProperty({ description: '아이디' })
  username: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[a-z0-9_]{4,20}$/, {
    message: 'password only accepts english and number.',
  })
  @ApiProperty({ description: '비밀번호' })
  password: string;
}
