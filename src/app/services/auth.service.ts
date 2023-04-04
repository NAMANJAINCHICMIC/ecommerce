// import { Injectable , NgZone } from '@angular/core';
// import * as auth from 'firebase/auth';
// import { AngularFireAuth } from '@angular/fire/compat/auth';
// import {
//   AngularFirestore,
//   AngularFirestoreDocument,
// } from '@angular/fire/compat/firestore';
// import { RecaptchaVerifier, getAuth } from "firebase/auth";
// import { Router } from '@angular/router';
// import { User } from '../utils/models/user';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   userData: any; // Save logged in user data
// //  auth = getAuth();
// //   auth.languageCode = 'it';
//  auth = getAuth();
//   constructor(
//     public afs: AngularFirestore, // Inject Firestore service
//     public afAuth: AngularFireAuth, // Inject Firebase auth service
//     public router: Router,
//     public ngZone: NgZone // NgZone service to remove outside scope warning
//   ) {
//     /* Saving user data in localstorage when 
//     logged in and setting up null when logged out */
//     this.afAuth.authState.subscribe((user) => {
//       if (user) {
//         this.userData = user;
//         localStorage.setItem('user', JSON.stringify(this.userData));
//         JSON.parse(localStorage.getItem('user')!);
//       } else {
//         localStorage.setItem('user', 'null');
//         JSON.parse(localStorage.getItem('user')!);
//       }
//     });

//     // const recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
//     //   'size': 'invisible',
//     //   'callback': (response) => {
//     //     // reCAPTCHA solved, allow signInWithPhoneNumber.
//     //     onSignInSubmit();
//     //   }
//     // }, auth);
//   }

//   SignIn(email: string, password: string) {
//     return this.afAuth
//       .signInWithEmailAndPassword(email, password)
//       .then((result) => {
//         // this.SetUserData(result.user);
//         this.afAuth.authState.subscribe((user) => {
//           if (user) {
//             this.router.navigate(['dashboard']);
//           }
//         });
//       })
//       .catch((error) => {
//         window.alert(error.message);
//       });
//   }
//   // Sign up with email/password
//   SignUp(email: string, password: string) {
//     return this.afAuth
//       .createUserWithEmailAndPassword(email, password)
//       .then((result) => {
//         /* Call the SendVerificaitonMail() function when new user sign 
//         up and returns promise */
//         // this.SendVerificationMail();
//         // this.SetUserData(result.user);
//       })
//       .catch((error) => {
//         window.alert(error.message);
//       });
//   }
//   get isLoggedIn(): boolean {
//     const user = JSON.parse(localStorage.getItem('user')!);
//     return user !== null && user.emailVerified !== false ? true : false;
//   }

//     // Auth logic to run auth providers
//     AuthLogin(provider: any) {
//       return this.afAuth
//         .signInWithPopup(provider)
//         .then((result) => {
//           this.router.navigate(['dashboard']);
//           this.SetUserData(result.user);
//         })
//         .catch((error) => {
//           window.alert(error);
//         });
//     }
//     /* Setting up user data when sign in with username/password, 
//     sign up with username/password and sign in with social auth  
//     provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
//     SetUserData(user: any) {
//       const userRef: AngularFirestoreDocument<any> = this.afs.doc(
//         `users/${user.uid}`
//       );
//       const userData: User = {
//         uid: user.uid,
//         email: user.email,
//         displayName: user.displayName,
//         photoURL: user.photoURL,
//         emailVerified: user.emailVerified,
//       };
//       return userRef.set(userData, {
//         merge: true,
//       });
//     }
//     // Sign out
//     SignOut() {
//       return this.afAuth.signOut().then(() => {
//         localStorage.removeItem('user');
//         this.router.navigate(['sign-in']);
//       });
//     }
//   // Returns true when user is looged in and email is verified


// }
