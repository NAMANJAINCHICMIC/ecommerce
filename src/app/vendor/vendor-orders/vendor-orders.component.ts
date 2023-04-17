import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-vendor-orders',
  templateUrl: './vendor-orders.component.html',
  styleUrls: ['./vendor-orders.component.scss'],
})
export class VendorOrdersComponent implements OnInit {
  myself:any
  orders: any;
  orderArray: any = [];
  orderDetail: any = [];
  isLoading: boolean = true;
  isLoaded: boolean = false;
  innerObjectKeys: any = [];
  userId = this.authService.getUserId();
  page = 1;
  itemsPerPage = 6;
  totalItems ?: number; 
  constructor(
    private vendorService: VendorService,
    private authService: AuthService
  ) {}
  async ngOnInit(): Promise<void> {
    const querySnapshot = await this.vendorService.getUniqueVendorOrder();
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      const transactionId = doc.id;
      this.orderArray.push({ ...doc.data(), transactionId });
      console.log(this.orderArray);
    });
    this.listDetails();
    //   const productId = doc.id
    //  this.productList.push({ ...doc.data(), productId})
    //  console.log(this.productList);

    // throw new Error('Method not implemented.');
  }

  getItemTotalAmount(price: number, quantity: number) {
    return Number(price) * Number(quantity);
  }
  listDetails() {
    for (let order of this.orderArray) {
      console.log(order);
      this.innerObjectKeys = Object.keys(order.productDetails.items);
      console.log(this.innerObjectKeys);
      const oiArray: any[] = [];
      let amt: number = 0;
      for (let oi of this.innerObjectKeys) {
        if (order.productDetails.items[oi].userId == this.userId) {
          const orderObj = {
            productName: order.productDetails.items[oi].productName,
            price: order.productDetails.items[oi].price,
            quantity: order.productDetails.items[oi].quantity,
            // totalAmt:order.productDetails.totalAmt,
          };
          oiArray.push(orderObj);
          amt += this.getItemTotalAmount(order.productDetails.items[oi].price, order.productDetails.items[oi].quantity)
          // amt += order.productDetails.items[oi].price;
        }
      }
      const obj: any = {
        transactionId: order.transactionId,
        transactionTime: order.transactionTime,
        customerDetail:order.customerDetail,
        // totalAmt: amt,
        // totalAmt: order.totalAmt,
        orderedItems: oiArray,
        totalAmt: amt,
      };
      this.orderDetail.push(obj);
    }
    this.orderDetail.reverse();
    this.totalItems = this.orderDetail.length
  }
  handlePageChange(event : number) {
    // console.log(event);
    this.page = event;
  }
  // getCartTotalAmount(price: number, add: boolean): number {
  //   let amt: number;

  //   amt += price;
  //   if (add == true) {
  //     amt = Number(this.cartObj?.totalAmt) + Number(price);
  //   } else {
  //     amt = Number(this.cartObj?.totalAmt) - Number(price);
  //   }
  //   return amt;
  // }
}
