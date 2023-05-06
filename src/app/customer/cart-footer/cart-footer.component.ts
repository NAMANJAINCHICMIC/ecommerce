import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
// import{un} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { PAGE } from 'src/app/utils/constants/constant';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart-footer',
  templateUrl: './cart-footer.component.html',
  styleUrls: ['./cart-footer.component.scss']
})
export class CartFooterComponent implements OnInit {
  isCartEmpty = true;
  // goToOrders = false;
  userId = this.authService.getUserId();
  totalCartItems: any;
  totalAmt: any;
  totalItems: any;
  constructor(
    private cartService: CartService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {

  }


  ngOnInit(): void {

    this.cartService.cartDataSub.subscribe((data: any) => {
      if (data && Object.keys(data.items).length > 0) {
        this.isCartEmpty = false;
        this.totalAmt = data.totalAmt;
        this.totalItems = Object.keys(data.items).length;
      } else {
        this.isCartEmpty = true;
      }
    });

    this.fillCart()
  }
  async fillCart() {
    await this.cartService.getCartDataFirebase().then(
      async (snap) => {

        if (snap.exists()) {
          const info = snap.data()
          this.totalAmt = info['totalAmt'];
          this.totalItems = Object.keys(info['items']).length;
          if (this.totalItems > 0)
            this.isCartEmpty = false;
          localStorage.setItem('cartData', JSON.stringify(info));
        } else {
          this.isCartEmpty = true;
        }

      })
      .catch((err) => {
        // console.log('err', err);
        // // alert( err.message)
        // Swal.fire(
        //   `Error ${err.code}`,
        //   err.message,
        //   'error'
        // )
      })
  }

  onContinue() {
    this.router.navigate([PAGE.MY_CART]);
  }

  // placeOrder() {
  //   this.router.navigate(['confirm-order']);
  // }
}
