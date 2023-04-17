import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { PAGE } from 'src/app/utils/constants/constant';
import { Cart } from 'src/app/utils/models/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  
  cartArray: any[] = [];
  isCartEmpty = false;
  orderDetails:any={};
    cartObj: Cart | null;
    totalAmt?: number;
    totalItems?: number;

    constructor(
      private cartService: CartService,
      private router: Router,
     
    ) {
      this.cartObj = JSON.parse(this.cartService.getCartData()||'{}');

      this.cartService.getCartDataObservable().subscribe((data:any) => {
        // here data is cart data object
        // console.log("obs",Object.keys(data.items))
        if (data && Object.keys(data.items).length > 0) {
          // console.log("data",(data.items))
          this.isCartEmpty = true;
          this.totalAmt = data.totalAmt;
          this.totalItems = Object.keys(data.items).length;
        }
        else{
          this.isCartEmpty = false;
        }
      
      });
    }
  
    ngOnInit(): void {
      this.populateCartData();    
    }
   
    populateCartData() {
      if (this.cartObj  && this.cartObj.items ) {
        this.isCartEmpty = true;
        const itemD = this.cartObj.items;
  
        for (const item in itemD) {
          const itemObj = itemD[item];
  // console.log("itemObj",itemObj)
  
          const obj = {
            productId: itemObj.productId,
            productName: itemObj.productName,
            userId: itemObj.userId,
            price: itemObj.price,
            pathToPic: itemObj.pathToPic,
            quantity: itemObj.quantity,
            available: itemObj.available
          };
  
          this.cartArray.push(obj);
        }
      } else {
        this.isCartEmpty = false;
      }
      console.log("itemObj",this.cartArray)
    }
  
    /** add to cart */
    onAdd(item: any) {
      if(+item.available > item.quantity){
      item.quantity += 1; //two-way binded
      this.cartService.addOrUpdate(item);
    }else{
      Swal.fire(
'No more stock is available for the Product',
)

      // this.toastr.info("No more stock is available for the Product")
    }
    }
  
    /** remove from cart */
    onRemove(item: any) {
      item.quantity -= 1; //two-way binded
      this.cartService.removeItem(item);
  
      // if not items in cart
      // set isCartEmpty to true
      this.cartObj = JSON.parse(this.cartService.getCartData()||'{}');
      if(!this.cartObj) {
        this.isCartEmpty = false;
      }
    }
  
    getItemTotalAmount(price: number, quantity: number) {
      return Number(price) * Number(quantity);
    }
   
    clearCart() {
      this.isCartEmpty = false;
      this.cartArray = [];
      this.cartObj = null;
      this.cartService.clearCart();
    }

    // orderDetailsChanged() {

    //   this.orderDetails.list=[];
    //   for(let productItem of this.cartArray)
    //   {
    //       this.orderDetails.list.push({foodId:productItem.foodId,quantity:productItem.quantity})
    //   }
      
    // }
    // placeOrder(){
    //   // this.cartService.removeCartData();
    //   console.log(localStorage.getItem('cart'));
    //   this.orderDetailsChanged()
    //   this.socketService.userPlaceOrder(this.orderDetails)
    //   // console.log(this.orderDetails);
    //   this.clearCart()
    //   this.router.navigate([PAGE.ORDERS]);
    // }
    placeOrder(){
      this.router.navigate([PAGE.PAYMENT_GATEWAY]);
    }
}
