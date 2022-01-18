import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  //회원가입
  signUp(authCredentialDto: AuthCredentialDto): Promise<object> {
    return this.userRepository.createUser(authCredentialDto);
  }

  //로그인
  async signIn(
    authCredentialDto: AuthCredentialDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialDto;
    const user = await this.userRepository.findOne({ username }); //일단 user이름으로만 찾음

    //user값이 있는지, 입력한 비밀번호가 일치하는지 확인
    if (user && (await bcrypt.compare(password, user.password))) {
      //암호가 일치하면, username을 넣어서 토큰 생성
      const payload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('login fail');
    }
  }
}
