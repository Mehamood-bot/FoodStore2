import { Component, OnInit, OnDestroy } from '@angular/core';
import {Ingredient} from  '../shared/ingredient.model'
import { ShoppingListService } from '../services/shopping-list.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit,OnDestroy {
ingredients:Ingredient[] =[]
ingredientSubscrpiton:Subscription // to destory subscrption on ng detroy
  constructor(private shoppingListService:ShoppingListService) { }

  ngOnInit(): void {
  this.ingredients = this.shoppingListService.getIngredient() // getting intial ingredients
  // subscribing to those chaged ingrdeint
  this.ingredientSubscrpiton =  this.shoppingListService.ingredientChanged.subscribe(
      (ingredients:Ingredient[]) =>{
        this.ingredients=ingredients
      }
      )
  }
  //send item dtails to edit page to edit
  onEditItem(index:number){
    this.shoppingListService.startedEditing.next(index);

  }
ngOnDestroy(){
  this.ingredientSubscrpiton.unsubscribe()
}

}
