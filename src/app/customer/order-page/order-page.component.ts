import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerService } from 'src/app/services/customer.service';
import { PAGE } from 'src/app/utils/constants/constant';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.scss']
})
export class OrderPageComponent implements OnInit {
  @ViewChild('htmlData') htmlData!: ElementRef;
  orders: any;
  orderArray: any = [];
  orderDetail: any = [];
  isLoading = true;
  isLoaded = false;
  innerObjectKeys : any =[];
  page = 1;
  itemsPerPage = 6;
  totalItems ?: number; 
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
    for (const order of this.orderArray){
      console.log(order)
    this.innerObjectKeys = Object.keys(order.productDetails.items);
      console.log(this.innerObjectKeys);
      const oiArray: any[] = [];
      for(const oi of this.innerObjectKeys){

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
    this.totalItems = this.orderDetail.length
  }
  addReviews(productId:string){
    this.router.navigate([`${PAGE.ADD_REVIEWS}/${productId}`]);
  }
  handlePageChange(event : number) {
    // console.log(event);
    this.page = event;
  }
  public openPDF(): void {
    const DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('ecommerce-invoice.pdf');
    });
  }
}
