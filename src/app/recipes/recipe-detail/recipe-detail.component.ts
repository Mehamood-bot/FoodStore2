import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/app/shared/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { templateJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
 // @Input() recipe:Recipe , getting id by route and dat by get byd id method in service
 recipe:Recipe
 id:number
  constructor(private recipeService: RecipeService,
              private route:ActivatedRoute,
              private router:Router
              ) { }

  ngOnInit(): void {
    this.route.params
    .subscribe((params:Params)=>{
      this.id = +params['id']
      this.recipe = this.recipeService.getRecipesById(this.id)
    })
  }



  onAddShoppingList(){
   this.recipeService.ToShoopingList(this.recipe.ingredients)
  }
  onEditRecipe(){
     this.router.navigate(['edit'],{relativeTo:this.route})
  }
  onDelteRecipe(){
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['recipes'])
  }
}
