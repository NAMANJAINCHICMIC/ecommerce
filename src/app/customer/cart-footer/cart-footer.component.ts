import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
// import{un} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { PAGE } from 'src/app/utils/constants/constant';

@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.component.html',
  styleUrls: ['./cart-footer.component.scss']
})
export class CartFooterComponent implements OnInit{
  isCartEmpty = true;
  // @Input() totalAmt=0
  // @Input()totalItems?: number;
  goToOrders = false;
  userId = this.authService.getUserId();
  totalCartItems : any; 
  totalAmt: any;
  totalItems :any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private authService : AuthService
  ) {
    // this.cartService.getCartData()
    // JSON.parse(this.cartService.getCartData()||'{}')
  // this.cartService.getCartDataObservable().subscribe((data : any) => {
    
  //       // here data is cart data object
  //     console.log("data",data)
  //     if (data && Object.keys(data.items).length > 0) {
  //       this.isCartEmpty = false;
  //       this.totalAmt = data.totalAmt;
  //       this.totalItems = Object.keys(data.items).length;
  //     }else{
  //       this.isCartEmpty = true;
  //     }
    
  //   });
 
  }
  // ngOnChanges(): void {
  //   if(this.totalAmt || this.totalItems)
  //   {
  //     this.isCartEmpty=false
  //   }
 
  // }

  ngOnInit(): void {
    // this.cartService.cartDataSub.subscribe((data : any) => {
      // here data is cart data object
      // console.log("data",data)
    //   if (data && Object.keys(data.items).length > 0) {
    //     this.isCartEmpty = false;
    //     this.totalAmt = data.totalAmt;
    //     this.totalItems = Object.keys(data.items).length;
    //   }else{
    //     this.isCartEmpty = true;
    //   }
    // });
    // console.log("data")
     this.cartService.cartDataSub.subscribe((data : any) => {
  
      // console.log("data",data)
      if (data && Object.keys(data.items).length > 0) {
        this.isCartEmpty = false;
        this.totalAmt = data.totalAmt;
        this.totalItems = Object.keys(data.items).length;
      }else{
        this.isCartEmpty = true;
      }
    });

    this.userId = this.authService.getUserId();
    if(this.userId){
      this.fillCart(this.userId)  
      }
    
  }
  async fillCart(userId:string){
    const snap = await this.cartService.getCartDataFirebase(userId);
    if(snap.exists()){
      const info = snap.data()  
      this.totalAmt=info['totalAmt'];
      this.totalItems=Object.keys(info['items']).length;
      if(this.totalItems > 0)
      this.isCartEmpty = false;
      localStorage.setItem('cartData', JSON.stringify(info));
    }else{
          this.isCartEmpty = true;
        }
 
  }


  onContinue() {
    this.router.navigate([PAGE.MY_CART]);
  }

  placeOrder() {
    this.router.navigate(['confirm-order']);
  }
}
