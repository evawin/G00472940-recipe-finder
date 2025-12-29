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

  measurement: 'us' | 'metric' = 'metric'; //User's preferred measurement system
  darkMode = false; //Flag for dark mode setting

  constructor(private storageService: StorageService) {}

  async ngOnInit() {
    //Load saved settings from storage
    const savedMeasurement = await this.storageService.getMeasurement();
    // If a measurement setting was found, use it
    if (savedMeasurement) this.measurement = savedMeasurement;

    //https://stackoverflow.com/questions/71650492/how-to-save-darkmode-in-local-storage-in-react
    //https://github.com/solidjs/solid/discussions/1158
    // Load dark mode setting
    const savedDark = await this.storageService.getDarkMode();
    //Convert to boolean
    this.darkMode = !!savedDark;
    //Apply dark mode setting to document body
    document.body.classList.toggle('dark', this.darkMode);
    //The toggle method adds the 'dark' class if darkMode is true, removes it if false
  }

  async saveMeasurement() {
    //Save measurement setting to storage
    await this.storageService.setMeasurement(this.measurement); //Pass the current
  }

 async toggleDarkMode() {
  //Toggle dark mode setting and save to storage
  await this.storageService.setDarkMode(this.darkMode);
  //Apply dark mode setting to document body
  document.body.classList.toggle('dark', this.darkMode);
}


}






