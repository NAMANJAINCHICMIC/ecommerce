import { Injectable } from '@angular/core';
import { AngularFirestore  } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { getDoc, doc, updateDoc, collection, getDocs, query, where, orderBy, limit , FieldValue , arrayUnion , arrayRemove, setDoc} from 'firebase/firestore';
import { db } from 'src/environment';
import { PAGE } from '../utils/constants/constant';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { Observable, switchMap, combineLatest } from 'rxjs';
import { Product } from '../utils/models/product';
// import firebase from 'firebase/app';
// import 'firebase/firestore';

// const arrayUnion = firebase.firestore.FieldValue.arrayUnion;
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
  async getCustomerProfileByUserId(userId:string){

    return await getDoc(doc(db, 'user', userId)) 
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
 reviews(data: any , transactionId : string) {
    if (!this.userId) {
        this.userId = this.authService.getUserId();
    }
    // const ref = this.db.doc(`user/${this.userId}/vendor/${this.userId}`);   
    const ref = this.db.doc(`reviews/${transactionId}`);
    ref.set(data);
    // this.router.navigate([PAGE.VENDOR_HOME]);
    // this.getUserData()
}
async addNewReview(data:any){
 
      const ref = doc(collection(db,`reviews`));   
        
           await setDoc(ref,data)
      // this.router.navigate([PAGE.VENDOR_HOME]);

}
recentlyViewing(productId:string ) {
  if (!this.userId) {
      this.userId = this.authService.getUserId();
  }
  // const ref = this.db.doc(`user/${this.userId}/vendor/${this.userId}`);   
  const ref = this.db.doc(`recentlyView/${this.userId}`);
  ref.set(productId);
  
}
cartData(data:any ) {
  if (!this.userId) {
      this.userId = this.authService.getUserId();
  }
  // const ref = this.db.doc(`user/${this.userId}/vendor/${this.userId}`);   
  const ref = this.db.doc(`cartData/${this.userId}`);
  ref.set(data);
  
}
getUniqueCustomerOrder(){
  const querySnapshot = query(collection(db, "transaction") , where('customerId', '==', this.userId ,))
  return getDocs(querySnapshot);
}
  async addRecentlyViewed(productId: string): Promise<void> {
  const userId = this.authService.getUserId();
  const timestamp = new Date().getTime();
  const snap = await this.getViewRecently();
    if (snap.exists()){
      this.db.doc(`recentlyViewed/${userId}`).update({  myArray: arrayUnion(productId) });
    }
    else{

      // this.db.doc(`recentlyViewed/${userId}`).set({ productId , timestamp });
      const ref =  this.db.doc(`recentlyViewed/${userId}`)
      
      ref.set({  myArray: arrayUnion(productId) });
    }

    this.db.doc(`recentlyViewed/${userId}`).update({  myArray: arrayUnion(productId) });

}
deleteRecentlyViewed(productId: string){
  const userId = this.authService.getUserId();
  this.db.doc(`recentlyViewed/${userId}`).update({  myArray: arrayRemove(productId) });
}
getRecentlyViewed() {
  const userId = this.authService.getUserId();
  // const docRef = this.db.collection('recentlyViewed').doc(this.userId );
  // docRef.update({
  //   myArray: arrayUnion('newElement')
  // })
  // const querySnapshot =  query(collection(db, `recentlyViewed`) , orderBy('timestamp', 'desc'),limit(5))
  const querySnapshot =  query(collection(db, `recentlyViewed`))
 return  getDocs(querySnapshot)

}
  async getViewRecently(){
  return await getDoc(doc(db, 'recentlyViewed', this.userId))
}
//   async getRecentProduct(){
//     let recentArray: never[] = []
//   const recentlyViewedCollection = await this.getRecentlyViewed()
//   const productIds$ = recentlyViewedCollection.forEach((doc) => {
//     const transactionId = doc.id
//     const ref = doc.data();
//     recentArray = ref['myArray']
   
//     })
//   const s =   switchMap(actions => {
//       const productIds = recentArray
//       return combineLatest(productIds.map((productId:string) => this.getProductById(productId)));
//     })
//   // return productIds$;
//   return s;
// }
 getProductById(productId: string) {
  return this.db.collection('product').doc(productId)
}
getReviewsByProductId(productId: string | null){
  const querySnapshot = query(collection(db, "reviews") , where('productId', '==', productId ,))
  return getDocs(querySnapshot);
}
 searchQuery(productName: string){
  const querySnapshot = query(collection(db, "product"),where('productName', '>', productName), where('productName', '<', `${productName}z`))
  return getDocs(querySnapshot);
  // const collectionRef = firebase.firestore().collection('collectionName');
  // const query = collectionRef.where('fieldName', 'contains', 'searchQuery');
  // const querySnapshot = query(collection(db, "transaction") , where('vendorArray', 'array-contains', this.userId));
  // return getDocs(querySnapshot);
}
}
