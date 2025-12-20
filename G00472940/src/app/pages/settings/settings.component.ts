import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SettingsComponent implements OnInit {

  measurement: 'us' | 'metric' = 'metric';
  darkMode = false;

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    const savedMeasurement = await this.storageService.getMeasurement();
    if (savedMeasurement) this.measurement = savedMeasurement;

    const savedDark = await this.storageService.getDarkMode();
    this.darkMode = !!savedDark;
    document.body.classList.toggle('dark', this.darkMode);
  }

  async saveMeasurement() {
    await this.storageService.setMeasurement(this.measurement);
  }

 async toggleDarkMode() {
  await this.storageService.setDarkMode(this.darkMode);
  document.body.classList.toggle('dark', this.darkMode);
}


}



