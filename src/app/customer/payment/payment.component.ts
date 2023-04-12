import { transition } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PAGE } from 'src/app/utils/constants/constant';
import { Cart } from 'src/app/utils/models/product';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  info: DocumentData = [];
  showError = false;
  paymentHandler: any = null;

  cartObj: Cart | null;
  orderArray: any[] = [];
  vendorArray: any[] = [];
  totalAmt?: string;

  async ngOnInit(): Promise<void> {
    this.invokeStripe();
    this.populateOrderData();
    const snap = await this.customerService.getCustomerProfile();
    if (snap.exists()) {
      this.info = snap.data()

      console.log(this.info)
    }
    this.customerForm = new FormGroup(
      {

        email: new FormControl(this.info['email'], [Validators.required, Validators.email]),
        phone: new FormControl(this.info['phone'], [Validators.required, Validators.minLength(10), Validators.pattern("^[6-9]\\d{9}$")]),
        address: new FormControl(this.info['address'], Validators.required),
        firstName: new FormControl(this.info['firstName'], Validators.required),
        lastName: new FormControl(this.info['lastName'], Validators.required),
        role: new FormControl('customer')
        // category: new FormControl('',Validators.required ),
        // pathToProfilePic: new FormControl('', ),
      }
    )
  }
  customerForm: FormGroup<{
    firstName: FormControl<string | null>,
    lastName: FormControl<string | null>,
    role: FormControl<string | null>,
    email: FormControl<string | null>,
    phone: FormControl<string | null>,
    address: FormControl<string | null>,
    // pathToProfilePic: FormControl<string | null>
  }>;
  constructor(private router: Router, private toastr: ToastrService, private http: HttpClient, private customerService: CustomerService, private cartService: CartService, private authService: AuthService) {
    this.cartObj = JSON.parse(this.cartService.getCartData() || '{}');
    this.customerForm = new FormGroup(
      {

        email: new FormControl('', [Validators.required, Validators.email]),
        phone: new FormControl('', [Validators.required, Validators.minLength(10), Validators.pattern("^[6-9]\\d{9}$")]),
        address: new FormControl('', Validators.required),
        firstName: new FormControl('', Validators.required),
        lastName: new FormControl('', Validators.required),
        role: new FormControl('customer')
        // category: new FormControl('',Validators.required ),
        // pathToProfilePic: new FormControl('', ),
      }
    )
  }

  get controlName() {
    return this.customerForm.controls;
  }
  // onSubmit(){
  //   if (this.customerForm.valid ) {
  //    this.customerService.updateCustomerProfile(this.customerForm.value ) 

  // } else {
  //   console.log("show errors")
  //   this.showError = true;
  // }
  // }

  makePayment(amount: any) {

    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51MvYDjSDEyMQFlUwhQFGtTMIUPIfdtTT6FqapCEZpY59SsZOo18zHrZYjSxaLRhtODNNxQasNCea044aL8c5iKuk00UA2ULGkC',
      locale: 'auto',
      token: async (stripeToken: any) => {
        // console.log(stripeToken);
        // alert('Stripe token generated!');
        const data = {
          customerDetail: this.customerForm.value,
          productDetails: this.cartObj,
          transactionDetails: stripeToken,
          customerId: this.authService.getUserId(),
          transactionTime: new Date().toLocaleString(),
          totalAmt: this.totalAmt,
          vendorArray: this.vendorArray
        }
        // console.log("data",data);

        let boolUpdateProduct: boolean = true;
        let boolTransaction: boolean = true;
        for (let order of this.orderArray) {
          const data = order.quantity
          const productId = order.productId
          boolUpdateProduct = await this.customerService.updateProduct(data, productId)
          if (!boolUpdateProduct) {
            boolTransaction = false
          }
        }
        if (boolTransaction) {
          this.customerService.transactionDone(data, stripeToken.id);
        }
        this.cartService.clearCart();
        this.router.navigate([PAGE.MY_ORDERS]);
      },
    });
    paymentHandler.open({
      name: 'Place Order',
      description: 'Transaction Page',
      amount: amount * 100,
      currency: 'inr',
      email: this.info['email'],
    });
  }
  invokeStripe() {
    if (!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement('script');
      script.id = 'stripe-script';
      script.type = 'text/javascript';
      script.src = 'https://checkout.stripe.com/checkout.js';
      script.onload = () => {

        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51MvYDjSDEyMQFlUwhQFGtTMIUPIfdtTT6FqapCEZpY59SsZOo18zHrZYjSxaLRhtODNNxQasNCea044aL8c5iKuk00UA2ULGkC',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken);
            alert('Payment has been successfull!');
          },
        });
      };

      window.document.body.appendChild(script);
    }

  }


  populateOrderData() {
    if (this.cartObj != null && this.cartObj.items != undefined) {
      const itemD = this.cartObj.items;

      for (let item in itemD) {
        const itemObj = itemD[item];

        const obj = {
          productId: itemObj.productId,
          productName: itemObj.productName,
          userId: itemObj.userId,
          price: itemObj.price,
          pathToPic: itemObj.pathToPic,
          quantity: itemObj.quantity,

        };
        this.orderArray.push(obj);
        this.vendorArray.push(itemObj.userId)
      }
    }
    this.calculateTotalAmount();
    console.log("vendor",this.vendorArray)
  }

  getItemTotalAmount(price: number, quantity: number) {
    return Number(price) * Number(quantity);
  }

  calculateTotalAmount() {
    if (this.cartObj) {
      // this.isCartEmpty = false;
      // this.cartObj = JSON.parse(this.cartService.getCartData()||'{}');
      const GST_Amt = (18 / 100) * Number(this.cartObj.totalAmt);
      this.totalAmt = (Number(this.cartObj.totalAmt) + GST_Amt).toFixed(2);
    }
  }

  goBackToCart() {
    this.router.navigate([PAGE.MY_CART]);
  }
  confirm() {
    this.makePayment(this.totalAmt)
  }
  // xyz(){
  //   const itemD = this.cartObj.items;
  
  //       for (let item in itemD) {
  //         const itemObj = itemD[item];
  // // console.log("itemObj",itemObj)
  
  //         const obj = {
  //           productId: itemObj.productId,
  //           productName: itemObj.productName,
  //           userId: itemObj.userId,
  //           price: itemObj.price,
  //           pathToPic: itemObj.pathToPic,
  //           quantity: itemObj.quantity,
  //           available: itemObj.available
  //         };
  
  //         this.cartArray.push(obj);
  // }
}