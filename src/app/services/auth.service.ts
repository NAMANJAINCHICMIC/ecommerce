import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { doc, setDoc } from "firebase/firestore"; 
import { AUTH_URL, environment } from 'src/environment';
import { PAGE } from '../utils/constants/constant';
// import { AngularFireStore } from '@angular/fire/store';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from 'src/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
userId ?:any;
 store ?: AngularFirestoreDocument<any>;
tutorial ?:any;
    constructor(private http: HttpClient ,private router: Router , private db : AngularFirestore) { 
      

    }
    storeUserId(userId:string){
        localStorage.setItem('userId', userId)
    }
    getUserId(){
        return localStorage.getItem('userId')
    }
    storeToken(tokenValue: string) {
        localStorage.setItem('token', tokenValue)
    }
    getToken() {
        return localStorage.getItem('token')
    }
    isNotLoggedIn(): boolean {
        return !localStorage.getItem('token')
    }
    enterProfile(data:any){
        return this.http.post(
            AUTH_URL +'user.json',
                data
            
          );
    }
    profileDetail(data:any){
        if(!this.userId){
        this.userId = this.getUserId();
    }
        const ref = this.db.doc(`user/${this.userId}`);   
        ref.set(data);
        // this.store = this.db.doc('userrole');
        // this.store.set({ title: 'zkoder Tutorial'});
// tutorialsRef.add({ ...tutorial });
this.router.navigate([PAGE.HOME]);
    }
    async getProfile(){
        // const data = this.db.collection('user/');
        // console.log(data)
        const querySnapshot = await getDocs(collection(db, "user"));
querySnapshot.forEach((doc) => {
//   console.log(`${doc.id} => ${doc.data() }`);
  console.log(doc.data());
});

    }
}
