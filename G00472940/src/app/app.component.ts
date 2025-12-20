import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  template: '<ion-router-outlet></ion-router-outlet>',
  standalone: true,
  imports: [IonicModule]
})
export class AppComponent implements OnInit {

  constructor(private storage: StorageService) {}

  async ngOnInit() {
    const dark = await this.storage.getDarkMode();
    document.body.classList.toggle('dark', dark);
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