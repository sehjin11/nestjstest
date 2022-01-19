import { ArgumentMetadata, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../board-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly StatusOptions = [BoardStatus.PRIVATE, BoardStatus.PUBLIC];

  transform(value: any, metadata: ArgumentMetadata) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new Error(`${value} is not in the status value!`);
    }
    return value;
  }

  private isStatusValid(status: any) {
    const index = this.StatusOptions.indexOf(status);
    return index !== -1; //index가 -1이면 false, -1이 아니면 true값을 반환
  }
}
