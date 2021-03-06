import { Component, OnInit, OnDestroy } from '@angular/core';
import {Recipe} from '../../shared/recipe.model'
import { RecipeService } from 'src/app/services/recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {
  recipeSubscription:Subscription  

  recipes:Recipe[] =[];


  constructor(private recipeService:RecipeService,
              private router:Router,
              private  route:ActivatedRoute
              ) { }

  ngOnInit() {
    this.recipes =this.recipeService.getRecipes();
    this.recipeSubscription=this.recipeService.recipeChanged
    .subscribe((recipes:Recipe[]) =>{
      this.recipes = recipes
      })

  }
  onNewRecipe(){
         this.router.navigate(['new'],{relativeTo:this.route})
  }

  ngOnDestroy(){
    this.recipeSubscription.unsubscribe();
  }
}
