import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { doc, getDoc,  } from "firebase/firestore";
import { AUTH_URL,  auth } from 'src/environment';
import { PAGE } from '../utils/constants/constant';
// import { AngularFireStore } from '@angular/fire/store';
import { collection, getDocs } from "firebase/firestore";
import { db } from 'src/environment';
import { signOut } from "firebase/auth";
import { FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { catchError, throwError } from 'rxjs';
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    userId?: any;
    role: any;
    store?: AngularFirestoreDocument<any>;
    tutorial?: any;

    constructor(private http: HttpClient, private router: Router, private db: AngularFirestore) {


    }
    // locolStorage Fn
    storeUserId(userId: string) {
        localStorage.setItem('userId', userId)
    }
    getUserId() {
        return localStorage.getItem('userId')
    }
    storeUserName(userName: string) {
        localStorage.setItem('userName', userName)
    }
    getUserName() {
        return localStorage.getItem('userName')
    }
    storeRole(role: string) {
        localStorage.setItem('role', role)
    }
    getRole() {
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
//user profile
   
    async profileDetail(data: FormGroup) {
        if (!this.userId) {
            this.userId = this.getUserId();
        }
        const boolValue = await this.checkUserExist(data.value.phone)
        if(boolValue != null){

            if(!boolValue){
                const ref = this.db.doc(`user/${data.value.phone}`);
                // const ref = this.db.doc(`user/${this.userId}`);
                
                ref.set(data.value);
                
                
                // this.getUserData() 
            }else{
                this.router.navigate([PAGE.SIGN_IN]);
            }
        }
    }
    async vendorProfileDetail(data: FormGroup) {
        if (!this.userId) {
            this.userId = this.getUserId();
        }
    console.log(data.value.phone)
    const boolValue = await this.checkUserExist(data.value.phone);
    if(boolValue != null){
    if(!boolValue){

        const ref = this.db.doc(`vendor/${data.value.phone}`);
        ref.set(data.value);
    
        // this.getUserData()
    }else{
        this.router.navigate([PAGE.SIGN_IN]);
    }
        // const ref = this.db.doc(`vendor/${this.userId}`);
        }
    }
   
    signOutFn() {
        // const auth = getAuth();
        localStorage.clear();
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("sign-out")
        }).catch((err) => {
                console.log('err',err);
                // alert( err.message)
                Swal.fire(
                    `Error ${err.code}`,
                    err.message,
                    'error'
                    )
            });
       
        this.router.navigate([PAGE.SIGN_IN]);
    }
    async getUserData() {
        // if (!this.userId) {
            this.userId = this.getUserId();
        // }
        console.log(this.userId)
        //  return getDocs(collection(db, this.userId ,'vendor',this.userId));
        //  return getDoc(doc(db, this.userId ,'vendor',this.userId));

        await getDoc(doc(db, 'user', this.userId)).then(
            async (snap)=>{
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
             getDoc(doc(db, 'vendor', this.userId)).then(
                async (snap)=>{
            if (snap.exists()) {
                console.log(snap.data())

                const info = snap.data()
                this.role = info['role'];
                this.storeRole(info['role']);
                console.log(this.role)
                this.router.navigate([PAGE.VENDOR_HOME]);
            } else {
                console.log("No Document exists")
                // this.router.navigate([PAGE.PROFILE]);
            }
        }).catch((err) => {
            console.log('err',err);
            // alert( err.message)
            Swal.fire(
                `Error ${err.code}`,
                err.message,
                'error'
                )
        })
        }
    }).catch((err) => {
        console.log('err',err);
        // alert( err.message)
        Swal.fire(
            `Error ${err.code}`,
            err.message,
            'error'
            )
    })
    }
    async checkUserExist(phone:any){
   return  await getDoc(doc(db, 'user', phone)).then(
        async (snap)=>{
    console.log(snap)
    if (snap.exists()) {
        return true;
        // this.router.navigate([PAGE.SIGN_IN]);
    }else{

       return await getDoc(doc(db, 'vendor', phone)).then((snap)=>{

            if (snap.exists()){
                return true;
               
            } else {
    
                console.log("New User")
                return false;
                // this.router.navigate([PAGE.PROFILE]);
            }
        }).catch((err) => {
            console.log('err',err);
            // alert( err.message)
            Swal.fire(
                `Error ${err.code}`,
                err.message,
                'error'
                )
        })
    }
}
           
        ).catch((err) => {
            console.log('err',err)
            // alert( err.message)
            Swal.fire(
                `Error ${err.code}`,
                err.message,
                'error'
                )
        })
       
        // const snap = await getDocs(collection(db, this.userId ,'vendor',this.userId));
        
       
    }
}
 // async getProfile() {
    //         this.userId = this.getUserId();
    //     const querySnapshot = await getDocs(collection(db, this.userId, 'customer', this.userId));
    //     console.log(querySnapshot);
    //     querySnapshot.forEach((doc) => { 
    //         console.log(doc.data());
    //     });
    // }