import {
  Component,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { CreateProductTabs } from 'src/app/modules/shared/enums/app-constants';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CreateProductComponent implements OnInit {
  createProductTabs = CreateProductTabs;
  constructor() {

  }

  ngOnInit(): void {

  }

}
