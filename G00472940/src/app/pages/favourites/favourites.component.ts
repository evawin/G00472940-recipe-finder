
//tested on the VM.

import { Component, OnInit } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  standalone: true,
  styleUrls: ['./favourites.component.scss'],
  imports: [CommonModule, FormsModule, IonicModule],
})
export class FavouritesComponent implements OnInit {
  //OnInit lifecycle hook to load favourites when component initializes
  //Array to hold favourite recipes
  favourites: any[] = [];

  constructor(
    private storageService: StorageService, //Inject StorageService to access stored favourites. This allows us to retrieve and manage the user's favourite recipes.
    private router: Router //Inject Router to navigate to recipe details page when a favourite is selected
  ) {}

  async ngOnInit() { //Load favourites when component initializes
    await this.loadFavourites();//Call loadFavourites method to fetch and display favourite recipes. Await is used to ensure favourites are loaded before rendering.
  }

  async ionViewWillEnter() { //Lifecycle hook that runs each time the view is about to enter
    // Reload favourites if user comes back from details page
    await this.loadFavourites(); //Ensure favourites are up-to-date each time the page is viewed. Await means we wait for the load to complete before proceeding.
  }

  //https://stackoverflow.com/questions/64790924/problems-trying-to-retrieve-data-from-local-storage
  async loadFavourites() {
    //Fetch favourite recipes from storage service. The await keyword is used to wait for the asynchronous operation to complete before proceeding.
    this.favourites = await this.storageService.getFavourites(); //Assign fetched favourites to the local favourites array for display
  }
//https://angular.dev/guide/routing/navigate-to-routes
  openDetails(recipe: any) { //Navigate to recipe details page with the selected recipe's id. reciepe is an array of any type
    this.router.navigate(['/details', recipe.id]); //Navigate to details page using the recipe's id
  }
}

//Source -https://github.com/cefsharp/CefSharp/discussions/4870
// https://stackoverflow.com/questions/52497252/puppeteer-wait-until-page-is-completely-loaded
