import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { VendorService } from 'src/app/services/vendor.service';
import { PAGE } from 'src/app/utils/constants/constant';
import { Product } from 'src/app/utils/models/product';

@Component({
  selector: 'app-vendor-home',
  templateUrl: './vendor-home.component.html',
  styleUrls: ['./vendor-home.component.scss']
})
export class VendorHomeComponent implements OnInit {
  isLoading = true;
  itemList :any;
  productList :Array<Product |any > = []
  constructor(private vendorService: VendorService ,private router: Router ){}
  async ngOnInit() {
// this.vendorService.getVendorProduct()
// this.vendorService.getVendorAllProduct()
const querySnapshot = await this.vendorService.getUniqueVendor()
querySnapshot.forEach((doc) => {

  const productId = doc.id
 this.productList.push({ ...doc.data(), productId})
 console.log(this.productList);

});
    this.isLoading = false;
  }
  editProduct(productId:string){
    this.router.navigate([`${PAGE.UPDATE_ITEM}/${productId}`]);
  }
  async deleteProduct(productId:string ){
this.vendorService.deleteProduct(productId)


this.productList.splice(this.productList.findIndex(a => a.productId == productId) , 1)


  }
  productDetail(productId: string) {
 
    // this.customerService.recentlyViewing(productId)
    this.router.navigate([`${PAGE.VENDOR_PRODUCT_DETAIL}/${productId}`]);
  }
}
