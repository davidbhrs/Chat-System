import { of } from 'rxjs';

export class MatDialogMock {
  open(): object {
    return {
      afterClosed: () => of(true)
    };
  }
}
