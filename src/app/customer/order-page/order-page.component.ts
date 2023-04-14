import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { PAGE } from 'src/app/utils/constants/constant';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  orders: any;
  orderArray: any = [];
  orderDetail: any = [];
  isLoading: boolean = true;
  isLoaded: boolean = false;
  innerObjectKeys : any =[];
  constructor(private customerService: CustomerService , private router : Router) {    
    // this.fetchOrderData();
   
  }

  async ngOnInit(): Promise<void> {
    // this.customerService.getUniqueCustomerOrder();
    const querySnapshot = await this.customerService.getUniqueCustomerOrder();
querySnapshot.forEach((doc) => {
  // console.log(doc.data());
  const transactionId = doc.id
 this.orderArray.push({ ...doc.data(), transactionId})
 console.log(this.orderArray);
  })
  this.listDetails()
}
 

  getItemTotalAmount(price: number, quantity: number) {
    return Number(price) * Number(quantity);
  }
  listDetails(){
    for (let order of this.orderArray){
      console.log(order)
    this.innerObjectKeys = Object.keys(order.productDetails.items);
      console.log(this.innerObjectKeys);
      const oiArray: any[] = [];
      for(let oi of this.innerObjectKeys){

        const orderObj = {
          
          productId: order.productDetails.items[oi].productId,
          productName: order.productDetails.items[oi].productName,
          price: order.productDetails.items[oi].price,
          quantity: order.productDetails.items[oi].quantity,
          pathToPic: order.productDetails.items[oi].pathToPic,

          // totalAmt:order.productDetails.totalAmt,
        };
        oiArray.push(orderObj);
      }
     const obj : any = {
      transactionId:order.transactionId,
      transactionTime:order.transactionTime,
      totalAmt:order.totalAmt,
      orderedItems: oiArray,
      subTotalAmt:order.productDetails.totalAmt,
     }
     this.orderDetail.push(obj)
    }
    this.orderDetail.reverse();
  }
  addReviews(productId:string){
    this.router.navigate([`${PAGE.ADD_REVIEWS}/${productId}`]);
  }
}
