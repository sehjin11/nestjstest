import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board1 } from './board.entity';
import { BoardRepository } from './board.repository';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  getAllBoard(): Promise<Board1[]> {
    return this.boardRepository.find();
  }

  createBoard(createBoardDto: CreateBoardDto, user: User): Promise<Board1> {
    return this.boardRepository.createBoard(createBoardDto, user);
  }

  async deleteBoard(id: number, user: User): Promise<object> {
    const result = await this.boardRepository.delete({ id, user });

    //삭제된 것이 없는 경우
    if (result.affected === 0) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    } else {
      return { message: '삭제되었습니다.' };
    }
  }

  async updateBoard(
    id: number,
    createBoardDto: CreateBoardDto,
  ): Promise<Board1> {
    const found = await this.boardRepository.findOne(id);
    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${id}`);
    }
    found.title = createBoardDto.title;
    found.content = createBoardDto.content;
    await this.boardRepository.save(found);
    return found;
  }
}
