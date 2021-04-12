import {Ingredient} from '../shared/ingredient.model'
import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
export class ShoppingListService {
    // ingredientChanged = new EventEmitter<Ingredient[]>() bettter to use subject
    ingredientChanged = new Subject<Ingredient[]>();
    startedEditing = new Subject<number>();

    private ingredients:Ingredient[] =[
        new Ingredient("apple",5),
        new Ingredient("Tomatos",5),
        new Ingredient("chicken",5)
    ]

    getIngredient(){
        return this.ingredients.slice();
    }
    
    // used in edit to get paticular ingrdient
    getIndredient(index:number){
         return this.ingredients[index];
    }

    //from sl edit
    addIngredient(ingredient:Ingredient){
        this.ingredients.push(ingredient)
        // we are updating copy array
        // this.ingredientChanged.emit(this.ingredients.slice()) using subject 
        this.ingredientChanged.next(this.ingredients.slice()) 
    }
     
    // from recipe as to shoppingList
    addIngredients(ingredients:Ingredient[]){
        // with ... out gretting our convert or spread as single list, so this array item add get push one by one like foreach
        this.ingredients.push(...ingredients)
        // we are updating copy array
        // this.ingredientChanged.emit(this.ingredients.slice()) using subject
        this.ingredientChanged.next(this.ingredients.slice()) 
    }

    updateIngredient(index:number,newIngredient:Ingredient){
        this.ingredients[index] = newIngredient;
        this.ingredientChanged.next(this.ingredients.slice())
        
    }
    deleteIngredient(index:number){
        this.ingredients.splice(index,1)
        this.ingredientChanged.next(this.ingredients.slice())

    }
}