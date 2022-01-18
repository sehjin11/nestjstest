import { EntityRepository, Repository } from 'typeorm';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  constructor(private jwtService: JwtService) {
    super();
  }

  //회원생성
  async createUser(authCredentialDto: AuthCredentialDto): Promise<object> {
    const { username, password } = authCredentialDto;

    //암호 hash화
    const salt = await bcrypt.genSalt();
    const hashedPW = await bcrypt.hash(password, salt);

    //username과 hash화된 암호로 User엔티티에 저장
    //entity설정에서 username은 unique로 주었기 때문에 중복된 값이 있으면 error(code 23505)
    const user = this.create({ username, password: hashedPW });
    try {
      await this.save(user);
      return { message: '등록되었습니다.' };
    } catch (error) {
      console.log('user 생성 error : ', error);
      if (error.code === '23505') {
        throw new ConflictException('Existing username.');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  //   async loginUser(
  //     authCredentialDto: AuthCredentialDto,
  //   ): Promise<{ accessToken: string }> {
  //     const { username, password } = authCredentialDto;
  //     const user = await this.findOne({ username }); //일단 user이름으로만 찾음

  //     //user값이 있는지, 입력한 비밀번호가 일치하는지 확인
  //     if (user && (await bcrypt.compare(password, user.password))) {
  //       //암호가 일치하면, username을 넣어서 토큰 생성
  //       const payload = { username };
  //       const accessToken = await this.jwtService.sign(payload);
  //       return { accessToken };
  //     } else {
  //       throw new UnauthorizedException('login fail');
  //     }
  //   }
}
