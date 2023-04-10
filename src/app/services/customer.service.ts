import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { getDoc, doc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/environment';
import { PAGE } from '../utils/constants/constant';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 
  userId = this.authService.userId;
  constructor(private fireStorage : AngularFireStorage ,private router: Router , private authService : AuthService ,private db : AngularFirestore) {
    if(!this.userId){

      this.userId = authService.getUserId();
    }
   }

  async getCustomerProfile(){

    return await getDoc(doc(db, 'user', this.userId)) 
  }
  async updateCustomerProfile(data:any ){    
    if(this.userId){
      const ref = doc(db,`user`, this.userId);   
  
      await updateDoc(ref,data)
  this.router.navigate([PAGE.VENDOR_HOME]);
    }   
}
getAllProducts(){
  const querySnapshot = query(collection(db, "product"))
  return getDocs(querySnapshot);
}
async getUniqueProduct(productId : string){
  return await getDoc(doc(db, 'product', productId))
   
  }
}
