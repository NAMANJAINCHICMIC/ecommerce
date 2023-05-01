import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import {
  getDoc,
  doc,
  updateDoc,
  collection,
  getDocs,
  query,
  where,
  arrayUnion,
  arrayRemove,
  setDoc,
} from 'firebase/firestore';
import { db } from 'src/environment';
import { PAGE } from '../utils/constants/constant';
import { AuthService } from './auth.service';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  searchString = new Subject<string>();
  userId = this.authService.userId;
  constructor(
    private router: Router,
    private authService: AuthService,
    private db: AngularFirestore
  ) {
   
      this.userId = authService.getUserId();
   
  }
  //customer profile fn
  async getCustomerProfile() {
    this.userId = this.authService.getUserId();
    return await getDoc(doc(db, 'user', this.userId));
  }
  async getCustomerProfileByUserId(userId: string) {
    return await getDoc(doc(db, 'user', userId));
  }
  async updateCustomerProfile(data: FormGroup) {
    this.userId = this.authService.getUserId();
    if (this.userId) {
      const ref = doc(db, `user`, this.userId);

      await updateDoc(ref, data.value);
      this.router.navigate([PAGE.VENDOR_HOME]);
    }
  }
  //product detail fn
  getAllProducts() {
    const querySnapshot = query(collection(db, 'product'));
    return getDocs(querySnapshot);
  }
  async getUniqueProduct(productId: string) {
    return await getDoc(doc(db, 'product', productId));
  }

  // update the quantity of the product
  async updateProduct(data: any, productId: string) {
await this.getUniqueProduct(productId).then(
      async (snap)=>{
    if (snap.exists()) {
      const info = snap.data();
      const count = info['available'];
     
      if (count >= data) {   
        const available = count - data;
        const docRef = this.db.collection('product').doc(productId);
        docRef.update({
          available: `${available.toString()}`,
        });
        return true;
      } else {
        Swal.fire('product is out of stock!!', 'You Are Late!');
        // this.toastr.info("No more stock is available for the Product")
      }
    }
    return false;
  }).catch((err) => {
    // console.log('err',err);
    // alert( err.message)
    Swal.fire(
      `Error ${err.code}`,
      err.message,
      'error'
      )
    })
  }
//transaction fn
  transactionDone(data: any, transactionId: string) {
   
    const ref = this.db.doc(`transaction/${transactionId}`);
    ref.set(data).catch((err) => {
      // console.log('err',err);
      // alert( err.message)
      Swal.fire(
          `Error ${err.code}`,
          err.message,
          'error'
          )
  });  
  }
  //add Reviews and rating
  async addNewReview(data: {
    comment: any;
    rating: number;
    productId: string | null;
    userId: string | null;
}) {
    const ref = doc(collection(db, `reviews`));
    await setDoc(ref, data).catch((err) => {
      // console.log('err',err);
      // alert( err.message)
      Swal.fire(
          `Error ${err.code}`,
          err.message,
          'error'
          )
  });
  }
  async updateReview(data: {
    comment: any;
    rating: number;
    productId: string | null;
    userId: string | null;
},reviewId:string) {
    const ref = doc(db, `reviews`,reviewId);
    // const ref = doc(db, `user`, this.userId);

    await updateDoc(ref, data).catch((err) => {
      // console.log('err',err);
      // alert( err.message)
      Swal.fire(
          `Error ${err.code}`,
          err.message,
          'error'
          )
  });
  }
  getReviewsByProductId(productId: string | null) {
    const querySnapshot = query(
      collection(db, 'reviews'),
      where('productId', '==', productId)
    );
    return getDocs(querySnapshot).catch((err) => {
      // console.log('err',err);
      // alert( err.message)
      Swal.fire(
          `Error ${err.code}`,
          err.message,
          'error'
          )
  });
  }
  getReviewsByProductIdUserId(productId: string | null) {
    this.userId = this.authService.getUserId();
    const querySnapshot = query(
      collection(db, 'reviews'),
      where('productId', '==', productId),where('userId','==',this.userId)
    );
    return getDocs(querySnapshot).catch((err) => {
      // console.log('err',err);
      // alert( err.message)
      Swal.fire(
          `Error ${err.code}`,
          err.message,
          'error'
          )
  });
  }

  async addRecentlyViewed(productId: string): Promise<void> {
    const userId = this.authService.getUserId();
    // this.userId = this.authService.getUserId();
    // const timestamp = new Date().getTime();
    const snap = await this.getViewRecently();
    if(snap){
    if (snap.exists()) {
      this.db
        .doc(`recentlyViewed/${userId}`)
        .update({ myArray: arrayUnion(productId) }).catch((err) => {
          // console.log('err',err);
          // alert( err.message)
          Swal.fire(
              `Error ${err.code}`,
              err.message,
              'error'
              )
      });
    } else {
      const ref = this.db.doc(`recentlyViewed/${userId}`);
      ref.set({ myArray: arrayUnion(productId) }).catch((err) => {
        // console.log('err',err);
        // alert( err.message)
        Swal.fire(
            `Error ${err.code}`,
            err.message,
            'error'
            )
    });
    }
  }
    this.db
      .doc(`recentlyViewed/${userId}`)
      .update({ myArray: arrayUnion(productId) }).catch((err) => {
        // console.log('err',err);
        // alert( err.message)
        Swal.fire(
            `Error ${err.code}`,
            err.message,
            'error'
            )
    });
  }
  deleteRecentlyViewed(productId: string) {
    const userId = this.authService.getUserId();
    this.db
      .doc(`recentlyViewed/${userId}`)
      .update({ myArray: arrayRemove(productId) }).catch((err) => {
        // console.log('err',err);
        // alert( err.message)
        Swal.fire(
            `Error ${err.code}`,
            err.message,
            'error'
            )
    });
  }
  async getViewRecently() {
    this.userId = this.authService.getUserId();
    return await getDoc(doc(db, 'recentlyViewed', this.userId)).catch((err) => {
      // console.log('err',err);
      // alert( err.message)
      Swal.fire(
          `Error ${err.code}`,
          err.message,
          'error'
          )
  });
  }
  //order functions
  getUniqueCustomerOrder() {
    this.userId = this.authService.getUserId();
    const querySnapshot = query(
      collection(db, 'transaction'),
      where('customerId', '==', this.userId)
    );
    return getDocs(querySnapshot);
  }
  cancelOrderStatus(transactionId: string) {
    this.db
      .collection('transaction')
      .doc(transactionId)
      .update({ orderStatus: 'Cancelled' });
  }
  returnOrderStatus(transactionId: string) {
    this.db
      .collection('transaction')
      .doc(transactionId)
      .update({ orderStatus: 'Returned' });
  }
}

 // getRecentlyViewed() {
  //   const querySnapshot = query(collection(db, `recentlyViewed`));
  //   return getDocs(querySnapshot);
  // }

    // reviews(data: any, transactionId: string) {
  //   if (!this.userId) {
  //     this.userId = this.authService.getUserId();
  //   }
  
  //   const ref = this.db.doc(`reviews/${transactionId}`);
  //   ref.set(data);
   
  // }
  // cartData(data: any) {
  //   if (!this.userId) {
  //     this.userId = this.authService.getUserId();
  //   }
  //   const ref = this.db.doc(`cartData/${this.userId}`);
  //   ref.set(data);
  // }
 
  // recentlyViewing(productId: string) {
  //   if (!this.userId) {
  //     this.userId = this.authService.getUserId();
  //   }
  //   const ref = this.db.doc(`recentlyView/${this.userId}`);
  //   ref.set(productId);
  // }

    // getProductById(productId: string) {
  //   return this.db.collection('product').doc(productId);
  // }
 