import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { PAGE } from 'src/app/utils/constants/constant';
import { Product } from 'src/app/utils/models/product';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
})
export class CustomerHomeComponent implements OnInit {
  recentlyViewedProducts: any = [];
  isLoading = true;
  itemList: any;
  productList: Array<Product | any> = [];
  productViewRecentlyList: Array<Product | any> = [];
  constructor(
    private customerService: CustomerService,
    private router: Router
  ) {}
  async ngOnInit() {
    // this.vendorService.getVendorProduct()
    // this.vendorService.getVendorAllProduct()
    const querySnapshot = await this.customerService.getAllProducts();
    querySnapshot.forEach((doc) => {
      const productId = doc.id;
      this.productList.push({ ...doc.data(), productId });
      console.log(this.productList);
    });
    this.isLoading = false;
    // const querySnapshotRecentlyViewed =
    //   await this.customerService.getRecentlyViewed();
    // querySnapshotRecentlyViewed.forEach(async (doc) => {
    //   const transactionId = doc.id;
    //   const ref = doc.data();
    //   if (ref) {
    //     this.recentlyViewedProducts = ref['myArray'];
    //     console.log("recentlyViewedProducts",this.recentlyViewedProducts);
    //     for(let productId of this.recentlyViewedProducts){
    //       const snap = await this.customerService.getUniqueProduct(productId);   
    //       // console.log("info",snap.data());   
    //       if(snap.exists()){
    //         const info = snap.data()   
    //         info['productId']= productId
    //         this.productViewRecentlyList.push( info );
    //       }
    //       this.productViewRecentlyList.reverse();
    //     }
    //     if (this.recentlyViewedProducts.length > 2) {
    //       this.customerService.deleteRecentlyViewed(
    //         this.recentlyViewedProducts[0]
    //       );
    //     }
    //   }
    // });
    // console.log("productViewRecentlyList", this.productViewRecentlyList)
    const snap = await this.customerService.getViewRecently()
    if (snap.exists()) {
      const res = snap.data();
      console.log(res)
      this.recentlyViewedProducts = res['myArray'];
      console.log("recentlyViewedProducts",this.recentlyViewedProducts);
      for(let productId of this.recentlyViewedProducts){
        const snap = await this.customerService.getUniqueProduct(productId);   
        // console.log("info",snap.data());   
        if(snap.exists()){
          const info = snap.data()   
          info['productId']= productId
          this.productViewRecentlyList.push( info );
        }
        this.productViewRecentlyList.reverse();
      }
      // if (this.recentlyViewedProducts.length > 2) {
      //   this.customerService.deleteRecentlyViewed(
      //     this.recentlyViewedProducts[0]
      //   );
      // }
    }
    console.log("productViewRecentlyList", this.productViewRecentlyList)
  }
  productDetail(productId: string) {
    this.customerService.addRecentlyViewed(productId);
    if (this.recentlyViewedProducts.length > 2) {
      this.customerService.deleteRecentlyViewed(
        this.recentlyViewedProducts[0]
      );
    }
    // this.customerService.recentlyViewing(productId)
    this.router.navigate([`${PAGE.PRODUCT_DETAIL}/${productId}`]);
  }
}
