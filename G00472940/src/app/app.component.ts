import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StorageService } from './services/storage.service';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-root',
  template: '<ion-router-outlet></ion-router-outlet>',
  standalone: true,
  imports: [IonicModule, ]
})

export class AppComponent implements OnInit {

  constructor(private storage: StorageService)
  //StorageServe is used to access saved settings like dark mode
   {}

  async ngOnInit() {
    //When the app starts, load and apply dark mode setting
    const dark = await this.storage.getDarkMode(); //Get saved dark mode preference
    document.body.classList.toggle('dark', dark); //Apply dark mode if preference is true
    
  }
}










/*import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class AppComponent {
  constructor() {}
}
*/