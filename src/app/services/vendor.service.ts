import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { doc, getDoc, setDoc , collection, getDocs } from "firebase/firestore"; 
import { db } from 'src/environment';
import { Router } from '@angular/router';
import { PAGE } from '../utils/constants/constant';

@Injectable({
  providedIn: 'root'
})
export class VendorService {
 
   userId = this.authService.getUserId();

  constructor(private fireStorage : AngularFireStorage ,private router: Router , private authService : AuthService ,private db : AngularFirestore) { }
  async uploadImage(path: any , file : any ){
return await this.fireStorage.upload(path,file)
  }
  async addNewProduct(data:any){
    // if(!this.userId){
    //     this.userId = this.getUserId();
    // }
    //     // const ref = this.db.doc(`user/${this.userId}/vendor/${this.userId}`);   
        const ref = doc(collection(db,`product`));   
          
             await setDoc(ref,data)
        this.router.navigate([PAGE.VENDOR_HOME]);
    //     this.getUserData()
}
  async getVendorAllProduct(){

const querySnapshot = await getDocs(collection(db, "product"));
querySnapshot.forEach((doc) => {
  // console.log(`${doc.id} => ${doc.data()}`);
  const info = doc.data()
 
 if(info['userId'] == this.userId){
  console.log(info);
 }
});
}
}
