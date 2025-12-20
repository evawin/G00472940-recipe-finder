import { Routes } from '@angular/router';
import { HomePage } from './home/home.page';
import { RecipeDetailsComponent } from './pages/recipe-details/recipe-details.component';
import { FavouritesComponent } from './pages/favourites/favourites.component';
import { SettingsComponent } from './pages/settings/settings.component';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'details/:id', component: RecipeDetailsComponent },
  { path: 'favourites', component: FavouritesComponent },
  { path: 'settings', component: SettingsComponent }
];
