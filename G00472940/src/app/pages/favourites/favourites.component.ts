

@Component({
  selector: 'app-favourites',
  templateUrl: './favourites.component.html',
  standalone: true,
  styleUrls: ['./favourites.component.scss'],
  imports: [],
})
export class FavouritesComponent {
  //OnInit lifecycle hook to load favourites when component initializes
  //Array to hold favourite recipes
  favourites: any[] = [];
}