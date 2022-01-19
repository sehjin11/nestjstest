import { BoardService } from './board.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
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

  @Delete('/:id')
  deleteBoard(@Param('id') id: number, @Req() req): Promise<object> {
    return this.boardService.deleteBoard(id, req.user);
  }

  @Patch('/:id')
  updateBoard(
    @Param('id') id: number,
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<Board1> {
    return this.boardService.updateBoard(id, createBoardDto);
  }
}
