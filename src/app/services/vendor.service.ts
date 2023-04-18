import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AuthService } from './auth.service';
import {
  AngularFirestore,
  DocumentData,
  QueryDocumentSnapshot,
} from '@angular/fire/compat/firestore';
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from 'src/environment';
import { Router } from '@angular/router';
import { PAGE } from '../utils/constants/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VendorService {
  userId = this.authService.userId;

  constructor(
    private fireStorage: AngularFireStorage,
    private router: Router,
    private authService: AuthService,
    private db: AngularFirestore
  ) {
    // if (!this.userId) {
      this.userId = authService.getUserId();
    // }
  }
  //product fn
  async uploadImage(path: any, file: any) {
    return await this.fireStorage.upload(path, file);
  }
  async addNewProduct(data: any) {
    const ref = doc(collection(db, `product`));
    await setDoc(ref, data);
    this.router.navigate([PAGE.VENDOR_HOME]);
    //     this.getUserData()
  }
  async updateProduct(data: any, productId: string | null) {
    if (productId) {
      const ref = doc(db, `product`, productId);
      await updateDoc(ref, data);
      this.router.navigate([PAGE.VENDOR_HOME]);
    }
    //     this.getUserData()
  }

  async deleteProduct(productId: string) {
    const ref = doc(db, `product`, productId);
    await deleteDoc(ref);
    // this.router.navigate([PAGE.VENDOR_HOME]);
  }
  async getVendorAllProduct() {
    const querySnapshot = await getDocs(collection(db, 'product'));
    querySnapshot.forEach((doc) => {
      // console.log(`${doc.id} => ${doc.data()}`);
      const info = doc.data();
      if (info['userId'] == this.userId) {
        console.log(info);
      }
    });
  }
  async getUniqueProduct(productId: string) {
    return await getDoc(doc(db, 'product', productId));
  }
  //vendor details fn
  getUniqueVendor() {
    const querySnapshot = query(
      collection(db, 'product'),
      where('userId', '==', this.userId)
    );
    return getDocs(querySnapshot);
  }

  async getVendorProfile() {
    return await getDoc(doc(db, 'vendor', this.userId));
  }
  async updateVendorProfile(data: any) {
    if (this.userId) {
      const ref = doc(db, `vendor`, this.userId);

      await updateDoc(ref, data);
      this.router.navigate([PAGE.VENDOR_HOME]);
    }
  }
  // order fn
  async getUniqueVendorOrder() {
    const querySnapshot = query(
      collection(db, 'transaction'),
      where('vendorArray', 'array-contains', this.userId)
    );
    return getDocs(querySnapshot);
  }
  deliverOrderStatus(transactionId: string) {
    this.db
      .collection('transaction')
      .doc(transactionId)
      .update({ orderStatus: 'Delivered' });
  }
  //reviews fn
  getReviewsByProductId(productId: string | null) {
    const querySnapshot = query(
      collection(db, 'reviews'),
      where('productId', '==', productId)
    );
    return getDocs(querySnapshot);
  }
 
}
