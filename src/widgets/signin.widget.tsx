/**
 * Signin
 * 
 */

import { useState } from "react";
import { _authSignin } from "@/api/_auth.api";
import { createSession } from '@/utils/session.utils';
import Button from "@/components/button";
import { firebaseAuth, instanceBackend } from "@/App";
import { signInWithEmailAndPassword, UserCredential } from 'firebase/auth'
import { sha512 } from "js-sha512";
import { emailRegex } from "@/utils/match-regex.utils";
import { Dispatch } from "@reduxjs/toolkit";
import { useAppDispatch } from "@/redux/_hooks";

interface OwnProps{
  onSuccess? : Function
}

function SigninWidget(props:OwnProps){

  const dispatch: Dispatch = useAppDispatch()
  
  const [login, setLogin] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  async function loginToFirebase(){

    const hashedPassword: string = sha512(password)

    return signInWithEmailAndPassword(firebaseAuth, login, hashedPassword)
    .then((userCredential: UserCredential) => {

      // Signed in 
      return userCredential.user.getIdToken()
      .then((firebasetoken: any) => {
        instanceBackend.defaults.headers.common["firebasetoken"] = firebasetoken;
        return { firebasetoken }
      })
      .catch((error: any) => {
        return { error }
      })
    })
    .catch((error: any) => {
      return { error }
    })
  }
  
  async function signin(){

    if(emailRegex.test(login)){
      const firebaseResponse: any = await loginToFirebase()

      if(firebaseResponse.error){
        console.log(firebaseResponse.error)
      }
      else{

        const response: any = await dispatch(_authSignin(login))

        if(response.error){
          console.log(response.error)
        }
        else{
          createSession(response)
          if(props.onSuccess){
            props.onSuccess()
          }
        }

      }
    }
    else{
      //format error
    }

  }


  return (
    <form>

      <input
        autoFocus
        type="text"
        autoComplete="email"
        //autoComplete="current-email"
        value={login}
        onChange={(event:any)=>setLogin(event.target.value)}
      />

      {!emailRegex.test(login) &&
      <p>{"email invalid"}</p>
      }

      <input
        type="password"
        autoComplete="current-password"
        value={password}
        onChange={(event:any)=>setPassword(event.target.value)}
      />

      <Button
        onClick={signin}
        title={"Se Connecter"}
      />

    </form>

  )
}

export default SigninWidget