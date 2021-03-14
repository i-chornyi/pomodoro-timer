import { Component, OnInit } from '@angular/core';
import { SettingsComponent } from './settings/settings.component';
import { MatDialog } from '@angular/material/dialog';
import { Settings, SETTINGS_KEY, TimerMode } from './models/settings.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  /** List of sessions, false is a default value, true is successfully completed */
  sessions: boolean[] = [false, false, false, false, false, false, false, false];
  /** Settings of the app stored in the local storage */
  settings: Settings;
  /** Interval duration passed to the timer component */
  currentIntervalDuration: number;
  /** Timer mode 'work' or 'break' */
  currentTimerMode: TimerMode = 'work';

  constructor(
    private dialog: MatDialog,
  ) {
  }

  ngOnInit(): void {
    this.loadSettings();
    this.currentIntervalDuration = this.settings?.work || 25;
  }

  /**
   * 'Session finish' event handler. Toggle current timer mode and turn on the opposite one
   * If the 'work' session is done, adds it to the statistics
   */
  onSessionFinish(): void {
    if (this.currentTimerMode === 'work') {
      this.sessions[this.sessions.indexOf(false)] = true;
      this.currentIntervalDuration = this.settings?.break || 25;
    } else {
      this.currentIntervalDuration = this.settings?.work || 5;
    }
    this.toggleTimerMode();
  }

  toggleTimerMode(): void {
    this.currentTimerMode === 'work' ? this.currentTimerMode = 'break' : this.currentTimerMode = 'work';
  }

  /**
   * Load settings from the local storage
   */
  loadSettings(): void {
    this.settings = JSON.parse(localStorage.getItem(SETTINGS_KEY));
  }

  /**
   * Open settings dialog and handle its result.
   * Can change the settings or do nothing
   */
  openSettings(): void {
    const dialogRef = this.dialog.open(SettingsComponent, {
      panelClass: 'no-padding',
      data: this.settings,
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadSettings();
        this.currentIntervalDuration = this.settings?.work || 25;
      }
    });
  }
}
