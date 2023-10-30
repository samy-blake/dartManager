import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { KeyboardComponent } from '../keyboard/keyboard.component';

@Injectable({
  providedIn: 'root',
})
export class KeyboardService {
  public event: Subject<boolean> = new Subject<boolean>();
  public keyChange: Subject<string> = new Subject<string>();

  constructor(public dialog: MatDialog) {}

  open(preValue: string = ''): MatDialogRef<KeyboardComponent> {
    return this.dialog.open(KeyboardComponent, {
      data: {
        preValue,
      },
      width: '80vw',
    });
  }
}
