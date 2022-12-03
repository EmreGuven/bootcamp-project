import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
})
export class SettingsComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  openSettings() {
    document.querySelector('.fixed-plugin').classList.add('show');
  }

  closeSettings() {
    document.querySelector('.fixed-plugin').classList.remove('show');
  }
}
