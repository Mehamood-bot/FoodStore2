import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
id: number
editMode =false
recipeForm : FormGroup;
  constructor(private route:ActivatedRoute, private fb:FormBuilder,private recipeService:RecipeService,
               private router:Router) { }

  ngOnInit(): void {
    this.route.params
    .subscribe(
      (params:Params) => {
          this.id = +params["id"];
          this.editMode = params["id"] !=null  //return true or false
          this.initForm();
     }
    )
  }
  private initForm(){
    let recipeName='';
    let recipeImagePath="";
    let recipeDescription='';
    let recipeIngredients = this.fb.array([])

    if(this.editMode){
      const recipe = this.recipeService.getRecipesById(this.id)
      recipeName = recipe.name;
      recipeImagePath = recipe.imagepath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']){
        for (let ingredient of recipe.ingredients){
          recipeIngredients.push(
            this.fb.group({
              name : [ingredient.name,[Validators.required]],
              amount: [ingredient.amount,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]]
            })
          )
        }
      }
    }
    this.recipeForm = this.fb.group({
      name: [recipeName,[Validators.required]],
      imagepath:[recipeImagePath,[Validators.required]],
      description:[recipeDescription,[Validators.required]],
      ingredients:recipeIngredients
    })

  }

  get controls() { // a getter!
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onCancel(){

    this.router.navigate(['../'],{relativeTo:this.route});

  }

  onAddIngredient(){
    (this.recipeForm.get('ingredients') as FormArray).push( 
      this.fb.group({
        name:[null,[Validators.required]],
        amount:[null,[Validators.required,Validators.pattern(/^[1-9]+[0-9]*$/)]]
      })
    )
  }
  onDelteIngredient(index:number){
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index)
    // .clear() remove al elemnets
  }
  onSumbit(){
   if(this.editMode){
      this.recipeService.updateRecipe(this.id,this.recipeForm.value)
   }
   else{
     this.recipeService.addRecipe(this.recipeForm.value)
   }
   this.onCancel();
  }
}
