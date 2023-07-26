import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import {
  PlayerDBData,
  PlayerDataService,
} from 'src/app/core/player-data.service';

@Component({
  selector: 'app-manage-player',
  templateUrl: './manage-player.component.html',
  styleUrls: ['./manage-player.component.scss'],
})
export class ManagePlayerComponent implements OnInit, OnDestroy {
  private _subscription: Subscription | undefined;

  public form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: PlayerDBData,
    private _playerData: PlayerDataService,
    private _snackBar: MatSnackBar,
    private _dialogRef: MatDialogRef<ManagePlayerComponent>
  ) {}

  ngOnInit(): void {
    if (this.data?.name) {
      this.form.get('name')?.setValue(this.data.name);
    }
  }

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    const data: Omit<PlayerDBData, 'id'> = this.form.value;
    this.form.disable();

    this._subscription?.unsubscribe();

    let request = this._playerData.create(data);
    if (this.data?.id) request = this._playerData.update(this.data.id, data);

    this._subscription = request.subscribe({
      complete: () => this.form.enable(),
      error: () =>
        this._snackBar.open('Ein Fehler ist leider passiert :(', 'OK'),
      next: (response) => {
        this._snackBar.open(
          `Erfolgreich ${this.data?.id ? 'aktualisiert' : 'erstellt'}.`
        );
        this._dialogRef.close(true);
      },
    });
  }

  ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
