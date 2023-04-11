import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { PAGE } from 'src/app/utils/constants/constant';

@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.component.html',
  styleUrls: ['./cart-footer.component.scss']
})
export class CartFooterComponent {
  isCartEmpty: boolean = true;
  totalAmt?: number;
  totalItems?: number;
  goToOrders: boolean = false;


  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cartService.getCartDataObservable().subscribe((data : any) => {
      // here data is cart data object
      // console.log("data",data)
      if (data && Object.keys(data.items).length > 0) {
        this.isCartEmpty = false;
        this.totalAmt = data.totalAmt;
        this.totalItems = Object.keys(data.items).length;
      }else{
        this.isCartEmpty = true;
      }
    });
 
  }



  onContinue() {
    this.router.navigate([PAGE.MY_CART]);
  }

  placeOrder() {
    this.router.navigate(['confirm-order']);
  }
}
