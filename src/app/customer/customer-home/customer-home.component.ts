import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { PAGE } from 'src/app/utils/constants/constant';
import { Product } from 'src/app/utils/models/product';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss']
})
export class CustomerHomeComponent implements OnInit {
  itemList :any;
  productList :Array<Product |any > = []
  constructor(private customerService: CustomerService ,private router: Router ){}
  async ngOnInit() {
// this.vendorService.getVendorProduct()
// this.vendorService.getVendorAllProduct()
const querySnapshot = await this.customerService.getAllProducts()
querySnapshot.forEach((doc) => {

  const productId = doc.id
 this.productList.push({ ...doc.data(), productId})
 console.log(this.productList);

});
  }
  productDetail(productId:string){
    this.router.navigate([`${PAGE.PRODUCT_DETAIL}/${productId}`]);
  }
}

