import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { PAGE } from 'src/app/utils/constants/constant';

@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.component.html',
  styleUrls: ['./cart-footer.component.scss']
})
export class CartFooterComponent implements OnInit {
  isCartEmpty: boolean = true;
  totalAmt?: number;
  totalItems?: number;
  goToOrders: boolean = false;
  hideCartBar: boolean = false;

  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.cartService.getCartDataObservable().subscribe((data) => {
      // here data is cart data object
      if (data && Object.keys(data.items).length > 0) {
        this.isCartEmpty = false;
        this.totalAmt = data.totalAmt;
        this.totalItems = Object.keys(data.items).length;
      }else{
        this.isCartEmpty = true;
      }
    });
  }

  ngOnInit(): void {
    // this.handleCartService.onCartPageObs().subscribe((data) => {
    //   this.goToOrders = data;
    // });

    // this.handleCartService.onConfirmOrderPageObs().subscribe((data) => {
    //   this.hideCartBar = data;
    // });
  }

  onContinue() {
    this.router.navigate([PAGE.MY_CART]);
  }

  placeOrder() {
    this.router.navigate(['confirm-order']);
  }
}
