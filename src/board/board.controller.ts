import { BoardService } from './board.service';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board1 } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('board')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('')
  getAllBoard(): Promise<Board1[]> {
    return this.boardService.getAllBoard();
  }

  @Post('')
  createNewBoard(@Body() createBoardDto: CreateBoardDto): Promise<Board1> {
    return this.boardService.createBoard(createBoardDto);
  }
}
