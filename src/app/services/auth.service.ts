import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { doc, getDoc, setDoc } from "firebase/firestore"; 
import { AUTH_URL, environment ,auth} from 'src/environment';
import { PAGE } from '../utils/constants/constant';
// import { AngularFireStore } from '@angular/fire/store';
import { collection, getDocs } from "firebase/firestore"; 
import { db } from 'src/environment';
import { getAuth, signOut } from "firebase/auth";
@Injectable({
    providedIn: 'root'
})
export class AuthService {
userId ?:any;
role :any;
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
    storeRole(role:string){
        localStorage.setItem('role', role)
    }
    getRole(){
        return localStorage.getItem('role')
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
        // const ref = this.db.doc(`user/${this.userId}/customer/${this.userId}`);   
        ref.set(data);
        // this.store = this.db.doc('userrole');
        // this.store.set({ title: 'zkoder Tutorial'});
// tutorialsRef.add({ ...tutorial });
this.router.navigate([PAGE.HOME]);
    }
    vendorProfileDetail(data:any){
        if(!this.userId){
            this.userId = this.getUserId();
        }
            // const ref = this.db.doc(`user/${this.userId}/vendor/${this.userId}`);   
            const ref = this.db.doc(`vendor/${this.userId}`);   
            ref.set(data);           
            // this.router.navigate([PAGE.VENDOR_HOME]);
            this.getUserData()
    }
   async  getProfile(){
    if(!this.userId){
        this.userId = this.getUserId();
    }
    // console.log(this.userId)
        // const data = this.db.collection('user/');
        // console.log(data)
        // const querySnapshot = await getDocs(collection(db, "user"));
        const querySnapshot = await getDocs(collection(db, this.userId ,'customer',this.userId));
        console.log(querySnapshot);
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} =>  `);
//   console.log(`${doc.id} => ${doc.data() }`);
  console.log(doc.data());
  console.log(doc.exists);
});

    }
    signOutFn(){
        // const auth = getAuth();
        localStorage.clear();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("sign-out")
          }).catch((error) => {
            // An error happened.
            console.log(error)
          });
          this.router.navigate([PAGE.SIGN_IN]);
    }
    async getUserData(){
        if(!this.userId){
            this.userId = this.getUserId();
        }
        console.log(this.userId)
//  return getDocs(collection(db, this.userId ,'vendor',this.userId));
//  return getDoc(doc(db, this.userId ,'vendor',this.userId));

let snap = await getDoc(doc(db, 'user', this.userId))
// const snap = await getDocs(collection(db, this.userId ,'vendor',this.userId));
console.log(snap)
if (snap.exists()) {
    
  console.log(snap.data())
  
  const info = snap.data()
  this.role = info['role'];
  this.storeRole(info['role']);
  console.log(this.role)
  this.router.navigate([PAGE.HOME]);
}
else {
    snap = await getDoc(doc(db, 'vendor', this.userId))
    if (snap.exists()) {
        console.log(snap.data())
         
  const info = snap.data()
  this.role = info['role'];
  this.storeRole(info['role']);
  console.log(this.role)
  this.router.navigate([PAGE.VENDOR_HOME]);
      }else{
        console.log("No Document exists")
      }
}
    }
}
