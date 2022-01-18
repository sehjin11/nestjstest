import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable } from '@nestjs/common';
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
}
