import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PAGE, defaultImage } from 'src/app/utils/constants/constant';
import { Cart } from 'src/app/utils/models/product';

@Component({
  selector: 'app-vendor-product-detail',
  templateUrl: './vendor-product-detail.component.html',
  styleUrls: ['./vendor-product-detail.component.scss']
})
export class VendorProductDetailComponent implements OnInit {
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
    private customerService: CustomerService,
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router : Router
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
     
      })
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
  editProduct(productId:string){
    this.router.navigate([`${PAGE.UPDATE_ITEM}/${productId}`]);
  }
  homePage(){
    this.router.navigate([PAGE.HOME]);
  }
}
