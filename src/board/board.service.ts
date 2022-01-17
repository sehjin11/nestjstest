import { CreateBoardDto } from './dto/create-board.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Board1 } from './board.entity';
import { BoardRepository } from './board.repository';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardRepository)
    private boardRepository: BoardRepository,
  ) {}

  async getAllBoard(): Promise<Board1[]> {
    return this.boardRepository.find();
  }

  async createBoard(createBoardDto: CreateBoardDto): Promise<Board1> {
    return this.boardRepository.createBoard(createBoardDto);
  }
}
