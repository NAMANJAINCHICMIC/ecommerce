import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PAGE } from 'src/app/utils/constants/constant';
import { Product } from 'src/app/utils/models/product';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.scss'],
})
export class CustomerHomeComponent implements OnInit {
  // userId:any;
  userId = this.authService.getUserId();
  recentlyViewedProducts: any = [];
  isLoading = true;
  itemList: any;
  productList: Array<Product | any> = [];
  allProductList: Array<Product | any> = [];
  searchedProductList: Array<Product | any> = [];
  productViewRecentlyList: Array<Product | any> = [];
  page = 1;
  itemsPerPage = 6;
  totalItems :any;
  totalCartItems : any; 
  isCartEmpty!: boolean;
  totalAmt: any;
  constructor(
    private customerService: CustomerService,
    private router: Router,
    private cartService : CartService,
    private authService : AuthService
  ) {
    this.userId = this.authService.getUserId();
  //   this.cartService.getCartDataObservable().subscribe((data : any) => {
    
  //     // here data is cart data object
  //   console.log("data",data)
  //   if (data && Object.keys(data.items).length > 0) {
  //     this.isCartEmpty = false;
  //     this.totalAmt = data.totalAmt;
  //     this.totalCartItems = Object.keys(data.items).length;
  //   }else{
  //     this.isCartEmpty = true;
  //   }
  
  // });
  }
  async ngOnInit() {  
    this.userId = this.authService.getUserId();
    //get products list
    const querySnapshot = await this.customerService.getAllProducts();
    querySnapshot.forEach((doc) => {
      const productId = doc.id;
      this.allProductList.push({ ...doc.data(), productId });
      // this.productList.push({ ...doc.data(), productId });
    });
    this.productList = this.allProductList
    console.log(this.productList);
    this.isLoading = false;
    // get searched product list
    this.customerService.searchString.subscribe((res:string )=>{
      this.filterProductList(res)
    })
    this.totalItems = this.productList.length
   // Fill Cart and Recently View items
    if(this.userId){
      this.fillCart(this.userId)    
    const snap = await this.customerService.getViewRecently()
    if (snap.exists()) {
      const res = snap.data();
      console.log(res)
      this.recentlyViewedProducts = res['myArray'];
      console.log("recentlyViewedProducts",this.recentlyViewedProducts);
      for(const productId of this.recentlyViewedProducts){
        const snap = await this.customerService.getUniqueProduct(productId);   
        // console.log("info",snap.data());   
        if(snap.exists()){
          const info = snap.data()   
          info['productId']= productId
          this.productViewRecentlyList.push( info );
        }
        this.productViewRecentlyList.reverse();
      }    
    }
    console.log("productViewRecentlyList", this.productViewRecentlyList)
  }
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
  async fillCart(userId:string){
    const snap = await this.cartService.getCartDataFirebase(userId);
    if(snap.exists()){
      const info = snap.data()  
      this.totalAmt=info['totalAmt'];
      this.totalCartItems=Object.keys(info['items']).length;
      localStorage.setItem('cartData', JSON.stringify(info));
    }
 
  }
  
  filterProductList(data:string){
    this.searchedProductList = this.allProductList.filter(obj => {
      return obj.productName.includes(data.toLowerCase()&& data.toUpperCase());
    });
    this.productList = this.searchedProductList
  }
  handlePageChange(event : number) {
    // console.log(event);
    this.page = event;
  }
}
