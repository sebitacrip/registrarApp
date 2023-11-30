
import { User } from './../models/user.models';
import { Injectable, inject } from '@angular/core';
import{ AngularFireAuth } from '@angular/fire/compat/auth'
import {getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendPasswordResetEmail} from 'firebase/auth'
import {AngularFirestore} from '@angular/fire/compat/firestore'
import {getFirestore,setDoc, doc}from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  auth = inject(AngularFireAuth);
  firestore = inject(AngularFirestore)

  login(user: User){
    return signInWithEmailAndPassword(getAuth(),user.email, user.clave)
  }

  registrar(user: User){
    return createUserWithEmailAndPassword(getAuth(),user.email, user.clave)
  }

  documento(path: string, data: any){
    return setDoc(doc(getFirestore(),path), data);
    
  }

  recuperarClave(email:any){
    return sendPasswordResetEmail(getAuth(),email)
  }



  
 
}

