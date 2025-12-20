














/*import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage {

  studentNumber = 'G00472940';
  ingredients = '';
  recipes: any[] = [];
  loading = false;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

  async searchRecipes() {
    if (!this.ingredients.trim()) return;

    this.loading = true;
    const response = await this.apiService.searchRecipes(this.ingredients);
    this.recipes = response.results;
    this.loading = false;
  }

  openDetails(recipe: any) {
    this.router.navigate(['/details', recipe.id]);
  }

  openFavourites() {
    this.router.navigate(['/favourites']);
  }

  openSettings() {
    this.router.navigate(['/settings']);
  }
}

*/













/*import { Component } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonSelect,
  IonSelectOption,
  IonInput,
  IonButton,
  IonList,
  IonThumbnail
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonItem,
    IonLabel,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonButton,
    IonList,
    IonThumbnail,
    CommonModule,
    FormsModule
  ],
})
export class HomePage {
  recipes: any[] = [];
  ingredients = '';
  dietFilters: string[] = [];
  selectedDiet: string | null = null;
  loading = false;
  studentNumber = 'G00472940';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {}

 async searchRecipes() {
  if (!this.ingredients.trim()) return;

  this.loading = true;

  try {
    const intolerances = this.dietFilters.join(',');

    const response = await this.apiService.searchRecipes(
      this.ingredients,
      this.selectedDiet,
      intolerances
    );

    this.recipes = response.results;
  } catch (err) {
    console.error(err);
  }

  this.loading = false;
}



  openDetails(recipe: any) {
    this.router.navigate(['/details', recipe.id]);
  }
}
 */