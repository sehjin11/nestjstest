import { EntityRepository, Repository } from 'typeorm';
import { BoardStatus } from './board-status.enum';
import { Board1 } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@EntityRepository(Board1) //entity
export class BoardRepository extends Repository<Board1> {
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board1> {
    const { title, content } = createBoardDto;
    let dateOrigin = new Date();
    const date = dateOrigin.toLocaleString();
    console.log('create board date : ', date);

    const board = this.create({
      title,
      content,
      date,
      status: BoardStatus.PUBLIC,
    });

    await this.save(board);
    return board;
  }
}
