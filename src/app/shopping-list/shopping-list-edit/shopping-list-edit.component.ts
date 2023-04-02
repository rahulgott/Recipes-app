import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Ingredient } from 'src/app/models/ingedient.model';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'shopping-list-edit',
  templateUrl: './shopping-list-edit.component.html',
  styleUrls: ['./shopping-list-edit.component.scss']
})
export class ShoppingListEditComponent implements OnInit {
  ingredientsForm: FormGroup

  constructor(private fb: FormBuilder,
    private slService: ShoppingListService) { }

  ngOnInit(): void {
    this.buildIngredientsForm()
  }

  buildIngredientsForm() {
    this.ingredientsForm = this.fb.group({
      ingName: ['', Validators.required],
      ingAmount: ['', Validators.required]
    })
  }

  onAddIngredient() {
    const ingName = this.ingredientsForm.value.ingName
    const ingAmount = this.ingredientsForm.value.ingAmount
    const ingDetails: Ingredient = {
      name: ingName,
      amount: ingAmount
    }
    this.slService.addIngredient(ingDetails)
    console.log(this.ingredientsForm)
  }

}
