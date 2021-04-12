import { Component, OnInit } from '@angular/core';
import { Recipe } from '../shared/recipe.model';
import { RecipeService } from '../services/recipe.service';


@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {
  // selectedRecipe: Recipe //routing
  constructor(private recipeService:RecipeService) { }

  ngOnInit(): void {
    //we can subscribe to event emitter
    //done by routing 
    // this.recipeService.recipeSelected 
    // .subscribe(
    //   (recipe:Recipe) => {
    //     this.selectedRecipe=recipe;
    //   }
    // );
  }

}
