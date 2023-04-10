import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentData } from 'firebase/firestore';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { CustomerService } from 'src/app/services/customer.service';
import { defaultImage } from 'src/app/utils/constants/constant';
import { Cart } from 'src/app/utils/models/product';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  isLoading = true;
  productId : string|null ='';
  info:DocumentData = [];
  item: any;
  defaultImage = defaultImage;
  cartData ?:Cart|null;
  constructor(private fireStorage : AngularFireStorage ,private router: Router ,private toastr: ToastrService, private http: HttpClient, private customerService : CustomerService , private authService :AuthService , private cartService : CartService , private activatedRoute : ActivatedRoute){}
  async ngOnInit(): Promise<void> {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id');
    console.log( this.productId);
    if( this.productId){
      const snap = await this.customerService.getUniqueProduct( this.productId);
      if (snap.exists()) {
               this.info = snap.data()      
               this.item = snap.data()      
               this.item.productId = this.productId;
               this.mergeItemAndCartData()
              console.log(this.info)   
          }
        }
        this.isLoading = false;
        }

          onAdd(item: any) {
            console.log(item)
            item.quantity += 1; 
            this.cartService.addOrUpdate(item);    
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
             if (
               itemDetailsObj?.quantity 
             ) {
               count = this.cartData?.items[id]?.quantity;
             }
           }
       // console.log("run")
           this.item.quantity=count;
           // console.log(this.foodList)
         }
}
