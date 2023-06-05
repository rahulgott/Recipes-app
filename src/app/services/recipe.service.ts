import { Injectable } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { ShoppingListService } from './shopping-list.service';
import { Ingredient } from '../models/ingedient.model';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { UrlConstants } from '../url-constants';

@Injectable({
  providedIn: 'root'
})

export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService, private http: HttpClient) { }

  getRecipes() {
    this.http.get(UrlConstants.DB_URL + "/recipes.json").pipe(
      map(response => {
        this.recipes = Object.values(response)
        return Object.values(response)
      })
    ).subscribe(response => {
        this.recipesChanged.next(response)
      }
    )
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientstoList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients)
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.sendDataToServer()
    this.recipesChanged.next(this.recipes.slice());
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.sendDataToServer()
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(id, 1)
    this.recipesChanged.next(this.recipes.slice())
  }

  sendDataToServer() {
    this.http.put(UrlConstants.DB_URL + "/recipes.json", this.recipes).subscribe(
      response => {
        console.log("Data sent successfully", response)
      },
      error => {
        console.error(error)
      }
    )
  }
}
