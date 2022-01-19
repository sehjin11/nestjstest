import { CreateBoardDto } from './dto/create-board.dto';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board1 } from './board.entity';
import { BoardRepository } from './board.repository';
import { User } from 'src/auth/user.entity';
import { BoardStatus } from './board-status.enum';

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
    const writer = user.username;
    createBoardDto.writer = writer;
    return this.boardRepository.createBoard(createBoardDto);
  }

  async deleteBoard(boardId: number, user: User): Promise<object> {
    const writer = user.username;
    const found = await this.boardRepository.findOne({ boardId });
    if (found.writer === writer) {
      const result = await this.boardRepository.delete({ boardId });
      //삭제된 것이 없는 경우
      if (result.affected === 0) {
        throw new NotFoundException(`Can't find Board with id ${boardId}`);
      } else {
        return { message: '삭제되었습니다.' };
      }
    } else {
      return { message: '해당 권한이 없습니다.' };
    }
  }

  async updateBoard(
    boardId: number,
    user: User,
    createBoardDto: CreateBoardDto,
  ): Promise<Board1> {
    const found = await this.boardRepository.findOne(boardId);

    if (!found) {
      throw new NotFoundException(`Can't find Board with id ${boardId}`);
    }

    if (found.writer === user.username) {
      found.title = createBoardDto.title;
      found.content = createBoardDto.content;
      await this.boardRepository.save(found);
      return found;
    } else {
      throw new UnauthorizedException('권한이 없습니다!');
    }
  }

  async changeStatus(
    boardId: number,
    user: User,
    status: BoardStatus,
  ): Promise<Board1> {
    const writer = user.username;
    const board = await this.boardRepository.findOne({ boardId });
    if (!board) {
      throw new NotFoundException(`${boardId}의 글이 존재하지 않습니다!`);
    }
    if (board.writer === writer) {
      board.status = status;
      return board;
    } else {
      throw new UnauthorizedException('해당 글에 권한이 없습니다!');
    }
  }
}
