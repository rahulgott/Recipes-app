import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';

@Component({
  selector: 'recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.scss']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  id: number

  constructor(private activatedRoute: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = Number(params['id']),
      this.recipe = this.recipeService.getRecipe(this.id)
    })
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientstoList(this.recipe.ingredients)
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.activatedRoute});
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(["/recipes"])
  }
}
