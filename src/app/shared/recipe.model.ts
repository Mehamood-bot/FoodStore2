import { Ingredient } from './ingredient.model';

export class Recipe{
    name:string;
    description:string;
    imagepath:string;
    ingredients: Ingredient[];
    // to create instance of class to use
    constructor(name:string,desc:string,imagepath:string,ingredients :Ingredient[]){
        this.name=name;
        this.description = desc;
        this.imagepath = imagepath
        this.ingredients=ingredients

    }
}