import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { DialogService } from '../../services/dialog.service';
import { IDialog } from '../../interfaces/IDialog';

const MODULES = [MatButtonModule];

const COMPONENTS = [
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
];

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [...COMPONENTS, ...MODULES],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent {
  private readonly dialogRef = inject(MatDialogRef<DialogService>);
  public readonly data: IDialog = inject(MAT_DIALOG_DATA);
}
