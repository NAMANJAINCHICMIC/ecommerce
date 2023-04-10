import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Cart, ItemDetails } from '../utils/models/product';

@Injectable({
  providedIn: 'root'
})
export class CartService implements OnInit {
  cartObj :Cart | null = null;
  itemsArray: ItemDetails[] = [];
  // itemDetails: ItemDetails;
  // uid: string;
  // postPath: string;
  // getPath: string;
  cartDataSub = new BehaviorSubject<Cart|null>(null);
  onCartPageSub = new BehaviorSubject<boolean>(false);
  onConfirmOrderPageSub = new BehaviorSubject<boolean>(false);

  constructor() {}

  ngOnInit() {
    this.cartObj = this.getCartDataConverted();
  }
  addOrUpdate(item: any) {
    // get cart data from local storage
  console.log(item)
    this.cartObj = this.getCartDataConverted();
    // add cart object for the first time
    if (!this.cartObj) {
      const cart: Cart = {
        items: {
          [item.productId]:{

            addedOn: new Date().toLocaleString(),
            quantity: item.quantity,
            productId: item.productId,
            userId: item.userId,
            productName: item.productName,
            price: item.price,
            pathToPic: item.pathToPic,
          },
          },
       
        totalAmt: item.price,
      };
      this.addCartData(cart);
      
    } else {
      // add a new item to cart
      if (!this.cartObj.items[item.productId]) {
        const itemD: ItemDetails = {
          [item.productId]: {
           
            addedOn: new Date().toLocaleString(),
            quantity: item.quantity,
            productId: item.productId,
            userId: item.userId,
            productName: item.productName,
            price: item.price,
            pathToPic: item.pathToPic,
          },
        };
        this.cartObj = {
          items: {
            ...this.cartObj.items,
            [item.productId]: itemD[item.productId],
          },
          totalAmt: this.getCartTotalAmount(item.price, true),
        };
        this.addCartData(this.cartObj );
      } else {
        const itemD = this.cartObj.items[item.productId];
        itemD.quantity += 1;
        this.cartObj.items[item.productId] = itemD;

        this.cartObj.totalAmt = this.getCartTotalAmount(item.price, true);

        this.addCartData(this.cartObj);
      }
    }
  }
  removeItem(item: any) {  
    this.cartObj = this.getCartDataConverted(); 
    if (this.cartObj) {
      const itemD = this.cartObj.items[item.productId];
      if (itemD.quantity > 1) {   
        itemD.quantity -= 1;
        this.cartObj.items[item.productId] = itemD;
      } else if (itemD.quantity == 1) {    
        delete this.cartObj.items[item.productId];
      }
      this.cartObj.totalAmt = this.getCartTotalAmount(item.price, false);
    }
    this.addCartData(this.cartObj);
  } 
  getCartTotalAmount(price: number, add: boolean): number {
    let amt: number;
    if (add == true) {
      amt = Number(this.cartObj?.totalAmt) + Number(price);
    } else {
      amt = Number(this.cartObj?.totalAmt) - Number(price);
    }
    return amt;
  }
  /** check for cart data in local storage */
  getCartDataConverted() {
    if (this.getCartData()) {
      return JSON.parse(this.getCartData()||'{}');
    }
    return null;
  } 
  clearCart() {
    this.cartObj = null;
    this.removeCartData();
  }

    // cart locol storage
    addCartData(cart: Cart |null) {
      console.log("addCart",cart)
      localStorage.setItem('cartData', JSON.stringify(cart));
      const obj = JSON.parse(localStorage.getItem('cartData') || '{}');
      // check if items in cart is empty
      if (!Object.keys(obj.items).length) {
        this.removeCartData();
      }else{
        this.cartDataSub.next(JSON.parse(this.getCartData()||'{}'));
      }
    }
  
    removeCartData() {
      if (localStorage.getItem('cartData')) {
        localStorage.removeItem('cartData');
      }
      this.cartDataSub.next(this.cartObj);
    }
    getCartData() {
      return localStorage.getItem('cartData');
    }
    getCartDataObservable() {
      this.cartDataSub.next(JSON.parse(this.getCartData() || '{}')== '{}' ?JSON.parse(this.getCartData() || '{}'):this.cartObj);
      return this.cartDataSub.asObservable();
    }
}
