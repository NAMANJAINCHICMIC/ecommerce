import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { PAGE, defaultImage } from 'src/app/utils/constants/constant';


@Component({
  selector: 'app-add-reviews',
  templateUrl: './add-reviews.component.html',
  styleUrls: ['./add-reviews.component.scss']
})
export class AddReviewsComponent implements OnInit {
  isLoading = true;
  productId : string|null ='';
  userId:string|null ;
  item: any;
  defaultImage = defaultImage;
  snackBarDuration = 2000;
  ratingArr: Array<any>= [];
 

  rating = 3;
  starCount = 5;

  constructor(private fireStorage : AngularFireStorage ,private router: Router ,private toastr: ToastrService, private http: HttpClient, private customerService : CustomerService , private authService :AuthService , private cartService : CartService , private activatedRoute : ActivatedRoute){
    this.userId = this.authService.getUserId();

  }
  async ngOnInit(): Promise<void> {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log( this.productId);
    if( this.productId){
      const snap = await this.customerService.getUniqueProduct( this.productId);
      if (snap.exists()) {
               
               this.item = snap.data()      
               this.item.productId = this.productId;
              
              // console.log(this.info)   
          }
        }
        this.isLoading = false;
        console.log("a "+this.starCount)
        for (let index = 0; index < this.starCount; index++) {
          this.ratingArr.push(index);
        }
        }



 

  // onRatingChanged(rating: number){
  //   console.log(rating);
  //   this.rating = rating;
  // }

 
  onClick(rating:number) {
    console.log(rating)
   this.rating = rating
    // this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }
  onSubmit(form:any) {
    console.log(form.value);
    const obj = {
      comment : form.value.comment,
      rating :this.rating,
      productId:this.productId,
      userId:this.userId
    }
    this.customerService.addNewReview(obj);
    this.router.navigate([PAGE.HOME]);
  }
}

