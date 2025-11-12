import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-product-by-id',
  imports: [],
  templateUrl: './product-by-id.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class ProductById { }
