import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[]
  subscription: Subscription

  constructor(private recipeService: RecipeService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {}

  ngOnInit(): void {
    this.subscription = this.recipeService.recipesChanged.subscribe((recipes: Recipe[]) => {
      this.recipes = recipes
    })
    this.recipes = this.recipeService.getRecipes()
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.activatedRoute})
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
