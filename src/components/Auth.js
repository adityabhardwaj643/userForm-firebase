import React, { useState } from 'react'
import { auth } from '../firebase'
import { createUserWithEmailAndPassword,signInWithPopup ,signOut} from 'firebase/auth'
import { googleProvider } from '../firebase';




export default function Auth() {

    const[email,SetEmail]=useState("");
    const[password,SetPassword]=useState("");

    console.log(auth?.currentUser?.email)

    const OnChangeEmail=(e)=>{
        SetEmail(e.target.value)
    }
    
    const onChangePassword=(e)=>{
        SetPassword(e.target.value)
    }
    
    
    const signIn=async()=>{
        try{
        await createUserWithEmailAndPassword(auth,email,password)
        }catch(err){
            console.error(err)
        }
    }

    const signInWithGoogle=async()=>{
        try{
            await signInWithPopup(auth,googleProvider);
        }catch(err){
            console.error(err);
        }
    }

    const logOut=async()=>{
        try{
            await signOut(auth);
        }catch(err){
            console.error(err);
        }
    }


  return (
    <div>
      <input placeholder='Email...' onChange={OnChangeEmail}/>
      <input placeholder='Password...' type='password' onChange={onChangePassword}/>
      <button onClick={signIn}>Sign In</button>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      <button onClick={logOut}>log Out</button>
    </div>
  )
}
