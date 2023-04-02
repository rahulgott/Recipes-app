import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../models/ingedient.model';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    {
      name: 'Tasty Schnitzel',
      description: 'A super-tasty Schnitzel - just awesome!',
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      ingredients: [
        {
          name: 'Meat',
          amount: 1,
        },
        {
          name: 'French Fries',
          amount: 20
        }
      ]
    },
    {
      name: 'Big Fat Burger',
      description: 'What else you need to say?',
      imagePath: 'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      ingredients: [
        {
          name: 'Buns',
          amount: 2,
        },
        {
          name: 'Meat',
          amount: 1
        }
      ]
    }
  ];

  constructor(private slService: ShoppingListService) { }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientstoList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }
}
