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
            alert(err)
            console.error(err)
        }
    }

    const signInWithGoogle=async()=>{
        try{
            await signInWithPopup(auth,googleProvider);
        }catch(err){
            alert(err)
            console.error(err);
        }
    }

    const logOut=async()=>{
        try{
            await signOut(auth);
        }catch(err){
            alert(err)
            console.error(err);
        }
    }


  return (
    <div>
      <input className="mx-2" placeholder='Email...' onChange={OnChangeEmail}/>
      <input className="mx-2" placeholder='Password...' type='password' onChange={onChangePassword}/>
      <button className="mx-2" onClick={signIn}>Sign In</button>
      <button className="mx-2" onClick={signInWithGoogle}>Sign In with Google</button>
      <button className="mx-2" onClick={logOut}>log Out</button>
    </div>
  )
}
