import { Component, OnInit, ViewChild, ElementRef, OnDestroy, } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit,OnDestroy {

  // getting from form
 // @ViewChild('nameInput') name:ElementRef
 // @ViewChild('amountInput') amount:ElementRef


  @ViewChild('SLForm') slForm:NgForm
 subscription :Subscription; 
 editMode=false;
 editedIndexMode:number;
 editedItem:Ingredient;

  constructor(private shoppingListService:ShoppingListService) { }   
  ngOnInit(): void {
    this. subscription=this.shoppingListService.startedEditing
                     .subscribe((index:number)=>{
                      this.editedIndexMode = index;   // to send the value to service to update, see onSumbit
                      this.editMode =true; // fro button to shown edit or add
                      this.editedItem=this.shoppingListService.getIndredient(index); // getting item to edit 
                      // placing those details to in form
                      this.slForm.setValue({
                        name:this.editedItem.name,
                        amount:this.editedItem.amount
                      })

                     })
  }

  onSumbit(from:NgForm){
    // getting from form
    //  const newIngredient = new Ingredient(this.name.nativeElement.value,this.amount.nativeElement.value);
    // this.shoppingListService.addIngredient(newIngredient)
    const value =from.value 
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
    this.shoppingListService.updateIngredient(this.editedIndexMode,newIngredient)
  }
  else{
     this.shoppingListService.addIngredient(newIngredient)
    }
     this.editMode = false;
     this.slForm.reset();
  }

  onClear(){
   this.slForm.reset();
   this.editMode =false
  }

  onDelete(){
    this.shoppingListService.deleteIngredient(this.editedIndexMode)
    this.onClear()
  }
  ngOnDestroy(){
     this.subscription.unsubscribe();
  }
  
  
}

