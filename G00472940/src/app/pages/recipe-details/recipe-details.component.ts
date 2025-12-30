
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { StorageService } from '../../services/storage.service';

// Import Ionic modules
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component
({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss'],
  standalone: true, // enable standalone component
  imports: [IonicModule, CommonModule, FormsModule] // include Ionic & Angular directives
})
export class RecipeDetailsComponent implements OnInit {

  recipeId!: number; //ID of the recipe to display
  recipe: any = null; //Object to hold recipe details
  ingredients: any[] = []; //Array to hold ingredients list. Its empty initially
  instructions: any[] = []; //Array to hold cooking instructions. Its empty initially
  isFavourite: boolean = false; //Flag to track if recipe is in favourites. This will help toggle the favourite button state
  measurement: 'us' | 'metric' = 'metric'; //User's preferred measurement system - links with setttings page 

  constructor(
    //https://angular.dev/api/router/ActivatedRouteSnapshot
    private route: ActivatedRoute, //Inject ActivatedRoute to access route parameters like recipe ID. ActivatedRoute provides access to information about a route associated with a component loaded in an outlet.
    private apiService: ApiService, //Inject ApiService to fetch recipe details from the Spoonacular API
    private storageService: StorageService
  ) {}

  async ngOnInit() {
    //Get recipe ID from route parameters
    //https://stackoverflow.com/questions/49736783/referenceerror-for-data-service-angular-5
    this.recipeId = +this.route.snapshot.paramMap.get('id')!; //The + operator converts the string ID to a number
    await this.loadRecipe();
    //https://forum.ionicframework.com/t/wait-for-local-storage-solved/60979?st_source=ai_mode

    this.isFavourite = await this.storageService.isFavourite(this.recipeId);
  }

  async loadRecipe() {
    //Fetch recipe details from API
    this.recipe = await this.apiService.getRecipeDetails(this.recipeId);

    // Load measurement setting
    const savedMeasurement = await this.storageService.getMeasurement();
    this.measurement = savedMeasurement || 'metric';

    // Prepare ingredients list based on measurement
    this.ingredients = this.recipe.extendedIngredients.map((ing: any) => {
      const measure = this.measurement === 'us' ? ing.measures.us : ing.measures.metric;
      return {
        name: ing.name, //Ingredient name
         amount: measure.amount, 
        unit: measure.unitLong
      };
    });

    // Prepare instructions steps
    if (this.recipe.analyzedInstructions.length > 0)
      //Check if there are any instructions available
    {
      this.instructions = this.recipe.analyzedInstructions[0].steps;
      //Extract steps from the first set of analyzed instructions
    } else {
      //No instructions available
      this.instructions = [];
    }
  }

  async toggleFavourite()
  //Add or remove recipe from favourites
   {
    if (this.isFavourite) {
      //If already a favourite, remove it
      await this.storageService.removeFavourite(this.recipeId); //Remove recipe by ID#
    } else {
      const favRecipe = {
        //If not a favourite, add it
        id: this.recipe.id,
      
        title: this.recipe.title,
        image: this.recipe.image
      };
      await this.storageService.addFavourite(favRecipe);
      //Add recipe to favourites
    }
    this.isFavourite = !this.isFavourite; //Toggle the isFavourite flag to update button state
  }
}
