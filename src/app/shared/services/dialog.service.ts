import { inject, Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';
import { IDialog } from '../interfaces/IDialog';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private readonly dialog = inject(MatDialog);

  public width = '250px';
  public enterAnimationDuration = '';
  public exitAnimationDuration = '';
  public data: IDialog = {} as IDialog;

  public openDialog(
    width: string,
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    data: IDialog
  ): void {
    this.width = width;
    this.enterAnimationDuration = enterAnimationDuration;
    this.exitAnimationDuration = exitAnimationDuration;
    this.data = data;

    this._openDialog();
  }

  private _openDialog(): void {
    this.dialog.open(DialogComponent, {
      width: this.width,
      enterAnimationDuration: this.enterAnimationDuration,
      exitAnimationDuration: this.enterAnimationDuration,
      data: this.data,
    });
  }
}
