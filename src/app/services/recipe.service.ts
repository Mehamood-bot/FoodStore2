import {Recipe} from '../shared/recipe.model'
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subject } from 'rxjs';

@Injectable()
export class RecipeService {
     //can be encupaste and call by method also
    // recipeSelected = new EventEmitter<Recipe>() achived by routing

    recipeChanged = new Subject<Recipe[]>();
   private recipes:Recipe[] =[
        new Recipe(
                    'Chef Noodles',
                    "chef special dish",
                    'https://i1.wp.com/www.eatthis.com/wp-content/uploads/2019/10/pumpkin-pad-thai-recipe.jpg?resize=800%2C450&ssl=1',
                    [
                        new Ingredient('noodle',5),
                        new Ingredient('beans',50),
                        new Ingredient('meat',20),
                        new Ingredient('vigges',15),

                    ]
                ),
        new Recipe(
                     'Burger',
                     "Americal most food",
                     'https://i1.wp.com/www.eatthis.com/wp-content/uploads/2019/10/wendys-carolina-classic-burger.jpg?resize=800%2C450&ssl=1',
                     [
                        new Ingredient('meat',10),
                        new Ingredient('vigges',15),
                        new Ingredient('cheese',5)

                     ]
                    ),
        new Recipe(
                        'el-pollo-loco-chicken',
                        "why go diet",
                        'https://i2.wp.com/www.eatthis.com/wp-content/uploads/2020/08/el-pollo-loco-chicken.jpg?resize=800%2C450&ssl=1',
                        [
                            new Ingredient('chicke',50),
                            new Ingredient('spies',15),
                            new Ingredient('olive oil',5)
    
                         ]
                        )
    
    ];

    constructor(private shoppingListService:ShoppingListService){

    }
    
    getRecipes() {
        //returns exact copy of array, so serives array does not chnage by any update
        return this.recipes.slice()
    }

    getRecipesById(index:number){
        return this.recipes[index];
    }

    ToShoopingList(ingredient:Ingredient[]){
        this.shoppingListService.addIngredients(ingredient)

    }
    addRecipe(recipe:Recipe){
        this.recipes.push(recipe)
        this.recipeChanged.next(this.recipes.slice())

    }

    updateRecipe(index:number,recipe : Recipe){
        this.recipes[index] = recipe;
        this.recipeChanged.next(this.recipes.slice())
    }

    deleteRecipe(index:number){
        this.recipes.splice(index,1)
        this.recipeChanged.next(this.recipes.slice());

    }


    

}   