import { Component, inject, ChangeDetectionStrategy } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {
    MAT_DIALOG_DATA, 
    MatDialogContent, 
    MatDialogTitle,
    MatDialogActions,
    MatDialogClose,
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
  export class DialogComponent {
    data = inject(MAT_DIALOG_DATA);
  }