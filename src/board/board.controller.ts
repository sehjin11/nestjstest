import { BoardService } from './board.service';
import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Board1 } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('board')
@UseGuards(AuthGuard())
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('')
  getAllBoard(): Promise<Board1[]> {
    return this.boardService.getAllBoard();
  }

  @Post('')
  createNewBoard(
    @Req() req,
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<Board1> {
    return this.boardService.createBoard(createBoardDto, req.user);
  }
}
