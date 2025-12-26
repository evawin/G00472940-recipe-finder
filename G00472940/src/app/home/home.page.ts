
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { addIcons } from 'ionicons';
import { heartOutline, settingsOutline } from 'ionicons/icons';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class HomePage {

  studentNumber = 'G00472940';

  ingredients = ''; // User-inputted ingredients so its empty string by default
  selectedDiet: string | null = null; // No diet selected by default

  recipes: any[] = []; // Array to hold fetched recipes. Its empty by default
  loading = false; // Loading state to show spinner during API calls

  constructor(
    private apiService: ApiService, // Inject ApiService to make API calls
    private router: Router // Inject Router to navigate between pages
  ) {
    addIcons({
    'heart-outline': heartOutline, // Register icons for global use. This is needed for the home page
    'settings-outline': settingsOutline // for the favourites and settings buttons
    });
  }
  async searchRecipes() {
    if (!this.ingredients.trim()) return; // If no ingredients, do nothing. .trim() removes extra spaces to reduce the human error.

    this.loading = true; // Set loading to true to show spinner. Spinner is hidden when loading is false

    try { // Try-catch block to handle potential errors during API call
   //https://dev.to/dionarodrigues/fetch-api-do-you-really-know-how-to-handle-errors-2gj0
   //  https://medium.com/@kravtsovmike/error-handling-in-javascript-try-catch-is-nice-but-there-is-a-catch-5f8f0426d19b

      const response = await this.apiService.searchRecipes(
        this.ingredients, // Pass user-inputted ingredients
        this.selectedDiet // Pass selected diet filter (if any) User might not select any diet, so its nullable
      );
      this.recipes = response.results; // Store fetched recipes in the recipes array
    } catch (err) { // Catch and log any errors that occur during the API call
      console.error(err); // Log error to console for debugging
    }

    this.loading = false; // Set loading to false to hide spinner after API call is complete
  }

  openDetails(recipe: any) {
    this.router.navigate(['/details', recipe.id]);//Navigate to recipe details page with the selected recipe's id
  }

  openFavourites() {
    this.router.navigate(['/favourites']); //Navigate to favourites page
  }

  openSettings() {
    this.router.navigate(['/settings']); //Navigate to settings page
  }
}











