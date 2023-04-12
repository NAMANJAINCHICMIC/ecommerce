import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { getDoc, doc, updateDoc, collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/environment';
import { PAGE } from '../utils/constants/constant';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';

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
  async updateProduct(data:any , productId:string){
    const snap = await this.getUniqueProduct( productId);
    if (snap.exists()) {
             const info = snap.data()      
        const count = info['available']
        // console.log("data",data)
        // console.log("count",count)
        if(count >= data){
          const ref = doc(db,`product`, productId);   
          const available = count - data
          // console.log("available",available)
          // await updateDoc(ref,['available']:available)
          const docRef = this.db.collection('product').doc(productId);
          docRef.update({
            available: `${available.toString()}`
          })
          return true;
        }else{
          Swal.fire(
"product is out of stock!!","You Are Late!"
)
// this.toastr.info("No more stock is available for the Product")
}
}
return false;
  }

 transactionDone(data: any , transactionId : string) {
    if (!this.userId) {
        this.userId = this.authService.getUserId();
    }
    // const ref = this.db.doc(`user/${this.userId}/vendor/${this.userId}`);   
    const ref = this.db.doc(`transaction/${transactionId}`);
    ref.set(data);
    // this.router.navigate([PAGE.VENDOR_HOME]);
    // this.getUserData()
}
getUniqueCustomerOrder(){
  const querySnapshot = query(collection(db, "transaction") , where('customerId', '==', this.userId))
  return getDocs(querySnapshot);
}

}
