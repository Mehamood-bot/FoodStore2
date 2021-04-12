import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/shared/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
 @Input() recipe:Recipe;
 @Input() index:number;

  //routing constructor(private recipeService:RecipeService) { }
  constructor() { }
  ngOnInit(): void {
  }

//achived by routing
  // onSelcted(){
  //   this.recipeService.recipeSelected.emit(this.recipe)

  // }

}
