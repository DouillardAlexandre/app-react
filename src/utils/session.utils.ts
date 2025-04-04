import { Session } from "@/classes/_session.class";
import Cookies from 'universal-cookie';
import { firebaseAuth, instanceBackend, instanceUpload } from "@/App";
import { _sessionUpdate } from '@/redux/_session.slice';
import { Account } from "@/classes/account.class";
import { signOut } from "firebase/auth";
import { store } from "@/redux/_store";

const cookies = new Cookies()

export function createSession(authResponse: any): void{

  const session: Session = new Session({
    Account: new Account(authResponse.account),
    expiration: Date.now() + 3600 * 1000 * 6 //6h
  })
  store.dispatch(_sessionUpdate(session))

  instanceBackend.defaults.headers.common["backendtoken"] = authResponse.backendtoken;
  instanceUpload.defaults.headers.common["backendtoken"] = authResponse.backendtoken;

  cookies.set('backendtoken', instanceBackend.defaults.headers.common.backendtoken, { path: '/' })
  cookies.set('firebasetoken', instanceBackend.defaults.headers.common.firebasetoken, { path: '/' })
  
}

export function destroySession(): void{
  
  signOut(firebaseAuth).then(() => {
    return { message : "signed out successfully !"}
  }).catch((error) => {
    return { error }
  })

  cookies.remove('firebasetoken', { path: '/' })
  cookies.remove('backendtoken', { path: '/' })

  instanceBackend.defaults.headers.common["firebasetoken"] = ""
  instanceBackend.defaults.headers.common["backendtoken"] = ""
  instanceUpload.defaults.headers.common["backendtoken"] = ""

  store.dispatch(_sessionUpdate(new Session()))

  //window.location.href = window.location.origin
  
}

export function getSessionExpirationDate(): number{
  return store.getState()._session.expiration
}