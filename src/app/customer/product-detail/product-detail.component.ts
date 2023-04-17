import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PAGE, defaultImage } from 'src/app/utils/constants/constant';
import { Cart } from 'src/app/utils/models/product';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  isLoading = true;
rating = 0;
numbers = [1, 2, 3, 4, 5];
  productId: string | null = '';
  info: DocumentData = [];
  item: any;
  defaultImage = defaultImage;
  cartData?: Cart | null;
  reviewArray : Array<any> =[]

  constructor(
    private fireStorage: AngularFireStorage,
    private router: Router,
    private toastr: ToastrService,
    private http: HttpClient,
    private customerService: CustomerService,
    private authService: AuthService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute
  ) {}
  async ngOnInit(): Promise<void> {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.productId);
    if (this.productId) {
      const snap = await this.customerService.getUniqueProduct(this.productId);
      if (snap.exists()) {
        this.info = snap.data();
        this.item = snap.data();
        this.item.productId = this.productId;
        this.mergeItemAndCartData();
        // console.log(this.info)
      }
    }
    this.isLoading = false;

    const querySnapshot = await this.customerService.getReviewsByProductId(this.productId);
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      if(doc.data()){

        const ref = doc.data()
        this.reviewArray.push(ref)
        // this.item.comment = ref['comment']
        this.updateReviewArray()
        console.log(this.reviewArray);
      }
      // const transactionId = doc.id
    //  this.orderArray.push({ ...doc.data(), transactionId})
    //  console.log(this.orderArray);
      })
  }

  onAdd(item: any) {
    if (+item.available > item.quantity) {
      // console.log(item)
      item.quantity += 1;

      this.cartService.addOrUpdate(item);
    } else {
      Swal.fire('No more stock is available for the Product');
      // this.toastr.info("No more stock is available for the Product")
    }
  }
  onRemove(item: any) {
    item.quantity -= 1;
    this.cartService.removeItem(item);
  }

  fetchCartData() {
    this.cartData = this.cartService.getCartDataConverted();
  }

  mergeItemAndCartData() {
    this.fetchCartData();

    let count = 0;
    const id = this.item?.productId;

    if (this.cartData) {
      const itemDetailsObj = this.cartData?.items[id];
      if (itemDetailsObj?.quantity) {
        count = this.cartData?.items[id]?.quantity;
      }
    }
    // console.log("run")
    this.item.quantity = count;
    // console.log(this.foodList)
  }
  async updateReviewArray(){
for(const i in this.reviewArray){
//  console.log(this.reviewArray[i].comment)
 
   const snap = await this.customerService.getCustomerProfileByUserId(this.reviewArray[i].userId);
 
   if (snap.exists()) {
              this.info = snap.data() ;
   
            //  console.log(this.info)   
             this.reviewArray[i].fullName = `${this.info['firstName']} ${this.info['lastName']}`;
            }
            this.rating += +this.reviewArray[i].rating;
  }
  const len = this.reviewArray.length
  if(len){

    this.rating /=  len
  }
  }
  ratingArr: Array<any>= [];

  showIcon(index:number) {
    if (this.rating >= index ) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  showIconUniqueUser(index:number,rating:number){
    if (rating >= index ) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  homePage(){
    this.router.navigate([PAGE.HOME]);
  }
}
