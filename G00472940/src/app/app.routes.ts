import { Routes } from '@angular/router';//import Routes module to define app routes
import { HomePage } from './home/home.page'; //import HomePage component along with the other components.
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { SettingsComponent } from './pages/settings/settings.component';


//specify how to get to each of these pages/components. Useful for icons and when I click on buttons to navigate to different pages
export const routes: Routes = [
  { path: '', component: HomePage }, //default route - i.e. home page that will load automatically
  { path: 'details/:id', component: RecipeDetailsComponent }, 
  { path: 'favourites', component: FavouritesComponent },
  { path: 'settings', component: SettingsComponent }
];
