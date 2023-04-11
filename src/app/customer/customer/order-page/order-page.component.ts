import { Component, OnInit } from '@angular/core';
import { CustomerService } from 'src/app/services/customer.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  orders: any;
  orderArray: any = [];
  isLoading: boolean = true;
  isLoaded: boolean = false;
  innerObjectKeys : any =[];
  constructor(private customerService: CustomerService) {    
    // this.fetchOrderData();
   
  }

  async ngOnInit(): Promise<void> {
    this.customerService.getUniqueCustomerOrder();
    const querySnapshot = await this.customerService.getUniqueCustomerOrder();
querySnapshot.forEach((doc) => {
  // console.log(doc.data());
  const transactionId = doc.id
 this.orderArray.push({ ...doc.data(), transactionId})
 console.log(this.orderArray);
  })
  this.listDetails()
}
  async fetchOrderData() {
    this.isLoaded = false;
    this.isLoading = true;

    // this.orders = await this.orderDataService.getOrderData();

    let count = 0;
    for (let orderId in this.orders) {
      count++;

      const orderObj: any = this.orders[orderId];
      const oia = [];

      for (let oi in orderObj.orderedItems) {
        const o = {
          name: orderObj.orderedItems[oi].name,
          price: orderObj.orderedItems[oi].price,
          quantity: orderObj.orderedItems[oi].quantity,
        };
        oia.push(o);
      }

      const obj: any = {
        orderNo: count,
        orderId: orderObj.orderId,
        addedOn: orderObj.addedOn,
        orderedItems: oia,
        totalAmt: orderObj.totalAmt,
      };

      this.orderArray.push(obj);
    }

    // reverse it to show latest order first
    this.orderArray.reverse();

    this.isLoaded = true;
    this.isLoading = false;
  }

  getItemTotalAmount(price: number, quantity: number) {
    return Number(price) * Number(quantity);
  }
  listDetails(){
    for (let order of this.orderArray){
      console.log(order)
    this.innerObjectKeys = Object.keys(order.productDetails.items);
      console.log(this.innerObjectKeys);
    }
  }
}
