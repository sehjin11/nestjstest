import { BoardStatusValidationPipe } from './pipes/board-status-validation.pipe';
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
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Board1 } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { AuthGuard } from '@nestjs/passport';
import { BoardStatus } from './board-status.enum';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';

@Controller('board')
@UseGuards(AuthGuard())
@ApiBearerAuth('access-token')
@ApiTags('게시글')
export class BoardController {
  constructor(private boardService: BoardService) {}

  @Get('')
  getAllBoard(): Promise<Board1[]> {
    return this.boardService.getAllBoard();
  }

  @Post('')
  @UsePipes(ValidationPipe)
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
    @Param('id') boardId: number,
    @Req() req,
    @Body() createBoardDto: CreateBoardDto,
  ): Promise<Board1> {
    return this.boardService.updateBoard(boardId, req.user, createBoardDto);
  }

  @Patch('/boardStatus/:id')
  changeBoardStatus(
    @Param('id') boardId: number,
    @Req() req,
    @Body('status', BoardStatusValidationPipe) status: BoardStatus,
  ): Promise<Board1> {
    return this.boardService.changeStatus(boardId, req.user, status);
  }
}
