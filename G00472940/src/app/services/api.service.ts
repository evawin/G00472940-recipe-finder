import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root' // Root means the service is available application-wide
})
export class ApiService {

  private apiKey = '70759a4f7911402abcc53d3c51d3b759'; //API key for Spoonacular
  private baseUrl = 'https://api.spoonacular.com/recipes'; //Base URL for Spoonacular API. Needs to be /recipes

  //Inject HttpClient for making HTTP requests. HttpClient is Angular's built-in service for handling HTTP communication.
  constructor(private http: HttpClient){}
 
  //Search recipes based on query and optional diet filter. Takes a search query string and an optional diet string.
  //Returns a promise that resolves with the search results
  searchRecipes(query: string, diet: string | null = null) {
  const params: any = {
    query, //Search query.This is the main ingredient or dish name to search for. This is speccified by the data name from spoonacular.
    number: '10', //Number of results to return. Just limit it to 10 for performance and a bit of simpliciy 
    apiKey: this.apiKey //API key for authentication. Api key is specified above as a private variable for better security and reduce repeition
  };


  //This is an additional feature 
  if (diet === 'gluten free') {
    //If diet is gluten free, set intolerances parameter to gluten
    params.intolerances = 'gluten';
    //This ensures that the search results exclude recipes containing gluten
  } else if (diet) {
    //For other diets, set the diet parameter directly
    params.diet = diet;
    //This filters the search results based on the selected diet
  }

  return firstValueFrom(
    //Make GET request to Spoonacular's complexSearch endpoint with constructed parameters
    //firstValueFrom converts the Observable returned by HttpClient into a Promise for easier async/await usage
    this.http.get<any>(`${this.baseUrl}/complexSearch`, { params })
  );
}
  getRecipeDetails(id: number) {
    //Fetch detailed information for a specific recipe by ID
    return firstValueFrom( //Convert Observable to Promise for async/await usage.
      //Make GET request to Spoonacular's recipe information endpoint with the recipe ID
      // The endpoint URL is constructed using the baseUrl and the recipe ID
      this.http.get<any>(`${this.baseUrl}/${id}/information`,
         {
        // Include API key as a query parameter for authentication
        params: { apiKey: this.apiKey }
        //The params object contains the apiKey needed to authenticate the request with Spoonacular API
      })
    );
  }
}
