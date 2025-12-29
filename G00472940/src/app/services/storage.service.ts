import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private FAV_KEY = 'favourite_recipes'; //Key for storing favourites in localStorage
  private MEASURE_KEY = 'measurement'; //Key for storing measurement setting

  constructor() {}

  // Save full favourites array
  async saveFavourites(favs: any[]) //Takes an array of any type as input
  {
    //Convert favourites array to JSON string and store in localStorage. This  will overwrite any existing data under the same key.
    localStorage.setItem(this.FAV_KEY, JSON.stringify(favs)); //JSON.stringify converts a JavaScript object or value to a JSON string
  }

  // Load favourites array
  async getFavourites(): Promise<any[]> {
    const value = localStorage.getItem(this.FAV_KEY);
    return value ? JSON.parse(value) : [];
  }

  // Add a recipe to favourites
  async addFavourite(recipe: any) {
    //Fetch current favourites. If recipe not already in favourites, add it and save updated list
    const current = await this.getFavourites(); //Get current favourites array
    if (!current.find(r => r.id === recipe.id))  //Check if recipe is already a favourite
      {
        //If not found, add recipe to favourites
      current.push(recipe); //Add new recipe to the array
      await this.saveFavourites(current);
      //Save updated favourites array back to storage
    }
  }

  // Remove a recipe from favourites
  async removeFavourite(recipeId: number) {
    //Fetch current favourites, filter out the one to remove, and save updated list
    const current = await this.getFavourites(); //Get current favourites array
    const updated = current.filter(r => r.id !== recipeId); //Create new array excluding the recipe to remove
    await this.saveFavourites(updated); //Save updated favourites array back to storage
  }

  // Check if a recipe is already a favourite
  async isFavourite(recipeId: number): Promise<boolean>
  //Returns true if recipe with given ID is in favourites
   {
    const current = await this.getFavourites(); //Get current favourites array
    return current.some(r => r.id === recipeId); //Check if any recipe in the array matches the given ID
  }

  // Save measurement setting
  async setMeasurement(measure: 'us' | 'metric') {
    localStorage.setItem(this.MEASURE_KEY, measure);
  }

  // Load measurement setting
  async getMeasurement(): Promise<'us' | 'metric' | null> {
    const value = localStorage.getItem(this.MEASURE_KEY);
    return (value as 'us' | 'metric') || null;
  }


  private DARK_KEY = 'dark_mode';

async setDarkMode(value: boolean) {
  //Save dark mode setting to localStorage
  localStorage.setItem(this.DARK_KEY, JSON.stringify(value));
}

async getDarkMode(): Promise<boolean> {
  //Retrieve dark mode setting from localStorage
  return JSON.parse(localStorage.getItem(this.DARK_KEY) || 'false');
}

}


