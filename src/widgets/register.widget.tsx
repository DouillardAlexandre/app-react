/**
 * Register
 * 
 */

import { useState } from "react";
import { _authRegister } from "@/api/_auth.api";
import { createSession } from '@/utils/session.utils';
import Button from '@/components/button';
import { sha512 } from 'js-sha512';
import { aliasRegex, emailRegex } from '@/utils/match-regex.utils';
import { createUserWithEmailAndPassword, UserCredential } from 'firebase/auth';
import { firebaseAuth, instanceBackend } from '@/App';
import { accountCheckAvailability } from '@/api/account.api';
import { Dispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/redux/_hooks';

interface OwnProps {
  onSuccess? : Function
}

function RegisterWidget(props:OwnProps){
  
  const dispatch: Dispatch = useAppDispatch()

  const [email, setEmail] = useState<string>("")
  const [alias, setAlias] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  async function signupFirebase(){

    const hashedPassword : string = sha512(password)

    return createUserWithEmailAndPassword(firebaseAuth, email, hashedPassword)
    .then((userCredential: UserCredential) => {

      // Signed in 
      return userCredential.user.getIdToken()
      .then((firebasetoken: any) => {
        instanceBackend.defaults.headers.common["firebasetoken"] = firebasetoken;
        return { firebasetoken }
      })
      .catch((error:any)=>{
        return { error }
      })     
    })
    .catch((error) => {
      return { error }
    })
  }

  async function register(){

    if(aliasRegex.test(alias) && emailRegex.test(email)){
      const available: any = await dispatch(accountCheckAvailability(alias, email))

      if(available.alias && available.email){
        
        const firebaseResponse: any = await signupFirebase()

        if(firebaseResponse.error){
          console.log(firebaseResponse.error)
        }
        else{

          const response: any = await dispatch(_authRegister(alias, email))

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
        //availability error
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
        value={alias}
        onChange={(event:any)=>setAlias(event.target.value)}
      />

      {!aliasRegex.test(alias) &&
      <p>{"alias invalid"}</p>
      }

      <input
        type="password"
        value={password}
        onChange={(event:any)=>setPassword(event.target.value)}
      />

      <input
        type="text"
        value={email}
        onChange={(event:any)=>setEmail(event.target.value)}
      />

      {!emailRegex.test(email) &&
      <p>{"email invalid"}</p>
      }

      <Button
        onClick={register}
        title={"S'inscrire'"}
      />

    </form>

  )
}

export default RegisterWidget
