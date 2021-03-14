import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Settings, SETTINGS_KEY } from '../models/settings.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  /**
   * Settings of the app. Work and break duration
   */
  settingsForm = new FormGroup({
    work: new FormControl(25, Validators.min(1)),
    break: new FormControl(5, Validators.min(1)),
  });

  constructor(
    private dialogRef: MatDialogRef<SettingsComponent>,
  ) { }

  ngOnInit(): void {
    const settings: Settings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    if (settings) {
      this.settingsForm.setValue(settings);
    }
  }

  /**
   * Close the settings dialog. Save changes if called from the 'Save' button
   * @param saveChanges flag telling if changes must be saved
   */
  close(saveChanges = false): void {
    if (saveChanges) {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(this.settingsForm.value));
    }
    this.dialogRef.close(saveChanges);
  }
}
