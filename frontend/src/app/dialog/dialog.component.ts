import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
  MAT_DIALOG_DATA,
  MatDialogContent,
  MatDialogTitle,
  MatDialogActions,
  MatDialogClose,
  MatDialog,
} from "@angular/material/dialog";

@Component({
  selector: 'dialog',
  templateUrl: 'dialog.component.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataComponent {
  data = inject(MAT_DIALOG_DATA);
}

export class DialogComponent {
  readonly dialog = inject(MatDialog);

  openDialog(
    dialogTitle: string,
    dialogContent: any,
    dialogButtonText?: string,
    dialogTimeout?: number) {
    
    if (!dialogButtonText) {
      dialogButtonText = "OK";
    }

    const dialogRef = this.dialog.open(DataComponent, {
      data: {
        title: dialogTitle,
        content: dialogContent,
        button: dialogButtonText
      }
    });
    if (dialogTimeout) {
      setTimeout(() => {
        dialogRef.close();
      }, dialogTimeout);
    }
  }
}
